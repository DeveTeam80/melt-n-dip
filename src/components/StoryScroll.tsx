"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const INGREDIENTS = [
  "assets/images/products/kunafacup.png",
  "assets/images/products/oreocheescake.png",
  "assets/images/products/pistachioeclair.png",
  "assets/images/products/lovelycookies.png",
];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ✅ Initial states BEFORE first paint
      gsap.set(".gelato-bg", { scale: 1.15, opacity: 0.4 });
      gsap.set(".ingredient-card", {
        opacity: 0,
        y: 60,
        scale: 0.85,
      });
      gsap.set(".gelato-overlay", { opacity: 0.85 });
      gsap.set(".story-line", { opacity: 0, y: 70 });
      gsap.set(".story-sub", { opacity: 0, y: 30 });
      gsap.set(".story-divider", { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // Background gelato reveal
      tl.to(".gelato-bg", { scale: 1.0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
      tl.to(".gelato-overlay", { opacity: 0.45, duration: 0.8, ease: "power2.out" }, 0);

      // ✅ Ingredient cards entrance (reveal and remain in place)
      tl.fromTo(
        ".ingredient-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.85,
          rotation: (i: number) => (i % 2 === 0 ? -6 : 6),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: (i: number) => (i % 2 === 0 ? -4 : 4),
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        0.2,
      );

      // ✅ Text reveals
      tl.to(
        ".story-line",
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" },
        0.3,
      );

      tl.to(
        ".story-divider",
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.6,
      );
      tl.to(".story-sub", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.7);

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-ink min-h-screen lg:h-screen flex items-center justify-center py-20 lg:py-0 overflow-hidden"
    >
      {/* FULLSCREEN IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        {/* IMAGE */}
        <div
          className="gelato-bg absolute inset-0 bg-no-repeat bg-ink"
          style={{
            transform: "scale(1.08)",
          }}
        />

        {/* STATIC BASE OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(13,42,39,0.60) 0%,
              rgba(13,42,39,0.85) 35%,
              rgba(13,42,39,0.85) 65%,
              rgba(13,42,39,0.88) 100%
            )`,
          }}
        />

        {/* ANIMATED OVERLAY */}
        <div
          className="gelato-overlay absolute inset-0"
          style={{
            opacity: 0.8,
            background: `linear-gradient(
              to bottom,
              rgba(13,42,39,0.55) 0%,
              rgba(13,42,39,0.40) 50%,
              rgba(13,42,39,0.65) 100%
            )`,
          }}
        />
      </div>

      {/* INGREDIENT IMAGES */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="relative h-full w-full max-w-[1600px]">
          {INGREDIENTS.map((src, i) => (
            <div
              key={i}
              className="ingredient-card absolute hidden lg:block overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              style={{
                width: i % 2 === 0 ? "240px" : "280px",
                height: i % 2 === 0 ? "320px" : "360px",
                top: ["14%", "14%", "54%", "50%"][i],
                left: i === 0 ? "1%" : i === 2 ? "4%" : undefined,
                right: i === 1 ? "1%" : i === 3 ? "5%" : undefined,
                rotate: `${i % 2 === 0 ? "-6deg" : "6deg"}`,
              }}
            >
              <div className="relative h-full w-full">
                {/* IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />

                {/* CARD OVERLAY */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,42,39,0.55) 0%, rgba(13,42,39,0.15) 45%, rgba(13,42,39,0.05) 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* EYEBROW */}
        <div className="story-line mb-10 flex items-center gap-4 opacity-0">
          <div
            className="h-px w-10"
            style={{ background: "rgba(212,134,10,0.9)" }}
          />
          <span
            style={{
              fontSize: "15px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#D4860A",
            }}
          >
            Our Philosophy
          </span>
          <div
            className="h-px w-10"
            style={{ background: "rgba(212,134,10,0.9)" }}
          />
        </div>

        {/* HEADLINE */}
        <h2
          className="font-serif font-light leading-[1.05] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(42px, 4.8vw, 84px)", maxWidth: "850px" }}
        >
          <div className="overflow-hidden py-1">
            <div className="story-line">Every bite tells</div>
          </div>
          <div className="overflow-hidden py-1">
            <div className="story-line">a story of</div>
          </div>
          <div className="overflow-hidden py-1 italic text-[#D4860A]">
            <div className="story-line">craft, elegance,</div>
          </div>
          <div className="overflow-hidden py-1">
            <div className="story-line">and pure indulgence.</div>
          </div>
        </h2>

        {/* DIVIDER */}
        <div
          className="story-divider mt-10 mb-8 h-px w-[70px] origin-center opacity-0"
          style={{
            background:
              "linear-gradient(to right, transparent, #D4860A, transparent)",
          }}
        />

        {/* SUBTEXT */}
        <p
          className="story-sub max-w-[560px] font-light leading-[1.9] text-white opacity-0"
          style={{ fontSize: "20px" }}
        >
          A melody of rich Belgian chocolate and artisan gelato.
          <br />An atmosphere crafted to elevate your celebrations.
        </p>

        {/* Mobile Horizontal scrollable images */}
        <div className="lg:hidden w-screen overflow-x-auto mt-12 flex gap-4 pb-4 select-none pointer-events-auto -mx-6 px-6 no-scrollbar">
          {INGREDIENTS.map((src, i) => {
            const names = ["Kunafa Waffle Cup", "Oreo Cheesecake", "Pistachio Eclair", "Lovely Cookies"];
            return (
              <div
                key={i}
                className="flex-shrink-0 w-[160px] h-[200px] relative rounded-[3px] overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[12px] text-white font-sans font-light tracking-wide text-left">
                  {names[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
