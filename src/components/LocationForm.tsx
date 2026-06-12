"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import CustomSelect from "./CustomSelect";

export default function LocationForm() {
  const containerRef = useRef<HTMLElement>(null);
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".loc-reveal-line",
        { y: "120%", rotate: 2, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".loc-left-container", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".loc-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".loc-left-container", start: "top 75%" },
        },
      );

      gsap.fromTo(
        ".form-container",
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".form-container", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".f-field",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".form-container", start: "top 75%" },
        },
      );

      gsap.fromTo(
        ".map-container",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".map-container", start: "top 90%" },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement>) =>
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

  const INFO = [
    {
      Icon: MapPin,
      label: "Store Address",
      content: (
        <p
          className="font-light transition-colors hover:text-teal-rich"
          style={{ fontSize: "18px", color: "var(--color-teal)" }}
        >
          13030 Lagrange Rd
          <br />
          Palos Park, IL 60464
        </p>
      ),
    },
    {
      Icon: Clock,
      label: "Office Hours",
      content: (
        <p
          className="font-light transition-colors hover:text-teal-rich"
          style={{ fontSize: "18px", color: "var(--color-teal)" }}
        >
          Mon – Fri: 9am – 6pm
        </p>
      ),
    },
    {
      Icon: Mail,
      label: "Email",
      content: (
        <div className="flex flex-col gap-1.5">
          <a
            href="mailto:owner@delightenterprisesllc.com"
            className="text-[14px] md:text-[18px]  font-light transition-colors hover:text-teal-rich"
            style={{ color: "var(--color-teal)" }}
          >
            owner@delightenterprisesllc.com
          </a>
          {/* <a
            href="tel:+16308009292"
            className="font-light transition-colors hover:text-teal-rich"
            style={{ fontSize: "13px", color: "var(--color-teal)" }}
          >
            (630) 800-9292 - Store Rental
          </a> */}
        </div>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      id="location"
      className="py-12 lg:pt-16 lg:pb-32 px-4 sm:px-8 lg:px-20 overflow-hidden"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* ── TOP GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 sm:gap-16 lg:gap-24 items-start">
          {/* LEFT: LOCATION INFO */}
          <div className="loc-left-container flex flex-col items-start pt-2 sm:pt-4">
            <div className="loc-fade-up section-eyebrow">
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                Get in Touch
              </span>
            </div>

            <h2
              className="font-serif font-light text-ink flex flex-col gap-1 mb-4 sm:mb-6"
              style={{
                fontSize: "clamp(32px, 8vw, 76px)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              <span className="overflow-hidden block py-1">
                <span className="loc-reveal-line block">
                  Let&apos;s Make It
                </span>
              </span>
              <span className="overflow-hidden block py-1">
                <span className="loc-reveal-line block">
                  <em className="italic" style={{ color: "var(--color-teal)" }}>
                    Sweet.
                  </em>
                </span>
              </span>
            </h2>

            <p
              className="loc-fade-up font-normal text-teal mb-8 sm:mb-12"
              style={{
                fontSize: "clamp(15px, 4vw, 20px)",
                lineHeight: 1.75,
                maxWidth: "500px",
              }}
            >
              Have questions about our catering packages, live dessert stations,
              or food truck? Reach out to plan your perfect event.
            </p>

            {/* Info rows */}
            <div className="loc-fade-up flex flex-col gap-6 sm:gap-8 w-full">
              {INFO.map(({ Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4 sm:gap-5">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "var(--color-teal-faint)",
                      border: "1px solid var(--color-teal-pale)",
                    }}
                  >
                    <Icon
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "var(--color-teal)",
                      }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-medium uppercase mb-1"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "2px",
                        color: "var(--color-umber)",
                      }}
                    >
                      {label}
                    </p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div
            id="quote"
            className="form-container relative bg-white rounded-[3px] p-5 sm:p-8 lg:p-14"
            style={{
              border: "1px solid var(--color-linen)",
              boxShadow: "0 20px 80px rgba(26,122,110,0.05)",
            }}
          >
            {/* Decorative quote mark — hidden on tiny screens */}
            <div
              className="absolute -bottom-12 -right-6 font-serif italic select-none pointer-events-none leading-none hidden sm:block"
              style={{ fontSize: "240px", color: "rgba(168,216,212,0.08)" }}
            >
              "
            </div>

            <div className="relative z-10">
              <h3
                className="font-serif font-normal text-ink mb-2"
                style={{
                  fontSize: "clamp(22px, 5vw, 30px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Request a Quote
              </h3>
              <p
                className="font-normal text-teal mb-6 sm:mb-10"
                style={{ fontSize: "clamp(13px, 3.5vw, 15px)" }}
              >
                Weddings, birthdays, corporate events &amp; more, tell us your
                vision.
              </p>

              <form
                className="flex flex-col gap-5 sm:gap-6"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Name row */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="f-field flex flex-col gap-2">
                    <label
                      htmlFor="firstName"
                      className="uppercase font-medium"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "var(--color-teal)",
                      }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Sara"
                      className="bg-transparent outline-none transition-colors placeholder:text-teal/70 font-light text-ink w-full"
                      style={{
                        borderBottom: "1px solid var(--color-linen)",
                        padding: "8px 4px",
                        fontSize: "clamp(13px, 3.5vw, 15px)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderBottomColor = "var(--color-teal)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderBottomColor =
                          "var(--color-linen)")
                      }
                    />
                  </div>
                  <div className="f-field flex flex-col gap-2">
                    <label
                      htmlFor="lastName"
                      className="uppercase font-medium"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "var(--color-teal)",
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Ahmed"
                      className="bg-transparent outline-none transition-colors placeholder:text-teal/70 font-light text-ink w-full"
                      style={{
                        borderBottom: "1px solid var(--color-linen)",
                        padding: "8px 4px",
                        fontSize: "clamp(13px, 3.5vw, 15px)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderBottomColor = "var(--color-teal)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderBottomColor =
                          "var(--color-linen)")
                      }
                    />
                  </div>
                </div>

                {/* Email + Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="f-field flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="uppercase font-medium"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "var(--color-teal)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="sara@email.com"
                      className="bg-transparent outline-none transition-colors placeholder:text-teal/70 font-light text-ink w-full"
                      style={{
                        borderBottom: "1px solid var(--color-linen)",
                        padding: "8px 4px",
                        fontSize: "clamp(13px, 3.5vw, 15px)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderBottomColor = "var(--color-teal)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderBottomColor =
                          "var(--color-linen)")
                      }
                    />
                  </div>
                  <div className="f-field flex flex-col gap-2">
                    <label
                      htmlFor="eventType"
                      className="uppercase font-medium"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "var(--color-teal)",
                      }}
                    >
                      Event Type
                    </label>
                    <CustomSelect
                      value={eventType}
                      onChange={setEventType}
                      options={[
                        "Wedding / Nikah",
                        "Birthday",
                        "Anniversary",
                        "Iftar / Eid",
                        "Corporate Event",
                        "Baby / Bridal Shower",
                        "Store Rental",
                        "Other",
                      ]}
                      placeholder="Select an occasion…"
                    />
                  </div>
                </div>

                {/* Vision textarea */}
                <div className="f-field flex flex-col gap-2 mt-1 sm:mt-2">
                  <label
                    htmlFor="vision"
                    className="uppercase font-medium"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: "var(--color-teal)",
                    }}
                  >
                    Your Vision
                  </label>
                  <textarea
                    id="vision"
                    placeholder="Date, venue, theme, guest count, dietary needs…"
                    className="bg-transparent outline-none font-light text-ink resize-none placeholder:text-teal/70 transition-colors"
                    style={{
                      borderBottom: "1px solid var(--color-linen)",
                      padding: "8px 4px",
                      fontSize: "clamp(13px, 3.5vw, 15px)",
                      height: "88px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "var(--color-teal)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = "var(--color-linen)")
                    }
                  />
                </div>

                {/* Submit */}
                <div className="f-field mt-2 sm:mt-4">
                  <button
                    type="submit"
                    onMouseMove={onMagMove}
                    onMouseLeave={onMagLeave}
                    className="cta-primary hover-target w-full flex items-center justify-center"
                    style={{
                      height: "clamp(46px, 10vw, 56px)",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                    }}
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── MAP ── */}
        <div
          className="map-container relative mt-10 sm:mt-16 w-full rounded-[3px] overflow-hidden"
          style={{
            height: "clamp(240px, 50vw, 400px)",
            border: "1px solid rgba(191,155,48,0.12)",
            boxShadow:
              "0 8px 48px rgba(0,0,0,0.12), 0 2px 12px rgba(26,122,110,0.04)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
            style={{
              width: "30%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(191,155,48,0.3), transparent)",
            }}
          />
          <iframe
            title="Melt N Dip Palos Park"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.730592409325!2d-87.85768472445187!3d41.653811579427945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e41e908329ed5%3A0x16b328b69c9db322!2sMelt%20N%20Dip!5e1!3m2!1sen!2sin!4v1775709946997!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter:
                "grayscale(0.35) contrast(1.08) brightness(0.95) sepia(0.08)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.12)",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
