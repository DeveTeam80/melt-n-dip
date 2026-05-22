"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Our Story", href: "/#about" },
  { label: "Menu", href: "/#products" },
  { label: "Catering & Events", href: "/catering" },
  { label: "Melt-n-dip palos", href: "/melt-n-dip-palos-park" },
  { label: "Find Us", href: "/#location" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isCatering = pathname === "/catering";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onMagMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onMagLeave = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  const scrollToQuote = () => {
    setMenuOpen(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE FULL-SCREEN MENU ──────────────────── */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-center items-center
          transform transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "var(--color-paper)" }}
      >
        {/* Decorative left edge */}
        <div
          className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-teal-pale), transparent)",
          }}
        />

        <div className="flex flex-col items-center w-full max-w-xs gap-2">
          {NAV_LINKS.map((item, i) => {
            const { label, href } = item;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group relative w-full text-center py-6 hover-target overflow-hidden"
                style={{
                  borderBottom:
                    i < NAV_LINKS.length - 1
                      ? "1px solid var(--color-linen)"
                      : "none",
                }}
              >
                {/* Default text - slides up on hover */}
                <span
                  className="font-serif font-light block
                  transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:-translate-y-[120%]"
                  style={{
                    fontSize: "clamp(36px, 8vw, 56px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>

                {/* Teal italic - slides in from below on hover */}
                <span
                  className="absolute inset-0 flex items-center justify-center
                  font-serif font-light italic
                  translate-y-[120%] group-hover:translate-y-0
                  transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    fontSize: "clamp(36px, 8vw, 56px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-teal)",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={scrollToQuote}
            className="cta-primary hover-target mt-12 w-full py-5"
            style={{ fontSize: "13px" }}
          >
            Book Now
          </button>
        </div>

        <p
          className="absolute bottom-12 uppercase font-medium"
          style={{
            fontSize: "15px",
            letterSpacing: "4px",
            color: "var(--color-taupe)",
          }}
        >
          Palos Park, IL
        </p>
      </div>

      {/* ── DESKTOP NAV ──────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            scrolled
              ? "pb-4 px-8 md:px-12 lg:px-16"
              : "pb-8 px-8 md:px-12 lg:px-16"
          }`}
        style={
          scrolled
            ? {
                background: "rgba(248,250,249,0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--color-linen)",
                boxShadow: "0 1px 32px rgba(26,122,110,0.06)",
              }
            : {}
        }
      >
        {/* ── LOGO ─────────────────────────────────── */}
        <Link
          href="/"
          onMouseMove={onMagMove}
          onMouseLeave={onMagLeave}
          className="hover-target shrink-0 group"
        >
          <Image
            src="/assets/logo.png"
            alt="Delight Enterprises"
            width={250}
            height={100}
            className="transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              group-hover:opacity-90"
            style={{
              height: "100px",
              width: "auto",
            }}
            priority
          />
        </Link>

        {/* ── DESKTOP LINKS ────────────────────────── */}
        <ul
          className={`hidden lg:flex items-center gap-2 list-none transition-all duration-500 ${!scrolled && !isCatering ? "bg-white/60 backdrop-blur-md rounded-full px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/50" : ""}`}
        >
          {NAV_LINKS.map((item) => {
            const { label, href } = item;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onMouseMove={onMagMove}
                  onMouseLeave={onMagLeave}
                  className="group relative block px-5 py-2 hover-target"
                >
                  {/* Pill bg - reveals on hover */}
                  <div
                    className="absolute inset-0 rounded-full scale-50 opacity-0
                    transition-all duration-300 ease-out
                    group-hover:scale-100 group-hover:opacity-100"
                    style={{ background: "var(--color-teal-faint)" }}
                  />
                  <span
                    className={`relative z-10 font-sans font-medium uppercase
                    transition-colors duration-300 ${isCatering && !scrolled ? "text-white group-hover:text-white/80" : "text-umber group-hover:text-teal"}`}
                    style={{ fontSize: "14px", letterSpacing: "1.5px" }}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── RIGHT ────────────────────────────────── */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Book Now */}
          <button
            onClick={scrollToQuote}
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            className="cta-primary hover-target hidden sm:flex items-center
              justify-center relative overflow-hidden"
            style={{
              padding: scrolled ? "11px 26px" : "13px 30px",
              fontSize: "13px",
            }}
          >
            Book Now
          </button>

          {/* Hamburger - mobile/tablet only */}
          {/* z-[91] - just above menu overlay (z-90) but below nav (z-100) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden flex flex-col justify-center gap-[5px]
              w-10 h-10 items-end hover-target z-[91]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block origin-right rounded-full
                  transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  height: "1.5px",
                  background:
                    isCatering && !scrolled
                      ? "var(--color-paper)"
                      : "var(--color-bark)",
                  // Middle bar shorter - asymmetric design detail
                  width: i === 1 && !menuOpen ? "14px" : "22px",
                  transform:
                    i === 0 && menuOpen
                      ? "rotate(-45deg) translate(-4px, 4px)"
                      : i === 2 && menuOpen
                        ? "rotate(45deg) translate(-4px, -4px)"
                        : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>
    </>
  );
}
