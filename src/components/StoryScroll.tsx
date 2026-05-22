"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WORDS_LINE1 = ["Every", "bite", "tells"];
const WORDS_LINE2 = ["a", "story", "of"];
const WORDS_ACCENT = ["craft,", "luxury,"];
const WORDS_END = ["and", "pure", "indulgence."];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      };

      const tl = gsap.timeline({ scrollTrigger: st });

      tl.fromTo(
        ".story-bg",
        { scale: 1, filter: "brightness(0.55) saturate(1.2)" },
        { scale: 1.22, filter: "brightness(0.35) saturate(0.6)", ease: "none" },
        0,
      );

      tl.fromTo(
        ".story-overlay",
        { backgroundColor: "rgba(248,244,238,0.88)" },
        { backgroundColor: "rgba(6,20,18,0.82)", ease: "none" },
        0,
      );

      tl.fromTo(
        ".story-grain",
        { opacity: 0 },
        { opacity: 0.06, ease: "none" },
        0,
      );

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20, letterSpacing: "6px" },
        { opacity: 1, y: 0, letterSpacing: "3.5px", ease: "power3.out" },
        0.02,
      );

      tl.fromTo(
        ".sw-l1",
        { opacity: 0, y: 48, rotateX: 25, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
        },
        0.06,
      );

      tl.fromTo(
        ".sw-l2",
        { opacity: 0, y: 48, rotateX: 25, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
        },
        0.28,
      );

      tl.fromTo(
        ".sw-accent",
        {
          opacity: 0,
          y: 48,
          rotateX: 25,
          filter: "blur(8px)",
          textShadow: "0 0 0px rgba(26,122,110,0)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          textShadow: "0 0 40px rgba(26,122,110,0.6)",
          stagger: 0.14,
          ease: "power3.out",
        },
        0.48,
      );

      tl.fromTo(
        ".sw-end",
        { opacity: 0, y: 48, rotateX: 25, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
        },
        0.65,
      );

      tl.fromTo(
        ".story-divider",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: "power2.inOut" },
        0.78,
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
        0.84,
      );

      tl.fromTo(
        counterRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.9,
      );

      tl.fromTo(
        ".story-text-wrap",
        { color: "var(--color-ink)" },
        { color: "#fbfdfc", ease: "none" },
        0,
      );

      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0,
      );

      gsap.to(".story-particle", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        opacity: "random(0.3, 0.7)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.8, from: "random" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Word = ({ children, cls }: { children: string; cls: string }) => (
    <span
      className={`${cls} inline-block`}
      style={{ marginRight: "0.22em", paddingBottom: "0.08em" }}
    >
      {children}
    </span>
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "500vh", background: "var(--color-ink)" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* ── BACKGROUND IMAGE ─────────────────────── */}
        <div
          className="story-bg absolute bg-cover bg-center origin-center"
          style={{
            inset: "-15%",
            backgroundImage: "url('/assets/images/chocalate_drizzle.jpg')",
            willChange: "transform, filter",
          }}
        />

        {/* ── ATMOSPHERE OVERLAY ───────────────────── */}
        <div className="story-overlay absolute inset-0" />

        {/* ── GRAIN TEXTURE ────────────────────────── */}
        <div
          className="story-grain absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0,
            mixBlendMode: "overlay",
          }}
        />

        {/* ── FLOATING PARTICLES ───────────────────── */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="story-particle absolute rounded-full pointer-events-none"
            style={{
              width: `${[3, 4, 2, 5, 3, 4, 2, 3][i]}px`,
              height: `${[3, 4, 2, 5, 3, 4, 2, 3][i]}px`,
              background:
                i % 2 === 0 ? "rgba(168,216,212,0.5)" : "rgba(212,134,10,0.4)",
              left: `${[15, 82, 45, 68, 28, 90, 55, 35][i]}%`,
              top: `${[25, 60, 40, 75, 55, 30, 65, 80][i]}%`,
              opacity: 0.4,
              filter: "blur(1px)",
            }}
          />
        ))}

        {/* ── CONTENT ──────────────────────────────── */}
        <div
          className="story-text-wrap relative z-10 text-center w-full px-6 sm:px-12 lg:px-20 flex flex-col items-center"
          style={{ color: "var(--color-ink)", perspective: "800px" }}
        >
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-10"
            style={{ opacity: 0 }}
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
            className="font-serif font-light leading-[1.1] flex flex-wrap justify-center"
            style={{
              fontSize: "clamp(36px, 5.5vw, 88px)",
              letterSpacing: "-0.03em",
              maxWidth: "1100px",
            }}
          >
            {WORDS_LINE1.map((w, i) => (
              <Word key={`l1-${i}`} cls="sw-l1">
                {w}
              </Word>
            ))}
            {WORDS_LINE2.map((w, i) => (
              <Word key={`l2-${i}`} cls="sw-l2">
                {w}
              </Word>
            ))}
            <em className="not-italic flex flex-wrap justify-center">
              {WORDS_ACCENT.map((w, i) => (
                <Word key={`acc-${i}`} cls="sw-accent italic">
                  {w}
                </Word>
              ))}
            </em>
            {WORDS_END.map((w, i) => (
              <Word key={`end-${i}`} cls="sw-end">
                {w}
              </Word>
            ))}
          </h2>

          {/* Divider */}
          <div
            className="story-divider mt-10 mb-8 origin-left"
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(to right, var(--color-amber), var(--color-teal-pale))",
              transform: "scaleX(0)",
              opacity: 0,
            }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-light"
            style={{
              fontSize: "15px",
              letterSpacing: "0.02em",
              color: "rgba(168,216,212,0.65)",
              maxWidth: "400px",
              lineHeight: 1.85,
              opacity: 0,
            }}
          >
            Premium Belgian chocolate. Authentic Italian gelato.
            <br />A lounge built for moments that linger.
          </p>

          {/* Scroll counter */}
          <div
            ref={counterRef}
            className="mt-12 flex items-center gap-3"
            style={{ opacity: 0 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: "80px",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
              }}
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
                fontSize: "9px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              scroll
            </span>
          </div>
        </div>

        {/* ── CORNER DECORATIONS ────────────────────── */}
        <div
          className="absolute top-10 left-10 z-10 pointer-events-none"
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

        {/* ── VIGNETTE ──────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(6,20,18,0.7) 100%)",
          }}
        />
      </div>
    </section>
  );
}
