"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Phone, ArrowDown } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STATS = [
  { num: "$750", label: "Min. In-House" },
  { num: "$1.5K", label: "Food Truck Min." },
  { num: "48hr", label: "Response Time" },
  { num: "100%", label: "Halal Certified" },
];

export default function CateringHero() {
  const containerRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.1,
      });

      tl.to(imgWrapRef.current, { opacity: 1, duration: 0.01 }, 0);

      tl.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(15% 10% 15% 10% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 2,
          ease: "power3.inOut",
        },
        0,
      ).fromTo(
        imgRef.current,
        { scale: 1.25, filter: "blur(12px)" },
        { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.inOut" },
        0,
      );

      tl.fromTo(
        ".ch-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        { y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.12 },
        0.3,
      );

      tl.fromTo(
        ".ch-fade-up",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        0.6,
      );

      tl.fromTo(
        ".ch-stat-dock",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        1,
      );

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
      style={{ height: "100svh", minHeight: "720px", maxHeight: "1100px" }}
    >
      {/* ── BACKGROUND ──────────────────────────────── */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: 0 }}
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
        {/* Deep teal multiply overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,42,39,0.3)", mixBlendMode: "multiply" }}
        />
        {/* Left-to-right gradient — keeps left side very dark for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,24,22,0.96) 0%, rgba(9,24,22,0.75) 40%, rgba(9,24,22,0.35) 70%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(9,24,22,0.95) 0%, transparent 40%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,24,22,0.4) 0%, transparent 25%)",
          }}
        />
      </div>

      {/* Pre-hide animated elements */}
      <style>{`
        .ch-reveal-line { opacity: 0; transform: translateY(120%); }
        .ch-fade-up     { opacity: 0; }
        .ch-stat-dock   { opacity: 0; }
      `}</style>

      {/* ── CONTENT ─────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-20">
        <div className="flex flex-col">
          {/* Label */}

          <h1
            className="font-serif font-light flex flex-col gap-1 mb-8 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(44px, 6vw, 88px)",
              lineHeight: 1.05,
              color: "#fbfdfc",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">
                Dessert Catering That
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">Turns Every Event</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="ch-reveal-line block">
                Into a{" "}
                <em
                  className="italic"
                  style={{ color: "var(--color-amber, #D4860A)" }}
                >
                  Celebration.
                </em>
              </span>
            </span>
          </h1>

          <p
            className="ch-fade-up font-light leading-[1.85] mb-12"
            style={{
              fontSize: "17px",
              color: "white",
              maxWidth: "460px",
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            Build your dessert bag, choose your guest count, and get an instant
            estimate, then connect with our team to finalise your perfect event.
          </p>

          <div className="ch-fade-up flex flex-wrap items-center gap-8">
            <a
              href="#estimator"
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
              className="cta-primary hover-target flex items-center justify-center gap-3"
              style={{
                height: "56px",
                padding: "0 44px",
                fontSize: "13px",
                boxShadow: "0 10px 40px rgba(26,122,110,0.35)",
              }}
            >
              Build your Cart
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      {/* ── GLASSMORPHIC STAT DOCK ──────────────────── */}
      <div className="ch-stat-dock absolute bottom-8 lg:bottom-12 right-8 lg:right-20 z-20 hidden md:flex md:w-[50%] lg:w-[60%]">
        <div
          className="flex items-center rounded-[3px] divide-x w-full"
          style={{
            background: "rgba(251,253,252,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {STATS.map(({ num, label }, i) => (
            <div
              key={label}
              className="flex flex-col py-5 px-8"
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "none",
              }}
            >
              <span
                className=" font-light leading-none mb-2"
                style={{
                  fontSize: "24px",
                  letterSpacing: "-0.03em",
                  color: "#fbfdfc",
                }}
              >
                {num}
              </span>
              <span
                className="uppercase font-medium"
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "rgba(168,216,212,0.7)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CORNER BRACKET ──────────────────────────── */}
      <div className="absolute top-10 right-10 z-10 opacity-20 pointer-events-none rotate-180 hidden lg:block">
        <div
          className="w-10 h-px"
          style={{ background: "var(--color-teal-pale)" }}
        />
        <div
          className="w-px h-10"
          style={{ background: "var(--color-teal-pale)" }}
        />
      </div>
    </section>
  );
}
