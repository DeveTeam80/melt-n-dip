"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
    setIsLoading: (loading: boolean) => void;
}

export default function Preloader({ setIsLoading }: PreloaderProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const panelLeftRef = useRef<HTMLDivElement>(null);
    const panelRgtRef = useRef<HTMLDivElement>(null);
    const dripLineRef = useRef<HTMLDivElement>(null);
    const dripHeadRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);

    const [count, setCount] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = "";
                    setIsLoading(false);
                },
            });

            // ── PHASE 1: Panels already cover screen — no entrance needed
            // Just set them in place immediately
            gsap.set(panelLeftRef.current, { x: "0%" });
            gsap.set(panelRgtRef.current, { x: "0%" });

            // ── PHASE 2: Drip line grows downward ─────────────────
            // The "chocolate" line starts at top and drips to 100vh
            tl.fromTo(
                dripLineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                { scaleY: 1, duration: 1.6, ease: "power2.in" },
                0.5
            );

            // Drip head (teardrop blob) follows the line bottom edge
            tl.fromTo(
                dripHeadRef.current,
                { y: "-100vh", opacity: 0 },
                {
                    y: "0vh", opacity: 1,
                    duration: 1.6,
                    ease: "power2.in",
                    onUpdate() {
                        // Keep drip head stuck to bottom of line
                    },
                },
                0.5
            );

            // ── PHASE 3: Logo pops in at midpoint of drip ─────────
            tl.fromTo(
                logoRef.current,
                { scale: 0.7, opacity: 0, filter: "blur(6px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "elastic.out(1, 0.5)" },
                1.2
            );

            // Tag line
            tl.fromTo(
                tagRef.current,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                1.7
            );

            // ── PHASE 4: Counter + progress ───────────────────────
            const counter = { val: 0 };
            tl.to(counter, {
                val: 100,
                duration: 1.9,
                ease: "power1.inOut",
                onUpdate() {
                    const v = Math.round(counter.val);
                    setCount(v);
                    if (progressRef.current) {
                        progressRef.current.style.transform = `scaleX(${v / 100})`;
                    }
                },
            }, 0.5);

            // ── PHASE 5: Hold ─────────────────────────────────────
            tl.to({}, { duration: 0.5 });

            // ── PHASE 6: Everything exits center ──────────────────
            tl.to(
                [logoRef.current, tagRef.current],
                { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" }
            );
            tl.to(
                [counterRef.current, dripHeadRef.current],
                { opacity: 0, duration: 0.3, ease: "power2.in" },
                "<"
            );

            // Drip line retracts upward
            tl.to(
                dripLineRef.current,
                { scaleY: 0, transformOrigin: "top center", duration: 0.5, ease: "power3.in" },
                "-=0.1"
            );

            // ── PHASE 7: Panels split open left/right ─────────────
            tl.to(
                panelLeftRef.current,
                { x: "-100%", duration: 1.0, ease: "power4.inOut" },
                "-=0.15"
            )
                .to(
                    panelRgtRef.current,
                    { x: "100%", duration: 1.0, ease: "power4.inOut" },
                    "<"
                );

        }, rootRef);

        return () => ctx.revert();
    }, [setIsLoading]);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[10000] pointer-events-auto overflow-hidden"
            aria-hidden="true"
        >
            {/* ── LEFT PANEL ──────────────────────────────────── */}
            <div
                ref={panelLeftRef}
                className="absolute top-0 left-0 w-1/2 h-full"
                style={{
                    background: "var(--color-paper)",
                    borderRight: "1px solid var(--color-linen)",
                    transform: "translateX(-100%)",
                }}
            />

            {/* ── RIGHT PANEL ─────────────────────────────────── */}
            <div
                ref={panelRgtRef}
                className="absolute top-0 right-0 w-1/2 h-full"
                style={{
                    background: "var(--color-paper)",
                    borderLeft: "1px solid var(--color-linen)",
                    transform: "translateX(100%)",
                }}
            />

            {/* ── DRIP LINE — center vertical ─────────────────── */}
            {/* The "chocolate drip" running down the seam */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-screen z-10 origin-top"
                ref={dripLineRef}
                style={{
                    background: "linear-gradient(to bottom, var(--color-teal) 0%, var(--color-teal-rich) 40%, var(--color-amber) 80%, var(--color-coral) 100%)",
                    transform: "scaleY(0)",
                    transformOrigin: "top center",
                }}
            />

            {/* Drip head — teardrop at the bottom of the line */}
            <div
                ref={dripHeadRef}
                className="absolute bottom-0 left-1/2 z-10"
                style={{
                    transform: "translateX(-50%) translateY(-100vh)",
                    opacity: 0,
                }}
            >
                {/* SVG teardrop blob */}
                <svg
                    width="22" height="28" viewBox="0 0 22 28"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(26,122,110,0.3))" }}
                >
                    <path
                        d="M11 0 C11 0 22 12 22 18 C22 24.627 17.075 28 11 28 C4.925 28 0 24.627 0 18 C0 12 11 0 11 0Z"
                        fill="var(--color-amber)"
                    />
                </svg>
            </div>

            {/* ── LOGO — centered, above the drip ─────────────── */}
            <div
                ref={logoRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
                style={{ opacity: 0 }}
            >
                <div
                    className="flex items-center justify-center rounded-full mb-5"
                    style={{
                        width: "120px",
                        height: "120px",
                        background: "var(--color-cream)",
                        border: "1px solid var(--color-linen)",
                        boxShadow:
                            "0 0 0 8px rgba(26,122,110,0.05), 0 20px 50px rgba(26,122,110,0.12)",
                    }}
                >
                    <Image
                        src="/assets/logo.png"
                        alt="Delight Enterprises"
                        width={84}
                        height={84}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Tag — below logo */}
            <div
                ref={tagRef}
                className="absolute left-1/2 z-20 text-center"
                style={{
                    top: "calc(50% + 82px)",
                    transform: "translateX(-50%)",
                    opacity: 0,
                }}
            >
                <p
                    className="font-sans font-light uppercase tracking-[4px] text-taupe"
                    style={{ fontSize: "15px" }}
                >
                    Delight Enterprises
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="h-px w-8" style={{ background: "var(--color-amber)" }} />
                    <p
                        className="font-sans font-light uppercase tracking-[3px]"
                        style={{ fontSize: "15px", color: "var(--color-amber)" }}
                    >
                        Melt &amp; Dip · Palos Park
                    </p>
                    <div className="h-px w-8" style={{ background: "var(--color-amber)" }} />
                </div>
            </div>

            {/* ── COUNTER — bottom right, editorial ───────────── */}
            <div
                ref={counterRef}
                className="absolute bottom-12 right-12 z-20 flex items-baseline gap-1"
            >
                <span
                    className="font-serif italic text-ink tabular-nums leading-none"
                    style={{ fontSize: "clamp(48px, 6vw, 80px)", letterSpacing: "-0.03em" }}
                >
                    {String(count).padStart(2, "0")}
                </span>
                <span
                    className="font-sans font-light"
                    style={{ fontSize: "15px", color: "var(--color-taupe)", letterSpacing: "1px" }}
                >
                    %
                </span>
            </div>

            {/* ── PROGRESS BAR — bottom full width ────────────── */}
            <div
                className="absolute bottom-0 left-0 right-0 z-20"
                style={{ height: "2px", background: "var(--color-linen)" }}
            >
                <div
                    ref={progressRef}
                    className="absolute inset-y-0 left-0 right-0 origin-left"
                    style={{
                        background:
                            "linear-gradient(to right, var(--color-teal), var(--color-amber))",
                        transform: "scaleX(0)",
                    }}
                />
            </div>
        </div>
    );
}