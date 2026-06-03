"use client";

import { useEffect, useRef } from "react";
import { Sparkles, BadgeCheck, Moon, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero({
  animationReady = false,
}: {
  animationReady?: boolean;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationReady) return;

    let ctx: gsap.Context;

    requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          delay: 0.1,
        });

        // Cinematic image reveal
        tl.fromTo(
          imgWrapRef.current,
          { clipPath: "inset(20% 15% 20% 15% round 8px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 2,
            ease: "power3.inOut",
          },
          0,
        ).fromTo(
          imgRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 2, ease: "power3.inOut" },
          0,
        );

        // Text reveals
        tl.fromTo(
          ".reveal-line",
          { y: "110%", rotate: 1.5, opacity: 0 },
          { y: "0%", rotate: 0, opacity: 1, duration: 1.3, stagger: 0.13 },
          0.25,
        );

        // Fade-ups
        tl.fromTo(
          ".reveal-fade",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 },
          0.6,
        );

        // Glass card
        tl.fromTo(
          ".glass-card",
          { opacity: 0, y: 36, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          },
          1.3,
        );

        // Parallax
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(imgRef.current, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, containerRef);
    });

    return () => ctx?.revert();
  }, [animationReady]);

  const onMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.38,
      y: (e.clientY - r.top - r.height / 2) * 0.38,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.3)",
    });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!animationReady) {
    return (
      <section
        style={{
          height: "100svh",
          minHeight: "680px",
          maxHeight: "1000px",
          visibility: "hidden",
        }}
      />
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col lg:flex-row w-full bg-paper overflow-hidden"
      style={{ height: "100svh", minHeight: "680px", maxHeight: "1000px" }}
    >
      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col lg:justify-start justify-center px-8 sm:px-12 xl:px-20 pt-28 pb-10 sm:pt-36 sm:pb-16 lg:pt-30 lg:pb-24">
        {/* Overline */}
        {/* <div className="reveal-fade flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
          <span className="w-6 h-px shrink-0" style={{ background: "var(--color-teal-pale)" }} />
          <span style={{
            fontSize: "12px",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: "var(--color-teal)",
          }}>
            Palos Park, IL
          </span>
        </div> */}

        {/* Headline */}
        <h1
          className="font-serif font-light hero-title flex flex-col mb-5 sm:mb-4 mt-3"
          style={{
            fontSize: "clamp(32px, 6vw, 88px)",
            lineHeight: "0.97",
            letterSpacing: "-0.03em",
            gap: "4px",
          }}
        >
          <span
            className="overflow-hidden block"
            style={{ paddingBottom: "8px" }}
          >
            <span
              className="reveal-line block"
              style={{ opacity: 0, transform: "translateY(110%)" }}
            >
              Chicago’s Premier
            </span>
          </span>
          <span
            className="overflow-hidden block"
            style={{ paddingBottom: "10px" }}
          >
            <span
              className="reveal-line block"
              style={{ opacity: 0, transform: "translateY(110%)" }}
            >
              Dessert <em className="italic">Catering</em>
            </span>
          </span>
        </h1>

        {/* Divider */}
        <div
          className="reveal-fade flex items-center gap-4 mb-4 sm:mb-5"
          style={{ opacity: 0 }}
        >
          <div className="h-px w-8 hero-divider" />
          <span
            className="hero-subtitle"
            style={{
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Delight Enterprises | Serving Greater Chicago
          </span>
        </div>

        {/* Body */}
        <p
          className="reveal-fade font-normal hero-body mb-8 sm:mb-5"
          style={{
            fontSize: "clamp(15px, 1.8vw, 17px)",
            lineHeight: "1.85",
            maxWidth: "390px",
            opacity: 0,
          }}
        >
          Unforgettable dessert experiences for weddings and corporate events
          across Chicagoland. From premium Belgian chocolate fountains and live
          crepe stations to Halal custom sweet platters, we craft moments
          that matter.
        </p>

        {/* CTAs */}
        <div
          className="reveal-fade flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 mb-8 sm:mb-5 w-full sm:w-auto"
          style={{ opacity: 0 }}
        >
          <button
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            onClick={() => scrollTo("quote")}
            className="cta-primary hover-target w-full sm:w-auto sm:min-w-[180px] shrink-0"
            style={{
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 40px rgba(26,122,110,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            Book Catering
          </button>

          <button
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            onClick={() => scrollTo("products")}
            className="group flex items-center justify-center sm:justify-start gap-1.5 hover-target shrink-0 hero-link w-full sm:w-auto py-3 sm:py-0"
            style={{
              fontSize: "13px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            <span className="relative" style={{ paddingBottom: "2px" }}>
              Explore Menu
              <span
                className="absolute bottom-0 left-0 w-full origin-right transition-transform duration-500 ease-out group-hover:scale-x-0 hero-link-underline"
                style={{ height: "1px" }}
              />
            </span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 lg:relative lg:inset-auto lg:w-[55%] lg:h-full overflow-hidden z-0"
        style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      >
        <div
          ref={imgRef}
          className="absolute bg-cover"
          style={{
            inset: "0%",
            backgroundImage: "url('/assets/hero.jpg')",
            backgroundPosition: "center top",
          }}
        />

        {/* Mobile dark overlay (hidden on desktop) */}
        <div className="absolute inset-0 hero-mobile-overlay z-10 pointer-events-none" />

        {/* Bottom scrim */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 12%, rgba(0,0,0,0.2) 28%, transparent 50%)",
          }}
        />

        {/* Caption */}
        <div
          className="absolute z-[30] hidden lg:block"
          style={{ bottom: "32px", left: "32px" }}
        >
          {/* <p
            className="font-serif italic"
            style={{
              fontSize: "12px",
              letterSpacing: "0.02em",
              color: "white",
            }}
          >
            Triple Chocolate Crepe
          </p> */}
          {/* <p
            className="font-sans  !text-white"
            style={{
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#fff",
              marginTop: "4px",
            }}
          >
            Palos Park · 60 Old Creek Rd
          </p> */}
        </div>
      </div>
    </section>
  );
}
