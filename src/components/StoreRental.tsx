"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function StoreRental() {
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sr-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".sr-fade-up",
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
      className="py-24 lg:pt-20 lg:pb-36 px-8 sm:px-12 lg:px-20 bg-ink text-cream"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col items-start">
          <div className="sr-fade-up opacity-0 flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span
              className="text-[14px] font-medium tracking-[3.5px] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              Private Hire
            </span>
          </div>

          <h2
            className="font-serif font-light text-paper tracking-tight flex flex-col gap-1 mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}
          >
            <span className="overflow-hidden block py-1">
              <span className="sr-reveal-line block opacity-0">
                Rent Our Store
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="sr-reveal-line block opacity-0">
                <em className="italic text-amber pr-2"> for Your Event.</em>
              </span>
            </span>
          </h2>

          <p className="sr-fade-up opacity-0 font-light text-paper leading-[1.85] text-[17px] mb-12 max-w-[440px]">
            The Palos Park Melt N Dip store, exclusively yours. Up to 60
            guests, full menu service, karaoke, sound system, and bespoke
            decoration packages available.
          </p>

          <div className="sr-fade-up opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
            {[
              { label: "Capacity", val: "60 guests maximum" },
              { label: "Hours", val: "12:00 noon – Midnight" },
              { label: "Peak (6:30–9:30pm)", val: "$2,000 food min (3hr)" },
              { label: "Off-Peak", val: "$1,500 food min (2hr)" },
              { label: "Gratuity", val: "20% added to all events" },
              { label: "Rental Line", val: "(630) 800-9292" },
            ].map(({ label, val }) => (
              <div key={label} className="border-l-2 border-teal-pale/20 pl-4">
                <p className="text-[14px] font-medium tracking-[2px] uppercase text-amber/90 mb-1.5">
                  {label}
                </p>
                <p className="text-[16px] font-light text-cream/90">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-6">
          <div className="sr-fade-up opacity-0 p-8 lg:p-10 rounded-[3px] bg-white/5 border border-white/10 w-full">
            <p className="text-[15px] font-medium tracking-[2.5px] uppercase text-amber mb-6">
              What &apos; s Included
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Exclusive use of the entire store",
                "Full Melt N Dip menu service",
                "Dedicated service staff",
                "Custom decorations permitted",
                "Sound system & TV connectivity",
                "Karaoke available (add-on)",
                "Decoration packages via our team",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <Check
                    className="w-4 h-4 text-amber shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-[16px] font-light ">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sr-fade-up opacity-0 p-8 rounded-[3px] bg-white/5 border border-white/10 w-full">
            <p className="text-[15px] font-medium tracking-[2.5px] uppercase text-amber mb-5">
              Perfect For
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Birthdays",
                "Graduations",
                "Book Clubs",
                "Anniversaries",
                "Engagement Parties",
                "Corporate Events",
                "Art Clubs",
              ].map((e) => (
                <span
                  key={e}
                  className="text-[15px] text-amber bg-teal-pale/10 border border-teal-pale/20 px-4 py-1.5 rounded-full"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
