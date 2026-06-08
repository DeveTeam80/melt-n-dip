"use client";

import styles from "../page.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MENU_CATEGORIES } from "../../components/data";
import "../../../public/assets/meltndip.css";
import {
  ArrowUpRight,
  Star,
  MapPin,
  Clock,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Heart,
  Truck,
  Building2,
  Cake,
} from "lucide-react";
import Link from "next/link";

/* -------------------------
   MND COLOR THEME  (meltndip.com palette)
   ----------------------- */
const MND = {
  bg: "#2C1911",
  bgAlt: "#231410",
  bgCard: "#3A2218",
  bgWarm: "#EDE8DB",
  gold: "#f0c06d",
  goldLight: "#D9C08E",
  goldMuted: "#9A8560",
  goldFaint: "rgba(203,171,117,0.10)",
  cream: "#cbab75",
  creamMuted: "#fff",
  creamFaint: "#8A7D6A",
  border: "rgba(203,171,117,0.15)",
  chocMid: "#5C3D28",
  borderLight: "rgba(44,25,17,0.10)",
  ink: "#2C1911",
  muted: "#7A6A58",
};

const MND_NAV = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "#mnd-menu" },
  { label: "Gallery", href: "#mnd-gallery" },
  { label: "Catering", href: "#mnd-catering" },
  { label: "Reviews", href: "#mnd-reviews" },
  { label: "Visit Us", href: "#mnd-location" },
];

const HERO_SLIDES = [
  {
    img: "https://meltndip.com/wp-content/uploads/2019/06/chocolate_1.jpg",
    headline: "Belgian Waffle",
    sub: "Taste the best Waffles in town with real Belgian chocolate & Italian gelato",
  },
  {
    img: "https://meltndip.com/wp-content/uploads/2020/06/bananacrepe.jpg",
    headline: "Banana Wrap",
    sub: "Taste the best crepe in town with banana & real Belgian chocolate",
  },
  {
    img: "https://meltndip.com/wp-content/uploads/2020/06/fettucine.jpg",
    headline: "Fettuccine Crepe",
    sub: "The tastiest fettuccine crepe slices with real Belgian chocolate & Italian gelato!",
  },
  {
    img: "https://meltndip.com/wp-content/uploads/2020/06/eclair.jpg",
    headline: "Eclair Pyramid",
    sub: "The tastiest Eclair filled with Melt N Dip special cream & covered with Belgian chocolate",
  },
  {
    img: "https://meltndip.com/wp-content/uploads/2020/06/waffle.jpg",
    headline: "Cotton Candy Waffle",
    sub: "Taste the cotton candy waffle with real Belgian chocolate and cotton candy",
  },
];

const USP_ITEMS = [
  "Belgian Chocolate",
  "Italian Gelato",
  "Satisfying Taste",
  "Awesome Aroma",
  "Premium Quality",
  "Best Ingredients",
];
const CDN = "https://meltndip.com/wp-content/uploads";

const MOSAIC_IMGS = [
  { img: "/assets/melt-n-dip-crepe.jpg", label: "Melt N Dip Crepe" },
  { img: "/assets/brownie-waffle.jpg", label: "Belgian Waffle" },
  { img: "/assets/dubai-chocolate-crepe.jpg", label: "Dubai Chocolate" },
  { img: "/assets/gelato.jpg", label: "Italian Gelato" },
];

const CATERING_SERVICES = [
  {
    Icon: Heart,
    name: "Weddings",
    desc: "Belgian chocolate pours, gelato bars & live crepe stations for your most memorable day.",
  },
  {
    Icon: Cake,
    name: "Birthdays",
    desc: "From kids' crepe parties to luxury adult soirees with custom dessert spreads.",
  },
  {
    Icon: Truck,
    name: "Food Truck",
    desc: "Bring Melt N Dip on wheels to festivals, corporate events & community gatherings.",
  },
  {
    Icon: Building2,
    name: "Store Rental",
    desc: "Hire the Palos Park store exclusively for private events & intimate celebrations.",
  },
];

const REVIEWS = [
  {
    name: "Diarra R.",
    text: "First time my husband and I saw this place on Facebook, we knew it was someplace to try! The staff was amazing and patient as we took forever to look.",
  },
  {
    name: "Killoud D.",
    text: "The staff was very friendly. The cheesecake ice cream was the best. It was fun watching them make the crepe.",
  },
  {
    name: "Kareem A.",
    text: "My experience at Melt N Dip was 10/10. Highly recommend the Melt N Dip waffle. The decoration is beautiful and everything was very exquisite.",
  },
  {
    name: "Rayan S.",
    text: "Ordered the Chocolate waffle and hot chocolate. Best I've ever had around here. The chocolate tastes amazing, restaurant is so clean.",
  },
  {
    name: "Chris M.",
    text: "I had the Lotus crepe and not only does the food look as beautiful as the pictures, it is equally as delicious as it looks.",
  },
  {
    name: "Viktor Z.",
    text: "I really enjoyed this place. The thing that I liked the most is that the pictures from the menu looked same with what you get.",
  },
  {
    name: "Justin S.",
    text: "So far so good. Between my wife and I, we had a scoop of mango, berry and strawberry Gelato. Nothing like sherbert - it's real gelato.",
  },
  {
    name: "Nancy A.",
    text: "Was staying at a hotel nearby so we ordered sweets from here thru Uber Eats. The Pina Colada Crepe was tasty. Had chunks of fresh pineapple inside.",
  },
  {
    name: "S. Shaikh",
    text: "Been here multiple times love the place. They got massive portions, so one plate should be good enough for two people.",
  },
  {
    name: "Lulu R.",
    text: "The items they do have, are really tasty and showcase a wide variety of ways to use chocolate! My favorite was the Arabic Ice cream!",
  },
  {
    name: "Sameer A.",
    text: "Dessert is legit. For the quality of the dessert, it is worth it. Plus every time I go the experience keeps getting better.",
  },
  {
    name: "Manar D.",
    text: "We came here multiple times throughout Ramadan and it was very clean. The overall atmosphere was great and we all enjoyed our time.",
  },
  {
    name: "Sheza D.",
    text: "Great great place! Such a nice atmosphere, especially the chocolate fountains and ice cream displays! The service is always polite.",
  },
  {
    name: "Goran B.",
    text: "I'm first time here and this place is great, it's very clean, modern and with friendly stuff. I tried the Eclair Pyramid and they were amazing.",
  },
];

/* =========================================================
   MND PRELOADER (disabled)
   ========================================================= */
/* Preloader was here – commented out to skip loading animation */

/* =========================================================
   MND NAVBAR COMPONENT
   ========================================================= */
function MndNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 60);

      // Hide on scroll down, show on scroll up
      if (currentScrollY <= 80) {
        setVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };
  const navBg = scrolled ? `rgba(44,25,17,0.96)` : "transparent";
  const navBlur = scrolled ? "blur(16px)" : "none";

  return (
    <>
      <div
        className="fixed inset-0 z-[190] flex flex-col justify-between items-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto py-24 px-8"
        style={{
          background: MND.bg,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div
          className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${MND.goldMuted}, transparent)`,
          }}
        />
        <div className="flex flex-col items-center w-full max-w-xs gap-0 my-auto">
          {MND_NAV.map((item, i) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="group relative w-full text-center py-6 overflow-hidden"
              style={{
                borderBottom:
                  i < MND_NAV.length - 1 ? `1px solid ${MND.border}` : "none",
                background: "none",
                border: "none",
                cursor: "none",
              }}
            >
              <span
                className="mnd-mobile-nav-item-text block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[120%]"
                style={{
                  color: MND.cream,
                  borderBottom:
                    i < MND_NAV.length - 1 ? `1px solid ${MND.border}` : "none",
                }}
              >
                {item.label}
              </span>
              <span
                className="mnd-mobile-nav-item-hover absolute inset-0 flex items-center justify-center italic translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ color: MND.gold }}
              >
                {item.label}
              </span>
            </button>
          ))}
          <button
            onClick={() => scrollTo("#mnd-catering")}
            className="mnd-mobile-nav-book-btn mt-10 w-full py-4 hover-target"
            style={{ background: MND.gold, color: MND.ink }}
          >
            Book Catering
          </button>
        </div>
        <p
          className="mnd-mobile-nav-location uppercase font-medium mt-12 shrink-0 text-center"
          style={{ color: MND.creamFaint, fontSize: "12px", letterSpacing: "2.5px" }}
        >
          Palos Park, IL
        </p>
      </div>

      <nav
        data-mnd="nav"
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 md:px-12 lg:px-16 duration-700"
        style={{
          transitionProperty: "background, backdrop-filter, WebkitBackdropFilter, padding-top, padding-bottom, transform",
          transform: (visible || menuOpen) ? "translateY(0)" : "translateY(-100%)",
          paddingTop: scrolled ? "14px" : "24px",
          paddingBottom: scrolled ? "14px" : "24px",
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom: "none",
          outline: "none",
          boxShadow: "none",
        }}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="hover-target shrink-0"
        >
          <img
            src="/assets/images/melt-n-dip-logo1.png"
            alt="Melt N Dip"
            className="mnd-nav-logo"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-1 list-none">
          {MND_NAV.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollTo(item.href)}
                className="mnd-nav-btn-none group relative block px-5 py-2 hover-target"
              >
                <div
                  className="absolute inset-0 rounded-full scale-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
                  style={{ background: MND.goldFaint }}
                />
                <span
                  className="mnd-nav-link-text relative z-10 font-medium uppercase transition-colors duration-300 group-hover:text-[#CBAB75]"
                  style={{ color: MND.creamMuted }}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("#mnd-catering")}
            className="mnd-nav-book-btn hidden sm:flex items-center justify-center hover-target"
            style={{
              padding: scrolled ? "10px 24px" : "12px 28px",
              background: MND.gold,
              color: MND.ink,
            }}
          >
            Book Catering
          </button>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className={`lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 ${menuOpen ? "items-center" : "items-end"} hover-target z-[201]`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="mnd-nav-hamburger-line block origin-center rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  background: MND.cream,
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
      </nav>
    </>
  );
}

/* =========================================================
   MND FOOTER COMPONENT
   ========================================================= */
function MndFooter() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mnd-ft-inner",
        { y: -100 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
      gsap.from(".mnd-ft-col", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      data-mnd="footer"
      className="relative z-10 overflow-hidden"
      style={{ background: MND.bg, color: MND.cream }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20 mnd-ft-top-line"
        style={{
          background: `linear-gradient(to right, transparent, ${MND.gold}, transparent)`,
        }}
      />
      <div className="mnd-ft-inner pt-24 lg:pt-32 pb-10 px-8 sm:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12 lg:gap-16 pb-16 lg:pb-20 mb-8"
            style={{ borderBottom: `1px solid ${MND.borderLight}` }}
          >
            <div className="mnd-ft-col flex flex-col items-start pr-0 lg:pr-12">
              <img
                src="assets/images/melt-n-dip-logo1.png"
                alt="Melt N Dip"
                className="mnd-ft-logo"
              />
              <span
                className="mnd-ft-brand-label block mb-5"
                style={{ color: MND.gold }}
              >
                Melt N Dip · Palos Park, IL
              </span>
              <p
                className="mnd-ft-brand-desc"
                style={{ color: MND.creamMuted }}
              >
                A sanctuary of sweetness where families gather and every bite
                brings joy. Serving the south suburbs with uncompromising craft.
              </p>
            </div>
            <div className="mnd-ft-col">
              <p
                className="mnd-ft-col-heading mb-6"
                style={{ color: MND.gold }}
              >
                Navigate
              </p>
              <ul className="list-none flex flex-col gap-4">
                {MND_NAV.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="mnd-ft-nav-link group inline-flex items-center gap-2 hover-target transition-colors duration-300"
                      style={{ color: MND.bgWarm }}
                    >
                      <span className="relative pb-px">
                        {label}
                        <span
                          className="absolute bottom-0 left-0 w-full h-px origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                          style={{ background: MND.goldMuted }}
                        />
                      </span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                        style={{ color: MND.gold }}
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mnd-ft-col">
              <p
                className="mnd-ft-col-heading mb-6"
                style={{ color: MND.gold }}
              >
                Menu Highlights
              </p>
              <ul className="list-none flex flex-col gap-4">
                {[
                  "Artisan Gelato",
                  "Melt-n-Dip Crepes",
                  "Dubai Chocolate Crepe",
                  "Belgian Waffles",
                  "Lotus Waffle",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#mnd-menu"
                      className="mnd-ft-nav-link group inline-flex items-center gap-2 hover-target transition-colors duration-300"
                      style={{ color: MND.bgWarm }}
                    >
                      <span className="relative pb-px">
                        {item}
                        <span
                          className="absolute bottom-0 left-0 w-full h-px origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                          style={{ background: MND.goldMuted }}
                        />
                      </span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                        style={{ color: MND.gold }}
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mnd-ft-col">
              <p
                className="mnd-ft-col-heading mb-6"
                style={{ color: MND.gold }}
              >
                Visit
              </p>
              <div className="mnd-ft-font-16 flex flex-col gap-6">
                <div className="flex gap-3">
                  <MapPin
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: MND.gold }}
                    strokeWidth={1.5}
                  />
                  <p
                    className="mnd-ft-address-text"
                    style={{ color: MND.bgWarm }}
                  >
                    13030 Lagrange Rd
                    <br />
                    Palos Park, IL 60464
                  </p>
                </div>
                <div className="flex gap-3">
                  <Clock
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: MND.gold }}
                    strokeWidth={1.5}
                  />
                  <p
                    className="mnd-ft-address-text"
                    style={{ color: MND.bgWarm }}
                  >
                    Sun - Thu: 12pm - 11pm
                    <br />
                    Fri - Sat: 12pm - Midnight
                  </p>
                </div>
                <div
                  className="flex flex-col gap-4 pt-2"
                  style={{ borderTop: `1px solid ${MND.borderLight}` }}
                >
                  <a
                    href="mailto:owner@delightenterprisesllc.com"
                    className="mnd-ft-contact-link group flex items-center gap-3 hover-target transition-colors duration-300"
                    style={{ color: MND.bgWarm }}
                  >
                    <Mail
                      className="w-4 h-4 shrink-0"
                      style={{ color: MND.gold }}
                      strokeWidth={1.5}
                    />
                    owner@delightenterprisesllc.com
                  </a>
                  <a
                    href="tel:+17086088982"
                    className="mnd-ft-contact-link group flex items-center gap-3 hover-target transition-colors duration-300"
                    style={{ color: MND.bgWarm }}
                  >
                    <Phone
                      className="w-4 h-4 shrink-0"
                      style={{ color: MND.gold }}
                      strokeWidth={1.5}
                    />
                    (708) 608-8982
                  </a>
                  <a
                    href="tel:+16308009292"
                    className="mnd-ft-contact-link group flex items-center gap-3 hover-target transition-colors duration-300"
                    style={{ color: MND.bgWarm }}
                  >
                    <Phone
                      className="w-4 h-4 shrink-0"
                      style={{ color: MND.gold }}
                      strokeWidth={1.5}
                    />
                    (630) 800-9292 - Store Rental
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mnd-ft-col flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="mnd-ft-copyright" style={{ color: MND.bgWarm }}>
              &copy; {new Date().getFullYear()} Delight Enterprises LLC. All
              rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                {
                  label: "Instagram",
                  url: "https://www.instagram.com/meltndip.us/",
                },
                {
                  label: "Facebook",
                  url: "https://www.facebook.com/meltndip.us",
                },
                { label: "YouTube", url: "https://www.youtube.com/@meltndip" },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mnd-ft-social-link hover-target transition-colors duration-300"
                  style={{ color: MND.bgWarm }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = MND.gold)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = MND.creamFaint)
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE COMPONENT
   ========================================================= */
export default function MeltNDipPalosPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("waffles");
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    document.body.setAttribute("data-page", "mnd");
    return () => document.body.removeAttribute("data-page");
  }, []);
  useEffect(() => {
    const iv = setInterval(
      () => setActiveSlide((p) => (p + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(iv);
  }, []);

  /* - GSAP - */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const htl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });
      htl.fromTo(
        ".mnd-hero-img-inner",
        { scale: 1.2, filter: "blur(6px) brightness(0.3)" },
        {
          scale: 1.06,
          filter: "blur(0px) brightness(1)",
          duration: 2.8,
          ease: "power2.out",
        },
        0,
      );
      htl.fromTo(
        ".mnd-hero-rl",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.18,
          ease: "power4.out",
        },
        0.5,
      );
      htl.fromTo(
        ".mnd-hero-f",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        0.9,
      );
      gsap.to(".mnd-hero-img-inner", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const revealLine = (sel: string, trigger: string) =>
        gsap.fromTo(
          sel,
          { y: "120%", rotate: 2, opacity: 0 },
          {
            y: "0%",
            rotate: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger, start: "top 75%" },
          },
        );
      const fadeUp = (sel: string, trigger: string) =>
        gsap.fromTo(
          sel,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger, start: "top 70%" },
          },
        );
      const clipReveal = (sel: string, trigger: string) =>
        gsap.fromTo(
          sel,
          { clipPath: "inset(15% 0% 15% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger, start: "top 75%" },
          },
        );

      revealLine(".mnd-bel-rl", ".mnd-bel-left");
      fadeUp(".mnd-bel-f", ".mnd-bel-left");
      clipReveal(".mnd-bel-img-w", ".mnd-bel-right");
      gsap.fromTo(
        ".mnd-bel-img-i",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".mnd-bel-right", start: "top 75%" },
        },
      );
      fadeUp(".mnd-usp-i", ".mnd-usp-strip");
      revealLine(".mnd-menu-rl", ".mnd-menu-hdr");
      gsap.fromTo(
        ".mnd-menu-hdr > div > .mnd-menu-f",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-menu-hdr", start: "top 72%" },
        },
      );
      gsap.fromTo(
        ".mnd-menu-hdr .mnd-menu-f",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-menu-hdr", start: "top 68%" },
        },
      );
      gsap.fromTo(
        ".mnd-menu-f button",
        { y: 16, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".mnd-menu-hdr", start: "top 62%" },
        },
      );
      gsap.to(".mnd-menu-hdr", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: "#mnd-menu",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.utils.toArray<HTMLElement>(".mnd-menu-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: (i % 3) * 0.07,
            scrollTrigger: {
              trigger: card,
              start: "top 93%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
      fadeUp(".mnd-mosaic-f", ".mnd-mosaic-sec");
      gsap.fromTo(
        ".mnd-mosaic-card",
        { clipPath: "inset(20% 0% 20% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".mnd-mosaic-grid", start: "top 75%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".mnd-mosaic-card").forEach((card, i) => {
        const dirs = [
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 100%)" },
        ];
        gsap.fromTo(
          card,
          { clipPath: dirs[i]?.clipPath ?? "inset(0% 100% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            ease: "power4.inOut",
            delay: i * 0.12,
            scrollTrigger: { trigger: ".mnd-mosaic-grid", start: "top 78%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".mnd-mosaic-bg").forEach((bg) => {
        gsap.fromTo(
          bg,
          { scale: 1.4 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: (bg as HTMLElement).closest(".mnd-mosaic-card"),
              start: "top 80%",
            },
          },
        );
        gsap.to(bg, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: (bg as HTMLElement).closest(".mnd-mosaic-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
      gsap.fromTo(
        ".mnd-mosaic-grid",
        { scale: 0.92, opacity: 0, borderRadius: "24px" },
        {
          scale: 1,
          opacity: 1,
          borderRadius: "6px",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-mosaic-grid", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".mnd-mosaic-card .absolute.bottom-0",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-mosaic-grid", start: "top 72%" },
        },
      );
      revealLine(".mnd-cat-rl", ".mnd-cat-sec");
      fadeUp(".mnd-cat-f", ".mnd-cat-sec");
      gsap.fromTo(
        ".mnd-cat-card .rounded-full",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".mnd-cat-grid", start: "top 82%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".mnd-cat-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0, scale: 0.94 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
        const onEnter = () =>
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.5,
            ease: "power3.out",
          });
        const onLeave = () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
          });
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        };
        const onMoveLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onMoveLeave);
      });
      revealLine(".mnd-rev-rl", ".mnd-rev-hdr");
      gsap.fromTo(
        ".mnd-rev-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-rev-grid", start: "top 80%" },
        },
      );
      revealLine(".mnd-loc-rl", ".mnd-loc-left");
      fadeUp(".mnd-loc-f", ".mnd-loc-left");
      gsap.fromTo(
        ".mnd-map-c",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mnd-map-c", start: "top 90%" },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cards = document.querySelectorAll<HTMLElement>(".mnd-menu-card");
    gsap.fromTo(
      cards,
      { x: -40, opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
      {
        x: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.out",
        delay: 0.15,
        stagger: { each: 0.08, ease: "power1.inOut" },
      },
    );
  }, [activeCategory]);

  const onMag = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.38,
      y: (e.clientY - r.top - r.height / 2) * 0.38,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const offMag = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.3)",
    });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const slide = HERO_SLIDES[activeSlide];
  const cat = MENU_CATEGORIES.find((c) => c.id === activeCategory)!;
  const totalRevPages = Math.ceil(REVIEWS.length / reviewsPerPage);
  const visRevs = REVIEWS.slice(
    reviewPage * reviewsPerPage,
    reviewPage * reviewsPerPage + reviewsPerPage,
  );

  return (
    <div
      ref={pageRef}
      className={styles.mndPage}
      style={{ background: MND.bg }}
    >
      <MndNavbar />

      {/* 1. HERO */}
      <section
        ref={heroRef}
        className="mnd-hero-section relative w-full overflow-hidden"
        style={{ background: MND.bg }}
      >
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${activeSlide === idx ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}`}
          >
            <div
              className="mnd-hero-img-inner absolute bg-cover bg-center"
              style={{
                backgroundImage: `url('${s.img}')`,
                transform: activeSlide === idx ? "scale(1.06)" : "scale(1)",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ background: `${MND.bg}0`, mixBlendMode: "multiply" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${MND.bg} 0%, ${MND.bg}F0 7%, ${MND.bg}AA 18%, ${MND.bg}44 32%, ${MND.bg}11 50%, transparent 68%)`,
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(108deg, ${MND.bg}DD 0%, ${MND.bg}88 16%, ${MND.bg}33 32%, transparent 50%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${MND.bg}EE 0%, ${MND.bg}88 5%, ${MND.bg}33 12%, transparent 22%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 45% at 58% 38%, ${MND.gold}0C 0%, transparent 65%)`,
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(to left, ${MND.bg}55 0%, transparent 20%)`,
            }}
          />
        </div>
        <div className="absolute inset-0 z-[4] flex flex-col justify-end pointer-events-none">
          <div className="px-8 sm:px-12 xl:px-20 pb-8 sm:pb-12 lg:pb-16 pointer-events-auto">
            <div
              className="mnd-hero-f flex items-center gap-3 mb-4"
              style={{ opacity: 0 }}
            >
              <span className="w-8 h-px" style={{ background: MND.gold }} />
              <span className="mnd-eyebrow-text-sm" style={{ color: MND.gold }}>
                Melt N Dip - Palos Park
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16 mb-5">
              <h1 className="mnd-hero-h1" style={{ color: MND.bgWarm }}>
                <span className="mnd-hero-rl-wrap overflow-hidden block">
                  <span
                    className="mnd-hero-rl block"
                    style={{ opacity: 0, transform: "translateY(110%)" }}
                  >
                    Craving for
                  </span>
                </span>
                <span className="mnd-hero-rl-wrap overflow-hidden block">
                  <span
                    className="mnd-hero-rl mnd-hero-headline-accent block"
                    style={{
                      opacity: 0,
                      transform: "translateY(110%)",
                      color: MND.gold,
                    }}
                  >
                    {slide.headline}?
                  </span>
                </span>
              </h1>
              <div className="mt-4 lg:mt-0 lg:text-right lg:max-w-[360px] flex flex-col items-start lg:items-end gap-5">
                <div
                  className="mnd-hero-f hidden sm:flex items-center gap-2"
                  style={{ opacity: 0 }}
                >
                  {HERO_SLIDES.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className="hover-target relative overflow-hidden transition-all duration-500"
                      style={{
                        width: activeSlide === i ? "52px" : "32px",
                        height: "32px",
                        borderRadius: activeSlide === i ? "4px" : "3px",
                        border:
                          activeSlide === i
                            ? `2px solid ${MND.gold}`
                            : `1px solid ${MND.cream}20`,
                        opacity: activeSlide === i ? 1 : 0.45,
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="mnd-hero-thumb-img"
                        style={{ backgroundImage: `url('${s.img}')` }}
                      />
                    </button>
                  ))}
                  <span className="ml-2 flex items-baseline gap-0.5">
                    <span
                      className="mnd-hero-counter-num"
                      style={{ color: MND.gold }}
                    >
                      {String(activeSlide + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="mnd-hero-counter-sep"
                      style={{ color: MND.creamFaint }}
                    >
                      /
                    </span>
                    <span
                      className="mnd-hero-counter-sep"
                      style={{ color: MND.creamFaint }}
                    >
                      {String(HERO_SLIDES.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-5"
              style={{ borderTop: `1px solid ${MND.gold}20` }}
            >
              <div
                className="mnd-hero-f flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto"
                style={{ opacity: 0 }}
              >
                <button
                  onMouseMove={onMag}
                  onMouseLeave={offMag}
                  onClick={() => scrollTo("mnd-menu")}
                  className="mnd-hero-cta-primary hover-target w-full sm:w-auto shrink-0"
                  style={{
                    background: MND.gold,
                    color: MND.ink,
                    boxShadow: `0 6px 28px ${MND.gold}35`,
                  }}
                >
                  Explore Menu
                </button>
                <button
                  onMouseMove={onMag}
                  onMouseLeave={offMag}
                  onClick={() => scrollTo("mnd-catering")}
                  className="mnd-hero-cta-secondary group flex items-center justify-center sm:justify-start gap-1.5 hover-target w-full sm:w-auto py-3 sm:py-0 shrink-0"
                  style={{ color: MND.gold }}
                >
                  <span className="relative" style={{ paddingBottom: "2px" }}>
                    Book Catering
                    <span
                      className="absolute bottom-0 left-0 w-full origin-right transition-transform duration-500 ease-out group-hover:scale-x-0 mnd-hero-cta-underline"
                      style={{ background: MND.goldMuted }}
                    />
                  </span>
                  <ArrowUpRight
                    className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              <div
                className="mnd-hero-f flex flex-wrap items-center gap-4 sm:gap-6 w-full"
                style={{ opacity: 0 }}
              >
                {["Belgian Chocolate", "Halal", "Italian Gelato"].map(
                  (text) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <span
                        className="mnd-hero-badge-star"
                        style={{ color: MND.gold }}
                      >
                        *
                      </span>
                      <span
                        className="mnd-hero-badge-text"
                        style={{ color: MND.bgWarm }}
                      >
                        {text}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BELGIAN CHOCOLATE */}
      <section
        className="mnd-bel-section grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ background: MND.bgAlt }}
      >
        <div className="mnd-bel-left flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">
          <div className="mnd-bel-f flex items-center gap-3 mb-5">
            <span
              className="w-6 h-px mnd-eyebrow-line"
              style={{ background: MND.goldMuted }}
            />
            <span className="mnd-eyebrow-text" style={{ color: MND.gold }}>
              Premium Quality
            </span>
          </div>
          <h2
            className="mnd-bel-h2 flex flex-col gap-1 mb-8"
            style={{ color: MND.cream }}
          >
            <span className="overflow-hidden block py-1">
              <span className="mnd-bel-rl block">Belgian Chocolate</span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="mnd-bel-rl block">
                for Your{" "}
                <span style={{ fontWeight: 600, color: MND.bgWarm }}>
                  Sweet Tooth
                </span>
              </span>
            </span>
          </h2>
          <p
            className="mnd-bel-f mnd-bel-desc"
            style={{ color: MND.creamMuted }}
          >
            At Melt N Dip, we use only premium quality ingredients and 100%
            Belgian chocolate to satisfy your taste buds and elevate your mood!
            Our tagline says it all -{" "}
            <span className="mnd-bel-highlight" style={{ color: MND.gold }}>
              Satisfy Your Spirit!
            </span>
          </p>
          <div className="mnd-bel-f flex justify-between max-w-[400px] mt-12">
            {[
              { num: "100", sup: "%", label: "Belgian Chocolate" },
              { num: "3", sup: "+", label: "Countries" },
              { num: "4.9", sup: "*", label: "Google Rating" },
            ].map(({ num, sup, label }, i, arr) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col py-2 px-4 sm:px-6">
                  <div
                    className="mnd-bel-stat-num"
                    style={{ color: MND.cream }}
                  >
                    {num}
                    <span
                      className="mnd-bel-stat-sup"
                      style={{ color: MND.gold }}
                    >
                      {sup}
                    </span>
                  </div>
                  <div
                    className="mnd-bel-stat-label"
                    style={{ color: MND.goldMuted }}
                  >
                    {label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="h-12 mnd-bel-stat-divider"
                    style={{ background: MND.border }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mnd-bel-f flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-12 sm:mt-16 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("mnd-menu")}
              onMouseMove={onMag}
              onMouseLeave={offMag}
              className="mnd-bel-btn-primary hover-target flex items-center justify-center w-full sm:w-[200px]"
              style={{ background: MND.gold, color: MND.ink }}
            >
              Check our Menu
            </button>
            <button
              onClick={() => scrollTo("mnd-catering")}
              onMouseMove={onMag}
              onMouseLeave={offMag}
              className="mnd-btn-secondary group flex items-center justify-center sm:justify-start gap-2 hover-target w-full sm:w-auto py-3 sm:py-0"
              style={{ color: MND.gold }}
            >
              <span className="relative overflow-hidden pb-1">
                Book Catering
                <span
                  className="absolute bottom-0 left-0 w-full h-px origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                  style={{ background: MND.goldMuted }}
                />
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
        <div
          className="mnd-bel-right relative flex flex-col min-h-[500px] lg:min-h-full gap-1"
          style={{ background: MND.bgCard }}
        >
          <div className="mnd-bel-img-w relative overflow-hidden flex-[1]">
            <div
              className="mnd-bel-img-i"
              style={{
                backgroundImage:
                  "url('https://meltndip.com/wp-content/uploads/2020/06/eclair.jpg')",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${MND.bgCard}99, transparent)`,
              }}
            />
          </div>
          <div className="mnd-bel-img-w relative overflow-hidden flex-[1]">
            <div
              className="mnd-bel-img-i"
              style={{
                backgroundImage: "url('/assets/store-exterior-night.jpg')",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${MND.bg}CC, ${MND.bg}33, transparent)`,
              }}
            />
          </div>
          <div
            className="absolute left-0 top-[20%] bottom-[20%] w-px pointer-events-none z-20"
            style={{
              background: `linear-gradient(to bottom, transparent, ${MND.goldMuted}40, transparent)`,
            }}
          />
        </div>
      </section>

      {/* 3. USP STRIP */}
      <div
        className="mnd-usp-strip"
        style={{
          background: MND.bg,
          borderTop: `1px solid ${MND.border}`,
          borderBottom: `1px solid ${MND.border}`,
        }}
      >
        <div className="px-8 sm:px-12 lg:px-20 py-10 flex flex-wrap justify-center gap-x-12 gap-y-5">
          {USP_ITEMS.map((text) => (
            <div key={text} className="mnd-usp-i flex items-center gap-3">
              <span className="mnd-usp-dot" style={{ color: MND.gold }}>
                *
              </span>
              <span className="mnd-usp-text" style={{ color: MND.creamMuted }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MENU */}
      <section
        id="mnd-menu"
        className="mnd-menu-section-bg relative py-20 lg:py-32 overflow-hidden"
      >
        <div className="mnd-menu-texture-overlay absolute inset-0 pointer-events-none z-0" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at top right, ${MND.gold}10 0%, transparent 65%)`,
          }}
        />
        <div className="relative z-10 px-8 sm:px-12 lg:px-20">
          <div className="mnd-menu-hdr grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
            <div>
              <div
                className="mnd-menu-f mnd-eyebrow-text-sm flex items-center gap-4 mb-5"
                style={{ color: MND.goldMuted }}
              >
                <span
                  className="w-8 h-px"
                  style={{ background: MND.goldMuted }}
                />
                Melt N Dip Menu
              </div>
              <h2
                className="mnd-menu-h2 flex flex-col gap-1 mb-6"
                style={{ color: MND.ink }}
              >
                <span className="overflow-hidden block py-1">
                  <span className="mnd-menu-rl block">
                    Satisfy your{" "}
                    <span
                      className="mnd-menu-h2-accent"
                      style={{ color: MND.chocMid }}
                    >
                      Spirit!
                    </span>
                  </span>
                </span>
              </h2>
              <p
                className="mnd-menu-f mnd-menu-desc"
                style={{ color: MND.ink }}
              >
                Every dessert crafted with premium ingredients and 100% Belgian
                chocolate from our signature crepes and waffles to authentic
                Italian gelato.
              </p>
            </div>
            <div className="mnd-menu-f hidden lg:flex items-end gap-0 mb-1">
              {[
                { num: "40+", label: "Menu Items" },
                { num: "3", label: "Chocolate Types" },
                { num: "4.9", label: "Google Rating" },
              ].map(({ num, label }, i, arr) => (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center px-8 py-4">
                    <span
                      className="mnd-menu-stat-num"
                      style={{ color: MND.cream }}
                    >
                      {num}
                    </span>
                    <span
                      className="mnd-menu-stat-label"
                      style={{ color: MND.goldMuted }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="h-10 w-px"
                      style={{ background: MND.border }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mnd-menu-f flex flex-wrap gap-2 mb-10 d-flex justify-evenly">
            {MENU_CATEGORIES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                onMouseMove={onMag}
                onMouseLeave={offMag}
                className="mnd-menu-tab-btn hover-target flex items-center gap-2"
                style={{
                  background:
                    activeCategory === id ? MND.gold : `${MND.gold}10`,
                  color: activeCategory === id ? MND.ink : MND.bgCard,
                  outline:
                    activeCategory === id ? "none" : `1px solid ${MND.gold}25`,
                  boxShadow:
                    activeCategory === id ? `0 4px 20px ${MND.gold}30` : "none",
                }}
              >
                <Icon className="mnd-menu-tab-icon" strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map((item) => (
              <div
                key={item.name}
                className="mnd-menu-card group relative flex items-center gap-4 overflow-hidden hover-target cursor-default"
                style={{
                  background: MND.bgCard,
                  border: `1px solid ${MND.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${MND.gold}30`;
                  e.currentTarget.style.borderColor = `${MND.gold}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = MND.border;
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: `linear-gradient(to right, ${MND.gold}, transparent)`,
                  }}
                />
                <div
                  className="mnd-menu-card-img-wrap shrink-0 overflow-hidden"
                  style={{ background: MND.bg }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    width={68}
                    height={68}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="mnd-menu-card-name truncate mb-1 transition-colors duration-300 group-hover:text-[#f0c06d]"
                    style={{ color: MND.bgWarm }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="mnd-menu-card-desc line-clamp-2 transition-colors duration-300"
                    style={{ color: MND.bgWarm }}
                  >
                    {item.desc}
                  </p>
                  <div
                    className="mt-2 h-px w-0 group-hover:w-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: MND.gold }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="mnd-menu-f flex items-center justify-between mt-14 pt-8"
            style={{ borderTop: `1px solid ${MND.border}` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="mnd-menu-glow-dot"
                style={{
                  background: MND.gold,
                  boxShadow: `0 0 8px ${MND.gold}`,
                }}
              />
              <span className="mnd-menu-cta-text" style={{ color: MND.ink }}>
                All items crafted with{" "}
                <span
                  className="mnd-menu-cta-text-bold"
                  style={{ color: MND.cream }}
                >
                  100% Belgian Chocolate
                </span>
              </span>
            </div>
            <button
              onMouseMove={onMag}
              onMouseLeave={offMag}
              onClick={() => scrollTo("mnd-catering")}
              className="mnd-menu-cta-btn group hover-target hidden sm:flex items-center gap-2"
              style={{ background: MND.gold, color: MND.ink }}
            >
              Book Catering
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 5. GALLERY + VIDEO */}
      <section
        id="mnd-gallery"
        className="mnd-mosaic-sec py-20 lg:py-28 px-8 sm:px-12 lg:px-20"
        style={{ background: MND.bg }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1200px] mx-auto">
          <div>
            <div className="mnd-mosaic-f flex items-center gap-3 mb-5">
              <span
                className="w-6 h-px mnd-eyebrow-line"
                style={{ background: MND.goldMuted }}
              />
              <span className="mnd-eyebrow-text" style={{ color: MND.gold }}>
                See it in Action
              </span>
            </div>
            <h2
              className="mnd-mosaic-f mnd-mosaic-h2 mb-2"
              style={{ color: MND.cream }}
            >
              Crepes &amp; Waffles
            </h2>
            <h3
              className="mnd-mosaic-f mnd-mosaic-h3"
              style={{ color: MND.bgWarm }}
            >
              Belgian Chocolate
            </h3>
            <p
              className="mnd-mosaic-f mnd-mosaic-desc mt-6 mb-8"
              style={{ color: MND.bgWarm }}
            >
              Watch how our artisans craft every dessert with precision and
              passion, using only the finest Belgian chocolate.
            </p>
            <div
              className="mnd-mosaic-f mnd-mosaic-yt-wrap relative overflow-hidden rounded-[3px] group cursor-pointer"
              style={{ background: MND.bgCard }}
              onClick={() => {
                const el = document.getElementById(
                  "mnd-yt-frame",
                ) as HTMLIFrameElement | null;
                const wrap = document.getElementById("mnd-yt-wrap");
                if (el)
                  el.src =
                    "https://www.youtube.com/embed/uGZx4GfAF7g?autoplay=1";
                if (wrap) wrap.style.opacity = "1";
                const overlay = document.getElementById("mnd-yt-overlay");
                if (overlay) overlay.style.display = "none";
              }}
            >
              <img
                src="https://img.youtube.com/vi/uGZx4GfAF7g/maxresdefault.jpg"
                alt="Melt N Dip video"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
                style={{
                  background: `linear-gradient(135deg, ${MND.bg}CC 0%, ${MND.bg}66 50%, transparent 100%)`,
                }}
              />
              <div
                id="mnd-yt-overlay"
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
              >
                <div className="relative flex items-center justify-center mb-3 sm:mb-5 transition-transform duration-500 group-hover:scale-110">
                  <div
                    className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full animate-ping opacity-20"
                    style={{ background: MND.gold }}
                  />
                  <div
                    className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(240,192,109,0.5)]"
                    style={{
                      background: MND.gold,
                      boxShadow: `0 8px 32px rgba(240,192,109,0.35)`,
                    }}
                  >
                    <div
                      className="mnd-yt-play-triangle"
                      style={{ borderLeft: `clamp(12px, 3vw, 20px) solid ${MND.ink}` }}
                    />
                  </div>
                </div>
                <p className="mnd-yt-play-label" style={{ color: MND.bgWarm }}>
                  Watch Video
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: `linear-gradient(to right, ${MND.gold}, transparent)`,
                  }}
                />
              </div>
              <div
                id="mnd-yt-wrap"
                className="mnd-yt-wrap absolute inset-0 z-20"
              >
                <iframe
                  id="mnd-yt-frame"
                  src=""
                  title="Melt N Dip - Belgian Chocolate"
                  className="mnd-yt-iframe w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="mnd-mosaic-grid grid grid-cols-2 gap-3">
            {MOSAIC_IMGS.map(({ img, label }, i) => (
              <div
                key={label}
                className="mnd-mosaic-card group relative overflow-hidden rounded-[6px] cursor-pointer"
                style={{
                  background: MND.bgCard,
                  border: `1px solid ${MND.border}`,
                  gridRow: i === 0 ? "span 1" : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${MND.gold}30`;
                  e.currentTarget.style.zIndex = "10";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.zIndex = "auto";
                }}
              >
                <div
                  className="mnd-mosaic-bg absolute bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
                  style={{ backgroundImage: `url('${img}')` }}
                />
                <div className="mnd-mosaic-dark-grad absolute inset-0" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${MND.gold}18 0%, transparent 50%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                  style={{
                    background: `linear-gradient(to right, ${MND.gold}, transparent)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div
                    className="mb-3 h-px w-0 group-hover:w-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: MND.gold }}
                  />
                  <p
                    className="mnd-mosaic-card-label"
                    style={{ color: MND.bgWarm }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CATERING */}
      <section
        id="mnd-catering"
        className="py-24 lg:py-36 px-8 sm:px-12 lg:px-20"
        style={{ background: MND.bgAlt }}
      >
        <div className="mnd-cat-sec grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="mnd-cat-f flex items-center gap-3 mb-5">
              <span
                className="w-6 h-px mnd-eyebrow-line"
                style={{ background: MND.goldMuted }}
              />
              <span className="mnd-eyebrow-text" style={{ color: MND.gold }}>
                Delight Enterprises LLC
              </span>
            </div>
            <h2
              className="mnd-cat-h2 flex flex-col gap-1 mb-6"
              style={{ color: MND.cream }}
            >
              <span className="overflow-hidden block py-1">
                <span className="mnd-cat-rl block">We Bring the</span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="mnd-cat-rl block">
                  <span style={{ fontWeight: 600, color: MND.bgWarm }}>
                    Delight
                  </span>{" "}
                  to You
                </span>
              </span>
            </h2>
            <p
              className="mnd-cat-f mnd-cat-desc"
              style={{ color: MND.creamMuted }}
            >
              Delight Enterprises LLC - the official Melt N Dip franchise owner
              in Palos Park - brings the full Melt N Dip catering experience to
              your events. From the aroma of warm Belgian chocolate to live
              crepe stations, every detail is crafted to{" "}
              <span className="mnd-cat-highlight" style={{ color: MND.gold }}>
                Satisfy Your Spirit.
              </span>
            </p>
            <p
              className="mnd-cat-f mnd-cat-sub-desc"
              style={{ color: MND.bgWarm }}
            >
              We cater Weddings, Graduations, Iftar &amp; Eid, Corporate Events,
              Birthdays, Book Clubs &amp; Drop-Off Trays. We respond to all
              inquiries within 48 hours.
            </p>
            <div className="mnd-cat-f flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto mt-8">
              <Link
                href="/catering"
                onMouseMove={onMag}
                onMouseLeave={offMag}
                className="mnd-cat-btn-primary hover-target inline-flex items-center justify-center w-full sm:w-auto"
                style={{ background: MND.gold, color: MND.ink }}
              >
                View Catering Packages
              </Link>
              <Link
                href="/#quote"
                onMouseMove={onMag}
                onMouseLeave={offMag}
                className="mnd-btn-secondary group inline-flex items-center justify-center sm:justify-start gap-2 hover-target w-full sm:w-auto py-3 sm:py-0"
                style={{ color: MND.gold }}
              >
                <span className="relative pb-0.5">
                  Get a Quote
                  <span
                    className="absolute bottom-0 left-0 w-full h-px origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500"
                    style={{ background: MND.goldMuted }}
                  />
                </span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
          <div className="mnd-cat-grid flex flex-col gap-0">
            {CATERING_SERVICES.map(({ Icon, name, desc }, i) => (
              <div
                key={name}
                className="mnd-cat-card group relative overflow-hidden hover-target cursor-default flex items-center gap-6"
                style={{
                  borderBottom:
                    i < CATERING_SERVICES.length - 1
                      ? `1px solid ${MND.border}`
                      : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${MND.gold}08`;
                  e.currentTarget.style.paddingLeft = "44px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "32px";
                }}
              >
                <div
                  className="mnd-cat-gold-bar absolute left-0 top-0 bottom-0 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: `linear-gradient(to bottom, ${MND.gold}, ${MND.goldMuted}60)`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className="mnd-cat-card-icon"
                      style={{ color: MND.gold }}
                      strokeWidth={1.5}
                    />
                    <p
                      className="mnd-cat-card-name"
                      style={{ color: MND.bgWarm }}
                    >
                      {name}
                    </p>
                  </div>
                  <p
                    className="mnd-cat-card-desc"
                    style={{ color: MND.creamFaint }}
                  >
                    {desc}
                  </p>
                </div>
                <div className="shrink-0 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <ArrowUpRight
                    className="mnd-cat-card-arrow"
                    style={{ color: MND.gold }}
                    strokeWidth={1.5}
                  />
                </div>
                <div
                  className="mnd-cat-card-ghost-num absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none"
                  style={{ color: `${MND.gold}06` }}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section
        id="mnd-reviews"
        className="py-24 lg:py-36 px-8 sm:px-12 lg:px-20"
        style={{ background: MND.bgWarm }}
      >
        <div className="mnd-rev-hdr text-center max-w-[580px] mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="mnd-rev-eyebrow" style={{ color: MND.goldMuted }}>
              Some of Our Reviews on Google
            </span>
          </div>
          <h2
            className="mnd-rev-h2 flex flex-col items-center gap-1 mb-6"
            style={{ color: MND.ink }}
          >
            <span className="overflow-hidden block py-1">
              <span className="mnd-rev-rl block">
                What Our{" "}
                <span
                  className="mnd-rev-h2-accent"
                  style={{ color: MND.chocMid }}
                >
                  Clients
                </span>
              </span>
            </span>
            <span className="overflow-hidden block py-1">
              <span className="mnd-rev-rl block">Say?</span>
            </span>
          </h2>
        </div>
        <div className="mnd-rev-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {visRevs.map(({ name, text }) => (
            <div
              key={name}
              className="mnd-rev-card relative rounded-[3px] p-8 lg:p-10 hover-target transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(26,10,0,0.10)]"
            >
              <div
                className="mnd-rev-quote-mark absolute -top-3 left-8 select-none pointer-events-none"
                style={{ color: `${MND.gold}22` }}
              >
                &ldquo;
              </div>
              <div className="flex items-center gap-0.5 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="mnd-rev-star"
                    style={{ fill: MND.gold, color: MND.gold }}
                  />
                ))}
              </div>
              <p
                className="mnd-rev-text relative z-10 mb-6"
                style={{ color: MND.muted }}
              >
                {text}
              </p>
              <div className="mnd-rev-divider relative z-10 flex items-center gap-3 pt-5">
                <div
                  className="mnd-rev-avatar flex items-center justify-center rounded-full shrink-0"
                  style={{
                    background: MND.goldFaint,
                    border: `1px solid ${MND.goldMuted}30`,
                  }}
                >
                  <span
                    className="mnd-rev-avatar-initial"
                    style={{ color: MND.goldMuted }}
                  >
                    {name[0]}
                  </span>
                </div>
                <div>
                  <p className="mnd-rev-name" style={{ color: MND.ink }}>
                    {name}
                  </p>
                  <p className="mnd-rev-source" style={{ color: MND.muted }}>
                    Google Review
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalRevPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
              disabled={reviewPage === 0}
              onMouseMove={onMag}
              onMouseLeave={offMag}
              className="mnd-rev-pagination-btn hover-target flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: reviewPage === 0 ? "#E8E0D0" : MND.goldFaint,
                border: `1px solid ${reviewPage === 0 ? "#E8E0D0" : MND.goldMuted}40`,
                opacity: reviewPage === 0 ? 0.4 : 1,
              }}
            >
              <ChevronLeft
                className="mnd-rev-pagination-icon"
                style={{ color: MND.goldMuted }}
                strokeWidth={1.5}
              />
            </button>
            <span
              className="mnd-rev-pagination-count"
              style={{ color: MND.muted }}
            >
              {reviewPage + 1} / {totalRevPages}
            </span>
            <button
              onClick={() =>
                setReviewPage((p) => Math.min(totalRevPages - 1, p + 1))
              }
              disabled={reviewPage === totalRevPages - 1}
              onMouseMove={onMag}
              onMouseLeave={offMag}
              className="mnd-rev-pagination-btn hover-target flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background:
                  reviewPage === totalRevPages - 1 ? "#E8E0D0" : MND.goldFaint,
                border: `1px solid ${reviewPage === totalRevPages - 1 ? "#E8E0D0" : MND.goldMuted}40`,
                opacity: reviewPage === totalRevPages - 1 ? 0.4 : 1,
              }}
            >
              <ChevronRight
                className="mnd-rev-pagination-icon"
                style={{ color: MND.goldMuted }}
                strokeWidth={1.5}
              />
            </button>
          </div>
        )}
      </section>

      {/* 8. LOCATION */}
      <section
        id="mnd-location"
        className="py-20 lg:py-24 px-8 sm:px-12 lg:px-20 overflow-hidden"
        style={{ background: MND.bgAlt }}
      >
        <div className="mnd-loc-left grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="flex flex-col items-start pt-4">
            <div className="mnd-loc-f flex items-center gap-3 mb-5">
              <span
                className="w-6 h-px mnd-eyebrow-line"
                style={{ background: MND.goldMuted }}
              />
              <span className="mnd-eyebrow-text" style={{ color: MND.gold }}>
                Visit Us
              </span>
            </div>
            <h2
              className="mnd-loc-h2 flex flex-col gap-1 mb-6"
              style={{ color: MND.cream }}
            >
              <span className="overflow-hidden block py-1">
                <span className="mnd-loc-rl block">Come In.</span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="mnd-loc-rl block">
                  <span
                    className="mnd-loc-h2-accent"
                    style={{ color: MND.bgWarm }}
                  >
                    Stay a While.
                  </span>
                </span>
              </span>
            </h2>
            <p
              className="mnd-loc-f mnd-loc-desc"
              style={{ color: MND.creamMuted }}
            >
              Located on Lagrange Road in Palos Park, a short
              drive from Lemont, Orland Park, Homer Glen, and Tinley Park.
            </p>
            <div className="mnd-loc-f flex flex-col gap-8 w-full mt-12">
              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  content: (
                    <p
                      className="mnd-loc-info-text"
                      style={{ color: MND.creamMuted }}
                    >
                      13030 Lagrange Rd
                      <br />
                      Palos Park, IL 60464
                    </p>
                  ),
                },
                {
                  Icon: Clock,
                  label: "Hours",
                  content: (
                    <p
                      className="mnd-loc-info-text"
                      style={{ color: MND.creamMuted }}
                    >
                      Sun - Thu: 12pm - 11pm
                      <br />
                      Fri - Sat: 12pm - Midnight
                    </p>
                  ),
                },
                {
                  Icon: Mail,
                  label: "Contact",
                  content: (
                    <a
                      href="mailto:owner@delightenterprisesllc.com"
                      className="mnd-loc-info-text transition-all duration-300 hover:text-white hover:underline"
                      style={{ color: MND.bgWarm }}
                    >
                      owner@delightenterprisesllc.com
                    </a>
                  ),
                },
              ].map(({ Icon, label, content }) => (
                <div key={label} className="flex items-start gap-5">
                  <div
                    className="mnd-loc-icon-circle flex items-center justify-center rounded-full shrink-0"
                    style={{
                      background: MND.goldFaint,
                      border: `1px solid ${MND.goldMuted}30`,
                    }}
                  >
                    <Icon
                      className="mnd-loc-icon"
                      style={{ color: MND.gold }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p
                      className="mnd-loc-info-label"
                      style={{ color: MND.goldMuted }}
                    >
                      {label}
                    </p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mnd-loc-f flex items-center gap-6 mt-12 pt-8"
              style={{ borderTop: `1px solid ${MND.border}` }}
            >
              {[
                {
                  label: "Instagram",
                  url: "https://www.instagram.com/meltndip.us/",
                },
                {
                  label: "Facebook",
                  url: "https://www.facebook.com/meltndip.us",
                },
                { label: "YouTube", url: "https://www.youtube.com/@meltndip" },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mnd-loc-social-link group flex items-center gap-1.5 hover-target"
                  style={{ color: MND.gold }}
                >
                  {label}
                  <ArrowUpRight
                    className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>
          <div
            className="mnd-loc-f mnd-loc-card relative p-10 lg:p-14"
            style={{
              background: MND.bgCard,
              border: `1px solid ${MND.border}`,
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-5 h-px" style={{ background: MND.gold }} />
                <span
                  className="mnd-loc-card-eyebrow-text"
                  style={{ color: MND.gold }}
                >
                  Powered by Delight
                </span>
              </div>
              <h3 className="mnd-loc-card-h3" style={{ color: MND.cream }}>
                Melt N Dip Palos Park
              </h3>
              <p
                className="mnd-loc-card-desc"
                style={{ color: MND.creamMuted }}
              >
                Owned and operated by Delight Enterprises LLC - a team united by
                a single belief: that dessert should Satisfy Your Spirit. We
                brought Melt N Dip to Palos Park and we&apos;re here to stay.
              </p>
              <Link
                href="/catering"
                onMouseMove={onMag}
                onMouseLeave={offMag}
                className="mnd-loc-card-btn hover-target inline-flex items-center justify-center gap-2"
                style={{ background: MND.gold, color: MND.ink }}
              >
                Book Catering
                <ArrowUpRight
                  className="mnd-loc-card-btn-icon"
                  strokeWidth={1.5}
                />
              </Link>
              <div
                className="flex flex-col gap-4 mt-10 pt-8"
                style={{ borderTop: `1px solid ${MND.border}` }}
              >
                {[
                  { text: "View Full Menu", href: "#mnd-menu" },
                  { text: "Catering Packages", href: "/catering" },
                  { text: "Get a Quote", href: "/#quote" },
                ].map(({ text, href }) => (
                  <Link
                    key={text}
                    href={href}
                    className="group flex items-center justify-between hover-target transition-all duration-300 py-3"
                    style={{ borderBottom: `1px solid ${MND.border}` }}
                  >
                    <span
                      className="mnd-loc-link-text"
                      style={{ color: MND.gold }}
                    >
                      {text}
                    </span>
                    <ArrowUpRight
                      className="mnd-loc-link-icon transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: MND.goldMuted }}
                      strokeWidth={1.5}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="mnd-map-c"
          style={{ border: `1px solid ${MND.border}` }}
        >
          <iframe
            title="Melt N Dip Palos Park"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.793214878652!2d-87.85457382337777!3d41.66258937126131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e22709cf7d953%3A0x6b6a0378e9f5651e!2s13030%20LaGrange%20Rd%2C%20Palos%20Park%2C%20IL%2060464!5e0!3m2!1sen!2sus!4v1717238400000!5m2!1sen!2sus"
            className="mnd-map-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <MndFooter />
    </div>
  );
}
