import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Menu, X, Star, MessageSquare, CheckCircle,
  ChevronDown, ArrowRight
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function AtelierMobilă() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [hoveredPortfolio, setHoveredPortfolio] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showThanks) return;
    const t = setTimeout(() => setShowThanks(false), 2500);
    return () => clearTimeout(t);
  }, [showThanks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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
      alert("Eroare la trimitere!");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const portfolio = [
    { id: 1, title: 'Bucătărie Modernă', desc: 'Design minimalist cu finisaje premium', icon: '🍳', color: 'from-amber-700 to-amber-900' },
    { id: 2, title: 'Living Room', desc: 'Soluții elegante pentru living', icon: '🛋️', color: 'from-amber-600 to-amber-800' },
    { id: 3, title: 'Dormitor Lux', desc: 'Confort și stil în dormitor', icon: '🛏️', color: 'from-amber-700 to-amber-900' },
    { id: 4, title: 'Dressing Walk-in', desc: 'Organizare perfectă și eleganță', icon: '👗', color: 'from-amber-600 to-amber-800' },
    { id: 5, title: 'Home Office', desc: 'Spațiu de lucru productiv', icon: '💻', color: 'from-amber-700 to-amber-900' },
    { id: 6, title: 'Baie Relax', desc: 'Soluții practice și moderne', icon: '🛁', color: 'from-amber-600 to-amber-800' }
  ];

  const testimonials = [
    { name: 'Maria Popescu', text: 'Profesionalism desăvârșit! Am fost impresionat de atenția la detalii și de calitatea excepțională a mobilierului. Recomand cu încredere!', rating: 5 },
    { name: 'Alexandru Ionescu', text: 'Experiență fantastică din prima până în ultima clipă. Design-ul propus a depășit așteptările noastre, iar montajul a fost impecabil.', rating: 5 },
    { name: 'Elena Dumitrescu', text: 'Calitate superioară și prețuri corecte. Au transformat complet bucătăria noastră. Suntem extrem de mulțumiți de rezultat!', rating: 5 }
  ];

  const stats = [
    { number: '150+', label: 'Proiecte', icon: '🏆' },
    { number: '15+', label: 'Ani', icon: '⭐' },
    { number: '1000+', label: 'Clienți', icon: '❤️' }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white min-h-screen">
      
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-amber-600/30 py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                AtelierMobilă
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {['Acasă', 'Despre', 'Portofoliu', 'Testimoniale', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-amber-400 font-semibold transition-colors pb-1 border-b-2 border-b-transparent hover:border-b-amber-400"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className="md:hidden text-amber-400"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-amber-600/30 space-y-3">
              {['Acasá', 'Despre', 'Portofoliu', 'Testimoniale', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
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
      <section id="acasă" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-amber-700 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold">
            ✨ Bun venit la AtelierMobilă
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Mobilier Premium
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Designul tău devine realitate. Creăm piese de mobilă personalizate care transformă casele în acasă.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Începe Proiectul
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('portofoliu')}
              className="px-8 py-4 text-amber-400 border-2 border-amber-500 rounded-lg font-bold text-lg hover:bg-amber-500/10 transition-all hover:scale-105 active:scale-95"
            >
              Vezi Portofoliu
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 hover:border-amber-500/50 transition-all">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-amber-400">{stat.number}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="despre" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold">
                DESPRE NOI
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  15 Ani de Excellență
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Cu peste 15 ani de experiență, AtelierMobilă s-a consolidat ca lider în producția de mobilă personalizată. Fiecare piesă este creată cu atenție meticulos la detalii și pasiune pentru perfecțiune.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Folosim doar materiale premium și tehnologie de vârf pentru a crea mobilier care durează o viață.
              </p>
              <div className="space-y-3">
                {['100% Personalizat', 'Materiale Premium', 'Garanție 10 Ani', 'Montaj Profesional'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-96 rounded-2xl overflow-hidden border border-amber-600/20 bg-gradient-to-br from-amber-600/10 to-amber-700/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🏗️</div>
                <p className="text-gray-400">Imagine Showroom</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portofoliu" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold">
              PROIECTE
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                Portofoliu Premium
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Descoperă selecția noastră de proiecte realizate pentru clienți exigenți</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredPortfolio(item.id)}
                onMouseLeave={() => setHoveredPortfolio(null)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer h-80 transition-all duration-500 ${hoveredPortfolio === item.id ? 'scale-105 shadow-2xl shadow-amber-500/30' : 'scale-100'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-90 transition-all`}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-7xl mb-6 group-hover:scale-125 transition-transform">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimoniale" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold">
              REVIEWS
            </div>
            <h2 className="text-5xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                Ce Spun Clienții
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transform hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">{testimonial.text}</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-amber-400">Client Satisfăcut</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold">
              CONTACT
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                Hai să Vorbim
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: Phone, title: 'Telefon', value: '+40 750 275 134', href: 'tel:+40750275134' },
                { icon: MessageSquare, title: 'WhatsApp', value: '+40 750 275 134', href: 'tel:+40750275134' },
                { icon: Mail, title: 'Email', value: 'contact@atelier-mobila.ro', href: 'mailto:contact@atelier-mobila.ro' },
                { icon: MapPin, title: 'Locație', value: 'Brașov, România', href: '#' }
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
                      <div className="font-bold text-white text-lg">{contact.title}</div>
                      <div className="text-gray-400 group-hover:text-amber-400 transition-colors">{contact.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="space-y-6 p-8 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <label className="block text-white font-semibold mb-3">Nume</label>
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
                <label className="block text-white font-semibold mb-3">Email</label>
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
                <label className="block text-white font-semibold mb-3">Telefon</label>
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
                <label className="block text-white font-semibold mb-3">Mesaj</label>
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
                onClick={handleSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105 transition-all active:scale-95"
              >
                Trimite Mesaj
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-2">© 2025 AtelierMobilă. Toate drepturile rezervate.</p>
          <p>Realizat cu ❤️ în Brașov</p>
        </div>
      </footer>

      {/* THANK YOU MODAL */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-amber-500/30 transform scale-100">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Mulțumim!</h3>
            <p className="text-gray-400 mb-6">Mesajul tău a fost trimis cu succes. Te vom contacta în curând.</p>
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