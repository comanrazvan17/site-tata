"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Heart,
  Trophy,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// 🔸 scoatem datele în afara componentului ca să nu se mai recreeze
const PORTFOLIO = [
  {
    id: 1,
    title: "Bucătărie Modernă",
    desc: "Design minimalist cu finisaje premium",
    image: "/bucatarie.png",
  },
  {
    id: 2,
    title: "Living Room",
    desc: "Soluții elegante pentru living",
    image: "/living.png",
  },
  {
    id: 3,
    title: "Dormitor Lux",
    desc: "Confort și stil în dormitor",
    image: "/dormitor.png",
  },
  {
    id: 4,
    title: "Dressing Walk-in",
    desc: "Organizare perfectă și eleganță",
    image: "/dressing.png",
  },
  {
    id: 5,
    title: "Home Office",
    desc: "Spațiu de lucru productiv",
    image: "/birou.png",
  },
  {
    id: 6,
    title: "Baie Relax",
    desc: "Soluții practice și moderne",
    image: "/baie.png",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Popescu",
    text: "Profesionalism desăvârșit! Am fost impresionat de atenția la detalii și de calitatea excepțională a mobilierului. Recomand cu încredere!",
    rating: 5,
  },
  {
    name: "Alexandru Ionescu",
    text: "Experiență fantastică din prima până în ultima clipă. Design-ul propus a depășit așteptările noastre, iar montajul a fost impecabil.",
    rating: 5,
  },
  {
    name: "Elena Dumitrescu",
    text: "Calitate superioară și prețuri corecte. Au transformat complet bucătăria noastră. Suntem extrem de mulțumiți de rezultat!",
    rating: 5,
  },
];

const STATS = [
  { number: "13+", label: "Ani", icon: Star, color: "text-yellow-300" },
  { number: "700+", label: "Clienți", icon: Heart, color: "text-red-500" },
  { number: "200+", label: "Proiecte", icon: Trophy, color: "text-amber-300" },
];

const NAV_ITEMS = ["Acasă", "Despre", "Portofoliu", "Testimoniale", "Contact"];

