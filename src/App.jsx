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
  
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef([]);
  const pricingRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const timeline = useRef(null);

  // Initialize GSAP timeline
  useEffect(() => {
    timeline.current = gsap.timeline();
    
    // Hero animation sequence
    timeline.current
      .from(heroRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      })
      .from(titleRef.current, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)",
        delay: -0.8
      })
      .from(".hero-subtitle", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: -0.5
      })
      .from(".cta-buttons", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        delay: -0.3
      });

    // Services animation with ScrollTrigger
    servicesRef.current.forEach((service, index) => {
      if (service) {
        gsap.from(service, {
          scrollTrigger: {
            trigger: service,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          duration: 1,
          y: 60,
          opacity: 0,
          rotateX: 15,
          stagger: 0.15,
          ease: "power3.out"
        });
      }
    });

    // Pricing animation
    gsap.from(pricingRef.current, {
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 1.2,
      y: 80,
      opacity: 0,
      scale: 0.95,
      ease: "back.out(1.3)"
    });

    // Stats animation
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
    if (statsElements) {
      statsElements.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          duration: 2,
          innerText: 0,
          ease: "power3.out",
          snap: { innerText: 1 },
          delay: index * 0.2
        });
      });
    }

    // Navbar animation on scroll
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "bottom top",
        end: "+=100",
        toggleActions: "play reverse play reverse"
      },
      duration: 0.5,
      backgroundColor: "rgba(49, 49, 49, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "1rem 0",
      ease: "power2.out"
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

  // Stats data
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: "😊" },
    { number: "12+", label: "Years Experience", icon: "⭐" },
    { number: "98%", label: "Satisfaction Rate", icon: "❤️" },
    { number: "24/7", label: "Support Available", icon: "🕒" }
  ];

  // Plans data
  const plans = [
    {
      name: "Standard Detail",
      price: "$49",
      description: "Perfect for regular maintenance",
      popular: false,
      features: [
        "Exterior Hand Wash & Dry",
        "Tire & Wheel Deep Clean",
        "Windows In & Out",
        "Interior Vacuum & Wipe",
        "Dashboard & Console Polish",
        "Floor Mat Clean & Shampoo",
        "Air Freshener"
      ],
      color: "from-gray-500 to-gray-700"
    },
    {
      name: "Premium Detail",
      price: "$89",
      description: "Deep cleaning for your vehicle",
      popular: true,
      features: [
        "Everything in Standard",
        "Clay Bar Treatment",
        "Liquid Wax Application",
        "Leather Conditioning",
        "Carpet Shampoo & Extract",
        "Air Vent Deep Cleaning",
        "Door Jambs & Trunk Clean",
        "Headlight Polish"
      ],
      color: "from-[#EC625F] to-[#ff6b6b]"
    },
    {
      name: "Ultimate Detail",
      price: "$139",
      description: "Complete restoration package",
      popular: false,
      features: [
        "Everything in Premium",
        "Engine Bay Steam Clean",
        "Paint Decontamination",
        "Ceramic Coating Prep",
        "Headlight Restoration",
        "Fabric & Leather Protection",
        "Trim & Plastic Restoration",
        "Undercarriage Wash",
        "Interior Sanitization"
      ],
      color: "from-gray-800 to-gray-900"
    }
  ];

  const services = [
    {
      title: "Exterior Detailing",
      description: "Professional exterior cleaning with ceramic coating options for lasting protection.",
      icon: "🚗",
      color: "from-[#EC625F] to-[#ff8e53]",
      features: ["Paint Correction", "Ceramic Coating", "Headlight Restoration", "Wheel Detailing"],
      time: "2-4 hours"
    },
    {
      title: "Interior Deep Clean",
      description: "Complete interior sanitization and restoration using eco-friendly products.",
      icon: "🧽",
      color: "from-[#525252] to-[#414141]",
      features: ["Leather Conditioning", "Carpet Extraction", "Odor Elimination", "Fabric Protection"],
      time: "3-5 hours"
    },
    {
      title: "Engine Bay Cleaning",
      description: "Safe and thorough engine cleaning to prevent corrosion and maintain performance.",
      icon: "🔧",
      color: "from-[#313131] to-gray-800",
      features: ["Degreasing", "Corrosion Protection", "Electrical Safety", "Dressing"],
      time: "1-2 hours"
    },
    {
      title: "Premium Wax & Polish",
      description: "Showroom-quality finishing with premium waxes and polishes for ultimate shine.",
      icon: "✨",
      color: "from-[#ff6b6b] to-[#ff9a9e]",
      features: ["Hand Waxing", "Polish Application", "Gloss Enhancement", "UV Protection"],
      time: "2-3 hours"
    }
  ];

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    gsap.from(".booking-modal", {
      duration: 0.5,
      y: 50,
      opacity: 0,
      scale: 0.9,
      ease: "back.out(1.7)"
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: sectionId,
      ease: "power3.inOut"
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 py-6 px-4 md:px-8 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              <span className="gradient-text">PRESTIGE</span>
              <span className="text-[#313131]">CAR CARE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Pricing', 'Why Us', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase().replace(' ', '-')}`)}
                  className="nav-link text-[#525252] hover:text-[#EC625F] font-medium transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="px-6 py-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-full hover:shadow-xl hover-lift transition-all duration-300"
              >
                BOOK NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#525252] hover:text-[#EC625F] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <div className="p-6 space-y-4">
              {['Services', 'Pricing', 'Why Us', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase().replace(' ', '-')}`)}
                  className="block w-full text-left py-3 text-[#525252] hover:text-[#EC625F] font-medium border-b border-gray-100 last:border-0 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="w-full py-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-lg hover-lift transition-all duration-300"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        ref={headerRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#313131] via-[#414141] to-[#525252] pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 98, 95, 0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-b from-[#EC625F] to-[#ff6b6b] opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center" ref={heroRef}>
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-[#EC625F] rounded-full mr-2 animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">PREMIUM CAR CARE SERVICES</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block">Elevate Your</span>
              <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                Car's Shine
              </span>
            </h1>
            
            <div className="hero-subtitle">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                Professional detailing services using premium products and cutting-edge technology 
                to restore your vehicle's original brilliance.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <button 
              onClick={() => openModal('Premium Detail')}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-full shadow-2xl hover-lift overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center">
                BOOK DETAILING
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => scrollToSection('#services')}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-full border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 group hover-lift"
            >
              <span className="flex items-center justify-center">
                VIEW SERVICES
                <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('#services')}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-sm mb-2">Explore More</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gradient-to-b from-[#EC625F] to-[#ff6b6b] rounded-full mt-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-inner">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift transition-all duration-300"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="stat-number text-5xl font-bold text-[#313131] mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-[#525252]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="section-inner">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#313131] mb-6">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] to-[#ff8e53]">
                  Premium Services
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#EC625F]/20 to-[#ff8e53]/20 -z-10" />
              </span>
            </h2>
            <p className="text-xl text-[#525252] max-w-3xl mx-auto">
              We offer comprehensive detailing solutions using state-of-the-art equipment 
              and eco-friendly products for optimal results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={el => servicesRef.current[index] = el}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover-lift border border-gray-100 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mr-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      {service.icon}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-[#313131] mb-2">{service.title}</h3>
                        <span className="px-3 py-1 bg-[#EC625F]/10 text-[#EC625F] text-sm font-semibold rounded-full">
                          {service.time}
                        </span>
                      </div>
                      <p className="text-[#525252]">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="font-bold text-[#313131] mb-4 text-lg">Included Services:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                          <svg className="w-5 h-5 text-[#EC625F] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#414141] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className="mt-8 w-full py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-[#313131] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 group"
                  >
                    <span className="flex items-center justify-center">
                      Book This Service
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-inner">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#313131] mb-6">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] to-[#ff8e53]">
                  Transparent Pricing
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#EC625F]/20 to-[#ff8e53]/20 -z-10" />
              </span>
            </h2>
            <p className="text-xl text-[#525252] max-w-3xl mx-auto">
              Choose from our carefully crafted packages designed to meet every need and budget.
            </p>
          </div>
          
          <div ref={pricingRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover-lift border-2 transition-all duration-300 relative ${
                  plan.popular 
                    ? 'border-[#EC625F] shadow-2xl scale-105' 
                    : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-8 pt-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#313131] mb-3">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-6xl font-bold bg-gradient-to-r from-[#313131] to-[#525252] bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-[#525252]">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-[#EC625F] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[#414141]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openModal(plan.name)}
                    className={`w-full py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff8e53] text-white shadow-lg'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-[#313131] border border-gray-200'
                    }`}
                  >
                    {plan.popular ? 'GET STARTED NOW' : 'SELECT PLAN'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Package */}
          <div className="mt-16 bg-gradient-to-r from-[#EC625F]/10 to-[#ff8e53]/10 rounded-2xl p-8 border border-[#EC625F]/20">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h3 className="text-2xl font-bold text-[#313131] mb-3">Need a Custom Package?</h3>
                <p className="text-[#525252] max-w-2xl">
                  Our detailing experts can create a personalized package tailored to your vehicle's 
                  specific needs and your budget requirements.
                </p>
              </div>
              <button 
                onClick={() => openModal('Custom')}
                className="px-8 py-4 bg-gradient-to-r from-[#313131] to-[#525252] hover:from-[#414141] hover:to-[#313131] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                REQUEST QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-[#313131] via-[#414141] to-[#525252] text-white">
        <div className="section-inner">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Transform Your
              <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                Vehicle's Appearance?
              </span>
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Book your appointment today and experience premium car care that exceeds expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => openModal('Premium Detail')}
                className="px-12 py-5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff8e53] text-white font-bold rounded-full shadow-2xl hover-lift text-lg group transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  BOOK NOW
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <a 
                href="tel:+18885551234"
                className="px-12 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-full border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 group hover-lift"
              >
                <span className="flex items-center justify-center">
                  CALL: (888) 555-1234
                  <svg className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#313131] text-white py-16">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-6">
                <span className="gradient-text">PRESTIGE</span>
                <span className="text-white">CAR CARE</span>
              </div>
              <p className="text-white/70 mb-6">
                Premium car wash and detailing services using eco-friendly products 
                and professional equipment since 2012.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#414141] hover:bg-[#EC625F] flex items-center justify-center transition-colors duration-300"
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Quick Links",
                links: ['Home', 'Services', 'Pricing', 'Gallery', 'About Us', 'Contact']
              },
              {
                title: "Services",
                links: ['Exterior Detailing', 'Interior Cleaning', 'Engine Wash', 'Paint Correction', 'Ceramic Coating', 'Headlight Restoration']
              },
              {
                title: "Contact Info",
                links: ['📍 123 Premium Street, Auto City', '📞 (888) 555-1234', '✉️ info@prestigecarcare.com', '🕒 Mon-Sun: 7:00 AM - 10:00 PM']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold mb-6 text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href="#"
                        className="text-white/70 hover:text-[#EC625F] transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#414141] pt-8 text-center">
            <p className="text-white/60">
              © {new Date().getFullYear()} PRESTIGE CAR CARE & DETAILING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="booking-modal bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#313131]">Book {selectedPlan}</h3>
                <p className="text-[#525252] mt-1">Fill out the form below to schedule your appointment</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#414141] font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#414141] font-medium mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#414141] font-medium mb-2">Preferred Date *</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#414141] font-medium mb-2">Vehicle Type *</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all">
                    <option value="">Select Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV / Crossover</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van / Minivan</option>
                    <option value="luxury">Luxury Vehicle</option>
                    <option value="sports">Sports Car</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-[#414141] font-medium mb-2">Email Address *</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#414141] font-medium mb-2">Special Requests</label>
                <textarea 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#EC625F] focus:ring-2 focus:ring-[#EC625F]/20 transition-all resize-none"
                  rows="3"
                  placeholder="Any specific requirements, notes, or areas needing special attention..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff8e53] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                CONFIRM BOOKING
              </button>
              
              <p className="text-center text-[#525252] text-sm">
                We'll contact you within 1 hour to confirm your appointment details.
              </p>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #EC625F 0%, #ff6b6b 50%, #ff8e53 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default CarWashWebsite;