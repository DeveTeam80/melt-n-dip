"use client";

import { useLoading } from "@/context/LoadingContext";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import UspStrip from "@/components/UspStrip";
import Products from "@/components/Products";
import VsSection from "@/components/VsSection";
import StoryScroll from "@/components/StoryScroll";
import CateringAndSeasonal from "@/components/CateringAndSeasonal";
import LocationForm from "@/components/LocationForm";

export default function Home() {
  const { isLoading } = useLoading();

  return (
    <main>
      <Hero animationReady={!isLoading} />
      <Ticker />
      <About />
      <UspStrip />
      <Products />
      <VsSection />
      <StoryScroll />
      <CateringAndSeasonal />
      <LocationForm />
    </main>
  );
}