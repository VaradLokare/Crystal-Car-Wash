import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './App.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const CarWashWebsite = () => {
  const [selectedPlan, setSelectedPlan] = useState('Premium Detail');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedGalleryFilter, setSelectedGalleryFilter] = useState('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef([]);
  const pricingRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const galleryRef = useRef(null);
  const timeline = useRef(null);

  // Premium Services Data (same as before)
  const premiumServices = [
    {
      id: 1,
      title: "Ceramic Coating Pro",
      description: "State-of-the-art ceramic coating with 5-year warranty for ultimate protection",
      price: "$499",
      duration: "1-2 days",
      icon: "🛡️",
      features: [
        "5-Year Protection Warranty",
        "Hydrophobic Nano-Ceramic Layer",
        "UV Ray Protection",
        "Chemical Stain Resistance",
        "Enhanced Gloss Finish",
        "Self-Cleaning Properties"
      ],
      images: [
        "https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop&q=80"
      ],
      popular: true,
      highlightColor: "from-[#EC625F] to-[#ff8e53]"
    },
    // ... (keep all other premium services data)
  ];

  // Gallery Images Data (same as before)
  const galleryImages = [
    // ... (keep all gallery images data)
  ];

  // Stats data (same as before)
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: "😊", color: "from-[#EC625F] to-[#ff6b6b]" },
    // ... (keep all stats data)
  ];

  // Plans data (same as before)
  const plans = [
    // ... (keep all plans data)
  ];

  const services = [
    // ... (keep all services data)
  ];

  // Initialize GSAP timeline with enhanced animations
  useEffect(() => {
    timeline.current = gsap.timeline();
    
    // Hero animations
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        duration: 1.5,
        y: 80,
        opacity: 0,
        scale: 0.95,
        ease: "power4.out"
      });
    }

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        duration: 1.8,
        y: 120,
        opacity: 0,
        scale: 0.85,
        rotationX: 10,
        ease: "back.out(2)",
        delay: 0.3
      });
    }

    // Services animation
    servicesRef.current.forEach((service, index) => {
      if (service) {
        gsap.from(service, {
          scrollTrigger: {
            trigger: service,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          },
          duration: 1.2,
          y: 80,
          opacity: 0,
          scale: 0.9,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    // Gallery animation
    if (galleryRef.current) {
      gsap.from(galleryRef.current.querySelectorAll('.gallery-item'), {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 100,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        ease: "power3.out"
      });
    }

    // Pricing animation
    if (pricingRef.current) {
      gsap.from(pricingRef.current, {
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        duration: 1.2,
        y: 100,
        opacity: 0,
        scale: 0.9,
        ease: "elastic.out(1, 0.5)"
      });
    }

    // Stats animation
    if (statsRef.current) {
      const statsElements = statsRef.current.querySelectorAll('.stat-number');
      statsElements.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          duration: 2.5,
          innerText: 0,
          ease: "power3.out",
          snap: { innerText: 1 },
          delay: index * 0.3,
          onUpdate: function() {
            const value = Math.ceil(this.targets()[0].innerText);
            this.targets()[0].innerText = value;
          }
        });
      });
    }

    // Navbar animation
    if (navRef.current) {
      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "100px top",
          end: "+=200",
          toggleActions: "play reverse play reverse",
          scrub: 0.5
        },
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(20px)",
        padding: "1rem 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        ease: "power2.out"
      });
    }

    // Section tracking
    const sections = ['hero', 'services', 'premium', 'gallery', 'pricing', 'contact'];
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section)
      });
    });

    return () => {
      timeline.current?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Modal animation
    setTimeout(() => {
      gsap.fromTo(".booking-modal", 
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" }
      );
    }, 50);
  };

  const closeModal = () => {
    gsap.to(".booking-modal", {
      duration: 0.4,
      y: 50,
      opacity: 0,
      scale: 0.95,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const openGalleryModal = (image) => {
    setSelectedGalleryImage(image);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      gsap.fromTo(".gallery-modal",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 50);
  };

  const closeGalleryModal = () => {
    gsap.to(".gallery-modal", {
      duration: 0.3,
      scale: 0.9,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        setSelectedGalleryImage(null);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
    setIsMenuOpen(false);
  };

  const filteredGalleryImages = selectedGalleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedGalleryFilter);

  // Logo Component
  const Logo = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ... (keep original logo SVG) */}
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-sans overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] transition-all duration-300 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 py-4 px-4 md:px-8 transition-all duration-500 bg-[#0F172A]/90 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="mr-3 transform group-hover:scale-110 transition-transform duration-300">
                <Logo />
              </div>
              <div>
                <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  PRESTIGE
                </div>
                <div className="text-xs text-white/70 font-semibold tracking-widest">
                  AUTOMOTIVE EXCELLENCE
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {['Home', 'Services', 'Premium', 'Gallery', 'Pricing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className={`px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-white bg-gradient-to-r from-[#EC625F]/20 to-[#ff6b6b]/20'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                BOOK NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-300 top-3 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2 p-2 bg-white/5 rounded-lg">
              {['Home', 'Services', 'Premium', 'Gallery', 'Pricing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="block w-full text-left p-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-semibold"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="w-full p-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 mt-2"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] pt-24"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#EC625F]/20 to-[#ff6b6b]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#ff8e53]/20 to-[#ffd166]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center" ref={heroRef}>
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-10">
              <span className="w-3 h-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] rounded-full mr-3 animate-pulse" />
              <span className="text-white/90 text-base font-semibold">PREMIUM AUTOMOTIVE CARE</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8"
            >
              <span className="block">ELEVATE</span>
              <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                YOUR SHINE
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-10">
              Professional detailing services using premium products and cutting-edge technology 
              to restore your vehicle's original brilliance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openModal('Premium Detail')}
              className="px-10 py-5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              BOOK DETAILING SERVICE
            </button>
            
            <button 
              onClick={() => scrollToSection('#premium')}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              VIEW PREMIUM SERVICES
            </button>
          </div>

          {/* Stats Preview */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('#services')}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-sm mb-2">EXPLORE</span>
            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-2 h-3 bg-gradient-to-b from-[#EC625F] to-[#ff6b6b] rounded-full mt-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Trusted Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of experience delivering premium automotive care
            </p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mb-6 mx-auto`}>
                  {stat.icon}
                </div>
                <div className="stat-number text-4xl font-black text-gray-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience comprehensive detailing solutions using state-of-the-art equipment
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={el => servicesRef.current[index] = el}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex items-start mb-8">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mr-6`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-black text-gray-900">{service.title}</h3>
                        <span className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                          {service.time}
                        </span>
                      </div>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="font-bold text-gray-900 mb-4">INCLUDED SERVICES:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-[#EC625F] mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className="mt-8 w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section id="premium" className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Elite Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our elite services with professional-grade products
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {premiumServices.map((service) => (
              <div 
                key={service.id}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 relative"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-full shadow-lg">
                      POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-8 pt-12">
                  <div className="flex items-start mb-8">
                    <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${service.highlightColor} flex items-center justify-center text-4xl mr-6`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-gray-900">
                            {service.price}
                          </div>
                          <div className="text-[#EC625F] font-bold mt-1">{service.duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">GALLERY PREVIEW:</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {service.images.map((image, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => openGalleryModal({
                            url: image,
                            title: service.title,
                            service: service.title
                          })}
                        >
                          <img 
                            src={image} 
                            alt={`${service.title} ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="font-bold text-gray-900 mb-4">FEATURES:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-[#EC625F] mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className={`mt-8 w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                      service.popular
                        ? 'bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {service.popular ? 'BOOK PREMIUM SERVICE' : 'SELECT THIS SERVICE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50/50" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Showcase Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse through our portfolio of completed projects
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['all', 'exterior', 'interior', 'engine', 'finishing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedGalleryFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    selectedGalleryFilter === filter
                      ? 'bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleryImages.map((image) => (
              <div 
                key={image.id}
                className="gallery-item group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                onClick={() => openGalleryModal(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-bold text-white text-lg mb-2">{image.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-[#EC625F] px-3 py-1 rounded-full text-white font-medium">
                      {image.category.toUpperCase()}
                    </span>
                    <span className="text-sm text-white/90">{image.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => scrollToSection('#premium')}
              className="px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300"
            >
              VIEW ALL ELITE SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully crafted packages
            </p>
          </div>
          
          <div ref={pricingRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 relative ${
                  plan.popular ? 'border-2 border-[#EC625F]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-full">
                      BEST VALUE
                    </div>
                  </div>
                )}
                
                <div className="p-8 pt-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-5xl font-black text-gray-900">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-[#EC625F] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openModal(plan.name)}
                    className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {plan.popular ? 'GET STARTED NOW' : 'SELECT PLAN'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-[#EC625F]/5 to-[#ff8e53]/5 rounded-2xl p-8 border border-[#EC625F]/10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Need a Custom Package?</h3>
                <p className="text-gray-600 max-w-2xl">
                  Our detailing experts can create a personalized package tailored to your needs.
                </p>
              </div>
              <button 
                onClick={() => openModal('Custom')}
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300"
              >
                REQUEST FREE QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Book your appointment today and experience premium car care that exceeds expectations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openModal('Premium Detail')}
              className="px-12 py-5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              BOOK APPOINTMENT
            </button>
            
            <a 
              href="tel:+18885551234"
              className="px-12 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              CALL: (888) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-8">
                <div className="mr-4">
                  <Logo />
                </div>
                <div>
                  <div className="text-xl font-black text-[#EC625F]">PRESTIGE</div>
                  <div className="text-xs text-white/70">AUTOMOTIVE EXCELLENCE</div>
                </div>
              </div>
              <p className="text-white/70 mb-8">
                Premium car wash and detailing services since 2012.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#EC625F] transition-all duration-300"
                  >
                    <span className="font-medium">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "QUICK LINKS",
                links: ['Home', 'Services', 'Premium', 'Gallery', 'Pricing', 'Contact']
              },
              {
                title: "ELITE SERVICES",
                links: ['Ceramic Coating', 'Paint Correction', 'Leather Restoration', 'Headlight Restoration', 'Engine Detailing']
              },
              {
                title: "CONTACT INFO",
                links: ['📍 123 Premium Street', '📞 (888) 555-1234', '✉️ info@prestige.com', '🕒 Mon-Sun: 7AM - 10PM']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href="#"
                        className="text-white/70 hover:text-white transition-all duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#1E293B] pt-8 text-center">
            <p className="text-white/60">
              © {new Date().getFullYear()} PRESTIGE AUTOMOTIVE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="booking-modal bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Book {selectedPlan}</h3>
                <p className="text-gray-600 mt-1">Fill out the form below</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Date *</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Type *</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300">
                    <option value="">Select Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                <textarea 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all duration-300"
                  rows="3"
                  placeholder="Any specific requirements..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                CONFIRM BOOKING
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={closeGalleryModal}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] gallery-modal">
            <button 
              onClick={closeGalleryModal}
              className="absolute -top-12 -right-4 md:-right-12 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-10 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={selectedGalleryImage.url} 
              alt={selectedGalleryImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-bold mb-2">{selectedGalleryImage.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[#EC625F] font-medium">{selectedGalleryImage.service}</span>
                <span className="text-white/90 text-sm">{selectedGalleryImage.category} Service</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarWashWebsite;