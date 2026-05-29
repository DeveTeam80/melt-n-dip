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
    name: "Luxury Wedding Catering",
    desc: "Breathtaking dessert table setups, flowing Belgian chocolate fountains, and artisan gelato bars. We design custom dessert stations as memorable as your ceremony.",
  },
  {
    Icon: Briefcase,
    name: "Corporate Event Catering",
    desc: "From interactive live crepe stations to custom bulk dessert orders, we provide seamless catering for office parties and corporate events across Chicagoland.",
  },
  {
    Icon: Truck,
    name: "Mobile Dessert Stations",
    desc: "Bring the ultimate experience to any location. Our food trucks and mobile gelato carts are perfect for outdoor festivals, corporate events, and community block parties.",
  },
  {
    Icon: Building2,
    name: "Private Venue Rental",
    desc: "Hire our aesthetic Palos Park lounge exclusively. An immersive, high-end private venue rental perfect for bridal showers, Sweet 16s, and intimate banquets.",
  },
];

const SEASONAL_CARDS = [
  {
    img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80",
    season: "Summer & Spring",
    name: "Mobile Gelato Carts",
    text: "Artisan gelato and refreshing sorbets served from our mobile gelato carts, perfect for warm-weather block parties and weddings.",
  },
  {
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    season: "Holiday & Winter",
    name: "Festive Dessert Stations",
    text: "Custom sweet platters and luxury chocolate fountains crafted for Thanksgiving, winter banquets, and corporate holiday parties.",
  },
  {
    img: "assets/images/kunafa_crepe.jpeg",
    season: "Cultural Traditions",
    name: "Ramadan & Eid Specials",
    text: "Warm Kunafa crepes, custom platters, and 100% Halal dessert stations designed for community and family iftars.",
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
        className="py-20 lg:py-32 px-8 sm:px-12 lg:px-20 overflow-hidden"
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
                    Luxury Dessert Experience
                  </em>{" "}
                  to You
                </span>
              </span>
            </h2>

            <p className="cat-fade-up font-sans font-normal text-teal leading-[1.85] mb-12 max-w-[440px] text-[17px]">
              From the aroma of warm Belgian chocolate at a downtown Chicago gala to the visual elegance of a custom dessert table in the South Suburbs, every detail is meticulously crafted to{" "}
              <em className="italic text-umber font-serif text-[17px] font-bold">
                Satisfy Your Spirit
              </em>
              .
              <span className="block mt-4 text-ink/80">
                We specialize in high-end corporate dessert catering, luxury weddings, and 100% Halal sweet platters. We also cater to Graduations, Iftar & Eid, and provide custom Drop-Off Trays.
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
                style={{ height: "52px", padding: "0 44px" }}
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
            {CAT_CARDS.map(({ Icon, name, desc }, idx) => (
              <div
                key={name}
                className="cat-card-reveal group relative bg-white border border-linen
      rounded-[3px] py-4 px-6 overflow-hidden hover-target cursor-default
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
      hover:bg-[var(--color-teal)]" // Main background inversion
              >
                {/* Icon Container */}
                <div
                  className="flex items-center justify-center rounded-full mb-6 transition-all duration-500 
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
                    // Move initial color into Tailwind class if possible, otherwise it must change on hover
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--color-teal)", // Default color. Change happens via class.
                    }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text Content */}
                <p
                  // MOVED: initial text color from style to classes here
                  className="font-serif font-normal mb-3 text-[var(--color-ink)] transition-colors duration-500 group-hover:text-white"
                  style={{
                    fontSize: "21px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </p>

                <p
                  // MOVED: initial text color from style to classes here
                  className="font-normal leading-relaxed mb-8 text-[var(--color-taupe)] transition-colors duration-500 group-hover:text-teal-50"
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
        className="estimator-strip px-8 sm:px-12 lg:px-20 py-14"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="max-w-[960px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-5 h-px"
                  style={{ background: "var(--color-amber)" }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "3.5px",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                    fontWeight: 500,
                  }}
                >
                  Quick Estimate
                </span>
              </div>
              <h3
                className="font-serif font-light"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--color-paper)",
                }}
              >
                How much will your event cost?
              </h3>
            </div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "white",
                maxWidth: "260px",
                lineHeight: 1.7,
              }}
            >
              Get a ballpark in seconds, then head to our full estimator to
              build your perfect dessert spread.
            </p>
          </div>

          {/* Input row */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr_auto] gap-4 items-end">
            {/* Guest count */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-teal-pale)",
                  fontWeight: 500,
                }}
              >
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 75"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent outline-none font-light w-full"
                style={{
                  borderBottom: "1px solid rgba(168,216,212,0.5)",
                  padding: "10px 0",
                  fontSize: "22px",
                  color: "var(--color-paper)",
                  letterSpacing: "-0.02em",
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "var(--color-teal-pale)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(168,216,212,0.2)")
                }
              />
            </div>

            {/* Event type */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-teal-pale)",
                  fontWeight: 500,
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

            {/* CTA */}
            <button
              onClick={handleEstimate}
              disabled={!guests}
              className="hover-target flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                height: "52px",
                padding: "0 32px",
                background: guests
                  ? "var(--color-teal)"
                  : "rgba(168,216,212,0.1)",
                color: guests ? "#fff" : "rgba(168,216,212,0.3)",
                borderRadius: "1px",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                cursor: guests ? "none" : "default",
                border: `1px solid ${guests ? "var(--color-teal)" : "rgba(168,216,212,0.1)"}`,
              }}
            >
              See Estimate
              <ArrowUpRight
                style={{ width: "14px", height: "14px" }}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Live preview */}
          {guestNum > 0 && (
            <div
              className="mt-8 p-5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(168,216,212,0.08)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "var(--color-teal-pale)",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  Classic Dessert Package estimate for {guestNum} guests
                </p>
                <p
                  className="font-serif font-light"
                  style={{
                    fontSize: "32px",
                    letterSpacing: "-0.03em",
                    color: "var(--color-paper)",
                    lineHeight: 1,
                  }}
                >
                  ${low.toLocaleString()} – ${high.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--color-teal-pale)",
                    lineHeight: 1.7,
                    maxWidth: "220px",
                    opacity: 0.6,
                  }}
                >
                  Based on $12–$15/person. Final price depends on menu, staffing
                  & location.
                </p>
                <Link
                  href={`/catering?guests=${guests}&event=${encodeURIComponent(eventType)}#estimator`}
                  className="inline-flex items-center gap-1.5 mt-3 hover-target"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--color-teal-pale)",
                  }}
                >
                  Build full estimate
                  <ArrowUpRight
                    style={{ width: "12px", height: "12px" }}
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SEASONAL ──────────────────────────────────────── */}
      <section
        className="py-20 lg:py-32 px-8 sm:px-12 lg:px-20 overflow-hidden"
        style={{ background: "var(--color-parchment)" }}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="seasonal-header text-center max-w-[580px] mx-auto mb-20">
          <div
            className="season-fade-up section-eyebrow"
            style={{ justifyContent: "center" }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--color-teal)",
                fontWeight: 500,
              }}
            >
              Seasonal &amp; Festive Catering
            </span>
          </div>
          <h2
            className="font-serif font-light text-ink flex flex-col items-center gap-1 mb-6"
            style={{
              fontSize: "clamp(30px, 4.5vw, 64px)",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
            }}
          >
            <span className="overflow-hidden block py-1">
              <span className="season-reveal-line block">
                Made for{" "}
                <em className="italic" style={{ color: "var(--color-teal)" }}>
                  Every
                </em>
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="season-reveal-line block">Season</span>
            </span>
          </h2>
          <p
            className="season-fade-up font-normal text-teal"
            style={{ fontSize: "17px", lineHeight: 1.85 }}
          >
            We follow the rhythm of the year, from summer outdoor weddings to
            festive corporate holiday parties and cultural community celebrations.
          </p>
        </div>

        <div className="seasonal-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEASONAL_CARDS.map(({ img, season, name, text }) => (
            <div
              key={name}
              className="season-card-wrap group relative rounded-[3px] overflow-hidden hover-target cursor-none"
              style={{ aspectRatio: "3/4", background: "var(--color-bark)" }}
            >
              <div
                className="season-bg absolute bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                style={{
                  inset: "-15%",
                  backgroundImage: `url('${img}')`,
                  willChange: "transform",
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,42,39,0.92) 0%, rgba(13,42,39,0.2) 50%, transparent 100%)",
                  opacity: 0.8,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 z-10">
                <p
                  className="mb-3 font-medium"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "rgb(229 155 10)",
                    fontWeight: "600",
                  }}
                >
                  {season}
                </p>
                <p
                  className="font-serif font-light text-white mb-3"
                  style={{
                    fontSize: "26px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {name}
                </p>
                <div
                  className="mb-4 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: "36px", background: "var(--color-amber)" }}
                />
                <p
                  className=""
                  style={{
                    fontSize: "16px",
                    color: "white",
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
              <div
                className="absolute top-6 right-6 flex items-center justify-center rounded-full z-10 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(251,253,252,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ArrowUpRight
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ width: "16px", height: "16px", color: "#fff" }}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
  );
}
