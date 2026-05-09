"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Users, Truck, Clock } from "lucide-react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function FoodTruck() {
    const containerRef = useRef<HTMLElement>(null);

    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".ft-reveal-line",
                { y: "120%", rotate: 2, opacity: 0 },
                { y: "0%", rotate: 0, opacity: 1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
            );
            gsap.fromTo(
                ".ft-card",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 lg:py-32 px-8 sm:px-12 lg:px-20 bg-paper">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-14">
                    <div className="ft-card opacity-0 section-eyebrow">
                        <span style={{
                            fontSize: "11px",
                            letterSpacing: "3.5px",
                            textTransform: "uppercase",
                            color: "var(--color-teal)",
                        }}>Mobile Catering</span>
                    </div>
                    <h2 className="font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-6" style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}>
                        <span className="overflow-hidden block py-1"><span className="ft-reveal-line block opacity-0">We Come <em className="italic text-teal pr-2">to You</em></span></span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                        { Icon: Users, label: "Minimum spend", val: "$1,500 food spend (excl. labor & tax)" },
                        { Icon: Truck, label: "Travel billing", val: "$50/hr (2 staff) · $75/hr (3 staff)" },
                        { Icon: Clock, label: "Service window", val: "3 hours · Extra time: $20/server per 30 min" },
                    ].map(({ Icon, label, val }) => (
                        <div key={label} className="ft-card opacity-0 p-8 rounded-[3px] bg-white border border-linen hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(26,122,110,0.06)] transition-all duration-[400ms] ease-out">
                            <div className="flex items-center justify-center rounded-full mb-6 w-11 h-11 bg-teal-faint border border-teal-pale">
                                <Icon className="w-4 h-4 text-teal" strokeWidth={1.5} />
                            </div>
                            <p className="text-[14px] font-medium tracking-[2px] uppercase text-teal mb-2">{label}</p>
                            <p className="text-[16px] font-light text-ink leading-[1.6]">{val}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}