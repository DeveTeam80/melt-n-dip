"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChefHat, Sparkles } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LiveStations() {
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });

      tl.fromTo(
        ".ls-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        },
      );
      tl.fromTo(
        ".ls-fade-up",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8",
      );

      gsap.fromTo(
        ".ls-image",
        { clipPath: "inset(15% 0% 15% 0%)", opacity: 0, filter: "blur(10px)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".ls-image", start: "top 80%" },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-36 px-8 sm:px-12 lg:px-20 bg-ink text-cream overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text Content */}
        <div className="flex flex-col items-start order-2 lg:order-1">
          <div className="ls-fade-up opacity-0 flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span
              className="text-[14px] font-medium tracking-[3.5px] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              We Cook. You Watch.{" "}
            </span>
          </div>

          <h2
            className="font-serif font-light text-paper tracking-tight flex flex-col gap-1 mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}
          >
            <span className="overflow-hidden block py-1">
              <span className="ls-reveal-line block opacity-0">
                Made Fresh,
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="ls-reveal-line block opacity-0">
                <em className="italic text-amber pr-2">Right There.</em>
              </span>
            </span>
          </h2>

          <p className="ls-fade-up opacity-0 font-light leading-[1.85] text-[15px] mb-10 max-w-[440px]">
            Elevate your event from a meal to a performance. Our chefs prepare
            fresh fettuccine crepes, hot Belgian waffles, and chocolate pours
            live in front of your guests.
          </p>

          <div className="ls-fade-up opacity-0 flex flex-col gap-6 w-full">
            {[
              {
                Icon: ChefHat,
                title: "Staffed by Professionals",
                desc: "Our trained culinary team handles setup, live cooking, and seamless service.",
              },
              {
                Icon: Sparkles,
                title: "Aromatic Atmosphere",
                desc: "Fill your venue with the scent of warm Belgian chocolate and freshly baked pastry.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-5 bg-white/5 border border-white/10 p-6 rounded-[3px]"
              >
                <div className="flex items-center justify-center rounded-full shrink-0 w-12 h-12 bg-teal border border-teal-pale/30">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-[21px] text-paper mb-1">
                    {title}
                  </p>
                  <p className="font-light text-[15px]  leading-[1.7]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="ls-image opacity-0 relative aspect-[4/5] rounded-[3px] overflow-hidden bg-bark order-1 lg:order-2 w-full">
          <div
            className="absolute inset-0 bg-cover bg-[center_top]"
            style={{ backgroundImage: "url('assets/images/photo-5.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-[13px] tracking-[2px] uppercase text-amber mb-2 font-medium">
              Add to any package
            </p>
            <p className="font-serif italic text-paper text-[24px]">
              Live Crepe & Waffle Bar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
