"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".about-left-container", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".about-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".about-left-container", start: "top 65%" },
        }
      );
      gsap.fromTo(
        ".about-img-wrap",
        { clipPath: "inset(15% 0% 15% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, stagger: 0.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-right-container", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".about-img-inner",
        { scale: 1.2 },
        {
          scale: 1, duration: 1.5, stagger: 0.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-right-container", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".stat-divider",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-stats-grid", start: "top 80%" },
        }
      );
      gsap.to(".about-parallax-up", {
        yPercent: -10, ease: "none",
        scrollTrigger: { trigger: ".about-right-container", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".about-parallax-down", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: ".about-right-container", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.4, y: (e.clientY - rect.top - rect.height / 2) * 0.4, duration: 0.4, ease: "power2.out" });
  };
  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });

  const stats = [
    { num: "7", sup: "mi", label: "Radius served" },
    { num: "100", sup: "%", label: "Belgian chocolate" },
    { num: "2025", sup: "", label: "Established in Palos Park" },
  ];

  return (
    <section ref={containerRef} id="about" className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-paper" style={{ minHeight: "90vh" }}>

      {/* ── LEFT PANEL ──────────────────────────────── */}
      <div className="about-left-container flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">

        <div className="about-fade-up section-eyebrow">
          <span style={{
            fontSize: "12px",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: "var(--color-teal)",
          }}>
          Our Story</span></div>

        <h2 className="font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-8" style={{ fontSize: "clamp(38px, 4.2vw, 64px)", lineHeight: "1.05" }}>
          <span className="overflow-hidden block py-1">
            <span className="about-reveal-line block">Where Every Bite</span>
          </span>
          <span className="overflow-hidden block py-1">
            <span className="about-reveal-line block">Takes You to Your</span>
          </span>
          <span className="overflow-hidden block py-1">
            <span className="about-reveal-line block">
              <em className="italic text-teal pr-2">Happy Place</em>
            </span>
          </span>
        </h2>

        {/* Real origin story from client */}
        <p className="about-fade-up font-sans font-normal text-taupe leading-[1.85] mb-12 max-w-[440px] text-[15px]">
          A group of friends from diverse professional backgrounds came together
          with a shared belief, that dessert should do more than taste good.
          It should{" "}
          <em className="italic text-umber font-serif text-[17px] font-bold">Satisfy Your Spirit</em>.
          In Melt &amp; Dip, they found a brand that matched that vision, and together founded Delight Enterprises LLC to bring unique, joyful flavours and unforgettable experiences to every guest.
        </p>

        {/* Stats */}
        <div className="about-stats-grid about-fade-up flex justify-between max-w-[430px]">
          {stats.map(({ num, sup, label }, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col py-2 px-4 sm:px-6">
                <div className="font-serif font-light text-ink leading-none mb-2"
                  style={{ fontSize: num.length >= 4 ? "32px" : "42px", letterSpacing: "-0.03em" }}>
                  {num}
                  <em className="font-serif italic text-[18px] text-teal ml-0.5">{sup}</em>
                </div>
                <div className="uppercase text-taupe font-bold tracking-[2px] text-[9px]">{label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="stat-divider w-px h-12 bg-linen origin-top" />
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="about-fade-up flex flex-wrap items-center gap-8 mt-16">
          <a
            href="/catering"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="cta-primary hover-target w-[200px] h-[50px] flex items-center justify-center text-[10px]"
          >
            View Catering
          </a>
          <a
            href="#quote"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="group flex items-center gap-2 text-[10px] tracking-[2.5px] uppercase text-teal hover-target"
          >
            <span className="relative overflow-hidden pb-1">
              Book an Event
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-teal origin-right transform scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0" />
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────── */}
      <div className="about-right-container relative flex flex-col min-h-[500px] lg:min-h-full bg-parchment gap-1">
        <div className="about-img-wrap relative overflow-hidden flex-[1.2]">
          <div className="about-img-inner about-parallax-up absolute inset-[-15%] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/store-exterior-night.jpg')" }} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-parchment/60 to-transparent pointer-events-none" />
        </div>
        <div className="about-img-wrap relative overflow-hidden flex-[0.8]">
          <div className="about-img-inner about-parallax-down absolute inset-[-15%] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/store-interior.jpg')", backgroundPosition: "center right" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 right-8 text-right z-10">
            <p className="font-serif italic text-[12px] text-cream/80 tracking-[0.02em]">Palos Park Lounge</p>
            <p className="font-sans text-[8px] uppercase tracking-[2px] text-cream/40 mt-1">13030 LaGrange Rd</p>
          </div>
        </div>
        <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-teal-pale/50 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}