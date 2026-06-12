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
        <div className="flex flex-col max-w-2xl">
          {/* Headline */}
          <h1
            className="font-serif font-light flex flex-col gap-1 mb-7 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(35px, 5.5vw, 84px)",
              lineHeight: 1,
              color: "var(--color-cream)",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="overflow-hidden block py-2">
              <span className="ch-reveal-line block">
                Dessert Catering That
              </span>
            </span>
            <span className="overflow-hidden block py-2">
              <span className="ch-reveal-line block">Turns Every Event</span>
            </span>
            <span className="overflow-hidden block py-2">
              <span className="ch-reveal-line block">
                Into a{" "}
                <em className="italic" style={{ color: "var(--color-amber)" }}>
                  Celebration.
                </em>
              </span>
            </span>
          </h1>

          {/* Body */}
          <p
            className="ch-fade-up font-light leading-[1.85] mb-8"
            style={{
              fontSize: "clamp(13px, 4vw, 16px)",
              color: "rgba(251,253,252,0.7)",
              maxWidth: "440px",
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            Bring Melt N Dip&apos;s signature Belgian chocolate creations, live
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
                boxShadow: "0 10px 40px rgba(8,99,107,0.35)",
              }}
            >
              Plan Your Menu
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
            </a>

            {/* Ghost secondary CTA */}
            {/* <a
              href="#estimator"
              className="inline-flex items-center gap-1.5 font-light transition-all group"
              style={{
                fontSize: "13px",
                color: "rgba(251,253,252,0.6)",
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
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
