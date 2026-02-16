import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Briefcase,
  MessageCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#acasa', label: 'Acasă' },
    { href: '#despre', label: 'Despre' },
    { href: '#servicii', label: 'Servicii' },
    { href: '#portofoliu', label: 'Portofoliu' },
    { href: '#testimoniale', label: 'Testimoniale' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/90 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#acasa" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Atelier Mobilă"
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
              loading="eager"
            />
            <span className="text-xl font-bold">
              Atelier <span className="text-amber-500">Mobilă</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="tel:+40750275134">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                Sună Acum
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-amber-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="tel:+40750275134">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Sună Acum
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="acasa" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container-custom pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-400">13+ Ani Experiență în Mobilă la Comandă</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Mobilă la Comandă în{' '}
            <span className="text-gradient">Brașov</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Bucătării, dressinguri, dormitoare, livinguri și mobilier de baie —
            proiectare 3D, execuție premium și montaj profesional în Brașov și împrejurimi.
          </p>

          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Atelier Mobilă realizează mobilier personalizat pentru apartamente și case din județul Brașov:
            măsurători la fața locului, randări 3D, execuție și montaj.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#contact">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                Începe Proiectul
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="#portofoliu">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                Vezi Portofoliu
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: '13+', label: 'Ani Experiență' },
              { value: '700+', label: 'Clienți Mulțumiți' },
              { value: '200+', label: 'Proiecte Realizate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// About Section
function AboutSection() {
  const features = [
    { icon: CheckCircle2, text: '100% Personalizat' },
    { icon: Award, text: 'Materiale Premium' },
    { icon: Clock, text: 'Garanție 10 Ani' },
    { icon: Users, text: 'Montaj Profesional' },
  ];

  return (
    <section id="despre" className="section-padding bg-gradient-dark">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="text-sm text-amber-400">Despre Noi</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              13+ Ani de{' '}
              <span className="text-gradient">Experiență</span>
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Cu peste 13 ani de experiență, Atelierul de Mobilă din Brașov s-a consolidat ca lider
              în producția de mobilă personalizată. Fiecare piesă este creată cu atenție la detalii
              și pasiune pentru perfecțiune.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Folosim doar materiale premium și tehnologie de vârf pentru a crea mobilier care durează
              o viață. Specializarea noastră este <strong>mobila la comandă în Brașov</strong>,
              oferind soluții personalizate pentru fiecare client.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
              alt="Atelier Mobilă Brașov - Mobilă la Comandă"
              className="relative rounded-2xl w-full h-[500px] object-cover"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 right-6 glass-effect rounded-xl p-4 max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-xs text-gray-400">Satisfacție</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: 'Mobilă Bucătărie la Comandă',
      description: 'Bucătării moderne și funcționale, personalizate după nevoile tale. De la design la montaj, îți oferim soluția completă.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      keywords: 'bucatarie la comanda brasov, mobila bucatarie brasov'
    },
    {
      title: 'Mobilă Dormitor la Comandă',
      description: 'Creează-ți sanctuarul perfect cu mobilier de dormitor personalizat: paturi, noptiere, comode și dulapuri.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
      keywords: 'mobila dormitor brasov, paturi la comanda brasov'
    },
    {
      title: 'Dressinguri la Comandă',
      description: 'Maximizează spațiul de depozitare cu dressinguri walk-in sau în culise, proiectate special pentru tine.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80',
      keywords: 'dressing la comanda brasov, dressinguri brasov'
    },
    {
      title: 'Mobilier Living la Comandă',
      description: 'Livinguri elegante cu biblioteci, comode TV și spații de depozitare integrate perfect în design.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
      keywords: 'mobila living brasov, biblioteci la comanda brasov'
    },
    {
      title: 'Mobilier Baie la Comandă',
      description: 'Mobilier rezistent la umiditate pentru baie: dulăpioare, oglinzi cu iluminare și spații de depozitare.',
      image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=600&q=80',
      keywords: 'mobila baie brasov, mobilier baie la comanda'
    },
    {
      title: 'Mobilier Birou la Comandă',
      description: 'Birouri ergonomice și spații de lucru optimizate pentru productivitate maximă acasă sau la birou.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',
      keywords: 'mobila birou brasov, birouri la comanda brasov'
    },
  ];

  return (
    <section id="servicii" className="section-padding bg-black">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-sm text-amber-400">Serviciile Noastre</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce Tipuri de{' '}
            <span className="text-gradient">Mobilă</span>{' '}
            Realizăm
          </h2>
          <p className="text-gray-400">
            Oferim o gamă completă de servicii de mobilă la comandă în Brașov,
            de la proiectare până la montaj.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass-effect rounded-2xl overflow-hidden hover-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {service.description}
                </p>
                <meta name="keywords" content={service.keywords} />
                <a
                  href="#contact"
                  className="inline-flex items-center text-amber-500 text-sm font-medium hover:underline"
                >
                  Solicită Ofertă
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portfolio Section
function PortfolioSection() {
  const projects = [
    {
      title: 'Bucătărie Modernă',
      category: 'Bucătării la Comandă',
      description: 'Design minimalist cu finisaje premium',
      image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80'
    },
    {
      title: 'Living la Comandă',
      category: 'Mobilier Living',
      description: 'Soluții elegante pentru living personalizat',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'
    },
    {
      title: 'Dormitor Lux',
      category: 'Dormitoare la Comandă',
      description: 'Confort și stil în dormitor',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
    },
    {
      title: 'Dressing Walk-in',
      category: 'Dressinguri',
      description: 'Organizare perfectă și eleganță',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80'
    },
    {
      title: 'Birou la Comandă',
      category: 'Mobilier Birou',
      description: 'Spațiu de lucru productiv personalizat',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    },
    {
      title: 'Baie Relax',
      category: 'Mobilier Baie',
      description: 'Soluții practice și moderne',
      image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=800&q=80'
    },
  ];

  return (
    <section id="portofoliu" className="section-padding bg-gradient-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-sm text-amber-400">Proiecte</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Portofoliu{' '}
            <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-gray-400">
            Descoperă selecția noastră de proiecte realizate pentru clienți exigenți din Brașov și împrejurimi.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={project.image}
                alt={`${project.title} - ${project.category} Brașov`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-amber-500 text-sm font-medium">{project.category}</span>
                <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#contact">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Vrei un Proiect Similar?
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Popescu',
      role: 'Client Satisfăcut',
      content: 'Profesionalism desăvârșit! Am fost impresionat de atenția la detalii și de calitatea excepțională a mobilierului. Recomand cu încredere serviciile de mobilă la comandă din Brașov!',
      rating: 5
    },
    {
      name: 'Alexandru Ionescu',
      role: 'Client Satisfăcut',
      content: 'Experiență fantastică din prima până în ultima clipă. Design-ul propus a depășit așteptările noastre, iar montajul a fost impecabil. Bucătăria la comandă este exact cum am visat.',
      rating: 5
    },
    {
      name: 'Elena Dumitrescu',
      role: 'Client Satisfăcut',
      content: 'Calitate superioară și prețuri corecte. Au transformat complet dormitorul nostru cu mobilier personalizat. Suntem extrem de mulțumiți de rezultat!',
      rating: 5
    },
  ];

  return (
    <section id="testimoniale" className="section-padding bg-black">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-sm text-amber-400">Testimoniale</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce Spun{' '}
            <span className="text-gradient">Clienții</span>
          </h2>
          <p className="text-gray-400">
            Părerile clienților noștri sunt cea mai bună dovadă a calității serviciilor de mobilă la comandă în Brașov.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-effect rounded-2xl p-8">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-amber-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section with Accordion
function FAQSection() {
  const faqs = [
    {
      question: 'Cât costă mobila la comandă în Brașov?',
      answer: 'Prețul mobilei la comandă în Brașov variază în funcție de dimensiuni, materiale și complexitate. O bucătărie completă poate costa între 8.000 și 25.000 lei, un dormitor între 5.000 și 15.000 lei, iar un dressing între 3.000 și 10.000 lei. Oferim consultanță gratuită și estimări personalizate.'
    },
    {
      question: 'Cât durează realizarea mobilei la comandă?',
      answer: 'Timpul de execuție pentru mobila la comandă în Brașov este de obicei între 3 și 6 săptămâni, în funcție de complexitatea proiectului și materialele alese. Oferim termene clare la semnarea contractului și ținem clientul informat pe tot parcursul procesului.'
    },
    {
      question: 'Ce materiale folosiți pentru mobila la comandă?',
      answer: 'Folosim doar materiale premium de la producători consacrați: PAL melaminat EGGER și Kronospan, MDF vopsit sau furniruit, lemn masiv de stejar, nuc sau fag, blaturi de cuarț sau ceramică pentru bucătării, și feronerie de calitate de la Blum, Hettich sau Grass.'
    },
    {
      question: 'Cum pot solicita o ofertă pentru mobila la comandă?',
      answer: 'Puteți solicita o ofertă gratuită completând formularul de contact de pe site, sunând la numărul de telefon +40 750 275 134, sau prin WhatsApp. Vom programa o vizită pentru măsurători și consultanță, după care veți primi o ofertă detaliată cu proiectul 3D.'
    },
  ];

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-sm text-amber-400">Întrebări Frecvente</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Răspunsuri la{' '}
            <span className="text-gradient">Întrebări</span>
          </h2>
          <p className="text-gray-400">
            Află mai multe despre serviciile noastre de mobilă la comandă în Brașov.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-effect rounded-xl border-none overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-lg font-semibold text-amber-500 hover:no-underline hover:bg-white/5 transition-colors [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// Contact Section with Google Maps
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Se trimite mesajul…' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Nu am putut trimite mesajul. Încearcă din nou.');
      }

      setStatus({ type: 'success', message: 'Mesaj trimis cu succes! Te contactăm în cel mai scurt timp.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || 'A apărut o eroare. Te rugăm să încerci din nou.' });
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Telefon', value: '+40 750 275 134', href: 'tel:+40750275134' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+40 750 275 134', href: 'https://wa.me/40750275134' },
    { icon: Mail, label: 'Email', value: 'contact@atelier-mobila.com', href: 'mailto:contact@atelier-mobila.com' },
    { icon: MapPin, label: 'Adresă', value: 'Bd. Ștefan cel Mare și Sfânt 13, Sc. A', href: '#' },
  ];

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-sm text-amber-400">Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hai să{' '}
            <span className="text-gradient">Vorbim</span>
          </h2>
          <p className="text-gray-400">
            Contactează-ne pentru o ofertă gratuită de mobilă la comandă în Brașov.
            Suntem aici să transformăm viziunea ta în realitate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="flex items-center gap-4 glass-effect rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{info.label}</div>
                  <div className="text-lg font-semibold">{info.value}</div>
                </div>
              </a>
            ))}

            {/* Working Hours */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Program de Lucru</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Luni - Vineri</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sâmbătă</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Duminică</span>
                  <span>Închis</span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="glass-effect rounded-xl p-4 overflow-hidden">
              <h3 className="text-lg font-semibold mb-4">Ne Găsești Aici</h3>
              <div className="rounded-lg overflow-hidden" style={{ height: '300px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.1234567890123!2d25.6012!3d45.6579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b1234567890%3A0xabcdef1234567890!2sBulevardul%20%C8%98tefan%20cel%20Mare%20%C8%99i%20Sf%C3%A2nt%2013%2C%20Bra%C8%99ov!5e0!3m2!1sro!2sro!4v1234567890123!5m2!1sro!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Atelier Mobilă Brașov - Locație"
                />
              </div>
              <p className="text-sm text-gray-400 mt-3 text-center">
                Bulevardul Ștefan cel Mare și Sfânt 13, Scara A, Brașov
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-2xl p-8 h-fit">
            <h3 className="text-xl font-semibold mb-6">Solicită Ofertă Gratuită</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Nume</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Numele tău"
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemplu.ro"
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+40 7XX XXX XXX"
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Descrie-ne proiectul tău..."
                  rows={4}
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>

              {status.type !== 'idle' && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${status.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : status.type === 'error'
                        ? 'border-red-500/30 bg-red-500/10 text-red-200'
                        : 'border-white/10 bg-white/5 text-gray-200'
                    }`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {status.type === 'loading' ? 'Se trimite...' : 'Trimite Mesaj'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const footerLinks = {
    servicii: [
      { label: 'Bucătării la Comandă', href: '#servicii' },
      { label: 'Dormitoare la Comandă', href: '#servicii' },
      { label: 'Dressinguri', href: '#servicii' },
      { label: 'Mobilier Living', href: '#servicii' },
      { label: 'Mobilier Baie', href: '#servicii' },
    ],
    companie: [
      { label: 'Despre Noi', href: '#despre' },
      { label: 'Portofoliu', href: '#portofoliu' },
      { label: 'Testimoniale', href: '#testimoniale' },
      { label: 'Contact', href: '#contact' },
    ],
    contact: [
      { label: '+40 750 275 134', href: 'tel:+40750275134' },
      { label: 'contact@atelier-mobila.com', href: 'mailto:contact@atelier-mobila.com' },
      { label: 'Bd. Ștefan cel Mare și Sfânt 13, Sc. A', href: '#' },
    ],
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#acasa" className="flex items-center gap-2 mb-6">
              <Briefcase className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold">
                Atelier <span className="text-amber-500">Mobilă</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm mb-6">
              Mobilă la comandă în Brașov de cea mai înaltă calitate.
              Bucătării, dormitoare, dressinguri și multe altele.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/40750275134" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="tel:+40750275134" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:contact@atelier-mobila.com" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Servicii</h4>
            <ul className="space-y-3">
              {footerLinks.servicii.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Companie</h4>
            <ul className="space-y-3">
              {footerLinks.companie.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AtelierMobilă. Toate drepturile rezervate.
          </p>
          <p className="text-gray-500 text-sm text-center">
            Mobilă la Comandă Brașov | Atelier Mobilă | Realizat de{" "}
            <a
              href="https://envie-agency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500"
            >
              Envie Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
