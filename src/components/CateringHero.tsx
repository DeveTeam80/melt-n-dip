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

      // Fade in wrapper first so image is visible, then do cinematic reveal
      tl.to(imgWrapRef.current, { opacity: 1, duration: 0.01 }, 0);

      // Cinematic image reveal
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

      // Text mask reveals
      tl.fromTo(
        ".ch-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        { y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.12 },
        0.3,
      );

      // Fade-ups
      tl.fromTo(
        ".ch-fade-up",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        0.6,
      );

      // Stat dock
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
            inset: "-10%",
            // Swapped to a stunning, moody dark chocolate macro shot
            backgroundImage:
              "url('https://images.unsplash.com/photo-1620603704253-839db088926f?q=80&w=2000&auto=format&fit=crop')",
            backgroundPosition: "center center",
            willChange: "transform, filter",
          }}
        />
        {/* Overlays - The mix-blend-multiply deepens shadows luxuriously */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,42,39,0.3)", mixBlendMode: "multiply" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,24,22,0.92) 0%, rgba(9,24,22,0.4) 55%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(9,24,22,0.95) 0%, transparent 40%)",
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
        {/* <div className="ch-fade-up flex items-center gap-4 mb-6">
                    <div className="w-8 h-px bg-amber" />
                    <span className="text-[13px] tracking-[4px] uppercase font-medium text-amber">
                        Delight Enterprises · Catering
                    </span>
                </div> */}

        <h1
          className="font-serif font-light flex flex-col gap-1 mb-8 text-paper tracking-[-0.02em]"
          style={{ fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 1.05 }}
        >
          <span className="overflow-hidden block py-1">
            <span className="ch-reveal-line block">Dessert Catering That</span>
          </span>
          <span className="overflow-hidden block py-1">
            <span className="ch-reveal-line block">Turns Every Event</span>
          </span>
          <span className="overflow-hidden block py-1">
            <span className="ch-reveal-line block">
              Into a <em className="italic text-amber">Celebration.</em>
            </span>
          </span>
        </h1>

        <p
          className="ch-fade-up font-light leading-[1.85] mb-12"
          style={{
            fontSize: "17px",
            color: "rgba(251,253,252,0.65)",
            maxWidth: "460px",
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
              boxShadow: "0 10px 40px rgba(26,122,110,0.25)",
            }}
          >
            Build your Cart
            <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
          </a>

          {/* <a
            href="tel:+17086088982"
            onMouseMove={onMagMove}
            className="flex items-center gap-2.5 font-light transition-colors duration-300 hover-target"
            style={{ fontSize: "14px", color: "rgba(251,253,252,0.65)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-paper)")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = "rgba(251,253,252,0.65)";
              onMagLeave(e);
            }}
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>
            (708) 608-8982
          </a> */}
        </div>
      </div>

      {/* ── GLASSMORPHIC STAT DOCK ──────────────────── */}
      <div className="ch-stat-dock absolute bottom-8 lg:bottom-12 right-8 lg:right-20 z-20 hidden md:flex">
        <div
          className="flex items-center rounded-[3px] divide-x"
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
                className="font-serif font-light text-paper leading-none mb-2"
                style={{ fontSize: "28px", letterSpacing: "-0.03em" }}
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

      {/* ── SCROLL INDICATOR ────────────────────────── */}
      {/* <div
                className="absolute flex flex-col items-center gap-3 pointer-events-none z-10"
                style={{ bottom: "48px", left: "32px", opacity: 0.6 }}
            >
                <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--color-teal-pale), transparent)" }} />
                <span
                    className="[writing-mode:vertical-rl] uppercase font-medium text-amber"
                    style={{ fontSize: "8px", letterSpacing: "3px" }}
                >
                    Estimator
                </span>
            </div> */}

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