export default function AtelierMobilă() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // scroll listener pasiv + foarte simplu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // autohide pentru modal
  useEffect(() => {
    if (!showThanks) return;
    const t = setTimeout(() => setShowThanks(false), 2500);
    return () => clearTimeout(t);
  }, [showThanks]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.ok) {
          setShowThanks(true);
          setFormData({ name: "", email: "", phone: "", message: "" });
        }
      } catch (err) {
        // poți pune un toast aici
        alert("Eroare la trimitere!");
      }
    },
    [formData]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <div className="relative w-full text-white min-h-screen">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 1200"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(217, 119, 6, 0.05)"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          <rect width="1200" height="1200" fill="url(#grid)" />

          <g
            opacity="0.2"
            stroke="rgba(217, 119, 6, 0.5)"
            strokeWidth="2.5"
            fill="none"
          >
            <rect x="100" y="150" width="200" height="150" rx="8" />
            <line x1="110" y1="200" x2="290" y2="200" />
            <line x1="110" y1="250" x2="290" y2="250" />

            <rect x="800" y="300" width="180" height="120" rx="6" />
            <circle cx="890" cy="350" r="40" />

            <path d="M 50 500 Q 150 450 250 500 T 450 500" />
            <path d="M 950 600 Q 1050 550 1150 600" />
          </g>
        </svg>
      </div>

      {/* CONȚINUT */}
      <div className="relative z-20">
        {/* NAVBAR */}
        <nav
          className={`fixed w-full top-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-neutral-900/80 backdrop-blur-xl py-3"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              >
                <div className="flex items-center gap-3 group">
                  <img
                    src="/logo.png"
                    alt="Logo Atelier Mobilă"
                    className="w-10 h-10 object-contain rounded-lg group-hover:scale-110 transition-transform"
                    loading="eager"
                  />
                  <span className="text-xl font-bold text-white">
                    Atelier{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      Mobilă
                    </span>
                  </span>
                </div>
              </button>

              <div className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        item
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/\u0303|\u0327|\u0306/g, "")
                          .replace("ă", "a")
                      )
                    }
                    className="text-gray-300 hover:text-amber-500 font-semibold transition-colors pb-1 border-b-2 border-b-transparent hover:border-b-amber-500"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="md:hidden text-amber-400"
                aria-label="Deschide meniul"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-amber-600/30 space-y-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        item
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/\u0303|\u0327|\u0306/g, "")
                          .replace("ă", "a")
                      )
                    }
                    className="block w-full text-left py-2 text-gray-300 hover:text-amber-400 font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* HERO */}
        <section
          id="acasa"
          className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
        >
          <div className="relative z-10 text-center max-w-4xl">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-white text-sm font-semibold">
              Creează-ți spațiul exact cum ți-l imaginezi.
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="text-white">Mobilier </span>
              <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Designul tău devine realitate. Realizăm piese de mobilă
              personalizate care transformă casele în acasă.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold text-lg hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Începe Proiectul
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection("portofoliu")}
                className="px-8 py-4 text-white border-2 border-amber-500 rounded-lg font-bold text-lg hover:bg-amber-500/10 transition-all hover:scale-105 active:scale-95"
              >
                Vezi Portofoliu
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 hover:border-amber-500/50 transition-all"
                  >
                    <Icon className={`mx-auto mb-3 ${stat.color}`} size={32} />
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-amber-500" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="despre" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-white text-sm font-semibold">
                  DESPRE NOI
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  <span className="text-white">
                    13+ Ani{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      Experiență
                    </span>
                  </span>
                </h2>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  Cu peste 13+ ani de experiență, Atelierul de Mobilă s-a
                  consolidat ca lider în producția de mobilă personalizată.
                  Fiecare piesă este creată cu atenție la detalii și pasiune pentru perfecțiune.
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Folosim doar materiale premium și tehnologie de vârf pentru a
                  crea mobilier care durează o viață.
                </p>
                <div className="space-y-3">
                  {[
                    "100% Personalizat",
                    "Materiale Premium",
                    "Garanție 10 Ani",
                    "Montaj Profesional",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-96 rounded-2xl overflow-hidden relative">
                <img
                  src="/fundal.png"
                  alt="Showroom"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* PORTOFOLIU */}
        <section id="portofoliu" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-white text-sm font-semibold">
                PROIECTE
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Portofoliu{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Premium
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Descoperă selecția noastră de proiecte realizate pentru clienți exigenți
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PORTFOLIO.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/60 transition-all duration-500" />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALE */}
        <section id="testimoniale" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-white text-sm font-semibold">
                TESTIMONIALE
              </div>
              <h2 className="text-5xl md:text-6xl font-black">
                Ce Spun{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Clienții
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transform hover:-translate-y-2 transition-all cursor-pointer"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-amber-300 text-amber-300"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-amber-500">
                      Client Satisfăcut
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-white text-sm font-semibold">
                CONTACT
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Hai să{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Vorbim
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    title: "Telefon",
                    value: "+40 750 275 134",
                    href: "tel:+40750275134",
                  },
                  {
                    icon: MessageSquare,
                    title: "WhatsApp",
                    value: "+40 750 275 134",
                    href: "tel:+40750275134",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    value: "contact@atelier-mobila.ro",
                    href: "mailto:contact@atelier-mobila.ro",
                  },
                  {
                    icon: MapPin,
                    title: "Locație",
                    value: "Brașov, România",
                    href: "#",
                  },
                ].map((contact, i) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={i}
                      href={contact.href}
                      className="group flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-600/50 hover:bg-amber-600/5 transition-all"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {contact.title}
                        </div>
                        <div className="text-gray-400 group-hover:text-amber-500 transition-colors">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Nume
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Numele tău"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="email@exemplu.ro"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="+40 7XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">
                    Mesaj
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Descrie-ne proiectul tău..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold text-lg hover:scale-105 transition-all active:scale-95"
                >
                  Trimite Mesaj
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p className="mb-2">
              © 2025 AtelierMobilă. Toate drepturile rezervate.
            </p>
            <p>
              Realizat de{" "}
              <a
                href="https://envie-agency.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-600 transition-colors font-semibold"
              >
                Envie Agency
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* THANK YOU MODAL */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 max-w-sm w-full text-center border border-amber-500/30">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Mulțumim!</h3>
            <p className="text-gray-400 mb-6">
              Mesajul tău a fost trimis cu succes. Te vom contacta în curând.
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Gata
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
