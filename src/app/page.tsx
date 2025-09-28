'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  MessageSquare,
  CheckCircle,
  ChevronDown
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function AtelierMobilă() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showThanks, setShowThanks] = useState<boolean>(false);
  const AUTO_CLOSE_MS = 2500;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blochează scroll-ul când modalul e deschis + Esc pentru închidere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowThanks(false);
    };
    if (showThanks) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showThanks]);

  // Auto-close după N ms
  useEffect(() => {
    if (!showThanks || AUTO_CLOSE_MS <= 0) return;
    const t = setTimeout(() => setShowThanks(false), AUTO_CLOSE_MS);
    return () => clearTimeout(t);
  }, [showThanks]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const json = await res.json();
  
    if (json.ok) {
      setShowThanks(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Eroare la trimitere mesaj!");
    }
  };  

  const closeModal = () => setShowThanks(false);

  const stats = [
    { number: '150+', label: 'Proiecte Finalizate' },
    { number: '15+', label: 'Ani Experiență' },
    { number: '100%', label: 'Clienți Mulțumiți' }
  ];

  const portfolio = [
    { id: 1, image: 'bucatarie.png', title: 'Bucătărie Modernă', desc: 'Design minimalist cu finisaje premium' },
    { id: 2, image: 'living.png', title: 'Mobilier Living', desc: 'Soluții elegante pentru living' },
    { id: 3, image: 'dormitor.png', title: 'Dormitor Personalizat', desc: 'Confort și stil în dormitor' },
    { id: 4, image: 'dressing.png', title: 'Dressing Walk-in', desc: 'Organizare perfectă și eleganță' },
    { id: 5, image: 'birou.png', title: 'Birou Home Office', desc: 'Spațiu de lucru productiv' },
    { id: 6, image: 'baie.png', title: 'Mobilier Baie', desc: 'Soluții practice și moderne' }
  ];

  const testimonials = [
    { name: 'Maria Popescu', text: 'Profesionalism desăvârșit! Am fost impresionat de atenția la detalii și de calitatea excepțională a mobilierului. Recomand cu încredere!' },
    { name: 'Alexandru Ionescu', text: 'Experiență fantastică din prima până în ultima clipă. Design-ul propus a depășit așteptările noastre, iar montajul a fost impecabil.' },
    { name: 'Elena Dumitrescu', text: 'Calitate superioară și prețuri corecte. Au transformat complet bucătăria noastră. Suntem extrem de mulțumiți de rezultat!' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="flex-grow relative bg-[url('/1.png')] bg-no-repeat bg-[position:center_40%] bg-[length:100%_auto]">

        {/* Navigation */}
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-white/95 backdrop-blur-xl shadow-md py-4'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src="/logo.png" alt="Atelier Mobilă" className="h-10 w-auto" />
                <span className="text-2xl font-bold">
                <span className="text-black">Atelier</span> <span className="text-amber-700">Mobilă</span>
                </span>
              </button>

              <div className="hidden md:flex items-center gap-8">
                {['Acasă', 'Despre', 'Portofoliu', 'Testimoniale', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative text-gray-700 hover:text-amber-700 font-medium transition-colors group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMenuOpen(v => !v)}
                className="md:hidden text-gray-700"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-gray-100 space-y-3">
                {['Acasă', 'Despre', 'Portofoliu', 'Testimoniale', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 text-gray-700 hover:text-amber-700 font-medium transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* === HERO NOU (gradient + blur + butoane centrate) === */}
        <section id="acasă" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background cu blur + gradient */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/1.png"
              alt="Mobilier"
              className="w-full h-full object-cover"
              style={{ filter: 'blur(1px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
          </div>

          {/* Content centrat */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Mobilier Premium
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Craftat cu pasiune pentru casa ta.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors"
              >
                Află mai mult
              </button>
              <button
                onClick={() => scrollToSection('portofoliu')}
                className="px-8 py-3 text-white border-2 border-white/80 rounded-full hover:bg-white/10 transition-colors"
              >
                Vezi portofoliu
              </button>
            </div>
          </div>

          {/* Icon jos */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/70 animate-bounce" />
          </div>
        </section>

        {/* Despre */}
        <section id="despre" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Despre Noi</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Cu o experiență de peste 15 ani în domeniul producției și montajului de mobilă la comandă,
                  ne dedicăm creării de piese unice care îmbină funcționalitatea cu estetica.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Fiecare proiect este abordat cu atenție la detalii și pasiune pentru perfecțiune.
                  Folosim materiale de cea mai înaltă calitate și tehnici moderne de producție pentru
                  a garanta durabilitatea și eleganța mobilierului nostru.
                </p>

                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <img
                  src="fundal.png"
                  alt="Atelier"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portofoliu */}
        <section id="portofoliu" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Portofoliu</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-800 ease-out will-change-[opacity] group-hover:opacity-100">
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2 transform translate-y-8 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 transform translate-y-8 opacity-0 transition-all duration-500 delay-100 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoniale */}
        <section id="testimoniale" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Ce Spun Clienții</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="font-semibold text-gray-900">— {testimonial.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Contact</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gray-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Hai să discutăm despre proiectul tău!</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Telefon</div>
                      <div className="text-gray-600">+40 750 275 134</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-gray-600">+40 750 275 134</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">contact@atelier-mobila.ro</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Locație</div>
                      <div className="text-gray-600">Brașov, România</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM + buton submit */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nume</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500 text-black"
                    placeholder="Numele tău"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500 text-black"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500 text-black"
                    placeholder="+40 7XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Mesaj</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none placeholder-gray-500 text-black"
                    placeholder="Descrie-ne proiectul tău..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                >
                  Trimite Mesaj
                </button>
              </form>
            </div>
          </div>
        </section>

       {/* Footer */}
       <footer className="bg-gradient-to-br from-black to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.png"
                      alt="Atelier Mobilă"
                      className="h-12 w-auto"
                    />
                    <span className="text-3xl font-bold">
                      Atelier <span className="text-amber-600">Mobilă</span>
                    </span>
                  </div>

                  <p className="text-gray-300 mt-3 leading-relaxed">
                    Creăm mobilier personalizat de calitate superioară pentru casa ta.
                    Fiecare piesă este realizată cu atenție la detalii și pasiune pentru design.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Urmărește-ne</h4>
                  <div className="flex gap-3">{/* icons aici */}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-lg">Produse</h4>
                <ul className="space-y-3">
                  {[
                    "Bucătării Custom",
                    "Dormitoare",
                    "Living & Sufragerie",
                    "Dulapuri & Dressing",
                    "Mobilier Birou",
                    "Mobilier Copii",
                    "Accesorii & Decorațiuni"
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#portofoliu"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('portofoliu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-lg">Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <MapPin size={18} className="text-amber-500 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-gray-300">Bulevardul Ștefan Cel Mare Și Sfânt, Nr 13</p>
                      <p className="text-gray-300">Brașov, România</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Phone size={18} className="text-amber-500 group-hover:scale-110 transition-transform" />
                    <a href="tel:+40750275134" className="text-gray-300 hover:text-white transition-colors">
                      +40 750 275 134
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Mail size={18} className="text-amber-500 group-hover:scale-110 transition-transform" />
                    <a href="mailto:contact@atelier-mobila.ro" className="text-gray-300 hover:text-white transition-colors">
                      contact@atelier-mobila.ro
                    </a>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg border border-white">
                    <h5 className="font-semibold text-white mb-2">Program de lucru</h5>
                    <p className="text-sm text-gray-300">Luni - Vineri: 09:00 - 17:00</p>
                    <p className="text-sm text-gray-300">Sâmbătă: 09:00 - 15:00</p>
                    <p className="text-sm text-gray-300">Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <img
                    src="/logo.png"
                    alt="Atelier Mobilă"
                    className="h-8 w-auto"
                  />
                  <span className="font-semibold">© 2025 AtelierMobilă</span>
                  <div className="text-sm text-gray-400">
                    | &nbsp;  Toate drepturile rezervate.
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  Realizat cu ❤️ în Brașov
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* === MODAL MULȚUMIM === */}
      {showThanks && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="thanks-title"
          aria-describedby="thanks-desc"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 id="thanks-title" className="text-2xl font-bold text-gray-900 mb-2">
              Mesajul tău a fost trimis cu succes.
            </h3>
            <p id="thanks-desc" className="text-gray-600 mb-6">
              Te vom contacta în curând..
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </>
  );
}
