"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { NAV_LINKS } from "@/components/navLinks";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isCatering = pathname === "/catering";
  const isAbout = pathname === "/about";
  const isDarkHero = isCatering || isAbout;
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    if (pathname === "/") {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#quote");
    }
  };

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
            color: "var(--color-teal)",
          }}
        >
          13030 Lagrange Rd, Palos Park, IL 60464
        </p>
      </div>

      {/* ── DESKTOP & MOBILE NAVIGATION HEADER ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          transition:
            "background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          background: scrolled ? "rgba(248, 250, 249, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-linen)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 32px rgba(26,122,110,0.06)" : "none",
        }}
      >
        <div
          className={`max-w-[1400px] mx-auto w-full flex items-center justify-between transition-all duration-300
            ${
              scrolled
                ? "py-1 px-6 md:px-12 lg:py-1.5 lg:px-16"
                : "py-2.5 px-6 md:px-12 lg:py-6 lg:px-16"
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
              className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-90 ${scrolled || menuOpen || !isDarkHero ? "" : "nav-logo-responsive"} ${scrolled ? "w-[70px] lg:w-[70px]" : "w-[80px] lg:w-[100px]"}`}
              style={{
                height: "auto",
                transition: "width 0.3s ease, filter 0.3s ease",
                filter:
                  isDarkHero && !scrolled && !menuOpen
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
              priority
            />
          </Link>

          {/* ── DESKTOP LINKS ────────────────────────── */}
          <ul
            className="hidden xl:flex items-center gap-2 list-none duration-300"
            style={{
              transitionProperty:
                "background-color, border-color, box-shadow, padding, backdrop-filter, WebkitBackdropFilter",
              backgroundColor:
                !scrolled && !isCatering
                  ? "rgba(255, 255, 255, 0.6)"
                  : "transparent",
              backdropFilter: !scrolled && !isCatering ? "blur(12px)" : "none",
              WebkitBackdropFilter:
                !scrolled && !isCatering ? "blur(12px)" : "none",
              borderRadius: "9999px",
              padding: !scrolled && !isCatering ? "6px 16px" : "0px",
              border: "1px solid",
              borderColor:
                !scrolled && !isCatering
                  ? "rgba(255, 255, 255, 0.5)"
                  : "transparent",
              boxShadow:
                !scrolled && !isCatering
                  ? "0 4px 24px rgba(0,0,0,0.04)"
                  : "none",
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
              justify-center relative overflow-hidden transition-all duration-300`}
              style={{
                padding: scrolled ? "11px 26px" : "13px 30px",
                fontSize: "13px",
              }}
            >
              Book Now
            </button>

            {/* Hamburger - mobile/tablet only */}
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
                    background: menuOpen
                      ? "var(--color-bark)"
                      : scrolled
                        ? "var(--color-bark)"
                        : "var(--color-paper)",
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
