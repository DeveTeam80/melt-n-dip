"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  X,
  ArrowRight,
  MousePointerClick,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MENU, PACKAGES, EVENT_TYPES, SERVICE_STYLES, BagItem } from "./data";
import CustomSelect from "./CustomSelect";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Props {
  guests: string;
  setGuests: (v: string) => void;
  eventType: string;
  setEventType: (v: string) => void;
  serviceStyle: string;
  setServiceStyle: (v: string) => void;
  bag: BagItem[];
  bagTotal: number;
  bagCount: number;
  onAdd: (
    item: { id: string; name: string; pricePerPerson: number },
    category: string,
    initialQty?: number,
  ) => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, quantity: number) => void;
  onOpenBag: () => void;
  getQty: (id: string) => number;
}

export default function BagBuilder({
  guests,
  setGuests,
  eventType,
  setEventType,
  serviceStyle,
  setServiceStyle,
  bag,
  bagTotal,
  bagCount,
  onAdd,
  onRemove,
  onUpdateQty,
  onOpenBag,
  getQty,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const pathChoiceRef = useRef<HTMLDivElement>(null);
  const serviceBoxRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [forceServiceOpen, setForceServiceOpen] = useState(false);
  const [showPathChoice, setShowPathChoice] = useState(false);

  const guestNum = parseInt(guests) || 0;

  // ── Scroll animations ───────────────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".builder-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".builder-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".menu-item-card");
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        overwrite: true,
      },
    );
  }, [activeTab]);

  // ── Nudge sequence ──────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("guests") || !params.get("event")) return;
    const t1 = setTimeout(() => setShowToast(true), 900);
    const t2 = setTimeout(() => setForceServiceOpen(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // ── Toast: bounce up from bottom ────────────────────────────────
  useEffect(() => {
    if (!showToast || !toastRef.current) return;
    gsap.killTweensOf(toastRef.current);
    gsap.fromTo(
      toastRef.current,
      { y: 120, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
    );
    // Gentle bob every 3s so it stays noticeable
    gsap.to(toastRef.current, {
      y: -6,
      duration: 0.45,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2.8,
      delay: 1,
    });

    // Also scroll the service box into view + flash it
    setTimeout(() => {
      serviceBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      if (serviceBoxRef.current) {
        gsap.to(serviceBoxRef.current, {
          boxShadow:
            "0 0 0 3px var(--color-teal), 0 0 0 6px rgba(8,99,107,0.15)",
          duration: 0.4,
          ease: "power2.out",
          yoyo: true,
          repeat: 3,
          repeatDelay: 0.5,
          onComplete: () => {
            gsap.set(serviceBoxRef.current, {
              boxShadow: "0 0 0 2px var(--color-teal)",
            });
          },
        });
      }
    }, 600);
  }, [showToast]);

  // ── Path-choice modal entrance ──────────────────────────────────
  useEffect(() => {
    if (showPathChoice && pathChoiceRef.current) {
      gsap.fromTo(
        pathChoiceRef.current,
        { y: 32, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    }
  }, [showPathChoice]);

  // ── Clear teal border ring on service box ──────────────────────
  const clearServiceBorder = () => {
    if (!serviceBoxRef.current) return;
    gsap.killTweensOf(serviceBoxRef.current);
    gsap.to(serviceBoxRef.current, {
      boxShadow: "none",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  // ── Handlers ────────────────────────────────────────────────────
  const dismissToast = () => {
    if (!toastRef.current) return;
    gsap.killTweensOf(toastRef.current);
    gsap.to(toastRef.current, {
      y: 120,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setShowToast(false),
    });
    clearServiceBorder();
  };

  const handleServiceStyleChange = (val: string) => {
    setServiceStyle(val);
    setForceServiceOpen(false);
    clearServiceBorder();
    dismissToast();
    setTimeout(() => setShowPathChoice(true), 500);
  };

  const handlePath = (path: "packages" | "menu") => {
    setShowPathChoice(false);
    setTimeout(() => {
      document
        .getElementById(path === "packages" ? "option-a" : "option-b")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handlePathClose = () => {
    setShowPathChoice(false);
    setTimeout(() => {
      document
        .getElementById("option-a")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          BOTTOM-RIGHT TOAST  (phone-notification style)
          ════════════════════════════════════════════════════════════ */}
      {showToast && (
        <div
          ref={toastRef}
          className="fixed z-[300] pointer-events-auto"
          style={{
            bottom: "28px",
            right: "24px",
            left: "auto",
            maxWidth: "340px",
            width: "calc(100vw - 48px)",
            opacity: 0,
          }}
        >
          <div
            className="relative flex items-start gap-3 p-4 rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-ink)",
              boxShadow:
                "0 20px 60px rgba(13,42,39,0.45), 0 4px 16px rgba(13,42,39,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Amber left accent stripe */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-amber-vibrant), var(--color-amber))",
              }}
            />

            {/* Icon bubble */}
            <div
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl mt-0.5"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <MousePointerClick
                style={{
                  width: "18px",
                  height: "18px",
                  color: "var(--color-amber-vibrant)",
                }}
                strokeWidth={1.8}
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 ml-1">
              <p
                className="font-sans font-semibold mb-0.5"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  letterSpacing: "0.1px",
                }}
              >
                Almost there!
              </p>
              <p
                className="font-sans font-light leading-snug"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.1px",
                }}
              >
                Select a{" "}
                <span
                  style={{
                    color: "var(--color-amber-vibrant)",
                    fontWeight: 500,
                  }}
                >
                  Service Style
                </span>{" "}
                above to see your options.
              </p>

              {/* Tap-to-select CTA */}
              <button
                onClick={() => {
                  serviceBoxRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  setTimeout(() => setForceServiceOpen(true), 600);
                }}
                className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "var(--color-amber)",
                  color: "var(--color-ink)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  border: "none",
                }}
              >
                Pick a style
                <ArrowRight
                  style={{ width: "11px", height: "11px" }}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Dismiss × */}
            <button
              onClick={dismissToast}
              className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{
                color: "rgba(255,255,255,0.4)",
                border: "none",
                background: "none",
              }}
            >
              <X style={{ width: "12px", height: "12px" }} strokeWidth={2.5} />
            </button>

            {/* Countdown bar at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-amber-vibrant), var(--color-amber))",
                  animation: "toast-shrink 10s linear forwards",
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>

          <style>{`
            @keyframes toast-shrink {
              from { width: 100%; }
              to   { width: 0%; }
            }
          `}</style>
        </div>
      )}

      <section
        ref={containerRef}
        id="estimator"
        className="relative z-40 py-24 lg:py-32 px-8 sm:px-12 lg:px-20 max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <div className="builder-fade-up opacity-0 section-eyebrow">
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-teal)",
              }}
            >
              The Estimator
            </span>
          </div>
          <div className="flex align-items-center justify-between">
            <h2
              className="font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-6"
              style={{
                fontSize: "clamp(38px, 4.5vw, 64px)",
                lineHeight: "1.05",
              }}
            >
              <span className="overflow-hidden block py-1">
                <span className="builder-reveal-line block opacity-0">
                  Craft Your Event
                </span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="builder-reveal-line block opacity-0">
                  <em className="italic text-teal pr-2">Your Way</em>
                </span>
              </span>
            </h2>
            <p
              className="builder-fade-up opacity-0 font-light"
              style={{
                fontSize: "16px",
                color: "black",
                lineHeight: 1.7,
                maxWidth: "360px",
              }}
            >
              Enter your guest count, select your event type and service style -
              then pick a package or build your own from the menu below.
            </p>
          </div>
        </div>

        {/* ── Inputs Bar ───────────────────────────────────────────── */}
        <div className="builder-fade-up opacity-0 relative z-50 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-8 lg:gap-12 mb-24 p-8 lg:p-12 rounded-[3px] bg-parchment border border-linen shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          {/* Guest Count */}
          <div className="flex flex-col gap-2 border-b lg:border-b-0 lg:border-r border-linen pb-8 lg:pb-0 lg:pr-12">
            <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal mb-2">
              Guest Count <span className="text-amber">*</span>
            </label>
            <input
              type="number"
              min="1"
              placeholder="75"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-transparent outline-none font-serif font-light text-ink w-full placeholder:text-teal/80/90"
              style={{
                fontSize: "clamp(48px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            />
          </div>

          {/* Event Type */}
          <div className="flex flex-col justify-center gap-8 lg:pr-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal">
                Event Type
              </label>
              <CustomSelect
                value={eventType}
                onChange={setEventType}
                options={EVENT_TYPES}
                placeholder="Select occasion..."
              />
            </div>
          </div>

          {/* Service Style — visually highlighted when toast is showing */}
          <div
            ref={serviceBoxRef}
            className="flex flex-col justify-center gap-8 rounded-[3px] transition-all duration-500"
            style={{ padding: "8px", margin: "-8px" }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal">
                  Service Style
                </label>
                {/* Pulsing dot next to label when toast active */}
                {showToast && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                      style={{ background: "var(--color-amber-vibrant)" }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: "var(--color-amber-vibrant)" }}
                    />
                  </span>
                )}
              </div>
              <CustomSelect
                value={serviceStyle}
                onChange={handleServiceStyleChange}
                options={SERVICE_STYLES}
                placeholder="Select style..."
                forceOpen={forceServiceOpen}
                onOpenChange={(open) => {
                  if (!open) setForceServiceOpen(false);
                }}
              />
            </div>
          </div>
        </div>

        <div id="option-a" className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="uppercase text-[14px] tracking-[3px] font-bold text-ink">
              Option A: Curated Packages
            </h3>
            <div className="h-[1px] flex-1 bg-linen" />
          </div>

          <div className="builder-fade-up opacity-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, idx) => {
              const bgImages = [
                "assets/images/chocalate_drizzle.jpg",
                "assets/images/catering/catering3.jpeg",
                "assets/images/kunafa_crepe.jpeg",
              ];

              return (
                <div
                  key={pkg.name}
                  className="group relative rounded-[3px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  style={{ minHeight: "380px" }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${bgImages[idx]}')`,
                    }}
                  />

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "rgba(0,0,0,0.18)",
                    }}
                  />

                  {/* Decorative Icon */}
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <Sparkles className="w-10 h-10 text-amber" />
                  </div>

                  {/* Content */}
                  <div
                    className="relative z-10 flex flex-col h-full p-8"
                    style={{
                      minHeight: "380px",
                      backdropFilter: "blur(1px)",
                      WebkitBackdropFilter: "blur(1px)",
                    }}
                  >
                    {/* Package Name */}
                    <p
                      className="font-serif text-[24px] text-white mb-3 leading-snug "
                      style={{
                        textShadow: "0 3px 14px rgba(0,0,0,0.85)",
                      }}
                    >
                      {pkg.name}
                    </p>

                    {/* Description */}
                    <p
                      className="text-[15px] leading-relaxed mb-6 h-12 line-clamp-2"
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                      }}
                    >
                      {pkg.desc}
                    </p>

                    <div className="flex-1" />

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span
                        className="font-serif font-light"
                        style={{
                          fontSize: "38px",
                          color: "#F4B942",
                          letterSpacing: "-0.03em",
                          textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                        }}
                      >
                        ${pkg.min}
                      </span>

                      <span
                        className="uppercase font-medium tracking-wider"
                        style={{
                          fontSize: "11px",
                          color: "white",
                          textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                        }}
                      >
                        starting per head
                      </span>
                    </div>

                    {/* Button */}
                    <button
                      className="w-full py-3.5 text-[12px] uppercase tracking-[2.5px] font-semibold transition-all duration-300"
                      style={{
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "#fff",
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderRadius: "2px",
                        textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D4860A";
                        e.currentTarget.style.borderColor = "#D4860A";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.08)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.25)";
                        e.currentTarget.style.color = "#fff";
                      }}
                    >
                      Inquire for this Set
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="relative py-20 flex justify-center items-center">
          <div className="absolute w-full h-[1px] bg-linen" />
          <div className="relative z-10 bg-paper px-6 py-2 border border-linen rounded-full font-serif font-bold text-teal text-lg shadow-sm">
            or build your own
          </div>
        </div>

        {/* ── Option B ─────────────────────────────────────────────── */}
        <div id="option-b" className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="uppercase text-[14px] tracking-[3px] font-bold text-ink">
              Option B: Choose from the Menu!
            </h3>
            <div className="h-[1px] flex-1 bg-linen" />
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {MENU.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2.5 rounded-full text-[14px] tracking-[1.5px] font-medium uppercase transition-all duration-300 ${
                  activeTab === i
                    ? "bg-teal text-white shadow-lg shadow-teal/20"
                    : "bg-white text-teal border border-linen hover:border-teal/30"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {MENU[activeTab].items.map((item) => {
              const qty = getQty(item.id);
              const isSelected = qty > 0;
              return (
                <div
                  key={item.id}
                  className={`menu-item-card p-8 rounded-[3px] border transition-all duration-500 ${
                    isSelected
                      ? "bg-white border-teal shadow-xl"
                      : "bg-white border-linen"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif font-medium text-lg text-ink leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[15px] font-medium text-teal bg-teal-faint px-2 py-1 rounded">
                      ${item.pricePerPerson} / pp
                    </span>
                  </div>
                  <p className="text-[15px] font-light text-teal leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    {isSelected ? (
                      <div className="flex items-center gap-4 bg-parchment rounded-full p-1 border border-linen">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-ink transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) =>
                            onUpdateQty(item.id, parseInt(e.target.value) || 0)
                          }
                          className="w-14 text-center bg-transparent text-[13px] font-bold outline-none"
                        />
                        <button
                          onClick={() => onAdd(item, MENU[activeTab].category)}
                          className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center shadow-md"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          onAdd(item, MENU[activeTab].category, guestNum)
                        }
                        className="flex items-center gap-2 text-[14px] tracking-[1.5px] uppercase font-bold text-teal group"
                      >
                        <span className="w-8 h-8 rounded-full border border-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all">
                          <Plus className="w-3 h-3" />
                        </span>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating bag */}
        {bag.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-40px)] max-w-[800px] bg-ink p-6 lg:p-8 flex items-center justify-between shadow-2xl border border-white/10 rounded-[4px]">
            <div className="hidden md:block">
              <p className="text-[14px] uppercase tracking-[2px] text-amber mb-1">
                {bagCount} Items Selected
              </p>
              <p className="font-serif text-paper text-2xl">
                ${bagTotal.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={onOpenBag}
                className="flex-1 md:flex-initial h-12 px-8 bg-teal text-white text-[14px] uppercase tracking-[2px] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> View Cart
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PATH CHOICE MODAL
            ════════════════════════════════════════════════════════════ */}
        {showPathChoice && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{
              background: "rgba(13,42,39,0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handlePathClose();
            }}
          >
            <div
              ref={pathChoiceRef}
              className="relative w-full max-w-[520px] rounded-[8px] overflow-hidden"
              style={{
                background: "var(--color-paper)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
                opacity: 0,
              }}
            >
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-teal), var(--color-teal-pale))",
                }}
              />

              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ background: "var(--color-teal-faint)" }}
                      >
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="var(--color-teal)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          color: "var(--color-teal)",
                          fontWeight: 600,
                        }}
                      >
                        Great - one more step
                      </span>
                    </div>
                    <h3
                      className="font-serif font-light"
                      style={{
                        fontSize: "clamp(20px, 4vw, 26px)",
                        color: "var(--color-ink)",
                        lineHeight: 1.25,
                      }}
                    >
                      How would you like to proceed?
                    </h3>
                  </div>
                  <button
                    onClick={handlePathClose}
                    className="shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                    style={{
                      background: "var(--color-parchment)",
                      border: "1px solid var(--color-linen)",
                      color: "var(--color-umber)",
                    }}
                  >
                    <X
                      style={{ width: "13px", height: "13px" }}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Option 1 */}
                <button
                  onClick={() => handlePath("packages")}
                  className="group w-full flex items-stretch gap-0 rounded-[4px] mb-3 overflow-hidden text-left transition-all duration-300 hover:shadow-md"
                  style={{ border: "1px solid var(--color-linen)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-teal)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-linen)";
                  }}
                >
                  <div
                    className="w-1 shrink-0"
                    style={{ background: "var(--color-teal)" }}
                  />
                  <div
                    className="flex items-center gap-4 p-5 flex-1"
                    style={{ background: "var(--color-parchment)" }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                      style={{
                        background: "var(--color-teal)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium mb-0.5"
                        style={{ fontSize: "15px", color: "var(--color-ink)" }}
                      >
                        Curated Packages
                      </p>
                      <p
                        className="font-light leading-snug"
                        style={{
                          fontSize: "12px",
                          color: "var(--color-umber)",
                        }}
                      >
                        Pre-built tiers — Sweet Bites, Classic or Premium. Quick
                        &amp; easy.
                      </p>
                    </div>
                    <ArrowRight
                      className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "var(--color-teal)",
                      }}
                      strokeWidth={2}
                    />
                  </div>
                </button>

                {/* Option 2 */}
                <button
                  onClick={() => handlePath("menu")}
                  className="group w-full flex items-stretch gap-0 rounded-[4px] overflow-hidden text-left transition-all duration-300 hover:shadow-md"
                  style={{ border: "1px solid var(--color-linen)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-amber)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-linen)";
                  }}
                >
                  <div
                    className="w-1 shrink-0"
                    style={{ background: "var(--color-amber)" }}
                  />
                  <div
                    className="flex items-center gap-4 p-5 flex-1"
                    style={{ background: "var(--color-parchment)" }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                      style={{
                        background: "var(--color-amber)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium mb-0.5"
                        style={{ fontSize: "15px", color: "var(--color-ink)" }}
                      >
                        Choose from the Menu
                      </p>
                      <p
                        className="font-light leading-snug"
                        style={{
                          fontSize: "12px",
                          color: "var(--color-umber)",
                        }}
                      >
                        Build your own spread — pick items &amp; see live
                        pricing as you go.
                      </p>
                    </div>
                    <ArrowRight
                      className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "var(--color-amber)",
                      }}
                      strokeWidth={2}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
