"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Heart,
  Briefcase,
  Cake,
  Truck,
  Building2,
  ArrowUpRight,
  Calculator,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";

const CAT_CARDS = [
  {
    Icon: Heart,
    name: "Wedding Catering",
    desc: "Breathtaking dessert table setups, flowing Belgian chocolate fountains, and artisan gelato bars. We design custom dessert stations as memorable as your ceremony.",
    img: "assets/images/catering/catering3.jpeg",
  },
  {
    Icon: Briefcase,
    name: "Corporate Event Catering",
    desc: "From interactive live crepe stations to custom bulk dessert orders, we provide seamless catering for office parties and corporate events across Chicagoland.",
    img: "assets/images/festive_dessert_station.png",
  },
  {
    Icon: Truck,
    name: "Mobile Dessert Stations",
    desc: "Bring the ultimate experience to any location. Our food trucks and mobile gelato carts are perfect for outdoor festivals, corporate events, and community block parties.",
    img: "assets/images/delight-enterprises-1.png",
  },
  {
    Icon: Building2,
    name: "Private Venue Rental",
    desc: "Hire our aesthetic Palos Park store exclusively. An immersive, high-end private venue rental perfect for bridal showers, Sweet 16s, and intimate banquets.",
    img: "assets/images/melt-n-dip-inside.webp",
  },
];

const TAGS = [
  "Weddings",
  "Graduations",
  "Iftar and Eid",
  "Corporate Events",
  "Birthdays",
  "Book Clubs",
  "Food Truck",
  "Drop-Off Trays",
];

const EVENT_TYPES = [
  "Wedding / Nikah",
  "Birthday",
  "Corporate Event",
  "Graduation",
  "Iftar and Eid",
  "Baby / Bridal Shower",
  "Community Event",
  "Other",
];

// Per-person estimate ranges by package
const ESTIMATE = {
  "Sweet Bites": { min: 8, max: 10 },
  "Classic Dessert": { min: 12, max: 15 },
  "Premium Melt N Dip": { min: 18, max: 25 },
};

