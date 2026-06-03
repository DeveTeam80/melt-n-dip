"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function VsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Giant Background Text Parallax
      gsap.to(".vs-bg-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Editorial Masked Headers
      gsap.fromTo(
        ".vs-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        },
      );

      // Fade up labels
      gsap.fromTo(
        ".vs-fade-up",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        },
      );

      // 3. Staggered List Items
      gsap.fromTo(
        ".vs-list-item-a",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".vs-col-a", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".vs-list-item-b",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".vs-col-b", start: "top 80%" },
        },
      );

      // 4. Middle Divider Animation
      gsap.fromTo(
        ".vs-mid-circle",
        { scale: 0, rotate: -90 },
        {
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".vs-mid", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".vs-line",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".vs-mid", start: "top 80%" },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const traditionalPoints = [
    "Up to 50–100% air by volume — light but hollow",
    "10–18% milkfat — rich, but can feel heavy",
    "Served at −12°C — too cold to taste much",
    "Artificial flavor bases & chemical stabilizers",
    "Cream-heavy base coats the tongue and masks flavor",
  ];

  const delightPoints = [
    "Slow-churned with minimal air — dense and velvety",
    "4–8% milkfat — lighter, but fuller in flavour",
    "Served at −7°C — warm enough to release aroma",
    "All-natural ingredients — zero artificial bases",
    "Milk-forward base melts quickly for a clean, intense finish",
  ];

  return (
    <section
      ref={containerRef}
      className="bg-parchment py-20 lg:pt-16 lg:pb-32 px-8 sm:px-12 lg:px-20 relative overflow-hidden z-10"
    >
      {/* ── BACKGROUND PARALLAX TEXT ──────────────── */}
      <div className="vs-bg-text absolute top-[40%] right-[-10%] font-serif text-[180px] lg:text-[280px] font-light text-teal/5 tracking-[-0.04em] whitespace-nowrap pointer-events-none select-none z-0">
        GELATO
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_100px_1fr] gap-16 lg:gap-0 items-start relative z-10">

        {/* ── COL A (Traditional - Muted) ──────────────── */}
        <div className="vs-col-a relative z-10 pr-0 lg:pl-12">
          <p className="vs-fade-up text-[14px] font-medium tracking-[3.5px] uppercase text-taupe mb-8">
            What everyone else serves
          </p>

          <h3 className="font-serif text-[clamp(32px,3.5vw,48px)] font-light leading-[1.05] tracking-[-0.02em] mb-10 text-taupe flex flex-col gap-1">
            <span className="overflow-hidden block py-1">
              <span className="vs-reveal-line block">
                Traditional Ice Cream
              </span>
            </span>
          </h3>

          <ul className="list-none space-y-1">
            {traditionalPoints.map((item, i) => (
              <li
                key={i}
                className="vs-list-item-a text-[16px] font-light py-3 border-b border-linen flex gap-4 items-center text-bark/80"
              >
                <span className="text-taupe text-[13px] shrink-0">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── MIDDLE DIVIDER ───────────────────────────── */}
        <div className="vs-mid flex lg:flex-col flex-row items-center justify-center gap-0 my-4 lg:my-0 lg:pt-16">
          <div className="vs-line w-[80px] h-px lg:w-px lg:h-[120px] bg-gradient-to-r lg:bg-gradient-to-t from-transparent via-teal/30 to-transparent origin-center" />

          <div className="vs-mid-circle relative flex items-center justify-center shrink-0 w-[64px] h-[64px]">
            <div className="absolute inset-0 rounded-full bg-cream/85 backdrop-blur-sm border border-linen" />
            <span className="font-serif text-[14px] text-ink tracking-[1px] font-bold uppercase relative z-10 mt-1">
              vs
            </span>
          </div>

          <div className="vs-line w-[80px] h-px lg:w-px lg:h-[120px] bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-teal/30 to-transparent origin-center" />
        </div>

        {/* ── COL B (Melt N Dip - Highlighted) ────────────── */}
        <div className="vs-col-b relative z-10 pl-0 lg:pl-20">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(26,122,110,0.07)_0%,transparent_60%)] pointer-events-none z-[-1]" />

          <p className="vs-fade-up text-[14px] font-medium tracking-[3.5px] uppercase text-amber/80 mb-8">
            What we bring to the table
          </p>

          <h3 className="font-serif text-[clamp(32px,3.5vw,48px)] font-light leading-[1.05] tracking-[-0.02em] mb-10 text-ink flex flex-col gap-1">
            <span className="overflow-hidden block py-1">
              <span className="vs-reveal-line block">
                Melt N Dip <em className="italic text-amber">Gelato</em>
              </span>
            </span>
          </h3>

          <ul className="list-none space-y-1">
            {delightPoints.map((item, i) => (
              <li
                key={i}
                className="vs-list-item-b text-[16px] font-semibold py-3 border-b border-linen flex gap-4 items-center text-ink"
              >
                <span className="text-amber text-[15px] shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}