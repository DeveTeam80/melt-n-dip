"use client";

import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { BagItem } from "./data";

interface Props {
    bag: BagItem[];
    // guests: number; // We can keep this for UI warnings, but it's no longer used for math
    bagTotal: number;
    onAdd: (item: any) => void;
    onRemove: (id: string) => void;
    onUpdateQty: (id: string, qty: number) => void; // Added for the new logic
    onClear: () => void;
    onClose: () => void;
    onRequestQuote: () => void;
}

export default function BagDrawer({
    bag, bagTotal, onAdd, onRemove, onUpdateQty, onClear, onClose, onRequestQuote,
}: Props) {
    // Calculate total servings across all items
    const totalServings = bag.reduce((s, i) => s + i.quantity, 0);

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Drawer */}
            <div className="relative w-full max-w-[420px] h-full flex flex-col overflow-hidden"
                style={{ background: "var(--color-paper)", boxShadow: "-20px 0 60px rgba(13,42,39,0.2)" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6"
                    style={{ borderBottom: "1px solid var(--color-linen)" }}>
                    <h3 className="font-serif font-light flex items-center gap-2" style={{ fontSize: "22px", color: "var(--color-ink)" }}>
                        <ShoppingBag className="w-5 h-5 text-teal" /> Your Cart
                    </h3>
                    <button onClick={onClose} className="hover-target">
                        <X style={{ width: "18px", height: "18px", color: "var(--color-taupe)" }} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
                    {bag.map(item => (
                        <div key={item.id} className="flex items-start justify-between gap-4 pb-4 border-b border-linen/50">
                            <div className="flex-1">
                                <p style={{ fontSize: "16px", color: "var(--color-ink)", fontWeight: 500 }}>{item.name}</p>
                                <p style={{ fontSize: "12px", color: "var(--color-taupe)", marginTop: "2px" }}>
                                    ${item.pricePerPerson}/pp · <span className="text-teal font-medium">${(item.pricePerPerson * item.quantity).toLocaleString()} total</span>
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-white border border-linen rounded-full p-1 shadow-sm">
                                <button onClick={() => onRemove(item.id)}
                                    className="hover-target w-7 h-7 flex items-center justify-center rounded-full hover:bg-parchment transition-colors">
                                    <Minus style={{ width: "11px", height: "11px" }} strokeWidth={2} />
                                </button>
                                
                                <input 
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value) || 0)}
                                    className="w-10 text-center bg-transparent outline-none font-semibold text-[13px] appearance-none"
                                />

                                <button onClick={() => onAdd(item)}
                                    className="hover-target w-7 h-7 flex items-center justify-center rounded-full bg-teal text-white shadow-sm hover:bg-teal-rich transition-colors">
                                    <Plus style={{ width: "11px", height: "11px" }} strokeWidth={2} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {bag.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-teal/80 italic text-[15px]">Your bag is empty.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-parchment" style={{ borderTop: "1px solid var(--color-linen)" }}>
                    {bag.length > 0 && (
                        <>
                            <div className="flex justify-between mb-4">
                                <div className="flex flex-col">
                                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-taupe)" }}>
                                        Estimated Catering Total
                                    </span>
                                    <span style={{ fontSize: "13px", color: "var(--color-teal)" }}>
                                        {totalServings} total servings
                                    </span>
                                </div>
                                <span className="font-serif font-light"
                                    style={{ fontSize: "28px", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
                                    ${bagTotal.toLocaleString()}
                                </span>
                            </div>
                            
                            <p style={{ fontSize: "12px", color: "var(--color-taupe)", lineHeight: 1.6, marginBottom: "16px" }}>
                                This is an approximate estimate. Final pricing depends on event location, timing, staffing, setup, menu customization, and availability. Call us to finalize your catering order.
                            </p>

                            <div className="flex flex-col gap-2.5">
                                <button onClick={onRequestQuote}
                                    className="cta-primary hover-target w-full flex items-center justify-center bg-teal text-white font-medium"
                                    style={{ height: "48px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                                    Request Catering Quote
                                </button>
                                
                                <a href="tel:+17086088982"
                                    className="hover-target w-full flex items-center justify-center border border-teal text-teal font-medium hover:bg-teal-faint transition-colors duration-300"
                                    style={{ height: "48px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: "1px" }}>
                                    Call to Customize
                                </a>

                                <button onClick={() => {
                                    localStorage.setItem("saved_catering_bag", JSON.stringify(bag));
                                    alert("Catering bag saved successfully! You can retrieve it anytime you return to this browser.");
                                }}
                                    className="w-full hover-target text-center py-2 opacity-70 hover:opacity-100 transition-opacity"
                                    style={{ fontSize: "11px", color: "var(--color-umber)", letterSpacing: "1px", textTransform: "uppercase" }}>
                                    Save My Bag
                                </button>
                            </div>
                            
                            <button onClick={onClear}
                                className="w-full mt-2 hover-target opacity-60 hover:opacity-100 transition-opacity text-center"
                                style={{ fontSize: "10px", color: "var(--color-taupe)", letterSpacing: "1px", textTransform: "uppercase", padding: "4px" }}>
                                Empty Bag
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}