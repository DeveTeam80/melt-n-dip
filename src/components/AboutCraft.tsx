"use client";

import { useEffect, useRef } from "react";
import { Flame, IceCream, Sparkles, Cookie } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const OFFERINGS = [
  {
    title: "Belgian Chocolate Fountains",
    description:
      "Flowing Belgian chocolate that serves as the centerpiece of your event. A showstopper your guests will love.",
    Icon: Flame,
    image: "/assets/images/MD-fountain_crop.webp",
  },
  {
    title: "Artisan Gelato Carts",
    description:
      "Creamy, authentic gelato served fresh from our mobile cart. Available in multiple flavors for any occasion.",
    Icon: IceCream,
    image: "/assets/gelato.jpg",
  },
  {
    title: "Live Crepe Stations",
    description:
      "Made-to-order crepes prepared on-site by our chefs. Your guests watch as their desserts are crafted fresh.",
    Icon: Sparkles,
    image: "/assets/melt-n-dip-crepe.jpg",
  },
  {
    title: "Custom Dessert Tables",
    description:
      "Curated dessert spreads with pastries, platters, and sweets designed to match your event theme and preferences.",
    Icon: Cookie,
    image: "/assets/images/festive_dessert_station.png",
  },
];

export default function AboutCraft() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".craft-title", { opacity: 0, y: 30 });
      gsap.set(".craft-card", { opacity: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      tl.to(".craft-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      tl.to(
        ".craft-card",
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" },
        0.2,
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="craft"
      className="py-16 sm:py-20 lg:py-28 px-8 sm:px-12 lg:px-20"
      style={{ background: "#f8faf9" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header — unchanged */}
        <div className="craft-title text-center mb-12 sm:mb-16">
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#08636b",
              fontWeight: 600,
            }}
          >
            What We Cater
          </span>
          <h2
            className="font-serif mt-3"
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: "1.1",
              color: "#0d2a27",
              fontWeight: 300,
            }}
          >
            The Full Melt N Dip{" "}
            <em className="italic" style={{ color: "#08636b" }}>
              Experience
            </em>
          </h2>
        </div>

        {/* ── Card grid ──
            mobile (< sm):   1 col, flex-row (image left, text right) — unchanged
            tablet (sm–lg):  2 col, flex-col (image top, text below) — fixes iPad Pro portrait
            desktop (lg+):   2 col, flex-row (image left, text right) — unchanged
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {OFFERINGS.map(({ title, description, Icon, image }, i) => (
            <div
              key={i}
              className="craft-card flex flex-row sm:flex-col lg:flex-row"
              style={{
                background: "#ffffff",
                border: "1px solid #d8edea",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              {/* Image
                  mobile:  w-[180px] fixed, h-auto  (original)
                  tablet:  w-full, h-[200px]         (top banner)
                  desktop: w-[260px], h-auto          (original)
              */}
              <div
                className="
                  shrink-0 bg-cover bg-center
                  w-[180px] h-auto
                  sm:w-full sm:h-[200px]
                  lg:w-[260px] lg:h-auto
                "
                style={{ backgroundImage: `url('${image}')` }}
              />

              {/* Content — padding is fine on all breakpoints now since text has full width on tablet */}
              <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0"
                    style={{ background: "#e6f0f1" }}
                  >
                    <Icon
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                      style={{ color: "#08636b" }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      color: "#0d2a27",
                      fontWeight: 500,
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#1c4a45",
                    lineHeight: "1.8",
                    fontWeight: 400,
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag — unchanged */}
        <div className="craft-title text-center mt-8 sm:mt-10">
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#6fa39d",
              fontWeight: 500,
            }}
          >
            100% Belgian Chocolate · Artisan Gelato · Halal Menu
          </span>
        </div>
      </div>
    </section>
  );
}
