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
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-left-container", start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".about-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-left-container", start: "top 65%" },
        },
      );
      gsap.fromTo(
        ".about-img-wrap",
        { clipPath: "inset(15% 0% 15% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-right-container",
            start: "top 75%",
          },
        },
      );
      gsap.fromTo(
        ".about-img-inner",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-right-container",
            start: "top 75%",
          },
        },
      );
      gsap.fromTo(
        ".stat-divider",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-stats-grid", start: "top 80%" },
        },
      );
      gsap.to(".about-parallax-up", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-right-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".about-parallax-down", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-right-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.4,
      y: (e.clientY - rect.top - rect.height / 2) * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  const stats = [
    // { num: "7", sup: "mi", label: "Radius served" },
    { num: "100", sup: "%", label: "Belgian chocolate" },
    { num: "2025", sup: "", label: "Established in Palos Park" },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-paper"
      style={{ minHeight: "90vh" }}
    >
      {/* ── LEFT PANEL ──────────────────────────────── */}
      <div className="about-left-container flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-32">
        <div className="w-full max-w-[480px] lg:ml-auto">
          <div className="about-fade-up flex items-center gap-3 mb-5">
            <span
              className="w-6 h-px shrink-0"
              style={{ background: "var(--color-teal-pale)" }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-teal)",
                fontWeight: 500,
              }}
            >
              Our Story
            </span>
          </div>
          <h2
            className="font-serif font-light text-ink flex flex-col gap-1 mb-8"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: "1.07",
              letterSpacing: "-0.025em",
            }}
          >
            {/* lineHeight: "1.05" */}
            <span className="overflow-hidden block py-1">
              <span className="about-reveal-line block">
                A Sanctuary of Sweetness,
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="about-reveal-line block">
                <em className="italic text-teal pr-2">
                  Wherever You Celebrate
                </em>
              </span>
            </span>
            {/* <span className="overflow-hidden block py-1">
              <span className="about-reveal-line block">Takes You to Your</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="about-reveal-line block">
                <em className="italic text-teal pr-2">Happy Place</em>
              </span>
            </span> */}
          </h2>

          {/* Real origin story from client */}
          <p className="about-fade-up font-sans font-normal text-teal leading-[1.85] mb-12 max-w-[440px] text-[17px]">
            We believe dessert should do more than just taste good—it should{" "}
            <em className="italic text-umber font-serif text-[17px] font-bold">
              Satisfy Your Spirit
            </em>
            . Delight Enterprises LLC was founded to bring that exact feeling to
            your special events. As a premier dessert catering company, we
            meticulously craft luxury dessert tables, live catering stations,
            and custom platters to bring joy to every celebration.
          </p>

          {/* Stats */}
          <div className="about-stats-grid about-fade-up flex justify-between max-w-[430px]">
            {stats.map(({ num, sup, label }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col py-2 px-4 sm:px-6">
                  <div
                    className="font-light text-ink leading-none mb-2"
                    style={{
                      fontSize: num.length >= 4 ? "32px" : "42px",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {num}
                    <em className=" italic text-[18px] text-teal ml-0.5">
                      {sup}
                    </em>
                  </div>
                  <div className="uppercase text-teal font-bold tracking-[2px] text-[9px]">
                    {label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="stat-divider w-px h-12 bg-linen origin-top" />
                )}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="about-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-12 sm:mt-16 w-full sm:w-auto">
            <a
              href="/catering"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="cta-primary hover-target w-full sm:w-[250px] h-[50px] flex items-center justify-center text-[13px]"
            >
              View Catering
            </a>
            <a
              href="#quote"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="group flex items-center justify-center sm:justify-start gap-2 text-[13px] tracking-[2.5px] uppercase text-teal hover-target w-full sm:w-auto py-3 sm:py-0"
            >
              <span className="relative overflow-hidden pb-1">
                Book an Event
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-teal origin-right transform scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0" />
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────── */}
      <div className="about-right-container relative grid grid-rows-[auto_1fr] w-full min-h-[500px] lg:min-h-0 bg-parchment gap-1">
        <div className="about-img-wrap relative overflow-hidden w-full aspect-[16/9]">
          <div
            className="about-img-inner absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/catering-event-guests.png')",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-parchment/60 to-transparent pointer-events-none" />
        </div>
        <div className="about-img-wrap relative overflow-hidden">
          <div
            className="about-img-inner about-parallax-down absolute inset-[-15%] bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/melt-n-dip-inside.webp')",
              backgroundPosition: "center right",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent pointer-events-none" />
        </div>
        <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-teal-pale/50 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}
