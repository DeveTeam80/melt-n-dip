"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HEADLINE_WORDS = ["Every", "bite", "tells", "a", "story", "of"];
const HEADLINE_ACCENT = ["craft,", "luxury,"];
const HEADLINE_END = ["and", "pure", "indulgence."];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // 1.5s lag - silky smooth, not snappy
      };

      const tl = gsap.timeline({ scrollTrigger: st });

      // ── 1. Image - slow cinematic zoom ──────────────
      tl.fromTo(
        ".story-bg",
        { scale: 1, filter: "brightness(0.7)" },
        { scale: 1.18, filter: "brightness(0.45)", ease: "none" },
        0,
      );

      // ── 2. Overlay - paper → ink atmosphere ─────────
      // Starts nearly white (paper tone), ends deep teal-ink
      tl.fromTo(
        ".story-overlay",
        { backgroundColor: "rgba(248,250,249,0.92)" },
        { backgroundColor: "rgba(9,28,25,0.78)", ease: "none" },
        0,
      );

      // ── 3. Eyebrow fades in early ───────────────────
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.02,
      );

      // ── 4. Main words - large stagger ───────────────
      // Each word lights up independently as you scroll
      tl.fromTo(
        ".sw-main",
        { opacity: 0.08, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18, // large stagger - feels like words being spotlit
          ease: "power1.out",
        },
        0.05,
      );

      // ── 5. Accent words (teal italic) ───────────────
      tl.fromTo(
        ".sw-accent",
        { opacity: 0.08, y: 6 },
        { opacity: 1, y: 0, stagger: 0.18, ease: "power1.out" },
        0.45,
      );

      // ── 6. End words ─────────────────────────────────
      tl.fromTo(
        ".sw-end",
        { opacity: 0.08, y: 6 },
        { opacity: 1, y: 0, stagger: 0.18, ease: "power1.out" },
        0.72,
      );

      // ── 7. Subtitle fades in at end ──────────────────
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.85,
      );

      // ── 8. Text color - ink → cream in sync ─────────
      tl.fromTo(
        ".story-text-wrap",
        { color: "var(--color-ink)" },
        { color: "var(--color-cream)", ease: "none" },
        0,
      );

      // ── 9. Progress bar ──────────────────────────────
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Word = ({ children, cls }: { children: string; cls: string }) => (
    <span
      className={`${cls} inline-block`}
      style={{ marginRight: "0.25em", paddingBottom: "0.1em" }}
    >
      {children}
    </span>
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "400vh", background: "var(--color-ink)" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col
          items-center justify-center overflow-hidden"
      >
        {/* ── BACKGROUND IMAGE ─────────────────────── */}
        <div
          className="story-bg absolute bg-cover bg-center origin-center"
          style={{
            inset: "-12%",
            backgroundImage: "url('/assets/texture.jpg')",
            willChange: "transform, filter",
          }}
        />

        {/* ── ATMOSPHERE OVERLAY ───────────────────── */}
        <div className="story-overlay absolute inset-0" />

        {/* ── CONTENT ──────────────────────────────── */}
        <div
          className="story-text-wrap relative z-10 text-center w-full
            px-6 sm:px-12 lg:px-20 flex flex-col items-center"
          style={{ color: "var(--color-ink)" }}
        >
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-10"
            style={{ opacity: 0, paddingTop: "30px" }}
          >
            <div
              className="w-8 h-px"
              style={{ background: "var(--color-amber)" }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                fontWeight: 500,
              }}
            >
              Our Philosophy
            </span>
            <div
              className="w-8 h-px"
              style={{ background: "var(--color-amber)" }}
            />
          </div>

          {/* Headline */}
          <h2
            className="font-serif font-light leading-[1.08] flex flex-wrap
              justify-center"
            style={{
              fontSize: "clamp(38px, 6vw, 92px)",
              letterSpacing: "-0.03em",
              maxWidth: "1100px",
            }}
          >
            {HEADLINE_WORDS.map((w, i) => (
              <Word key={i} cls="sw-main">
                {w}
              </Word>
            ))}

            {/* Accent - italic teal */}
            <em className="italic not-italic flex flex-wrap justify-center">
              {HEADLINE_ACCENT.map((w, i) => (
                <Word key={i} cls="sw-accent italic">
                  {w}
                </Word>
              ))}
            </em>

            {/* End */}
            {HEADLINE_END.map((w, i) => (
              <Word key={i} cls="sw-end">
                {w}
              </Word>
            ))}
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-10 font-light"
            style={{
              fontSize: "15px",
              letterSpacing: "0.02em",
              color: "rgba(168,216,212,0.6)",
              maxWidth: "420px",
              lineHeight: 1.8,
              opacity: 0,
            }}
          >
            Premium Belgian chocolate. Authentic Italian gelato.
            <br />A lounge built for moments that linger.
          </p>
        </div>

        {/* ── PROGRESS BAR - bottom, horizontal ────── */}
        {/* Horizontal is more stable than vertical scaleY for scrub */}
        {/* <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-3"
        >
          <div
            className="relative overflow-hidden"
            style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.12)" }}
          >
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left"
              style={{
                background: "var(--color-amber)",
                transform: "scaleX(0)",
                willChange: "transform",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "7px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll
          </span>
        </div> */}

        {/* ── CORNER DECORATIONS ────────────────────── */}
        {/* Top-left and bottom-right - editorial bracket feel */}
        <div
          className="absolute top-10 left-10 z-10 pointer-events-none"
          style={{ opacity: 0.25 }}
        >
          <div
            className="w-8 h-px"
            style={{ background: "var(--color-teal-pale)" }}
          />
          <div
            className="w-px h-8 mt-0"
            style={{ background: "var(--color-teal-pale)" }}
          />
        </div>
        <div
          className="absolute bottom-10 right-10 z-10 pointer-events-none rotate-180"
          style={{ opacity: 0.25 }}
        >
          <div
            className="w-8 h-px"
            style={{ background: "var(--color-teal-pale)" }}
          />
          <div
            className="w-px h-8"
            style={{ background: "var(--color-teal-pale)" }}
          />
        </div>
      </div>
    </section>
  );
}
