"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Phone, Mail, Check } from "lucide-react";
import { BagItem } from "./data";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Props {
  bag: BagItem[];
  bagTotal: number;
  guests: string;
  eventType: string;
  serviceStyle: string;
}

export default function CateringQuoteForm({
  bag,
  bagTotal,
  guests,
  eventType,
  serviceStyle,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guests: "",
    eventType: "",
    serviceStyle: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // ── ONE single sync effect for prop values ──────────────────────
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      guests: guests ? guests : prev.guests,
      eventType: eventType ? eventType : prev.eventType,
      serviceStyle: serviceStyle ? serviceStyle : prev.serviceStyle,
    }));
  }, [guests, eventType, serviceStyle]);

  // ── Custom event for "Inquire for this Set" package button ──────
  useEffect(() => {
    const handler = (e: Event) => {
      const pkg = (
        e as CustomEvent<{
          name: string;
          guests: string;
          eventType: string;
          serviceStyle: string;
        }>
      ).detail;
      if (!pkg) return;
      setForm((prev) => ({
        ...prev,
        guests: pkg.guests || prev.guests,
        eventType: pkg.eventType || prev.eventType,
        serviceStyle: pkg.serviceStyle || prev.serviceStyle,
        details: `Interested in the ${pkg.name} package.\n\n`,
      }));
    };
    window.addEventListener("inquire-package", handler);
    return () => window.removeEventListener("inquire-package", handler);
  }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quote-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/catering-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: bag,
          estimatedTotal:
            bagTotal > 0 ? `$${bagTotal.toLocaleString()}` : undefined,
        }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call us at (630) 800-9392.");
    } finally {
      setSending(false);
    }
  };

  const onMagMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
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

  const inputClass =
    "bg-transparent border-b border-linen py-3 px-1 text-[15px] font-light text-ink outline-none focus:border-teal transition-colors w-full";
  const labelClass =
    "text-[12px] font-medium tracking-[2.5px] uppercase text-teal pl-1";

  return (
    <section
      ref={containerRef}
      id="quote"
      className="relative z-40 py-12 sm:py-16 lg:pt-20 lg:pb-36 px-4 sm:px-12 lg:px-20 max-w-[1400px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* ── LEFT - CONTACT INFO ── */}
        <div className="flex flex-col items-start pt-4">
          <div className="quote-fade opacity-0 section-eyebrow text-[15px]">
            Get in Touch
          </div>
          <h2
            className="quote-fade opacity-0 font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}
          >
            Let&apos;s Plan Your{" "}
            <em className="italic text-teal pr-2">Event</em>
          </h2>
          <p className="quote-fade opacity-0 font-light text-teal leading-[1.85] text-[17px] mb-12 max-w-[420px]">
            Tell us about your event or send us your built bag and we&apos;ll
            come back within 48 hours.
          </p>

          <div className="quote-fade opacity-0 flex flex-col gap-6 w-full">
            {[
              {
                href: "tel:+16308009392",
                Icon: Phone,
                label: "Store Rental",
                val: "(630) 800-9392",
              },
              {
                href: "tel:+13124973697",
                Icon: Phone,
                label: "Office",
                val: "(312) 497-3697",
              },
              {
                href: "mailto:owner@delightenterprisesllc.com",
                Icon: Mail,
                label: "Email",
                val: "owner@delightenterprisesllc.com",
              },
            ].map(({ href, Icon, label, val }) => (
              <a
                key={label}
                href={href}
                onMouseMove={onMagMove}
                onMouseLeave={onMagLeave}
                className="flex items-center gap-5 hover-target group w-fit"
              >
                <div className="flex items-center justify-center rounded-full shrink-0 w-11 h-11 bg-teal-faint border border-teal-pale transition-colors duration-400 group-hover:bg-teal group-hover:border-teal">
                  <Icon
                    className="w-[18px] h-[18px] text-teal transition-colors duration-400 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="font-medium text-[14px] tracking-[2px] uppercase text-umber mb-1">
                    {label}
                  </p>
                  <p className="font-light text-[16px] text-teal group-hover:text-teal-rich transition-colors">
                    {val}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Cart summary */}
          {bag.length > 0 && (
            <div className="quote-fade opacity-0 mt-10 p-6 rounded-[3px] bg-teal-faint border border-teal-pale w-full">
              <p className="text-[13px] tracking-[2px] uppercase text-teal font-medium mb-4">
                Your Cart — included with inquiry
              </p>
              <div className="flex flex-col gap-3">
                {bag.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between pb-3 border-b border-teal-pale/30"
                  >
                    <span className="text-[14px] text-ink font-light">
                      {i.name} × {i.quantity}
                    </span>
                    <span className="text-[14px] text-teal font-medium">
                      ${(i.price * i.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-[13px] font-semibold text-ink uppercase tracking-[1px]">
                  Estimated Total
                </span>
                <span className="text-[18px] font-bold text-teal">
                  ${bagTotal.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT - FORM ── */}
        <div className="quote-fade opacity-0 relative bg-white rounded-[3px] p-6 sm:p-10 lg:p-14 border border-linen shadow-[0_20px_80px_rgba(26,122,110,0.05)]">
          {submitted ? (
            <div className="relative z-10 flex flex-col items-center text-center py-12">
              <div className="flex items-center justify-center rounded-full mb-6 w-16 h-16 bg-teal-faint border border-teal-pale">
                <Check className="w-7 h-7 text-teal" strokeWidth={2} />
              </div>
              <h3 className="font-serif font-light mb-3 text-[32px] text-ink tracking-[-0.02em]">
                Inquiry Sent!
              </h3>
              <p className="text-[16px] text-teal leading-[1.8] max-w-[320px] font-light">
                We&apos;ll be in touch within 48 hours. Need us sooner?{" "}
                <a
                  href="tel:+16308009392"
                  className="text-teal font-medium hover:text-teal-rich"
                >
                  (630) 800-9392
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="font-serif font-light text-[28px] sm:text-[32px] text-ink tracking-[-0.02em] mb-2">
                Request a Quote
              </h3>
              <p className="font-normal text-[15px] text-teal mb-8 sm:mb-10">
                We respond within 48 hours.
              </p>

              <form
                className="flex flex-col gap-5 sm:gap-6"
                onSubmit={handleSubmit}
              >
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className={labelClass}>
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={field === "firstName" ? "Sara" : "Ahmed"}
                        value={form[field]}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {(["phone", "email"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className={labelClass}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "tel"}
                        required={field === "email"}
                        placeholder={
                          field === "email"
                            ? "sara@email.com"
                            : "(630) 000-0000"
                        }
                        value={form[field]}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                {/* Guest Count + Event Type — prefilled */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Guest Count</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 75"
                      value={form.guests}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, guests: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Event Type</label>
                    <input
                      type="text"
                      placeholder="Wedding, Birthday…"
                      value={form.eventType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, eventType: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Service Style — prefilled, always shown */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Service Style</label>
                  <input
                    type="text"
                    placeholder="In-house, Food Truck…"
                    value={form.serviceStyle}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, serviceStyle: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                {/* Cart summary read-only */}
                {bag.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>
                      Selected Items ({bag.length})
                    </label>
                    <div
                      className="py-3 px-1 text-[13px] font-light text-teal leading-relaxed"
                      style={{ borderBottom: "1px solid var(--color-linen)" }}
                    >
                      {bag.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                      <span className="ml-2 font-medium text-ink">
                        — Est. ${bagTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Additional Details — prefilled by package inquiry */}
                <div className="flex flex-col gap-2 mt-1 sm:mt-2">
                  <label className={labelClass}>Additional Details</label>
                  <textarea
                    value={form.details}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, details: e.target.value }))
                    }
                    placeholder="Date, venue, theme, dietary needs, any special requests…"
                    className="bg-transparent border-b border-linen py-3 px-1 text-[15px] font-light text-ink outline-none focus:border-teal transition-colors resize-none h-24 placeholder:text-teal/60"
                  />
                </div>

                {/* Submit */}
                <div className="mt-2 sm:mt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    onMouseMove={onMagMove}
                    onMouseLeave={onMagLeave}
                    className="cta-primary hover-target w-full flex items-center justify-center h-[52px] sm:h-[56px] text-[13px]"
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    {sending ? "Sending…" : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
