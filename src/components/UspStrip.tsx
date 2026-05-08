"use client";

import { useEffect, useRef } from "react";
import { IceCreamBowl, Sparkles, BadgeCheck, MoonStar } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const USPS = [
  {
    num: "01",
    Icon: IceCreamBowl,
    title: "Authentic Gelato",
    desc: "Denser, richer, more flavourful than ice cream. Made the Italian way, lower fat, higher intensity, served at the perfect temperature.",
  },
  {
    num: "02",
    Icon: Sparkles,
    title: "100% Belgian Chocolate",
    desc: "Every dip, every pour, every truffle, single-origin Belgian couverture. No compound chocolate. Ever. The difference is undeniable.",
  },
  {
    num: "03",
    Icon: BadgeCheck,
    title: "Fully Halal, Always",
    desc: "Not an afterthought. A founding commitment. Every ingredient across our entire menu is halal-certified, for every guest, every time.",
  },
  {
    num: "04",
    Icon: MoonStar,
    title: "The Late-Night Lounge",
    desc: "After dinner in Orland Park or Tinley Park, this is where the evening continues. Premium, non-alcoholic, open late.",
  },
];

export default function UspStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. The Architectural Expand Effect
      // The dark panel scales up and its corners sharpen as you scroll into it
      gsap.fromTo(
        panelRef.current,
        {
          scale: 0.95,
          borderRadius: "40px",
        },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );

      // 2. Header Content Reveal
      gsap.from(".usp-header > div", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 75%" },
      });

      // 3. Elegant Card Stagger
      gsap.from(".usp-item", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".usp-grid", start: "top 80%" },
      });

      // 4. Subtle Parallax on Ghost Numbers
      gsap.to(".usp-num-bg", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // The outer container matches the light theme above and below it
      className="w-full bg-paper py-12 md:py-24 overflow-hidden"
    >
      {/* ── INSET DARK PANEL ──────────────────────────── */}
      <div
        ref={panelRef}
        className="mx-auto w-full max-w-[1920px] bg-bark text-paper origin-center shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* ── HEADER ROW ──────────────────────────── */}
        <div className="usp-header flex items-end justify-between px-8 sm:px-12 lg:px-20 pt-24 pb-16 border-b border-white/5">
          <div>
            <div className="flex items-center gap-4 mb-4 text-[9px] tracking-[4px] uppercase text-amber">
              <span className="w-8 h-px bg-amber" />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                }}
              >
                Why Delight
              </span>
            </div>
            <h2 className="font-serif font-light text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.02em]">
              What Sets Us <em className="italic text-amber">Apart</em>
            </h2>
          </div>

          <div className="hidden md:block text-right text-amber/80">
            <div className="font-serif font-light text-[64px] leading-none tracking-[-0.04em] mb-2">
              4
            </div>
            <div className="text-[9px] tracking-[3px] uppercase">
              Core Pillars
            </div>
          </div>
        </div>

        {/* ── CARDS GRID ──────────────────────────── */}
        <div className="usp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {USPS.map(({ num, Icon, title, desc }, i) => (
            <div
              key={num}
              className="usp-item group relative overflow-hidden px-10 py-14 cursor-default transition-colors duration-500 hover:bg-teal-deep/20"
              style={{
                borderRight:
                  i < USPS.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                // Adds bottom border on mobile/tablet to maintain grid lines
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Ghost number watermark */}
              <div className="usp-num-bg absolute top-[-10px] right-[10px] select-none pointer-events-none font-serif text-[140px] font-light leading-none tracking-[-0.05em] text-amber/50 transition-colors duration-500 group-hover:text-amber">
                {num}
              </div>

              {/* Hover accent line — top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              {/* Small number label */}
              {/* <div className="mb-10 text-[10px] tracking-[3px] text-amber/50 uppercase">
                {num}
              </div> */}

              {/* Icon in amber circle */}
              <div className="mb-8 flex items-center justify-center rounded-full w-14 h-14 bg-amber/10 border border-amber/20 transition-all duration-500 group-hover:bg-amber/20 group-hover:border-amber/40 group-hover:scale-110">
                <Icon className="w-5 h-5 text-amber" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <div className="mb-6">
                <p className="font-serif font-light text-[24px] tracking-[-0.01em] text-paper leading-[1.1] mb-5">
                  {title}
                </p>
                {/* Divider */}
                <div className="w-8 h-px bg-amber/50 transition-all duration-500 group-hover:w-12 group-hover:bg-amber" />
              </div>

              {/* Description */}
              <p className="text-[14px] font-light leading-[1.8] group-hover:text-amber/80 transition-colors duration-500 relative z-10">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
