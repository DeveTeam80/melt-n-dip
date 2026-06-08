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

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CateringService",
        "@id": "https://delightenterprisesllc.com/#business",
        "name": "Delight Enterprises LLC",
        "url": "https://delightenterprisesllc.com/",
        "logo": "https://delightenterprisesllc.com/assets/logo.png",
        "image": "https://delightenterprisesllc.com/assets/hero-banner.jpg",
        "description": "Chicago's premier dessert catering service. We specialize in premium Belgian chocolate fountains, live crepe stations, artisan gelato carts, and Halal custom sweet platters for corporate events and weddings.",
        "telephone": "+1-312-497-3697",
        "email": "owner@delightenterprisesllc.com",
        "priceRange": "$$$",
        "servesCuisine": [
          "Belgian Chocolate",
          "Artisan Gelato",
          "Halal Desserts",
          "Crepes",
          "Kunafa"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13030 Lagrange Rd",
          "addressLocality": "Palos Park",
          "addressRegion": "IL",
          "postalCode": "60464",
          "addressCountry": "US"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Chicago"
          },
          {
            "@type": "City",
            "name": "Orland Park"
          },
          {
            "@type": "City",
            "name": "Tinley Park"
          },
          {
            "@type": "City",
            "name": "Frankfort"
          },
          {
            "@type": "City",
            "name": "Palos Hills"
          },
          {
            "@type": "City",
            "name": "Romeoville"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Event Dessert Catering"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wedding Dessert Tables"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Live Crepe & Gelato Cart Stations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Private Venue Hire"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://delightenterprisesllc.com/#webpage",
        "url": "https://delightenterprisesllc.com/",
        "name": "Premium Dessert Catering in Chicago | Delight Enterprises LLC",
        "description": "Elevating events across Chicagoland with premium Belgian chocolate, live crepe stations, artisan gelato carts, and Halal custom sweet platters.",
        "isPartOf": {
          "@id": "https://delightenterprisesllc.com/#website"
        },
        "about": {
          "@id": "https://delightenterprisesllc.com/#business"
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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