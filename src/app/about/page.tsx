"use client";

import AboutHero from "@/components/AboutHero";
import AboutJourney from "@/components/AboutJourney";
import AboutDelight from "@/components/AboutDelight";
import AboutCraft from "@/components/AboutCraft";
import AboutStore from "@/components/AboutStore";

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://delightenterprisesllc.com/about/#webpage",
        "url": "https://delightenterprisesllc.com/about/",
        "name": "About Us | Delight Enterprises LLC",
        "description":
          "Delight Enterprises LLC caters the premium halal desserts of Melt N Dip in Palos Park, Illinois — Belgian chocolate fountains, artisan gelato carts, live crepe stations, and custom dessert tables for weddings and events across Chicagoland.",
        "isPartOf": { "@id": "https://delightenterprisesllc.com/#website" },
        "about": { "@id": "https://delightenterprisesllc.com/#business" },
      },
      {
        "@type": "FoodEstablishment",
        "@id": "https://delightenterprisesllc.com/#business",
        "name": "Delight Enterprises LLC",
        "url": "https://delightenterprisesllc.com/",
        "description":
          "Premium halal dessert catering company operating Melt N Dip in Palos Park, Illinois. Specializing in Belgian chocolate fountains, artisan gelato, live crepe stations, and custom dessert tables for weddings and events.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13030 Lagrange Rd",
          "addressLocality": "Palos Park",
          "addressRegion": "IL",
          "postalCode": "60464",
          "addressCountry": "US",
        },
        "telephone": "+1-312-497-3697",
        "servesCuisine": [
          "Belgian Chocolate",
          "Artisan Gelato",
          "Halal Desserts",
          "Crepes",
          "Kunafa",
          "Waffles",
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutHero />
      <AboutJourney />
      <AboutDelight />
      <AboutCraft />
      <AboutStore />
    </main>
  );
}
