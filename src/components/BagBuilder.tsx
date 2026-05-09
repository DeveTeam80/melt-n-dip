"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Plus, Minus, Check, ShoppingBag, ArrowUpRight, Sparkles, Wand2 } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MENU, PACKAGES, EVENT_TYPES, SERVICE_STYLES, BagItem } from "./data";
import CustomSelect from "./CustomSelect";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Props {
  guests: string; setGuests: (v: string) => void;
  eventType: string; setEventType: (v: string) => void;
  serviceStyle: string; setServiceStyle: (v: string) => void;
  bag: BagItem[]; bagTotal: number; bagCount: number;
  onAdd: (item: { id: string; name: string; pricePerPerson: number }, category: string, initialQty?: number) => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, quantity: number) => void;
  onOpenBag: () => void;
  getQty: (id: string) => number;
}

export default function BagBuilder({
  guests, setGuests, eventType, setEventType, serviceStyle, setServiceStyle,
  bag, bagTotal, bagCount, onAdd, onRemove, onUpdateQty, onOpenBag, getQty,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const guestNum = parseInt(guests) || 0;

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".builder-reveal-line", { y: "120%", rotate: 2, opacity: 0 }, { y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } });
      gsap.fromTo(".builder-fade-up", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".menu-item-card");
    gsap.fromTo(cards, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: true });
  }, [activeTab]);

  const onMagMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power2.out" });
  };
  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });

  return (
    <section ref={containerRef} id="estimator" className="relative z-40 py-24 lg:py-32 px-8 sm:px-12 lg:px-20 max-w-[1400px] mx-auto">
      
      {/* Header Section */}
      <div className="mb-16 lg:mb-20">
        <div className="builder-fade-up opacity-0 section-eyebrow">
            <span style={{
            fontSize: "12px",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            color: "var(--color-teal)",
          }}>The Estimator</span></div>
        <h2 className="font-serif font-light text-ink tracking-tight flex flex-col gap-1 mb-6" style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: "1.05" }}>
          <span className="overflow-hidden block py-1"><span className="builder-reveal-line block opacity-0">Craft Your Event</span></span>
          <span className="overflow-hidden block py-1"><span className="builder-reveal-line block opacity-0"><em className="italic text-teal pr-2">Your Way</em></span></span>
        </h2>
      </div>

      {/* Inputs Bar */}
      <div className="builder-fade-up opacity-0 relative z-50 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-8 lg:gap-12 mb-24 p-8 lg:p-12 rounded-[3px] bg-parchment border border-linen shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-2 border-b lg:border-b-0 lg:border-r border-linen pb-8 lg:pb-0 lg:pr-12">
          <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal mb-2">Guest Count <span className="text-amber">*</span></label>
          <input type="number" min="1" placeholder="75" value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent outline-none font-serif font-light text-ink w-full placeholder:text-teal/80/90" style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.02em", lineHeight: 1 }} />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:pr-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal">Event Type</label>
            <CustomSelect value={eventType} onChange={setEventType} options={EVENT_TYPES} placeholder="Select occasion..." />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] tracking-[3px] uppercase font-medium text-teal">Service Style</label>
            <CustomSelect value={serviceStyle} onChange={setServiceStyle} options={SERVICE_STYLES} placeholder="Select style..." />
          </div>
        </div>
      </div>

      {/* --- OPTION A: PREDEFINED --- */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="uppercase text-[14px] tracking-[3px] font-bold text-ink">Option A: Curated Packages</h3>
          <div className="h-[1px] flex-1 bg-linen"></div>
        </div>
        
        <div className="builder-fade-up opacity-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className="group relative p-8 rounded-[3px] bg-ink text-paper border border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-12 h-12" />
              </div>
              <p className="font-serif text-[22px] mb-2">{pkg.name}</p>
              <p className="text-[15px] text-paper leading-relaxed mb-6 h-12 line-clamp-2">{pkg.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-amber text-xl font-medium">${pkg.min}</span>
                <span className="text-paper/80 text-[14px] uppercase tracking-wider">Starting per head</span>
              </div>
              <button className="w-full py-3 border border-white/20 text-[14px] uppercase tracking-[2px] hover:bg-white hover:text-ink transition-colors duration-300">
                Inquire for this Set
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- DIVIDER --- */}
      <div className="relative py-20 flex justify-center items-center">
        <div className="absolute w-full h-[1px] bg-linen"></div>
        <div className="relative z-10 bg-paper px-6 py-2 border border-linen rounded-full font-serif font-bold text-teal text-lg shadow-sm">
          or build your own
        </div>
      </div>

      {/* --- OPTION B: CUSTOM --- */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-10">
          <h3 className="uppercase text-[14px] tracking-[3px] font-bold text-ink">Option B: Choose from the Menu!</h3>
          <div className="h-[1px] flex-1 bg-linen"></div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {MENU.map((cat, i) => (
            <button key={cat.category} onClick={() => setActiveTab(i)} className={`px-6 py-2.5 rounded-full text-[14px] tracking-[1.5px] font-medium uppercase transition-all duration-300 ${activeTab === i ? "bg-teal text-white shadow-lg shadow-teal/20" : "bg-white text-teal border border-linen hover:border-teal/30"}`}>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {MENU[activeTab].items.map((item) => {
            const qty = getQty(item.id);
            const isSelected = qty > 0;
            return (
              <div key={item.id} className={`menu-item-card p-8 rounded-[3px] border transition-all duration-500 ${isSelected ? "bg-white border-teal shadow-xl" : "bg-white border-linen"}`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-serif font-medium text-lg text-ink leading-tight">{item.name}</h4>
                  <span className="text-[15px] font-medium text-teal bg-teal-faint px-2 py-1 rounded">${item.pricePerPerson} / pp</span>
                </div>
                <p className="text-[15px] font-light text-teal leading-relaxed mb-8">{item.desc}</p>
                
                <div className="flex items-center justify-between">
                   {isSelected ? (
                    <div className="flex items-center gap-4 bg-parchment rounded-full p-1 border border-linen">
                      <button onClick={() => onRemove(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-ink transition-colors"><Minus className="w-3 h-3" /></button>
                      <input type="number" value={qty} onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value) || 0)} className="w-14 text-center bg-transparent text-[13px] font-bold outline-none" />
                      <button onClick={() => onAdd(item, MENU[activeTab].category)} className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center shadow-md"><Plus className="w-3 h-3" /></button>
                    </div>
                   ) : (
                    <button onClick={() => onAdd(item, MENU[activeTab].category, guestNum)} className="flex items-center gap-2 text-[14px] tracking-[1.5px] uppercase font-bold text-teal group">
                      <span className="w-8 h-8 rounded-full border border-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all"><Plus className="w-3 h-3" /></span>
                      Add to Cart
                    </button>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Summary remains same as previous logic */}
      {bag.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-40px)] max-w-[800px] bg-ink p-6 lg:p-8 flex items-center justify-between shadow-2xl border border-white/10 rounded-[4px]">
           <div className="hidden md:block">
             <p className="text-[14px] uppercase tracking-[2px] text-amber mb-1">{bagCount} Items Selected</p>
             <p className="font-serif text-paper text-2xl">${bagTotal.toLocaleString()}</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <button onClick={onOpenBag} className="flex-1 md:flex-initial h-12 px-8 bg-teal text-white text-[14px] uppercase tracking-[2px] flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> View Cart
              </button>
           </div>
        </div>
      )}

    </section>
  );
}