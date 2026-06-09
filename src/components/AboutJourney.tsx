"use client";

import { useEffect, useRef } from "react";
import { Store, Truck, PartyPopper } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const STEPS = [
  {
    number: "01",
    Icon: Store,
    title: "Melt N Dip Creates",
    description: "Every dessert starts at our Palos Park, Illinois store. We use premium Belgian chocolate, artisan gelato, and the finest halal ingredients to craft every item by hand.",
  },
  {
    number: "02",
    Icon: Truck,
    title: "We Cater It",
    description: "Delight Enterprises brings those same store-quality desserts to your wedding, party, or corporate event. We handle setup and service so you can enjoy your celebration.",
  },
  {
    number: "03",
    Icon: PartyPopper,
    title: "You Celebrate",
    description: "Your guests enjoy the full Melt N Dip experience — chocolate fountains, gelato carts, live crepe stations, and custom dessert tables — at your venue.",
  },
];

export default function AboutJourney() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".journ-title", { opacity: 0, y: 30 });
      gsap.set(".journ-card", { opacity: 0, y: 40 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play none none none" } });
      tl.to(".journ-title", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      tl.to(".journ-card", { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }, 0.2);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="py-16 sm:py-20 lg:py-28 px-8 sm:px-12 lg:px-20" style={{ background: "#f8faf9" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="journ-title text-center mb-12 sm:mb-16">
          <span style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#08636b", fontWeight: 600 }}>How It Works</span>
          <h2 className="font-serif mt-3" style={{ fontSize: "clamp(30px, 4vw, 56px)", lineHeight: "1.1", color: "#0d2a27", fontWeight: 300 }}>
            From Our Store <em className="italic" style={{ color: "#08636b" }}>to Your Event</em>
          </h2>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {STEPS.map(({ number, Icon, title, description }, i) => (
            <div key={i} className="journ-card py-7 px-6 sm:py-9 sm:px-8" style={{ background: "#ffffff", border: "1px solid #d8edea", borderRadius: "2px" }}>
              <div className="flex items-center gap-4 mb-4">
                <span style={{ fontSize: "26px", fontWeight: 600, color: "#b98e3b", fontFamily: "var(--font-serif)", lineHeight: 1 }}>{number}</span>
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0" style={{ background: "#e6f0f1" }}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#08636b" }} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif mb-3" style={{ fontSize: "20px", color: "#0d2a27", fontWeight: 500 }}>{title}</h3>
              <p className="font-sans leading-[1.8]" style={{ fontSize: "16px", color: "#1c4a45", fontWeight: 400 }}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
