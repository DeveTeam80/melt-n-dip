"use client";

import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutStore() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".store-fade", { opacity: 0, y: 30 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.to(".store-fade", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".store-bg", {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const mg = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const ml = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  return (
    <section
      ref={containerRef}
      id="store"
      className="relative overflow-hidden min-h-[450px] sm:min-h-[500px] flex items-center py-16 px-8 sm:px-12 lg:px-20"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="store-bg absolute inset-[-10%] bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/store-exterior-night.jpg')",
            transform: "scale(1.1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,42,39,0.85)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="max-w-[560px]">
          <div className="store-fade flex items-center gap-3 mb-6">
            <span
              className="w-8 h-[2px] shrink-0"
              style={{ background: "#b98e3b" }}
            />
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#b98e3b",
                fontWeight: 600,
              }}
            >
              Visit Our Store
            </span>
          </div>

          <h2
            className="store-fade font-serif mb-6"
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: "1.1",
              color: "#ffffff",
              fontWeight: 300,
            }}
          >
            Melt N Dip{" "}
            <em className="italic" style={{ color: "#b98e3b" }}>
              Palos Park, Illinois
            </em>
          </h2>

          <p
            className="store-fade font-sans mb-8 leading-[1.8]"
            style={{
              fontSize: "18px",
              color: "#e6f0f1",
              fontWeight: 400,
              maxWidth: "480px",
            }}
          >
            The heart of everything we cater. Visit us at 13030 Lagrange Road to
            taste the quality that makes every event unforgettable.
          </p>

          {/* Info rows */}
          <div className="store-fade flex flex-col gap-3 mb-10">
            <div className="flex items-center gap-3">
              <MapPin
                className="w-5 h-5 shrink-0"
                style={{ color: "#b98e3b" }}
                strokeWidth={1.5}
              />
              <span
                style={{ fontSize: "17px", color: "#ffffff", fontWeight: 400 }}
              >
                13030 Lagrange Rd, Palos Park, IL 60464
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock
                className="w-5 h-5 shrink-0"
                style={{ color: "#b98e3b" }}
                strokeWidth={1.5}
              />
              <span
                style={{ fontSize: "17px", color: "#ffffff", fontWeight: 400 }}
              >
                Mon–Sat: 11am–9pm &nbsp;·&nbsp; Sun: 12pm–8pm
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                className="w-5 h-5 shrink-0"
                style={{ color: "#b98e3b" }}
                strokeWidth={1.5}
              />
              <span
                style={{ fontSize: "17px", color: "#ffffff", fontWeight: 400 }}
              >
                (312) 497-3697
              </span>
            </div>
          </div>

          <div className="store-fade">
            <a
              href="/melt-n-dip-palos-park"
              onMouseMove={mg}
              onMouseLeave={ml}
              className="hover-target inline-flex items-center gap-2"
              style={{
                height: "54px",
                padding: "0 40px",
                fontSize: "14px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#ffffff",
                background: "#08636b",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Explore Melt N Dip
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