export default function CateringAndSeasonal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mini estimator state
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");

  // Quick estimate range shown inline
  const guestNum = parseInt(guests) || 0;
  const low = guestNum > 0 ? guestNum * ESTIMATE["Classic Dessert"].min : 0;
  const high = guestNum > 0 ? guestNum * ESTIMATE["Classic Dessert"].max : 0;

  const handleEstimate = () => {
    const params = new URLSearchParams();
    if (guests) params.set("guests", guests);
    if (eventType) params.set("event", eventType);
    router.push(`/catering?${params.toString()}#estimator`);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cat-left-container", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".cat-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cat-left-container", start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".cat-card-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cat-right-container", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".estimator-strip",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".estimator-strip", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".season-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".seasonal-header", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".season-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".seasonal-header", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".season-card-wrap",
        { clipPath: "inset(15% 0% 15% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".seasonal-grid", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".season-bg",
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".seasonal-grid", start: "top 80%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".season-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onMagMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onMagLeave = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  return (
    <div ref={containerRef}>
      {/* ── CATERING ──────────────────────────────────────── */}
      <section
        id="catering"
        className="py-20 lg:pt-16 lg:pb-32 px-8 sm:px-12 lg:px-20 overflow-hidden"
        style={{ background: "var(--color-paper)" }}
      >
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div className="cat-left-container flex flex-col items-start">
            <div className="cat-fade-up section-eyebrow">
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                CHICAGO EVENTS &amp; CATERING
              </span>
            </div>

            <h2
              className="font-serif font-light text-ink flex flex-col gap-1 mb-6"
              style={{
                fontSize: "clamp(30px, 4.5vw, 64px)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              <span className="overflow-hidden block py-1">
                <span className="cat-reveal-line block">We Bring the</span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="cat-reveal-line block">
                  <em className="italic" style={{ color: "var(--color-teal)" }}>
                    Artisanal Dessert Experience
                  </em>{" "}
                  to You
                </span>
              </span>
            </h2>

            <p className="cat-fade-up font-sans font-normal text-teal leading-[1.85] mb-12 max-w-[440px] text-[17px]">
              From the aroma of warm Belgian chocolate at a downtown Chicago
              gala to the visual elegance of a custom dessert table in the South
              Suburbs, every detail is meticulously crafted to{" "}
              <em className="italic text-umber font-serif text-[17px] font-bold">
                Satisfy Your Spirit
              </em>
              .
              <span className="block mt-4 text-ink">
                We specialize in high-end corporate dessert catering, wedding
                celebrations, and Halal sweet platters. We also cater to
                Graduations, Iftar & Eid, and provide custom Drop-Off Trays.
              </span>
              <span className="block mt-4 text-[15px]">
                We respond to all catering enquiries within 48 hours.
              </span>
            </p>

            {/* Magnetic tags */}
            {/* <div className="cat-fade-up flex flex-wrap gap-2.5 mb-10">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  onMouseMove={onMagMove}
                  onMouseLeave={onMagLeave}
                  className="inline-block hover-target transition-all duration-300
                    hover:bg-teal-faint hover:border-teal-pale hover:text-teal"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--color-umber)",
                    background: "#fff",
                    border: "1px solid var(--color-linen)",
                    padding: "7px 16px",
                    borderRadius: "20px",
                    cursor: "none",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div> */}

            {/* CTAs */}
            <div className="cat-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link
                href="/catering"
                onMouseMove={onMagMove}
                onMouseLeave={onMagLeave}
                className="cta-primary inline-flex items-center text-[13px] justify-center hover-target w-full sm:w-auto"
                style={{
                  height: "52px",
                  padding: "0 24px",
                  whiteSpace: "nowrap",
                }}
              >
                View Catering Packages
              </Link>
              <Link
                href="/catering#estimator"
                onMouseMove={onMagMove}
                onMouseLeave={onMagLeave}
                className="group inline-flex items-center justify-center sm:justify-start gap-2 hover-target w-full sm:w-auto py-3 sm:py-0"
                style={{
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                <Calculator
                  style={{ width: "14px", height: "14px" }}
                  strokeWidth={1.5}
                />
                <span className="relative pb-px">
                  Get a Free Estimate
                  <span
                    className="absolute bottom-0 left-0 w-full h-px origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                    style={{ background: "rgba(26,122,110,0.35)" }}
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Right - service cards */}
          <div className="cat-right-container grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAT_CARDS.map(({ Icon, name, desc, img }) => (
              <div
                key={name}
                className="cat-card-reveal group relative bg-white border border-linen
                  rounded-[3px] py-6 px-6 min-h-[220px] overflow-hidden hover-target cursor-default
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  flex flex-col justify-start"
              >
                {/* Background Image on Hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ backgroundImage: `url('${img}')` }}
                />
                {/* Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal)]/95 via-[var(--color-teal)]/85 to-[var(--color-teal)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full mb-6 transition-all duration-500 
                    group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "var(--color-teal-faint)",
                    border: "1px solid var(--color-teal-pale)",
                  }}
                >
                  <Icon
                    className="transition-colors duration-500 group-hover:text-white"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--color-teal)",
                    }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text Content */}
                <p
                  className="relative z-10 font-serif font-normal mb-3 text-[var(--color-ink)] transition-colors duration-500 group-hover:text-white"
                  style={{
                    fontSize: "21px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </p>

                <p
                  className="relative z-10 font-normal leading-relaxed text-[var(--color-bark)] transition-colors duration-500 group-hover:text-teal-50"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTIMATOR NUDGE STRIP ─────────────────────────── */}
      <div
        className="estimator-strip relative overflow-hidden px-6 sm:px-12 lg:px-16 py-28 sm:py-28"
        style={{ background: "var(--color-ink)" }}
      >
        {/* ── Ambient glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(191,155,48,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 50% 80%, rgba(168,216,212,0.03) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-[1100px] mx-auto">
          {/* ── Ornamental accent ── */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-amber))",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                border: "1px solid var(--color-amber)",
                transform: "rotate(45deg)",
                opacity: 0.7,
              }}
            />
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-amber), transparent)",
              }}
            />
          </div>

          {/* ── Label ── */}
          <p
            className="text-center mb-5"
            style={{
              fontSize: "13px",
              letterSpacing: "4.5px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              fontWeight: 500,
            }}
          >
            Quick Estimate
          </p>

          {/* ── Heading ── */}
          <h3
            className="font-serif font-light text-center"
            style={{
              fontSize: "clamp(38px, 4.5vw, 58px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              color: "var(--color-paper)",
              marginBottom: "12px",
            }}
          >
            How much will your event cost?
          </h3>
          <p
            className="text-center mx-auto"
            style={{
              fontSize: "18px",
              color: "white",
              maxWidth: "480px",
              lineHeight: 1.75,
              marginBottom: "56px",
            }}
          >
            Get a ballpark in seconds, then build your perfect dessert spread.
          </p>

          {/* ── Floating glass card ── */}
          <div
            className="relative mx-auto"
            style={{
              maxWidth: "960px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(191,155,48,0.12)",
              borderRadius: "4px",
              boxShadow:
                "0 4px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(191,155,48,0.06)",
            }}
          >
            {/* Subtle gold top-edge highlight */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: "40%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(191,155,48,0.35), transparent)",
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_auto] items-center">
              {/* ── Guest Count ── */}
              <div className="flex flex-col items-center text-center px-6 sm:px-10 py-10 sm:py-12">
                <label
                  style={{
                    fontSize: "12px",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  Guest Count{" "}
                  <span style={{ color: "var(--color-amber)" }}>*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 75"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent outline-none font-serif font-light w-full text-center placeholder:font-serif placeholder:opacity-20"
                  style={{
                    fontSize: "clamp(44px, 5vw, 60px)",
                    color: "var(--color-paper)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    border: "none",
                    maxWidth: "200px",
                  }}
                />
              </div>

              {/* Divider */}
              <div
                className="hidden sm:block self-stretch"
                style={{
                  width: "1px",
                  background:
                    "linear-gradient(180deg, transparent 15%, rgba(191,155,48,0.12) 50%, transparent 85%)",
                }}
              />

              {/* ── Event Type ── */}
              <div className="flex flex-col items-center text-center px-6 sm:px-10 py-10 sm:py-12">
                <label
                  style={{
                    fontSize: "12px",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  Event Type
                </label>
                <CustomSelect
                  value={eventType}
                  onChange={setEventType}
                  options={EVENT_TYPES}
                  placeholder="Select occasion…"
                  light={true}
                />
              </div>

              {/* Divider */}
              <div
                className="hidden sm:block self-stretch"
                style={{
                  width: "1px",
                  background:
                    "linear-gradient(180deg, transparent 15%, rgba(191,155,48,0.12) 50%, transparent 85%)",
                }}
              />

              {/* ── CTA (Desktop only) ── */}
              <div className="hidden sm:flex items-center justify-center px-6 sm:px-10 py-10 sm:py-12">
                <button
                  onClick={handleEstimate}
                  disabled={!guests}
                  className="hover-target group flex flex-col items-center gap-5 transition-all duration-700"
                  style={{
                    cursor: guests ? "none" : "default",
                    background: "none",
                    border: "none",
                  }}
                >
                  <div
                    className="relative flex items-center justify-center transition-all duration-700"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: `1px solid ${guests ? "var(--color-amber)" : "rgba(168,216,212,0.08)"}`,
                      background: guests
                        ? "rgba(191,155,48,0.06)"
                        : "transparent",
                      boxShadow: guests
                        ? "0 0 24px rgba(191,155,48,0.1)"
                        : "none",
                    }}
                  >
                    {/* Inner ring */}
                    <div
                      className="absolute inset-[3px] rounded-full transition-all duration-700"
                      style={{
                        border: `1px solid ${guests ? "rgba(191,155,48,0.2)" : "transparent"}`,
                      }}
                    />
                    <ArrowUpRight
                      style={{
                        width: "18px",
                        height: "18px",
                        color: guests
                          ? "var(--color-amber)"
                          : "rgba(168,216,212,0.15)",
                        transition: "all 0.7s",
                      }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "3.5px",
                      textTransform: "uppercase",
                      color: guests ? "var(--color-amber)" : "white",
                      fontWeight: 500,
                      transition: "color 0.7s",
                    }}
                  >
                    Estimate
                  </span>
                </button>
              </div>

              {/* ── Mobile Live Result (inside the card) ── */}
              {guestNum > 0 && (
                <div className="sm:hidden flex flex-col items-center text-center px-6 pb-10 pt-4 border-t border-linen/10 w-full">
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "4.5px",
                      textTransform: "uppercase",
                      color: "var(--color-amber)",
                      marginBottom: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Classic Dessert Package · {guestNum} Guests
                  </p>
                  <p
                    className="font-serif font-light"
                    style={{
                      fontSize: "44px",
                      letterSpacing: "-0.03em",
                      color: "var(--color-paper)",
                      lineHeight: 1,
                      marginBottom: "16px",
                    }}
                  >
                    ${low.toLocaleString()} - ${high.toLocaleString()}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.6,
                      maxWidth: "280px",
                      marginBottom: "20px",
                    }}
                  >
                    Based on $12 – $15 per person · Final price varies by menu,
                    staffing & location
                  </p>
                  <button
                    onClick={handleEstimate}
                    className="cta-primary hover-target w-full h-[48px] flex items-center justify-center text-[12px] uppercase tracking-[2px]"
                  >
                    Build Full Estimate
                  </button>
                </div>
              )}

              {/* ── Mobile Placeholder CTA when guest count is empty ── */}
              {guestNum === 0 && (
                <div className="sm:hidden flex items-center justify-center px-6 pb-10 w-full">
                  <button
                    disabled
                    className="w-full h-[48px] flex items-center justify-center text-[12px] uppercase tracking-[3px] border border-white/10 text-white/30 rounded-[3px]"
                  >
                    Enter Guest Count
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Live result (Desktop only) ── */}
          {guestNum > 0 && (
            <div className="mt-20 text-center hidden sm:block">
              {/* Ornamental divider */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div
                  className="h-px w-8"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(191,155,48,0.3))",
                  }}
                />
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "var(--color-amber)",
                    borderRadius: "50%",
                    opacity: 0.5,
                  }}
                />
                <div
                  className="h-px w-8"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(191,155,48,0.3), transparent)",
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "4.5px",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  marginBottom: "20px",
                  fontWeight: 500,
                }}
              >
                Classic Dessert Package · {guestNum} Guests
              </p>

              <p
                className="font-serif font-light"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 58px)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-paper)",
                  lineHeight: 1,
                  marginBottom: "20px",
                }}
              >
                ${low.toLocaleString()}
                <span
                  className="inline-block mx-3"
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "rgba(191,155,48,0.4)",
                    verticalAlign: "middle",
                  }}
                />
                ${high.toLocaleString()}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "white",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Based on $12 – $15 per person · Final price varies by menu,
                staffing & location
              </p>

              <Link
                href={`/catering?guests=${guests}&event=${encodeURIComponent(eventType)}#estimator`}
                className="hover-target group inline-flex items-center gap-3 transition-all duration-500"
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    paddingBottom: "3px",
                    borderBottom: "1px solid rgba(168,216,212,0.15)",
                  }}
                >
                  Build Full Estimate
                </span>
                <ArrowUpRight
                  style={{ width: "13px", height: "13px" }}
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
