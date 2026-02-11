import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title:
    "Mobilă la comandă Brașov | Bucătării, Dressing, Dormitoare | Atelier Mobilă",
  description:
    "Atelier Mobilă realizează mobilă la comandă în Brașov și împrejurimi: bucătării, dressinguri, dormitoare, living, baie. Proiectare 3D, măsurători și montaj profesional. Cere ofertă!",
  alternates: { canonical: "https://atelier-mobila.ro/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://atelier-mobila.ro/",
    title: "Mobilă la comandă Brașov | Atelier Mobilă",
    description:
      "Bucătării, dressinguri, dormitoare și living la comandă în Brașov și împrejurimi. Proiectare 3D + montaj.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Atelier Mobilă Brașov" },
    ],
  },
};

export default function Page() {
  // IMPORTANT: nu am pus stradă/număr, ca să nu risc date greșite.
  // Dacă vrei, completează aici cu adresa exactă și o adăugăm și pe pagină.
  const areas = [
    "Brașov",
    "Săcele",
    "Ghimbav",
    "Cristian",
    "Râșnov",
    "Codlea",
    "Hărman",
    "Sânpetru",
    "Prejmer",
    "Bod",
    "Tărlungeni",
    "Feldioara",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Atelier Mobilă",
    url: "https://atelier-mobila.ro/",
    telephone: "+40750275134",
    email: "contact@atelier-mobila.ro",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brașov",
      addressRegion: "BV",
      addressCountry: "RO",
    },
    areaServed: areas,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
