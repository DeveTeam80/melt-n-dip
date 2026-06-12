"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { BagItem } from "../../components/data";

import CateringHero from "../../components/CateringHero";
import BagBuilder from "../../components/BagBuilder";
import BagDrawer from "../../components/BagDrawer";
import LiveStations from "../../components/LiveStations";
import EventTypes from "../../components/EventTypes";
import StoreRental from "../../components/StoreRental";
import FoodTruck from "../../components/FoodTruck";
import Gallery from "../../components/Gallery";
import CateringFAQ from "../../components/CateringFAQ";
import CateringQuoteForm from "../../components/CateringQuoteForm";

function CateringPageInner() {
  const searchParams = useSearchParams();

  // Shared state
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [serviceStyle, setServiceStyle] = useState("");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [bagDismissed, setBagDismissed] = useState(false);
  const [floatingDismissed, setFloatingDismissed] = useState(false);

  // Only prefill URL params on first visit, not on reload
  useEffect(() => {
    const loaded = sessionStorage.getItem("_catering_loaded");
    if (!loaded) {
      const g = searchParams.get("guests");
      const e = searchParams.get("event");
      /* eslint-disable react-hooks/set-state-in-effect */
      if (g) setGuests(g);
      if (e) setEventType(e);
      /* eslint-enable react-hooks/set-state-in-effect */
      sessionStorage.setItem("_catering_loaded", "true");
    }
  }, [searchParams]);

  // Load saved bag on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved_catering_bag");
    if (saved) {
      try {
        /* eslint-disable react-hooks/set-state-in-effect */
        setBag(JSON.parse(saved));
        setBagDismissed(true);
        /* eslint-enable react-hooks/set-state-in-effect */
      } catch (e) {
        console.error("Error loading saved bag", e);
      }
    }
  }, []);

  // Auto-save bag to localStorage on every change
  useEffect(() => {
    if (bag.length > 0) {
      localStorage.setItem("saved_catering_bag", JSON.stringify(bag));
    } else {
      localStorage.removeItem("saved_catering_bag");
    }
  }, [bag]);

  // ── BAG CALCULATIONS ──────────────────────────────────
  const bagTotal = bag.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const bagCount = bag.length; // Number of unique items
  const totalServings = bag.reduce((sum, i) => sum + i.quantity, 0);

  // ── BAG HELPERS ───────────────────────────────────────

  const addItem = (
    item: { id: string; name: string; price: number },
    category: string,
    initialQty?: number,
  ) => {
    setBag((prev) => {
      const exists = prev.find((b) => b.id === item.id);
      if (exists) {
        return prev.map((b) =>
          b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b,
        );
      }
      // If new, use the current guest count as base quantity, or fallback to 1
      const startQty = initialQty && initialQty > 0 ? initialQty : 1;
      return [...prev, { ...item, category, quantity: startQty }];
    });
    setBagDismissed(false);
    setFloatingDismissed(false);
  };

  const removeItem = (id: string) => {
    setBag((prev) => {
      const exists = prev.find((b) => b.id === id);
      if (exists && exists.quantity > 1)
        return prev.map((b) =>
          b.id === id ? { ...b, quantity: b.quantity - 1 } : b,
        );
      return prev.filter((b) => b.id !== id);
    });
    setBagDismissed(false);
    setFloatingDismissed(false);
  };

  // NEW: Update quantity specifically via input
  const updateQuantity = (id: string, qty: number) => {
    setBag((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, qty) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
    setBagDismissed(false);
    setFloatingDismissed(false);
  };

  const getQty = (id: string) => bag.find((b) => b.id === id)?.quantity || 0;

  const scrollToQuote = () => {
    setBagOpen(false);
    const el = document.getElementById("quote");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBagDismissed: React.Dispatch<React.SetStateAction<boolean>> = () => {
    setBagDismissed(true);
    setFloatingDismissed(true);
  };

  const handleInquirePackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setBagDismissed(true);
    setTimeout(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };
  // Already exists — just confirm setBagDismissed is here
  const handleRequestQuote = () => {
    setBagOpen(false);
    setBagDismissed(true);
    setTimeout(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };
  return (
    <div style={{ background: "var(--color-paper)" }}>
      {/* ── FLOATING BAG BUTTON ───────────────────────────── */}

      {bag.length > 0 && !floatingDismissed && (
        <button
          onClick={() => setBagOpen(true)}
          className="fixed bottom-8 right-8 z-[80] flex items-center gap-3 hidden lg:flex hover-target "
          style={{
            background: "var(--color-teal)",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "2px",
            boxShadow: "0 8px 32px rgba(26,122,110,0.35)",
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          <ShoppingBag
            style={{ width: "16px", height: "16px" }}
            strokeWidth={1.5}
          />
          {bagCount} item{bagCount !== 1 ? "s" : ""}
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            · ${bagTotal.toLocaleString()}
          </span>
        </button>
      )}

      {/* ── BAG DRAWER ────────────────────────────────────── */}
      {bagOpen && (
        <BagDrawer
          bag={bag}
          bagTotal={bagTotal}
          onAdd={(item) => addItem(item, item.category)}
          onRemove={removeItem}
          onUpdateQty={updateQuantity} // Pass to drawer if needed
          onClear={() => {
            setBag([]);
            setBagOpen(false);
          }}
          onClose={() => setBagOpen(false)}
          onRequestQuote={handleRequestQuote}
        />
      )}

      {/* ── SECTIONS ──────────────────────────────────────── */}
      <CateringHero />

      <section id="menu">
        <BagBuilder
          guests={guests}
          setGuests={setGuests}
          eventType={eventType}
          setEventType={setEventType}
          serviceStyle={serviceStyle}
          setServiceStyle={setServiceStyle}
          bag={bag}
          bagTotal={bagTotal}
          bagCount={bagCount}
          onAdd={addItem}
          onRemove={removeItem}
          onUpdateQty={updateQuantity} // Required Prop passed here
          onOpenBag={() => setBagOpen(true)}
          getQty={getQty}
          bagDismissed={bagDismissed}
          setBagDismissed={handleBagDismissed}
          onInquirePackage={handleInquirePackage}
        />
      </section>

      <LiveStations />
      <EventTypes />

      <StoreRental />
      <FoodTruck />

      {/* <Gallery /> */}
      {/* Gallery section hidden until sufficient high-quality imagery is available */}

      <CateringFAQ />

      <CateringQuoteForm
        bag={bag}
        bagTotal={bagTotal}
        guests={guests}
        eventType={eventType}
        serviceStyle={serviceStyle}
      />
    </div>
  );
}

export default function CateringPage() {
  return (
    <Suspense>
      <CateringPageInner />
    </Suspense>
  );
}
