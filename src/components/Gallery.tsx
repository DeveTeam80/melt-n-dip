"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const IMAGES = [
  "/assets/images/Photo-1.png",
  "/assets/images/Photo-2.png",
  "/assets/images/Photo-3.png",
  "/assets/images/Photo-4.png",
  "/assets/images/Photo-5.png",
  "/assets/images/Photo-6.png",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // Calculate how far to move left based on total width minus viewport width
      const getScrollAmount = () => -(scrollEl.scrollWidth - window.innerWidth);

      gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollEl.scrollWidth}`,
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculates on resize
        },
      });

      // Simple fade up for the title
      gsap.fromTo(
        ".gal-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper overflow-hidden h-screen flex flex-col justify-center"
    >
      <div className="absolute top-12 md:top-24 left-8 sm:left-12 lg:left-20 z-10">
        <h2
          className="gal-title opacity-0 font-serif font-light text-ink tracking-tight flex items-center gap-6"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          A Taste of <em className="italic text-teal">Delight</em>
          <div className="w-16 h-px bg-teal-pale hidden md:block" />
        </h2>
      </div>

      {/* The Horizontal Scrolling Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 lg:gap-10 px-8 sm:px-12 lg:px-20 mt-16 lg:mt-24 h-[50vh] min-h-[400px]"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="relative h-full shrink-0 rounded-[3px] overflow-hidden group hover-target cursor-none"
            style={{
              width: i % 2 === 0 ? "35vw" : "25vw",
              minWidth: "280px",
              maxWidth: "600px",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              style={{ backgroundImage: `url('${img}')` }}
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
        ))}
      </div>

      {/* <div className="absolute bottom-8 left-8 sm:left-12 lg:left-20 z-10 flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-[3px] font-medium text-teal/80">Scroll to Explore</span>
                <div className="w-12 h-px bg-linen" />
            </div> */}
    </section>
  );
}
