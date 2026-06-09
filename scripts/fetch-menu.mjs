/**
 * fetch-menu.mjs -- Fetches menu items from WP REST API and merges new items
 * into data.ts. Run manually:  npm run fetch-menu
 * Or as prebuild:              "prebuild": "node scripts/fetch-menu.mjs"
 *
 * Only adds items whose names don't already exist in UNIFIED_MENU.
 * Existing items are never touched. New items are appended as placeholders
 * with REVIEW comments so you can review & enrich them.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "src", "components", "data.ts");
const WP_API = "https://meltndip.com/wp-json/wp/v2/lte-menu?per_page=100";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function normalize(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&#\d+;/g, "")
    .replace(/&#038;/g, "and")
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractExistingNames(src) {
  const names = [];
  for (const line of src.split("\n")) {
    const m = line.match(/name:\s*"([^"]+)"/);
    if (m) names.push(normalize(m[1]));
  }
  return names;
}

function isDuplicate(wpName, existingNames) {
  const n = normalize(wpName);
  if (existingNames.includes(n)) return true;

  for (const en of existingNames) {
    if (en.includes(n) || n.includes(en)) return true;
    const wpFirst = n.split(" ").find((w) => w.length >= 4);
    const enFirst = en.split(" ").find((w) => w.length >= 4);
    if (wpFirst && enFirst && (enFirst.startsWith(wpFirst) || wpFirst.startsWith(enFirst))) {
      return true;
    }
  }

  const wpWords = new Set(n.split(" ").filter((w) => w.length > 2));

  for (const en of existingNames) {
    const enWords = new Set(en.split(" ").filter((w) => w.length > 2));
    const shorter = wpWords.size < enWords.size ? wpWords : enWords;
    const longer = wpWords.size < enWords.size ? enWords : wpWords;
    if (shorter.size === 0) continue;

    let intersection = 0;
    for (const w of shorter) if (longer.has(w)) intersection++;

    if (intersection / shorter.size >= 0.6) return true;
  }
  return false;
}

function guessCategory(post) {
  if (post._embedded?.["wp:term"]) {
    for (const terms of post._embedded["wp:term"]) {
      for (const term of terms) {
        if (term.slug && term.slug !== "uncategorized" && term.slug !== "menu-item")
          return term.name;
      }
    }
  }
  const name = (post.title?.rendered || "").toLowerCase();
  if (name.includes("crepe") || name.includes("wrap")) return "Crepe";
  if (name.includes("waffle")) return "Waffle";
  if (name.includes("cookie") || name.includes("cake") || name.includes("brownie") || name.includes("lava")) return "Cookies & Cake";
  if (name.includes("eclair") || name.includes("stick") || name.includes("passion")) return "Dip Stick & Sharing";
  if (name.includes("fruit") || name.includes("tahiti") || name.includes("panama") || name.includes("avocado") || name.includes("salad") || name.includes("banana split")) return "Fresh Fruit & Platters";
  if (name.includes("milkshake") || name.includes("cheesecake") || name.includes("dubai")) return "Milkshakes & Cheesecake";
  if (name.includes("juice") || name.includes("lemonade") || name.includes("coffee") || name.includes("tea") || name.includes("espresso") || name.includes("latte") || name.includes("mocha") || name.includes("chocolate")) return "Beverages";
  return "Other";
}

async function main() {
  console.log("Fetching menu from WP REST API...");
  const res = await fetch(WP_API, {
    headers: { "User-Agent": "MeltNDip-Build/1.0" },
  });
  if (!res.ok) { console.error("API returned " + res.status); process.exit(1); }
  const posts = await res.json();
  if (!Array.isArray(posts)) { console.error("Unexpected API response"); process.exit(1); }

  console.log("  Found " + posts.length + " items from API");

  let src = readFileSync(DATA_PATH, "utf-8");
  src = src.replace(/\r\n/g, "\n");

  const existingNames = extractExistingNames(src);

  let newCount = 0;
  const blocks = [];

  for (const post of posts) {
    const name = (post.title?.rendered || "").trim();
    if (!name) continue;

    if (isDuplicate(name, existingNames)) continue;

    const cat = guessCategory(post);
    const candidateSlug = slugify(name);
    const prefix = cat === "Crepe" ? "cr" :
      cat === "Waffle" ? "wf" :
      cat === "Cookies & Cake" ? "ck" :
      cat === "Dip Stick & Sharing" ? "ds" :
      cat === "Fresh Fruit & Platters" ? "ff" :
      cat === "Milkshakes & Cheesecake" ? "ms" :
      cat === "Beverages" ? "bh" : "xx";
    const id = prefix + "-" + candidateSlug;

    const desc = (post.content?.rendered || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);

    blocks.push("\n  /* REVIEW */ { id: \"" + id + "\", name: \"" + name.replace(/"/g, '\\"') + "\", category: \"" + cat + "\", price: 0, description: \"" + desc.replace(/"/g, '\\"') + "\", image: undefined },");
    newCount++;
  }

  if (newCount === 0) {
    console.log("  No new items found -- UNIFIED_MENU is up to date.");
    return;
  }

  const marker = "];\n\n// \u2500\u2500 HELPER:";
  const insertIdx = src.lastIndexOf(marker);
  if (insertIdx === -1) {
    console.error("  Could not find UNIFIED_MENU closing bracket in data.ts");
    process.exit(1);
  }

  const notice = "\n\n  // \u2500\u2500 AUTO-FETCHED NEW ITEMS (" + new Date().toISOString().slice(0, 10) + ") \u2500\u2500\n  /* REVIEW each item below \u2500 fill in price, description, image, category */";
  const updated = src.slice(0, insertIdx) + notice + blocks.join("") + "\n" + src.slice(insertIdx);
  writeFileSync(DATA_PATH, updated, "utf-8");

  console.log("  OK " + newCount + " new item(s) added to data.ts with /* REVIEW */ tags.");
  console.log("  Run the script again after reviewing to pick up further additions.");
}

main().catch((err) => { console.error(err); process.exit(1); });
