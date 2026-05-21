"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMnd, setIsMnd] = useState(false);

  useEffect(() => {
    // Detect MND page
    const checkPage = () =>
      setIsMnd(document.body.getAttribute("data-page") === "mnd");
    checkPage();
    const observer = new MutationObserver(checkPage);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-page"],
    });
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0;
    let rx = 0,
      ry = 0;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      reqId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove);
    reqId = requestAnimationFrame(loop);

    // Provide a way to detect hover on interactive elements statically via event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-target")
      ) {
        setIsHovered(true);
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Let's use a simpler check, if we leave an actionable element
      if (
        !e.relatedTarget ||
        !(e.relatedTarget as HTMLElement).closest("a, button, .hover-target")
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(reqId);
    };
    observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="w-[6px] h-[6px] rounded-full fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-linear"
        style={{
          transitionProperty: "transform, background",
          background: isMnd ? "#f0c06d" : "#1A7A6E",
        }}
      />
      <div
        ref={ringRef}
        className={`fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered ? "w-[64px] h-[64px]" : "w-[36px] h-[36px]"
        }`}
        style={{
          borderColor: isMnd
            ? isHovered
              ? "#f0c06d"
              : "#f0c06d66"
            : isHovered
              ? "#1A7A6E"
              : "#1A7A6E66",
          background: isHovered
            ? isMnd
              ? "#f0c06d0D"
              : "#1A7A6E0D"
            : "transparent",
        }}
      />
    </>
  );
}
