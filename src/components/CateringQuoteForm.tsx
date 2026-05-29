"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Check, ShoppingBag } from "lucide-react";
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
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const guestNum = parseInt(guests) || 0;
  const bagCount = bag.reduce((s, i) => s + i.quantity, 0);

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
          eventType,
          service: serviceStyle,
          guests,
          items: bag,
          estimatedTotal:
            bagTotal > 0 ? `$${bagTotal.toLocaleString()}` : undefined,
        }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call us at (708) 608-8982.");
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

  return (
    <section
      ref={containerRef}
      id="quote"
      className="relative z-40 py-24 lg:py-36 px-8 sm:px-12 lg:px-20 max-w-[1400px] mx-auto"
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
            Let &apos; s Plan Your{" "}
            <em className="italic text-teal pr-2">Event</em>
          </h2>
          <p className="quote-fade opacity-0 font-light text-teal leading-[1.85] text-[17px] mb-12 max-w-[420px]">
            Tell us about your event or send us your built bag and we &apos; ll
            come back within 48 hours.
          </p>

          <div className="quote-fade opacity-0 flex flex-col gap-6 w-full">
            {[
              {
                href: "tel:+17086088982",
                Icon: Phone,
                label: "Catering Inquiries",
                val: "(708) 608-8982",
              },
              {
                href: "tel:+16308009292",
                Icon: MapPin,
                label: "Store Rental",
                val: "(630) 800-9292",
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

          {/* Bag summary */}
          {bag.length > 0 && guestNum > 0 && (
            <div className="quote-fade opacity-0 mt-10 p-6 rounded-[3px] bg-teal-faint border border-teal-pale w-full">
              <p className="text-[13px] tracking-[2px] uppercase text-teal font-medium mb-4">
                your Cart - included with inquiry
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
                      $
                      {(
                        i.pricePerPerson *
                        i.quantity *
                        guestNum
                      ).toLocaleString()}
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
        <div className="quote-fade opacity-0 relative bg-white rounded-[3px] p-10 lg:p-14 border border-linen shadow-[0_20px_80px_rgba(26,122,110,0.05)]">
          <div className="absolute -bottom-12 -right-6 font-serif italic text-[240px] text-amber/10 select-none pointer-events-none leading-none"></div>

          {submitted ? (
            <div className="relative z-10 flex flex-col items-center text-center py-12">
              <div className="flex items-center justify-center rounded-full mb-6 w-16 h-16 bg-teal-faint border border-teal-pale">
                <Check className="w-7 h-7 text-teal" strokeWidth={2} />
              </div>
              <h3 className="font-serif font-light mb-3 text-[32px] text-ink tracking-[-0.02em]">
                Inquiry Sent!
              </h3>
              <p className="text-[16px] text-teal leading-[1.8] max-w-[320px] font-light">
                We &apos;ll be in touch within 48 hours. Need us sooner?{" "}
                <a
                  href="tel:+17086088982"
                  className="text-teal font-medium hover:text-teal-rich"
                >
                  (708) 608-8982
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="font-serif font-light text-[32px] text-ink tracking-[-0.02em] mb-2">
                Request a Quote
              </h3>
              <p className="font-normal text-[16px] text-teal mb-10">
                We respond within 48 hours.
              </p>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="text-[14px] font-medium tracking-[2.5px] uppercase text-teal pl-1">
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form[field]}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className="bg-transparent border-b border-linen py-3 px-1 text-[15px] font-light text-ink outline-none focus:border-teal transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {(["phone", "email"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="text-[14px] font-medium tracking-[2.5px] uppercase text-teal pl-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "tel"}
                        required={field === "email"}
                        value={form[field]}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className="bg-transparent border-b border-linen py-3 px-1 text-[15px] font-light text-ink outline-none focus:border-teal transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-2 relative z-0">
                  <label className="text-[15px] font-medium tracking-[2.5px] uppercase text-teal pl-1">
                    Additional Details
                  </label>
                  <textarea
                    value={form.details}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, details: e.target.value }))
                    }
                    placeholder="Date, venue, any special requests…"
                    className="bg-transparent border-b border-linen py-3 px-1 text-[15px] font-light text-ink outline-none focus:border-teal transition-colors resize-none h-24 placeholder:text-teal/80/80"
                  />
                </div>

                <div className="mt-4 relative z-0">
                  <button
                    type="submit"
                    disabled={sending}
                    onMouseMove={onMagMove}
                    onMouseLeave={onMagLeave}
                    className="cta-primary hover-target w-full flex items-center justify-center h-[56px] text-[13px]"
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
