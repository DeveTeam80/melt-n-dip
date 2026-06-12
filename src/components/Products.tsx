"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Editorial Header Reveal (Masked Lines)
      gsap.fromTo(
        ".products-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".products-header", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".products-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".products-header", start: "top 75%" },
        },
      );

      // 2. Cinematic Card Unmasking (Clip-Path)
      gsap.fromTo(
        ".prod-wrap",
        { clipPath: "inset(20% 0% 20% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".products-grid", start: "top 75%" },
        },
      );

      // 3. Inner Image Reveal Scale
      gsap.fromTo(
        ".prod-bg",
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".products-grid", start: "top 75%" },
        },
      );

      // 4. Subtle Image Parallax on Scroll
      gsap.utils.toArray(".prod-bg").forEach((bg) => {
        const el = bg as Element;
        gsap.to(el, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Hover for the Arrow Button
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const products = [
    {
      img: "assets/melt-n-dip-crepe.jpg",
      tag: "Flagship Product",
      name: "The Melt N Dip Crepe",
      className: "lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[640px]",
      nameClass: "text-[32px] sm:text-[44px]",
    },
    {
      img: "assets/gelato.jpg",
      tag: "Authentic Italian",
      name: "Artisan Gelato",
      className: "min-h-[300px]",
      nameClass: "text-[24px]",
    },
    {
      img: "assets/dubai-chocolate-crepe.jpg",
      tag: "Viral Sensation",
      name: "Dubai Chocolate Crepe",
      className: "min-h-[300px]",
      nameClass: "text-[24px]",
    },
    {
      img: "assets/images/kunafa_crepe.jpeg",
      tag: "Cultural Favourite",
      name: "Kunafa Crepe",
      className: "min-h-[300px]",
      nameClass: "text-[24px]",
    },
    {
      img: "assets/images/products/brownieswaffle.png",
      tag: "100% Belgian",
      name: "Brownie Waffle",
      className: "min-h-[300px]",
      nameClass: "text-[24px]",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="products"
      className="py-16 px-8 sm:px-12 lg:px-20 bg-paper"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* ── HEADER ──────────────────────────────────────── */}
        <div className="products-header grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16 lg:mb-24">
          <div>
            <div
              className="products-fade-up flex items-center gap-4 mb-6 font-medium"
              style={{
                fontSize: "15px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-teal)",
              }}
            >
              <span className="w-8 h-px bg-teal/40" />
              Signature Offerings
            </div>
            <h2
              className="font-serif font-light text-ink tracking-tight flex flex-col gap-1"
              style={{ fontSize: "clamp(46px, 5.2vw, 76px)", lineHeight: "1.05" }}
            >
              <span className="overflow-hidden block py-1">
                <span className="products-reveal-line block">
                  An Experience You{" "}
                </span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="products-reveal-line block">
                  <em className="italic text-teal pr-2">Won&apos;t Forget</em>
                </span>
              </span>
            </h2>
          </div>
          <p className="products-fade-up font-sans font-normal text-teal leading-[1.85] text-[20px] max-w-[540px] pb-2">
            Every item on our menu is a deliberate choice, no fillers, no
            shortcuts. Premium ingredients, careful craft, and years of
            refinement.
          </p>
        </div>

        {/* ── MOSAIC GRID ─────────────────────────────────── */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 lg:h-[640px]">
          {products.map((p, i) => (
            <a
              href="#"
              key={i}
              className={`prod-wrap group relative overflow-hidden bg-bark hover-target cursor-none ${p.className}`}
            >
              {/* Parallax Image Wrapper (-15% top/bottom gives room for the scroll scrub to move the image) */}
              <div
                className="prod-bg absolute inset-x-0 inset-y-[-15%] bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                style={{ backgroundImage: `url('${p.img}')` }}
              />

              {/* Luxury Vignette/Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                <p className="text-[15px] tracking-[3px] uppercase text-cream/90 mb-3 font-medium">
                  {p.tag}
                </p>
                <p
                  className={`font-serif font-light text-cream tracking-[-0.01em] leading-[1.1] ${p.nameClass}`}
                >
                  {p.name}
                </p>
              </div>

              {/* Glassmorphic Magnetic Arrow */}
              <div
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 z-10"
              >
                <ArrowUpRight
                  className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
