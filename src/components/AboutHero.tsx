"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    requestAnimationFrame(() => {
      ctx = gsap.context(() => {
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
  }, []);

  const mg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.38,
      y: (e.clientY - r.top - r.height / 2) * 0.38,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const ml = (e: React.MouseEvent<HTMLButtonElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.3)",
    });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col lg:flex-row w-full overflow-y-auto overflow-x-hidden"
      style={{
        height: "100svh",
        minHeight: "680px",
        maxHeight: "1000px",
        background: "#0d2a27",
      }}
    >
      {/* ── LEFT: CONTENT ── */}
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-start h-full px-8 sm:px-12 xl:px-20 pt-24 pb-6 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24">
        <div className="my-auto lg:my-0 flex flex-col items-start w-full">
          {/* Headline — matches Hero: clamp(35px, 5.5vw, 88px), lineHeight 0.97, gap 2px */}
          <h1
            className="font-serif font-light about-h-line flex flex-col mb-6 sm:mb-8 mt-2"
            style={{
              fontSize: "clamp(38px, 5.5vw, 80px)",
              lineHeight: "0.97",
              letterSpacing: "-0.03em",
              gap: "2px",
              color: "#ffffff",
            }}
          >
            <span
              className="overflow-hidden block"
              style={{ paddingBottom: "10px" }}
            >
              <span className="about-h-line block">
                Bringing the{" "}
                <em className="italic" style={{ color: "#b98e3b" }}>
                  Store
                </em>
              </span>
            </span>
            <span
              className="overflow-hidden block"
              style={{ paddingBottom: "10px" }}
            >
              <span className="about-h-line block">to Your Celebration</span>
            </span>
          </h1>

          {/* Divider row — matches Hero's reveal-fade divider style */}
          <div className="about-h-fade flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-px w-8" style={{ background: "#b98e3b" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#b98e3b",
              }}
            >
              Delight Enterprises | Palos Park, IL
            </span>
          </div>

          {/* Body — matches Hero: clamp(14px, 1.8vw, 18px), lineHeight 1.7, maxWidth 390px */}
          <p
            className="about-h-fade font-normal mb-2 sm:mb-6"
            style={{
              fontSize: "clamp(14px, 1.8vw, 18px)",
              lineHeight: "1.7",
              maxWidth: "390px",
              color: "#e6f0f1",
            }}
          >
            Delight Enterprises LLC caters the premium flavors of our Melt N Dip
            store in Palos Park, Illinois. From halal Belgian chocolate
            fountains and artisan gelato to live crepe stations and custom
            dessert tables, we make your wedding or event unforgettable.
          </p>

          {/* CTAs — matches Hero: flex-col sm:flex-row, gap-2 sm:gap-8 */}
          <div className="about-h-fade flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-8 w-full sm:w-auto">
            {/* Primary — matches Hero cta-primary style exactly */}
            <button
              onMouseMove={mg}
              onMouseLeave={ml}
              onClick={() => scrollTo("journey")}
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
              How It Works
            </button>

            {/* Secondary — matches Hero ghost link style exactly */}
            <button
              onMouseMove={mg}
              onMouseLeave={ml}
              onClick={() => scrollTo("craft")}
              className="group flex items-center justify-center sm:justify-start gap-1.5 hover-target shrink-0 hero-link w-full sm:w-auto py-3 sm:py-0"
              style={{
                fontSize: "13px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              <span
                className="relative text-white"
                style={{ paddingBottom: "2px" }}
              >
                What We Cater
                <span
                  className="absolute bottom-0 left-0 w-full origin-right transition-transform duration-500 ease-out group-hover:scale-x-0 hero-link-underline"
                  style={{ height: "1px" }}
                />
              </span>
              <ArrowUpRight
                className="w-3.5 h-3.5 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── RIGHT: IMAGE — unchanged ── */}
      <div
        className="absolute inset-0 lg:relative lg:inset-auto lg:w-[55%] lg:h-full overflow-hidden z-0"
        style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      >
        <div
          ref={imgRef}
          className="absolute bg-cover"
          style={{
            inset: "0%",
            backgroundImage: "url('/assets/images/melt-n-dip-inside.webp')",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 lg:hidden z-10"
          style={{ background: "rgba(13,42,39,0.6)" }}
        />
      </div>
    </section>
  );
}
