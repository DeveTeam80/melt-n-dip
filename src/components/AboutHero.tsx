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
        gsap.to(imgRef.current, { yPercent: 4, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true } });
      }, containerRef);
    });
    return () => ctx?.revert();
  }, []);

  const mg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.38, y: (e.clientY - r.top - r.height / 2) * 0.38, duration: 0.4, ease: "power2.out" });
  };
  const ml = (e: React.MouseEvent<HTMLButtonElement>) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.3)" });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={containerRef} className="relative flex flex-col lg:flex-row w-full overflow-y-auto overflow-x-hidden" style={{ height: "100svh", minHeight: "680px", maxHeight: "1000px", background: "#0d2a27" }}>
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col h-full px-8 sm:px-12 xl:px-20 pt-24 sm:pt-24 lg:pt-36 pb-8 sm:pb-10 lg:pb-12">
        {/* Content - centered in available space */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-start w-full max-w-[560px]">
            <h1 className="font-serif font-light flex flex-col mb-5" style={{ fontSize: "clamp(34px, 5.5vw, 86px)", lineHeight: "1.05", letterSpacing: "-0.03em", gap: "2px", color: "#ffffff" }}>
              <span className="block">
                <span className="about-h-line block">Bringing the <em className="italic" style={{ color: "#b98e3b" }}>Store</em></span>
              </span>
              <span className="block">
                <span className="about-h-line block">to Your Celebration</span>
              </span>
            </h1>
            <div className="about-h-fade w-16 h-[2px] mb-6" style={{ background: "#b98e3b" }} />
            <p className="about-h-fade font-sans mb-0 leading-[1.8]" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", maxWidth: "480px", color: "#e6f0f1", fontWeight: 400 }}>
              Delight Enterprises LLC caters the premium flavors of our Melt N Dip store in Palos Park, Illinois. From halal Belgian chocolate fountains and artisan gelato to live crepe stations and custom dessert tables, we make your wedding or event unforgettable.
            </p>
          </div>
        </div>
        {/* Buttons - always visible at the bottom */}
        <div className="about-h-fade flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-8 w-full sm:w-auto mt-6 sm:mt-8">
          <button onMouseMove={mg} onMouseLeave={ml} onClick={() => scrollTo("journey")} className="hover-target" style={{ height: "54px", padding: "0 40px", fontSize: "14px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#ffffff", background: "#08636b", border: "none", borderRadius: "2px", cursor: "pointer" }}>
            How It Works
          </button>
          <button onMouseMove={mg} onMouseLeave={ml} onClick={() => scrollTo("craft")} className="group flex items-center justify-center sm:justify-start gap-2 hover-target shrink-0 w-full sm:w-auto py-3 sm:py-0" style={{ fontSize: "14px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#ffffff", background: "none", border: "none", cursor: "pointer" }}>
            <span className="relative" style={{ paddingBottom: "3px" }}>
              What We Cater
              <span className="absolute bottom-0 left-0 w-full" style={{ height: "2px", background: "rgba(255,255,255,0.5)" }} />
            </span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 lg:relative lg:inset-auto lg:w-[55%] lg:h-full overflow-hidden z-0" style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}>
        <div ref={imgRef} className="absolute bg-cover" style={{ inset: "0%", backgroundImage: "url('/assets/images/melt-n-dip-inside.webp')", backgroundPosition: "center" }} />
        <div className="absolute inset-0 lg:hidden z-10" style={{ background: "rgba(13,42,39,0.6)" }} />
      </div>
    </section>
  );
}
