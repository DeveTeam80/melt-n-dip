"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const INGREDIENTS = [
  "assets/images/products/kunafacup.png",
  "assets/images/products/oreocheescake.png",
  "assets/images/products/mndwaffle.png",
  "assets/brownie-waffle.jpg",
];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ✅ Initial states BEFORE first paint (prevents showing everything on reload)
      gsap.set(".gelato-bg", { scale: 1.25, opacity: 0.4 });
      gsap.set(".ingredient-card", {
        opacity: 0,
        y: 120,
        scale: 0.8,
      });
      gsap.set(".gelato-overlay", { opacity: 0.85 });
      gsap.set(".story-line", { opacity: 0, y: 70 });
      gsap.set(".story-sub", { opacity: 0, y: 30 });
      gsap.set(".story-divider", { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "bottom bottom",
          scrub: 1, // responsive and lag-free
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // Background gelato reveal
      tl.to(".gelato-bg", { scale: 1.08, opacity: 1 }, 0);

      // ✅ Ingredient cards entrance (proper reveal on scroll down)
      tl.fromTo(
        ".ingredient-card",
        {
          opacity: 0,
          y: 120,
          scale: 0.8,
          rotation: (i: number) => (i % 2 === 0 ? -8 : 8),
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "expo.out",
        },
        0,
      );

      // ✅ Delay fly away so users can see cards (less scroll needed)
      tl.to(
        ".ingredient-card",
        {
          opacity: 0,
          scale: 0.82,
          y: -320,
          rotation: (i: number) => (i % 2 === 0 ? -10 : 10),
          stagger: 0.08,
          duration: 1.0,
          ease: "expo.inOut",
        },
        0.7,
      );

      // Overlay becomes lighter
      tl.to(".gelato-overlay", { opacity: 0.25 }, 0.4);

      // ✅ Text reveals later (after cards sequence)
      tl.to(
        ".story-line",
        { opacity: 1, y: 0, stagger: 0.06, duration: 1.0, ease: "expo.out" },
        0.9,
      );

      tl.to(
        ".story-divider",
        { scaleX: 1, opacity: 1, ease: "power2.out" },
        1.1,
      );
      tl.to(".story-sub", { opacity: 1, y: 0, ease: "power3.out" }, 1.2);

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#061412]"
      style={{ height: "250vh" }} // ✅ less scroll needed
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* FULLSCREEN IMAGE */}
        <div className="absolute inset-0 overflow-hidden">
          {/* IMAGE */}
          <div
            className="gelato-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('assets/images/catering/catering3.jpeg')",
              transform: "scale(1.08)",
            }}
          />

          {/* STATIC BASE OVERLAY */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(6,20,18,0.60) 0%,
                rgba(6,20,18,0.85) 35%,
                rgba(6,20,18,0.85) 65%,
                rgba(6,20,18,0.88) 100%
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
                rgba(6,20,18,0.55) 0%,
                rgba(6,20,18,0.40) 50%,
                rgba(6,20,18,0.65) 100%
              )`,
            }}
          />
        </div>

        {/* INGREDIENT IMAGES */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="relative h-full w-full max-w-[1400px]">
            {INGREDIENTS.map((src, i) => (
              <div
                key={i}
                className="ingredient-card absolute hidden lg:block overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                style={{
                  width: i % 2 === 0 ? "240px" : "280px",
                  height: i % 2 === 0 ? "320px" : "360px",
                  top: ["14%", "22%", "55%", "50%"][i],
                  left: ["10%", "68%", "18%", "70%"][i],
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
                        "linear-gradient(to top, rgba(6,20,18,0.55) 0%, rgba(6,20,18,0.15) 45%, rgba(6,20,18,0.05) 100%)",
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
                fontSize: "11px",
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
            style={{ fontSize: "clamp(42px,6vw,96px)", maxWidth: "1100px" }}
          >
            <div className="overflow-hidden py-1">
              <div className="story-line">Every bite tells</div>
            </div>
            <div className="overflow-hidden py-1">
              <div className="story-line">a story of</div>
            </div>
            <div className="overflow-hidden py-1 italic text-[#D4860A]">
              <div className="story-line">craft, luxury,</div>
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
            className="story-sub max-w-[460px] font-light leading-[1.9] text-white opacity-0"
            style={{ fontSize: "16px" }}
          >
            Premium Belgian chocolate. Authentic Italian gelato.
            <br />A lounge built for moments that linger.
          </p>
        </div>
      </div>
    </section>
  );
}
