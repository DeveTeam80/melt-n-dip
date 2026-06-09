"use client";

import { useEffect, useRef } from "react";
import { Target, Zap, Crown, Scale, TrendingUp, Smile, Users } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const DELIGHT = [
  { letter: "D", title: "Dedication", Icon: Target, description: "Commit to quality, service, and teamwork in every task. No detail is too small when creating the perfect experience." },
  { letter: "E", title: "Energy", Icon: Zap, description: "Bring positivity and enthusiasm into every interaction. Your energy shapes the atmosphere." },
  { letter: "L", title: "Leadership", Icon: Crown, description: "Lead by example, inspire others, and take initiative. Every team member can make a difference." },
  { letter: "I", title: "Integrity", Icon: Scale, description: "Be honest, respectful, and fair in every action. Trust is the foundation of everything we build." },
  { letter: "G", title: "Growth", Icon: TrendingUp, description: "Embrace learning, adapt to change, and seek improvement. We grow as individuals and as a team." },
  { letter: "H", title: "Happiness", Icon: Smile, description: "Spread joy, make guests feel valued, and celebrate little moments. Happiness is the way we work." },
  { letter: "T", title: "Teamwork", Icon: Users, description: "Support each other and work together like family. Everyone shares the responsibility of a great guest experience." },
];

export default function AboutDelight() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".delight-title", { opacity: 0, y: 30 });
      gsap.set(".delight-card", { opacity: 0, y: 40 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play none none none" } });
      tl.to(".delight-title", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      tl.to(".delight-card", { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, 0.2);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="delight" className="py-16 sm:py-20 lg:py-28 px-8 sm:px-12 lg:px-20" style={{ background: "#0d2a27" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="delight-title text-center mb-12 sm:mb-16">
          <span style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#b98e3b", fontWeight: 600 }}>Our Operating Principles</span>
          <h2 className="font-serif mt-3" style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: "1.1", color: "#ffffff", fontWeight: 300 }}>
            The <span style={{ color: "#b98e3b", fontStyle: "italic" }}>DELIGHT</span> Way
          </h2>
          <p className="font-sans mt-4 mx-auto" style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "520px", fontWeight: 400 }}>
            Seven principles that guide how we serve our guests and work with each other.
          </p>
        </div>

        {/* Card grid — 4 on top, 3 on bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-4 md:mb-5">
          {DELIGHT.slice(0, 4).map(({ letter, title, Icon, description }) => (
            <div key={title} className="delight-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "24px" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: "rgba(185,142,59,0.15)", border: "1px solid rgba(185,142,59,0.3)" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#b98e3b", fontFamily: "var(--font-serif)" }}>{letter}</span>
                </div>
                <h3 style={{ fontSize: "18px", color: "#ffffff", fontWeight: 500, fontFamily: "var(--font-serif)" }}>{title}</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#ffffff", lineHeight: "1.7", fontWeight: 400 }}>{description}</p>
            </div>
          ))}
        </div>

        {/* Last 3 — centered row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[900px] mx-auto">
          {DELIGHT.slice(4).map(({ letter, title, Icon, description }) => (
            <div key={title} className="delight-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "24px" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: "rgba(185,142,59,0.15)", border: "1px solid rgba(185,142,59,0.3)" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#b98e3b", fontFamily: "var(--font-serif)" }}>{letter}</span>
                </div>
                <h3 style={{ fontSize: "18px", color: "#ffffff", fontWeight: 500, fontFamily: "var(--font-serif)" }}>{title}</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#ffffff", lineHeight: "1.7", fontWeight: 400 }}>{description}</p>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="delight-title text-center mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="font-serif" style={{ fontSize: "20px", color: "#ffffff", fontWeight: 400, lineHeight: "1.4" }}>
            &ldquo;Hard work and living our values are celebrated here.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
