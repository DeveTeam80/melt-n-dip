"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EVENTS = [
  {
    id: "wedding",
    title: "Weddings & Nikah",
    subtitle:
      "Elegant chocolate display and seasonal fruits served in a cup.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    subtitle:
      "Impress clients and reward teams with a branded, high-end dessert experience.",
    img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "social",
    title: "Social Gatherings",
    subtitle:
      "Birthdays, baby showers, and holiday parties elevated with authentic gelato and desserts.",
    img: "https://images.unsplash.com/photo-1530103862676-de8892bf309c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function EventTypes() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeEvent, setActiveEvent] = useState(EVENTS[0]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".et-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-40 overflow-hidden bg-bark min-h-[800px] flex items-center"
    >
      {/* Dynamic Backgrounds */}
      {EVENTS.map((ev) => (
        <div
          key={ev.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${ev.img}')`,
            opacity: activeEvent.id === ev.id ? 0.4 : 0,
            zIndex: activeEvent.id === ev.id ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 z-10 bg-ink/70 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20">
        <div className="ls-fade-up flex items-center gap-3 mb-6">
          {" "}
          <div className="w-8 h-px bg-amber" />
          <span className="text-[9px] font-medium tracking-[4px] uppercase text-amber">
            Tailored For You
          </span>
        </div>

        <div className="flex flex-col">
          {EVENTS.map((ev) => (
            <div
              key={ev.id}
              onMouseEnter={() => setActiveEvent(ev)}
              className="et-fade opacity-0 group flex flex-col justify-center py-8 lg:py-10 border-t border-white/10 hover-target cursor-none transition-colors duration-500 hover:border-teal-pale/50"
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-serif font-light transition-all duration-500 ${activeEvent.id === ev.id ? "text-amber translate-x-4" : "text-white"}`}
                  style={{
                    fontSize: "clamp(40px, 5vw, 72px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ev.title}
                </h3>
                <ArrowUpRight
                  className={`w-8 h-8 transition-all duration-500 ${activeEvent.id === ev.id ? "opacity-100 text-amber translate-x-0" : "opacity-0 -translate-x-4"}`}
                  strokeWidth={1}
                />
              </div>

              {/* Expanding Description */}
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeEvent.id === ev.id ? "grid-rows-[1fr] opacity-100 mt-4 translate-x-4" : "grid-rows-[0fr] opacity-0 mt-0 translate-x-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="font-light text-paper text-[15px] max-w-[400px] leading-[1.8]">
                    {ev.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
