"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowDown, ChevronRight } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STATS = [
  { num: "$750", label: "Min. In-House" },
  { num: "$1.5K", label: "Food Truck Min." },
  { num: "48hr", label: "Response Time" },
  { num: "Always", label: "Halal Catering" },
];

export default function CateringHero() {
  const containerRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll parallax
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onMagMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.38,
      y: (e.clientY - r.top - r.height / 2) * 0.38,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMagLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.3)",
    });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-ink"
      style={{ height: "100svh", minHeight: "620px", maxHeight: "1100px" }}
    >
      {/* ── BACKGROUND ──────────────────────────────── */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: 1 }}
      >
        <div
          ref={imgRef}
          className="absolute bg-cover origin-center"
          style={{
            inset: "0%",
            backgroundImage: "url('assets/images/catering/catering-hero.png')",
            backgroundPosition: "center 20%",
            willChange: "transform, filter",
          }}
        />

        {/* Teal multiply overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,42,39,0.3)", mixBlendMode: "multiply" }}
        />

        {/* Left-to-right gradient — slightly lighter on mobile so image peeks through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,24,22,0.96) 0%, rgba(9,24,22,0.82) 38%, rgba(9,24,22,0.4) 65%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(9,24,22,0.97) 0%, rgba(9,24,22,0.4) 28%, transparent 50%)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,24,22,0.5) 0%, transparent 20%)",
          }}
        />
      </div>

      {/* ── CORNER BRACKETS ─────────────────────────── */}
      {/* Top-left */}
      <div className="ch-corner absolute top-8 left-8 z-10 pointer-events-none hidden lg:block">
        <div className="relative w-10 h-10">
          <div className="absolute top-0 left-0 w-10 h-px" style={{ background: "var(--color-teal-pale)", opacity: 0.35 }} />
          <div className="absolute top-0 left-0 w-px h-10" style={{ background: "var(--color-teal-pale)", opacity: 0.35 }} />
        </div>
      </div>
      {/* Top-right */}
      <div className="ch-corner absolute top-8 right-8 z-10 pointer-events-none hidden lg:block">
        <div className="relative w-10 h-10">
          <div className="absolute top-0 right-0 w-10 h-px" style={{ background: "var(--color-teal-pale)", opacity: 0.35 }} />
          <div className="absolute top-0 right-0 w-px h-10" style={{ background: "var(--color-teal-pale)", opacity: 0.35 }} />
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center pt-20 sm:pt-28 lg:pt-0 px-8 sm:px-12 lg:px-20">
        <div className="flex flex-col max-w-2xl">

          {/* Headline */}
          <h1
            className="font-serif font-light flex flex-col gap-1 mb-7 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(40px, 5.5vw, 84px)",
              lineHeight: 1.02,
              color: "#fbfdfc",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">Dessert Catering That</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">Turns Every Event</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">
                Into a{" "}
                <em className="italic" style={{ color: "var(--color-amber, #D4860A)" }}>
                  Celebration.
                </em>
              </span>
            </span>
          </h1>

          {/* Body */}
          <p
            className="ch-fade-up font-light leading-[1.85] mb-8"
            style={{
              fontSize: "16px",
              color: "rgba(251,253,252,0.72)",
              maxWidth: "440px",
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            Bring Melt N Dip's signature Belgian chocolate creations, live
            stations, and artisan gelato to your next gathering. Customize your
            menu, select your guest count, and receive an instant estimate.
          </p>

          {/* CTAs */}
          <div className="ch-fade-up flex items-center gap-5 flex-wrap">
            <a
              href="#estimator"
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
              className="cta-primary hover-target inline-flex items-center justify-center gap-3 w-fit"
              style={{
                height: "54px",
                padding: "0 34px",
                fontSize: "12.5px",
                letterSpacing: "0.06em",
                boxShadow: "0 10px 40px rgba(26,122,110,0.35)",
              }}
            >
              Plan Your Menu
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
            </a>

            {/* Ghost secondary CTA */}
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 font-light transition-all group"
              style={{
                fontSize: "13px",
                color: "rgba(251,253,252,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              <span className="group-hover:text-white transition-colors duration-300">
                See how it works
              </span>
              <ChevronRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}