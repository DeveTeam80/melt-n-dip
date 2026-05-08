"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    if (!isLoading) {
      // Small timeout ensures the DOM has settled after preloader leaves
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        prevent: () => isLoading,
      }}
    >
        {isLoading && <Preloader setIsLoading={setIsLoading} />}      
      <Cursor />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </ReactLenis>
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