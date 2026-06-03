"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  { text: "Authentic Gelato", accent: true },
  { text: "Premium Belgian Chocolate", accent: false },
  { text: "Melt-n-Dip Crepe", accent: true },
  { text: "Dubai Chocolate Crepe", accent: false },
  { text: "Kunafa Bites", accent: true },
  { text: "Halal", accent: false },
  { text: "Catering & Events", accent: true },
  { text: "Food Truck Available", accent: false },
  { text: "Private Venue Hire", accent: true },
];

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause on hover - premium detail
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // GSAP ticker animation
    const anim = gsap.to(track, {
      xPercent: -50,
      duration: 36,
      ease: "none",
      repeat: -1,
    });

    // timeScale must be set on the animation instance, not via gsap.to()
    const pause = () =>
      gsap.to(anim, { timeScale: 0, duration: 0.6, ease: "power2.out" });
    const resume = () =>
      gsap.to(anim, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      anim.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Doubled items for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "var(--color-ink)",
        borderTop: "1px solid rgba(168,216,212,0.08)",
        borderBottom: "1px solid rgba(168,216,212,0.08)",
      }}
      aria-hidden="true"
    >
      {/* Fade edges - left and right vignette */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none w-24"
        style={{
          background:
            "linear-gradient(to right, var(--color-ink) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none w-24"
        style={{
          background:
            "linear-gradient(to left, var(--color-ink) 0%, transparent 100%)",
        }}
      />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            {/* Separator diamond - SVG guaranteed across browsers */}
            <svg
              className="shrink-0 mx-8"
              width="5"
              height="5"
              viewBox="0 0 5 5"
              style={{ flexShrink: 0 }}
            >
              <rect
                x="0.5"
                y="0.5"
                width="4"
                height="4"
                rx="0.5"
                transform="rotate(45 2.5 2.5)"
                fill={
                  item.accent ? "var(--color-amber-vibrant)" : "rgba(168,216,212,0.2)"
                }
              />
            </svg>

            {/* Text */}
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                fontWeight: 400,
                color: item.accent ? "var(--color-amber-vibrant)" : "white",
                transition: "color 0.3s",
                paddingTop: "14px",
                paddingBottom: "14px",
                display: "inline-block",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
