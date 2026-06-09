"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  Clock,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal effect for the footer inner content
      gsap.fromTo(
        ".footer-inner",
        { y: -60 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // Staggered entrance for columns
      gsap.from(".ft-col", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);



  return (
    <footer
      ref={containerRef}
      className="relative z-10 overflow-hidden bg-ink text-cream"
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-teal to-transparent opacity-50 z-20" />

      <div className="footer-inner pt-24 lg:pt-32 pb-10 px-8 sm:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12 lg:gap-16 border-b border-cream/10 pb-16 lg:pb-20 mb-8">
            {/* Brand Col */}
            <div className="ft-col flex flex-col items-start pr-0 lg:pr-12">
              <Link href="/" className="mb-6 hover-target">
                <Image
                  src="/assets/logo-horizontal.png"
                  alt="Delight Enterprises Logo"
                  width={150}
                  height={50}
                  className="h-auto w-auto"
                  style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
                />
              </Link>
              <span
                className="block mb-6 text-[14px] uppercase tracking-[3px] font-semibold"
                style={{ color: "var(--color-amber-vibrant)" }}
              >
                Melt N Dip · Palos Park, IL
              </span>
              <p className="font-light text-[17px] text-white leading-[1.9] max-w-[320px]">
                A sanctuary of sweetness where families gather, friendships
                blossom, and every bite brings joy. Serving the south suburbs
                with uncompromising craft.
              </p>
            </div>

            {/* Navigate Col */}
            <div className="ft-col">
              <p
                className="uppercase mb-6 text-[14px] font-semibold tracking-[2.5px]"
                style={{ color: "var(--color-amber-vibrant)" }}
              >
                Navigate
              </p>
              <ul className="list-none flex flex-col gap-4">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "Menu", href: "/catering#menu" },
                  { label: "Food Truck", href: "/catering#estimator" },
                  { label: "Melt N Dip", href: "/melt-n-dip-palos-park" },
                  { label: "Private Events", href: "/catering#estimator" },
                  { label: "Contact", href: "/#location" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[17px] font-light text-white hover:text-cream transition-colors duration-300 hover-target"
                    >
                      <span className="relative overflow-hidden pb-1">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-teal-pale origin-right transform scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0" />
                      </span>

                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-teal-pale"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu Col */}
            <div className="ft-col">
              <p
                className="uppercase mb-6 text-[14px] font-semibold tracking-[2.5px]"
                style={{ color: "var(--color-amber-vibrant)" }}
              >
                Menu Highlights
              </p>
              <ul className="list-none flex flex-col gap-4">
                {[
                  { label: "Artisan Gelato", href: "/melt-n-dip-palos-park#mnd-menu" },
                  { label: "Melt N Dip Crepes", href: "/melt-n-dip-palos-park#mnd-menu" },
                  { label: "Dubai Chocolate Crepe", href: "/melt-n-dip-palos-park#mnd-menu" },
                  { label: "Belgian Waffles", href: "/melt-n-dip-palos-park#mnd-menu" },
                  { label: "Seasonal Specials", href: "/melt-n-dip-palos-park#mnd-menu" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2 text-[17px] font-light text-white hover:text-cream transition-colors duration-300 hover-target"
                    >
                      <span className="relative overflow-hidden pb-1">
                        {label}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-teal-pale origin-right transform scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0" />
                      </span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-teal-pale"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office Info Col */}
            <div className="ft-col">
              <p
                className="uppercase mb-6 text-[14px] font-semibold tracking-[2.5px]"
                style={{ color: "var(--color-amber-vibrant)" }}
              >
                Office Info
              </p>
              <div className="flex flex-col gap-6 text-[17px]">
                {/* Hours */}
                <div className="flex gap-3">
                  <Clock
                    className="w-4 h-4 text-amber shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <p className="font-light leading-[1.7] text-white">
                    Mon – Fri: 9am – 6pm
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4 pt-2 border-t border-cream/5">
                  <a
                    href="mailto:owner@delightenterprisesllc.com"
                    className="group flex items-center gap-3 font-light text-white hover:text-amber transition-colors hover-target text-[16px]"
                  >
                    <Mail
                      className="w-4 h-4 text-amber group-hover:text-amber transition-colors"
                      strokeWidth={1.5}
                    />
                    owner@delightenterprisesllc.com
                  </a>
                  <a
                    href="tel:+16308009292"
                    className="group flex items-center gap-3 font-light text-white hover:text-amber transition-colors hover-target text-[16px]"
                  >
                    <Phone
                      className="w-4 h-4 text-amber group-hover:text-amber transition-colors"
                      strokeWidth={1.5}
                    />
                    (630) 800-9292 - Store Rental
                  </a>
                  <a
                    href="tel:+13124973697"
                    className="group flex items-center gap-3 font-light text-white hover:text-amber transition-colors hover-target text-[16px]"
                  >
                    <Phone
                      className="w-4 h-4 text-amber group-hover:text-amber transition-colors"
                      strokeWidth={1.5}
                    />
                    (312) 497-3697
                  </a>
                </div>

                {/* Mailing Address */}
                <div className="flex gap-3 pt-2 border-t border-cream/5">
                  <MapPin
                    className="w-4 h-4 text-amber shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[12px] uppercase tracking-[1.5px] text-amber mb-1 font-semibold">
                      Store Address
                    </p>
                    <p className="font-light leading-[1.7] text-white">
                      13030 Lagrange Rd
                      <br />
                      Palos Park, IL 60464
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="ft-col flex justify-center text-center">
            <p className="text-[14px] font-light text-white tracking-[1px]">
              &copy; {new Date().getFullYear()} Delight Enterprises LLC. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
