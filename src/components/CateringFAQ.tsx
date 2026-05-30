"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { FAQS } from "./data";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CateringFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".faq-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onMagMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onMagLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  return (
    <section
      ref={containerRef}
      className="pt-24 lg:pt-36 px-8 sm:px-12 lg:px-20 bg-paper border-t border-linen"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
        {/* ── LEFT - STICKY HEADER ── */}
        <div className="faq-header lg:sticky lg:top-32 self-start flex flex-col items-start">
          <div className="reveal-fade flex items-center gap-3 mb-6">
            <span
              className="w-6 h-px shrink-0"
              style={{ background: "var(--color-teal-pale)" }}
            />
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-teal)",
              }}
            >
              FAQ
            </span>
          </div>
          <h2
            className="font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}
          >
            Common <em className="italic text-teal pr-2">Questions</em>
          </h2>
          <p className="font-normal text-teal text-[16px] leading-[1.85] max-w-[280px]">
            Can &apos;t find what you &apos;re looking for? Call us directly.
          </p>
          <a
            href="tel:+17086088982"
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            className="hover-target inline-flex items-center gap-2 mt-8 text-[15px] text-teal hover:text-teal-rich transition-colors font-medium"
          >
            (708) 608-8982
          </a>

          <div className="mt-20 font-serif font-light select-none pointer-events-none hidden lg:block text-[140px] text-amber/20 leading-none tracking-[-0.05em]">
            {FAQS.length.toString().padStart(2, "0")}
          </div>
        </div>

        {/* ── RIGHT - ACCORDION ── */}
        <div className="border-t border-linen">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="faq-row opacity-0 border-b border-linen overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left py-6 hover-target group"
                >
                  <div className="flex items-start gap-6 pr-8">
                    <span
                      className={`font-serif font-normal text-[15px] mt-1 shrink-0 transition-colors duration-300 ${isOpen ? "text-amber" : "text-teal"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif font-medium text-[22px] tracking-[-0.01em] leading-[1.3] transition-colors duration-300 ${isOpen ? "text-teal" : "text-ink group-hover:text-teal"}`}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-teal bg-teal" : "border-linen bg-white group-hover:border-teal-pale group-hover:bg-teal-faint"}`}
                  >
                    <Plus
                      className={`w-4 h-4 transition-all duration-500 ${isOpen ? "text-white rotate-45" : "text-teal rotate-0"}`}
                      strokeWidth={2}
                    />
                  </div>
                </button>
                {/* CSS GRID ACCORDION (No JS measurement needed) */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[16px] font-light text-teal leading-[1.9] pb-8 pl-[46px] pr-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
