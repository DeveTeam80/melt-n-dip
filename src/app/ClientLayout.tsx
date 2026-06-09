"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePathname } from "next/navigation";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Create a sub-component to handle the logic
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    if (!isLoading) {
      // Small timeout ensures the DOM has settled after preloader leaves
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const timer = setTimeout(handleHashScroll, 600);

    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [pathname]);

  const showNavbar = pathname !== "/melt-n-dip-palos-park";

  // Desktop: smooth scrolling via Lenis
  // Mobile: native scroll (no Lenis wrapper) for better performance
  if (!isMobile) {
    return (
      <ReactLenis
        root
        options={{
          lerp: 0.08,
          smoothWheel: true,
          prevent: () => isLoading,
        }}
      >
        <Cursor />
        {showNavbar && <Navbar />}
        <main id="main-content">{children}</main>
        <Footer />
      </ReactLenis>
    );
  }

  return (
    <>
      <Cursor />
      {showNavbar && <Navbar />}
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

// 2. The main export wraps the sub-component in the Provider
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <LayoutContent>{children}</LayoutContent>
    </LoadingProvider>
  );
}