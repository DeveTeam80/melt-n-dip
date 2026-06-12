"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  light?: boolean;
  forceOpen?: boolean; // NEW: allows parent to force-open the dropdown
  onOpenChange?: (open: boolean) => void; // NEW: lets parent know open state changed
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  light = false,
  forceOpen = false,
  onOpenChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen && !open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
      onOpenChange?.(true);
    }
  }, [forceOpen, open, onOpenChange]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    onOpenChange?.(false);
  };

  const theme = {
    text: light ? "text-amber" : "text-ink",
    placeholder: light ? "text-amber/90" : "text-teal/90",
    borderBase: light ? "border-teal-pale/90" : "border-linen",
    borderActive: light ? "border-teal-pale" : "border-teal",
    icon: light ? "text-amber/90" : "text-teal",
    dropdownBg: light ? "bg-bark/95" : "bg-white/95",
    dropdownBorder: light ? "border-white/10" : "border-linen",
    itemText: light ? "text-cream/70" : "text-ink",
    itemHoverBg: light ? "hover:bg-white/5" : "hover:bg-teal-faint",
    itemHoverText: light ? "hover:text-amber" : "hover:text-teal",
    itemActiveBg: light ? "bg-teal-pale/15" : "bg-teal-faint",
    itemActiveText: light ? "text-amber" : "text-teal",
    shadow: light
      ? "shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
      : "shadow-[0_16px_40px_rgba(26,122,110,0.12)]",
  };

  return (
    <div
      ref={ref}
      className={`relative w-full select-none ${open ? "z-50" : "z-10"}`}
    >
      <div
        onClick={handleToggle}
        className={`flex items-center justify-between w-full hover-target cursor-none transition-colors duration-300 py-3 border-b ${open ? theme.borderActive : theme.borderBase}`}
      >
        <span
          className={`font-light text-[15px] transition-colors duration-300 ${value ? theme.text : theme.placeholder}`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-180" : "rotate-0"} ${theme.icon}`}
          strokeWidth={1.5}
        />
      </div>

      <div
        className={`absolute left-0 right-0 mt-2 overflow-hidden rounded-[3px] backdrop-blur-xl border transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${theme.dropdownBg} ${theme.dropdownBorder} ${theme.shadow} ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
        style={{ maxHeight: "280px", overflowY: "auto" }}
      >
        <div className="flex flex-col py-1">
          {options.map((opt) => {
            const isActive = opt === value;
            return (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`hover-target cursor-none px-4 py-3 text-[14px] font-light tracking-[0.2px] transition-all duration-200 ${isActive ? `${theme.itemActiveBg} ${theme.itemActiveText} font-medium` : `${theme.itemText} ${theme.itemHoverBg} ${theme.itemHoverText}`}`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
