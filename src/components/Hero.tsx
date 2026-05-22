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
          { scale: 1.25 },
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
          yPercent: 16,
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
      <div
        className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-12 xl:px-20"
        style={{ paddingTop: "136px", paddingBottom: "72px" }}
      >
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
          className="font-serif font-light text-ink flex flex-col mb-6"
          style={{
            fontSize: "clamp(52px, 5.5vw, 88px)",
            lineHeight: "0.97",
            letterSpacing: "-0.03em",
            gap: "4px",
          }}
        >
          <span
            className="overflow-hidden block"
            style={{ paddingBottom: "4px" }}
          >
            <span
              className="reveal-line block"
              style={{ opacity: 0, transform: "translateY(110%)" }}
            >
              A Sanctuary
            </span>
          </span>
          <span
            className="overflow-hidden block"
            style={{ paddingBottom: "4px" }}
          >
            <span
              className="reveal-line block"
              style={{ opacity: 0, transform: "translateY(110%)" }}
            >
              of{" "}
              <em className="italic" style={{ color: "var(--color-teal)" }}>
                Sweetness
              </em>
            </span>
          </span>
        </h1>

        {/* Divider */}
        <div
          className="reveal-fade flex items-center gap-4 mb-6"
          style={{ opacity: 0 }}
        >
          <div
            className="h-px w-8"
            style={{ background: "var(--color-sand)" }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-taupe)",
            }}
          >
            Melt &amp; Dip · Palos Park
          </span>
        </div>

        {/* Body */}
        <p
          className="reveal-fade font-normal text-teal mb-10"
          style={{
            fontSize: "17px",
            lineHeight: "1.85",
            maxWidth: "390px",
            opacity: 0,
          }}
        >
          Not your neighbourhood ice cream shop. Authentic Italian gelato, 100%
          Belgian chocolate crepes, and the viral Dubai Chocolate experience,
          crafted for moments that matter.
        </p>

        {/* CTAs */}
        <div
          className="reveal-fade flex items-center gap-8 mb-10"
          style={{ opacity: 0 }}
        >
          <button
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            onClick={() => scrollTo("quote")}
            className="cta-primary hover-target shrink-0"
            style={{
              minWidth: "180px",
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
            className="group flex items-center gap-1.5 hover-target shrink-0"
            style={{
              fontSize: "13px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--color-teal)",
            }}
          >
            <span className="relative" style={{ paddingBottom: "2px" }}>
              Explore Menu
              <span
                className="absolute bottom-0 left-0 w-full origin-right transition-transform duration-500 ease-out group-hover:scale-x-0"
                style={{ height: "1px", background: "rgba(26,122,110,0.35)" }}
              />
            </span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Trust badges */}
        <div
          className="reveal-fade flex flex-wrap items-center gap-x-7 gap-y-3"
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--color-linen)",
            opacity: 0,
          }}
        >
          {[
            { Icon: Sparkles, text: "100% Belgian Chocolate" },
            { Icon: BadgeCheck, text: "Halal Certified" },
            { Icon: Moon, text: "Open Late" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon
                className="shrink-0"
                style={{
                  width: "15px",
                  height: "15px",
                  color: "var(--color-amber)",
                }}
                strokeWidth={2}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "rgba(28,74,69,0.75)",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        {/* <div
          className="absolute flex flex-col items-center gap-2 pointer-events-none"
          style={{ bottom: "52px", left: "32px" }}
        >
          <div
            className="w-px"
            style={{
              height: "28px",
              background: "linear-gradient(to bottom, var(--color-teal-pale), transparent)",
            }}
          />
          <span
            className="[writing-mode:vertical-rl]"
            style={{
              fontSize: "8px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-sand)",
            }}
          >
            Scroll
          </span>
        </div> */}
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 lg:relative lg:inset-auto lg:w-[45%] lg:h-full overflow-hidden z-0"
        style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      >
        <div
          ref={imgRef}
          className="absolute bg-cover"
          style={{
            inset: "-10%",
            backgroundImage: "url('/assets/hero-chocolate-pour.jpg')",
            backgroundPosition: "center top",
          }}
        />

        {/* Mobile overlay */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(248,250,249,0.97) 0%, rgba(248,250,249,0.85) 45%, rgba(248,250,249,0.2) 80%, transparent 100%)",
          }}
        />

        {/* Desktop subtle left bleed */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(248,250,249,0.55) 0%, rgba(248,250,249,0.1) 25%, transparent 45%)",
          }}
        />

        {/* Bottom scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,42,39,0.65) 0%, rgba(13,42,39,0.1) 35%, transparent 60%)",
          }}
        />

        {/* Glass card */}
        <div
          className="glass-card absolute z-20 hidden md:flex items-stretch gap-0"
          style={{
            top: "100px",
            right: "28px",
            maxWidth: "calc(100% - 56px)",
            background: "rgba(251,253,252,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "3px",
            boxShadow:
              "0 16px 48px rgba(13,42,39,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
            opacity: 0,
          }}
        >
          {/* Rating block */}
          <div className="flex flex-col justify-center gap-1 px-5 py-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  style={{
                    width: "12px",
                    height: "12px",
                    fill: "var(--color-amber)",
                  }}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p
              className="font-serif font-light text-ink leading-none"
              style={{ fontSize: "24px", letterSpacing: "-0.03em" }}
            >
              4.9
              <span
                className="font-sans font-medium"
                style={{
                  fontSize: "13px",
                  color: "var(--color-taupe)",
                  letterSpacing: "normal",
                }}
              >
                {" "}
                / 5.0
              </span>
            </p>
            <p
              style={{
                fontSize: "10px",
                fontWeight: "500",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(28,74,69,0.5)",
              }}
            >
              200+ Google Reviews
            </p>
          </div>

          {/* Divider */}
          <div
            className="self-stretch w-px my-4"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(110,163,157,0.25), transparent)",
            }}
          />

          {/* Guests + Halal */}
          <div className="flex flex-col justify-center gap-1 px-5 py-4">
            <div className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: "16px",
                  height: "16px",
                  background: "var(--color-teal)",
                }}
              >
                <BadgeCheck
                  style={{ width: "10px", height: "10px", color: "#fff" }}
                  strokeWidth={2.5}
                />
              </div>
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                  fontWeight: 500,
                }}
              >
                100% Halal
              </span>
            </div>
            <p
              className="font-serif font-light text-ink leading-none"
              style={{ fontSize: "24px", letterSpacing: "-0.03em" }}
            >
              10K
              <span
                className="font-serif italic"
                style={{
                  fontSize: "13px",
                  color: "var(--color-teal)",
                  fontWeight: 500,
                }}
              >
                +
              </span>
            </p>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(28,74,69,0.5)",
                fontWeight: 500,
              }}
            >
              Guests Delighted
            </p>
          </div>
        </div>

        {/* Caption */}
        <div
          className="absolute z-10 hidden lg:block"
          style={{ bottom: "32px", left: "32px" }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: "12px",
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Belgian Chocolate Pour
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginTop: "4px",
            }}
          >
            Palos Park · 13030 LaGrange Rd
          </p>
        </div>
      </div>
    </section>
  );
}
