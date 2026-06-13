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
              "linear-gradient(to right, rgba(13,42,39,0.96) 0%, rgba(13,42,39,0.82) 38%, rgba(13,42,39,0.4) 65%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,42,39,0.97) 0%, rgba(13,42,39,0.4) 28%, transparent 50%)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,42,39,0.5) 0%, transparent 20%)",
          }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-12 lg:px-20">
        <div>
          <h1
            className="font-serif font-light flex flex-col gap-1 mb-4 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(35px, 5.5vw, 80px)",
              lineHeight: 1,
              color: "var(--color-cream)",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="overflow-hidden block ">
              <span className="ch-reveal-line block pb-2">
                Dessert Catering that
              </span>
            </span>
            <span className="overflow-hidden block pb-2">
              <span className="ch-reveal-line block"> Turns Every Event</span>
            </span>

            <span className="overflow-hidden block pb-2">
              <span className="ch-reveal-line block">
                Into a {""}
                <em className="italic" style={{ color: "var(--color-amber)" }}>
                  Celebration.
                </em>
              </span>
            </span>
          </h1>

          {/* CTAs */}
          <div className="ch-fade-up flex items-center flex-wrap justify-start gap-4 sm:gap-5 pt-4">
            <a
              href="#estimator"
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
              className="cta-primary hover-target inline-flex items-center justify-start gap-3 w-full sm:w-fit"
              style={{
                height: "54px",
                padding: "0 34px",
                fontSize: "12.5px",
                letterSpacing: "0.06em",
                boxShadow: "0 10px 40px rgba(8,99,107,0.35)",
              }}
            >
              Plan Your Menu
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
