"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Our Story", href: "/#about" },
  { label: "Menu", href: "/#products" },
  { label: "Catering", href: "/catering" },
  { label: "Palos Park", href: "/melt-n-dip-palos-park" },
  { label: "Find Us", href: "/#location" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isCatering = pathname === "/catering";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onMagMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onMagLeave = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  const scrollToQuote = () => {
    setMenuOpen(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* ── MOBILE FULL-SCREEN MENU ──────────────────── */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-between items-center
          transform transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto py-24 px-8`}
        style={{ background: "var(--color-paper)" }}
      >
        {/* Decorative left edge */}
        <div
          className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-teal-pale), transparent)",
          }}
        />

        <div className="flex flex-col items-center w-full max-w-xs gap-2 my-auto">
          {NAV_LINKS.map((item, i) => {
            const { label, href } = item;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group relative w-full text-center py-5 hover-target overflow-hidden"
                style={{
                  borderBottom:
                    i < NAV_LINKS.length - 1
                      ? "1px solid var(--color-linen)"
                      : "none",
                }}
              >
                {/* Default text - slides up on hover */}
                <span
                  className="font-serif font-light block
                  transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:-translate-y-[120%]"
                  style={{
                    fontSize: "clamp(32px, 6vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>

                {/* Teal italic - slides in from below on hover */}
                <span
                  className="absolute inset-0 flex items-center justify-center
                  font-serif font-light italic
                  translate-y-[120%] group-hover:translate-y-0
                  transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    fontSize: "clamp(32px, 6vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-teal)",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={scrollToQuote}
            className="cta-primary hover-target mt-8 w-full py-4"
            style={{ fontSize: "13px" }}
          >
            Book Now
          </button>
        </div>

        <p
          className="uppercase font-medium mt-12 shrink-0 text-center"
          style={{
            fontSize: "12px",
            letterSpacing: "2.5px",
            color: "var(--color-taupe)",
          }}
        >
          60 Old Creek Rd, Palos Park, IL 60464
        </p>
      </div>

      {/* ── DESKTOP NAV ──────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transitionProperty: "background, backdrop-filter, WebkitBackdropFilter, padding, border-color, box-shadow",
          background: scrolled ? "rgba(248,250,249,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-linen)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 32px rgba(26,122,110,0.06)" : "none",
        }}
      >
        <div
          className={`max-w-[1400px] mx-auto w-full flex items-center justify-between transition-all duration-700
            ${
              scrolled
                ? "py-2 px-8 md:px-12 lg:px-16"
                : "py-6 px-8 md:px-12 lg:px-16"
            }`}
        >
        {/* ── LOGO ─────────────────────────────────── */}
        <Link
          href="/"
          onMouseMove={onMagMove}
          onMouseLeave={onMagLeave}
          className="hover-target shrink-0 group"
        >
          <Image
            src="/assets/logo.png"
            alt="Delight Enterprises"
            width={250}
            height={100}
            className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-90 ${scrolled || menuOpen ? "" : "nav-logo-responsive"}`}
            style={{
              width: isSticky ? "80px" : "100px",
              height: "auto",
            }}
            priority
          />
        </Link>

        {/* ── DESKTOP LINKS ────────────────────────── */}
        <ul
          className="hidden xl:flex items-center gap-2 list-none duration-500"
          style={{
            transitionProperty: "background-color, border-color, box-shadow, padding, backdrop-filter, WebkitBackdropFilter",
            backgroundColor: (!scrolled && !isCatering) ? "rgba(255, 255, 255, 0.6)" : "transparent",
            backdropFilter: (!scrolled && !isCatering) ? "blur(12px)" : "none",
            WebkitBackdropFilter: (!scrolled && !isCatering) ? "blur(12px)" : "none",
            borderRadius: "9999px",
            padding: (!scrolled && !isCatering) ? "6px 16px" : "0px",
            border: "1px solid",
            borderColor: (!scrolled && !isCatering) ? "rgba(255, 255, 255, 0.5)" : "transparent",
            boxShadow: (!scrolled && !isCatering) ? "0 4px 24px rgba(0,0,0,0.04)" : "none",
          }}
        >
          {NAV_LINKS.map((item) => {
            const { label, href } = item;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onMouseMove={onMagMove}
                  onMouseLeave={onMagLeave}
                  className="group relative block px-5 py-2 hover-target"
                >
                  {/* Pill bg - reveals on hover */}
                  <div
                    className="absolute inset-0 rounded-full scale-50 opacity-0
                    transition-all duration-300 ease-out
                    group-hover:scale-100 group-hover:opacity-100"
                    style={{ background: "var(--color-teal-faint)" }}
                  />
                  <span
                    className={`relative z-10 font-sans font-medium uppercase
                    transition-colors duration-300 ${isCatering && !scrolled ? "text-white group-hover:text-teal" : "text-umber group-hover:text-teal"}`}
                    style={{ fontSize: "14px", letterSpacing: "1.5px" }}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── RIGHT ────────────────────────────────── */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Book Now */}
          <button
            onClick={scrollToQuote}
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            className={`cta-primary hover-target hidden ${menuOpen ? "" : "sm:flex"} items-center
              justify-center relative overflow-hidden`}
            style={{
              padding: scrolled ? "11px 26px" : "13px 30px",
              fontSize: "13px",
            }}
          >
            Book Now
          </button>

          {/* Hamburger - mobile/tablet only */}
          {/* z-[91] - just above menu overlay (z-90) but below nav (z-100) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`xl:hidden flex flex-col justify-center gap-[5px]
              w-10 h-10 ${menuOpen ? "items-center" : "items-end"} hover-target z-[91]`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block origin-center rounded-full
                  transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  height: "1.5px",
                  background:
                    menuOpen
                      ? "var(--color-bark)"
                      : scrolled
                        ? "var(--color-bark)"
                        : "var(--color-paper)",
                  // Middle bar shorter - asymmetric design detail
                  width: i === 1 && !menuOpen ? "14px" : "22px",
                  transform:
                    i === 0 && menuOpen
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 2 && menuOpen
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </nav>
    </>
  );
}
