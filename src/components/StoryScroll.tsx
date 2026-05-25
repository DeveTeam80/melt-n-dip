"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const INGREDIENTS = [
  "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600841774653-5557d3cbd59b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      /* Background gelato reveal */
      tl.fromTo(
        ".gelato-bg",
        {
          scale: 1.25,
          opacity: 0.4,
          filter: "brightness(0.45)",
        },
        {
          scale: 1.08,
          opacity: 1,
          filter: "brightness(0.78)",
          ease: "power1.out",
        },
        0,
      );

      /* Ingredient cards entrance */
      tl.fromTo(
        ".ingredient-card",
        {
          opacity: 0,
          y: 120,
          rotate: gsap.utils.wrap([-8, 8]),
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          stagger: 0.2,
          ease: "expo.out",
          duration: 1.4,
        },
        0.1,
      );

      /* Ingredient cards fly away */
      tl.to(
        ".ingredient-card",
        {
          opacity: 0,
          scale: 0.82,
          y: -320,
          rotate: gsap.utils.wrap([-10, 10]),
          stagger: 0.12,
          ease: "expo.inOut",
          duration: 1.6,
        },
        0.45,
      );

      /* Gelato image becomes hero */
      tl.fromTo(
        ".gelato-overlay",
        {
          opacity: 0.8,
        },
        {
          opacity: 0.25,
          ease: "none",
        },
        0.5,
      );

      /* Text animation */
      tl.fromTo(
        ".story-line",
        {
          opacity: 0,
          y: 70,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "expo.out",
          duration: 1.6,
        },
        0.58,
      );

      tl.fromTo(
        ".story-sub",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        0.82,
      );

      tl.fromTo(
        ".story-divider",
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          ease: "power2.out",
        },
        0.78,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#061412]"
      style={{ height: "450vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* FULLSCREEN GELATO IMAGE */}
        <div className="absolute inset-0 overflow-hidden">
          {/* IMAGE */}
          <div
            className="gelato-bg absolute inset-0 bg-cover bg-center bg-no-repeat  bg-black/2"
            style={{
              backgroundImage: "url('assets/images/catering/catering3.jpeg')",
              transform: "scale(1.08)",
            }}
          />

          {/* OVERLAY */}
          <div
            className="gelato-overlay absolute inset-0"
            style={{
              background: `
      linear-gradient(
        to top,
        rgba(6,20,18,0.94) 0%,
        rgba(6,20,18,0.72) 35%,
        rgba(6,20,18,0.52) 65%,
        rgba(6,20,18,0.38) 100%
      )
    `,
            }}
          />
        </div>

        {/* INGREDIENT IMAGES */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative h-full w-full max-w-[1400px]">
            {INGREDIENTS.map((src, i) => (
              <div
                key={i}
                className="ingredient-card absolute overflow-hidden rounded-[24px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
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
                    style={{
                      backgroundImage: `url(${src})`,
                    }}
                  />

                  {/* OVERLAY */}
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
            style={{
              fontSize: "clamp(42px,6vw,96px)",
              maxWidth: "1100px",
            }}
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
            style={{
              fontSize: "16px",
            }}
          >
            Premium Belgian chocolate. Authentic Italian gelato.
            <br />A lounge built for moments that linger.
          </p>
        </div>
      </div>
    </section>
  );
}
