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
    {
      id: 2,
      title: "Paint Correction Elite",
      description: "Professional paint correction removing swirls, scratches, and oxidation",
      price: "$349",
      duration: "6-8 hours",
      icon: "✨",
      features: [
        "3-Step Paint Correction",
        "Swirl & Scratch Removal",
        "Oxidation Treatment",
        "Gloss Enhancement",
        "Paint Thickness Analysis",
        "Final Polish & Sealant"
      ],
      images: [
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80"
      ],
      popular: false,
      highlightColor: "from-[#4F46E5] to-[#7C3AED]"
    },
    {
      id: 3,
      title: "Leather Restoration Suite",
      description: "Complete leather interior restoration and protection package",
      price: "$299",
      duration: "4-6 hours",
      icon: "🧵",
      features: [
        "Leather Deep Cleaning",
        "Conditioning & Nourishing",
        "Color Restoration",
        "Crack & Wear Repair",
        "UV Protection",
        "Anti-Microbial Treatment"
      ],
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80"
      ],
      popular: false,
      highlightColor: "from-[#059669] to-[#10B981]"
    },
    {
      id: 4,
      title: "Headlight Restoration Pro",
      description: "Complete headlight restoration with UV protection coating",
      price: "$129",
      duration: "2-3 hours",
      icon: "💡",
      features: [
        "Sand & Polish Process",
        "UV Clear Coat Application",
        "Yellowing Removal",
        "Haze Elimination",
        "Waterproof Sealant",
        "2-Year Warranty"
      ],
      images: [
        "https://images.unsplash.com/photo-1565689221359-d87f85d4aee2?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"
      ],
      popular: true,
      highlightColor: "from-[#F59E0B] to-[#FBBF24]"
    }
  ];

  // Gallery Images Data (same as before)
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
      title: "Ceramic Coating Application",
      category: "exterior",
      service: "Ceramic Coating Pro",
      beforeAfter: true
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1565689221359-d87f85d4aee2?w=800&auto=format&fit=crop&q=80",
      title: "Headlight Restoration",
      category: "exterior",
      service: "Headlight Restoration Pro",
      beforeAfter: true
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80",
      title: "Leather Interior Detailing",
      category: "interior",
      service: "Leather Restoration Suite",
      beforeAfter: false
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80",
      title: "Paint Correction Process",
      category: "exterior",
      service: "Paint Correction Elite",
      beforeAfter: true
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
      title: "Engine Bay Cleaning",
      category: "engine",
      service: "Premium Engine Detail",
      beforeAfter: true
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
      title: "Final Polish Stage",
      category: "finishing",
      service: "Ultimate Detailing Package",
      beforeAfter: false
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
      title: "Wheel Detailing",
      category: "exterior",
      service: "Premium Wheel Care",
      beforeAfter: true
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800&auto=format&fit=crop&q=80",
      title: "Interior Sanitization",
      category: "interior",
      service: "Complete Interior Care",
      beforeAfter: false
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop&q=80",
      title: "Water Beading Effect",
      category: "finishing",
      service: "Ceramic Coating Pro",
      beforeAfter: false
    }
  ];

  // Stats data
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: "😊", color: "from-[#EC625F] to-[#ff6b6b]" },
    { number: "12+", label: "Years Experience", icon: "⭐", color: "from-[#4F46E5] to-[#7C3AED]" },
    { number: "98%", label: "Satisfaction Rate", icon: "❤️", color: "from-[#059669] to-[#10B981]" },
    { number: "24/7", label: "Support Available", icon: "🕒", color: "from-[#F59E0B] to-[#FBBF24]" }
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
      color: "from-gray-500 to-gray-700",
      badgeColor: "bg-gray-500"
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
      color: "from-[#EC625F] to-[#ff6b6b]",
      badgeColor: "bg-gradient-to-r from-[#EC625F] to-[#ff6b6b]"
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
      color: "from-gray-800 to-gray-900",
      badgeColor: "bg-gray-800"
    }
  ];

  const services = [
    {
      title: "Exterior Detailing",
      description: "Professional exterior cleaning with ceramic coating options for lasting protection.",
      icon: "🚗",
      color: "from-[#EC625F] to-[#ff8e53]",
      features: ["Paint Correction", "Ceramic Coating", "Headlight Restoration", "Wheel Detailing"],
      time: "2-4 hours",
      gradient: "bg-gradient-to-br from-[#EC625F]/10 to-[#ff8e53]/10"
    },
    {
      title: "Interior Deep Clean",
      description: "Complete interior sanitization and restoration using eco-friendly products.",
      icon: "🧽",
      color: "from-[#525252] to-[#414141]",
      features: ["Leather Conditioning", "Carpet Extraction", "Odor Elimination", "Fabric Protection"],
      time: "3-5 hours",
      gradient: "bg-gradient-to-br from-[#525252]/10 to-[#414141]/10"
    },
    {
      title: "Engine Bay Cleaning",
      description: "Safe and thorough engine cleaning to prevent corrosion and maintain performance.",
      icon: "🔧",
      color: "from-[#313131] to-gray-800",
      features: ["Degreasing", "Corrosion Protection", "Electrical Safety", "Dressing"],
      time: "1-2 hours",
      gradient: "bg-gradient-to-br from-[#313131]/10 to-gray-800/10"
    },
    {
      title: "Premium Wax & Polish",
      description: "Showroom-quality finishing with premium waxes and polishes for ultimate shine.",
      icon: "✨",
      color: "from-[#ff6b6b] to-[#ff9a9e]",
      features: ["Hand Waxing", "Polish Application", "Gloss Enhancement", "UV Protection"],
      time: "2-3 hours",
      gradient: "bg-gradient-to-br from-[#ff6b6b]/10 to-[#ff9a9e]/10"
    }
  ];

  // Initialize GSAP timeline with enhanced animations
  useEffect(() => {
    timeline.current = gsap.timeline();
    
    // Enhanced Hero animation sequence
    timeline.current
      .from(heroRef.current, {
        duration: 1.5,
        y: 80,
        opacity: 0,
        scale: 0.95,
        ease: "power4.out",
        clearProps: "all"
      })
      .from(titleRef.current, {
        duration: 1.8,
        y: 120,
        opacity: 0,
        scale: 0.85,
        rotationX: 10,
        ease: "back.out(2)",
        delay: -1.2
      }, "-=1")
      .from(".hero-subtitle", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        skewY: 2,
        ease: "power3.out",
        delay: -0.8
      })
      .from(".cta-buttons", {
        duration: 1,
        y: 40,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out",
        delay: -0.6
      });

    // Enhanced Services animation with parallax effect
    servicesRef.current.forEach((service, index) => {
      if (service) {
        gsap.from(service, {
          scrollTrigger: {
            trigger: service,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            scrub: 1
          },
          duration: 1.5,
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateY: 10,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    // Enhanced Gallery animation with staggered items
    if (galleryRef.current) {
      const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
      gsap.from(galleryItems, {
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

    // Enhanced Pricing animation with bounce effect
    if (pricingRef.current) {
      gsap.from(pricingRef.current, {
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        duration: 1.5,
        y: 100,
        opacity: 0,
        scale: 0.9,
        ease: "elastic.out(1, 0.5)"
      });
    }

    // Enhanced Stats animation with counting
    if (statsRef.current) {
      const statsElements = statsRef.current.querySelectorAll('.stat-number');
      if (statsElements) {
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
              this.targets()[0].innerText = value.toLocaleString();
            }
          });
        });
      }
    }

    // Enhanced Navbar animation with glass morphism
    if (navRef.current) {
      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "bottom top",
          end: "+=200",
          toggleActions: "play reverse play reverse",
          scrub: 0.5
        },
        duration: 0.8,
        backgroundColor: "rgba(31, 31, 31, 0.85)",
        backdropFilter: "blur(20px)",
        padding: "0.75rem 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        ease: "power2.out"
      });
    }

    // Section tracking for active nav
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

    // Parallax effect for hero background
    gsap.to(".hero-particles", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 100,
      ease: "none"
    });

    return () => {
      timeline.current?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced scroll progress tracker
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
    
    // Enhanced modal animation
    gsap.from(".booking-modal", {
      duration: 0.6,
      y: 60,
      opacity: 0,
      scale: 0.9,
      rotationX: 5,
      ease: "back.out(1.8)"
    });
    
    gsap.from(".modal-content", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      delay: 0.2,
      ease: "power3.out"
    });
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
    
    gsap.from(".gallery-modal", {
      duration: 0.5,
      scale: 0.9,
      opacity: 0,
      ease: "back.out(1.7)"
    });
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
    gsap.to(window, {
      duration: 1.5,
      scrollTo: sectionId,
      ease: "power3.inOut"
    });
    setIsMenuOpen(false);
  };

  const filteredGalleryImages = selectedGalleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedGalleryFilter);

  // Enhanced Logo SVG Component
  const Logo = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC625F"/>
          <stop offset="0.5" stopColor="#ff6b6b"/>
          <stop offset="1" stopColor="#ff8e53"/>
        </linearGradient>
        <linearGradient id="innerGradient" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.6"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#EC625F" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" filter="url(#shadow)"/>
      <circle cx="24" cy="24" r="21.5" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
      
      <path d="M16 18L24 12L32 18V30L24 36L16 30V18Z" fill="url(#innerGradient)"/>
      <path d="M20 22L24 18L28 22V26L24 30L20 26V22Z" fill="white" fillOpacity="0.9"/>
      <path d="M22 24L24 22L26 24V26L24 28L22 26V24Z" fill="#EC625F"/>
      
      <path d="M16 18L24 12L32 18" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round"/>
      <path d="M32 30L24 36L16 30" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-sans overflow-x-hidden">
      {/* Enhanced Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] transition-all duration-300 shadow-lg"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: '0 0 20px rgba(236, 98, 95, 0.5)'
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 py-4 px-4 md:px-8 transition-all duration-500 glass-dark"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced animation */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="mr-3 transform group-hover:scale-110 transition-transform duration-300">
                <Logo />
              </div>
              <div>
                <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] leading-tight tracking-tight">
                  PRESTIGE
                </div>
                <div className="text-xs text-white/70 font-semibold tracking-widest uppercase">
                  AUTOMOTIVE EXCELLENCE
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'Services', id: 'services' },
                { name: 'Premium', id: 'premium' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(`#${item.id}`)}
                  className={`px-5 py-3 font-semibold transition-all duration-300 relative overflow-hidden rounded-xl mx-1 ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-[#EC625F]/20 to-[#ff6b6b]/20'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {item.name}
                    {activeSection === item.id && (
                      <span className="ml-2 w-2 h-2 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] rounded-full animate-pulse" />
                    )}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="ml-4 px-7 py-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-xl hover-lift shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="flex items-center">
                  BOOK NOW
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-500 ${
                  isMenuOpen ? 'rotate-45 top-3 left-0' : 'top-1 left-0'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-500 top-3 ${
                  isMenuOpen ? 'opacity-0 left-6' : 'left-0 opacity-100'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-500 ${
                  isMenuOpen ? '-rotate-45 top-3 left-0' : 'top-5 left-0'
                }`} />
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 w-full glass-dark shadow-2xl transition-all duration-500 overflow-hidden ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-6 space-y-2">
              {['Home', 'Services', 'Premium', 'Gallery', 'Pricing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="block w-full text-left p-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-semibold"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="w-full p-4 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-bold rounded-xl hover-lift transition-all duration-300 mt-4"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <header 
        ref={headerRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] pt-24"
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometric Gradient */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 98, 95, 0.4) 1.5px, transparent 0)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#EC625F]/20 to-[#ff6b6b]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#ff8e53]/20 to-[#ffd166]/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Floating Particles */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute hero-particles"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#EC625F] to-[#ff8e53] rounded-full opacity-30 float-animation" />
            </div>
          ))}
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, rgba(236, 98, 95, 0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(236, 98, 95, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center" ref={heroRef}>
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 glass rounded-2xl border border-white/20 mb-10 slide-in-left">
              <span className="w-3 h-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] rounded-full mr-3 animate-pulse" />
              <span className="text-white/90 text-base font-semibold tracking-wider">PREMIUM AUTOMOTIVE CARE SINCE 2012</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none"
            >
              <span className="block text-shadow">ELEVATE</span>
              <span className="block mt-4">
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] blur-xl opacity-70" />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                    YOUR SHINE
                  </span>
                </span>
              </span>
            </h1>
            
            <div className="hero-subtitle">
              <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
                Professional detailing services using premium products and cutting-edge technology 
                to restore your vehicle's original brilliance with unparalleled precision.
              </p>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="cta-buttons flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <button 
              onClick={() => openModal('Premium Detail')}
              className="group relative px-12 py-6 btn-gradient text-white font-bold rounded-2xl shadow-2xl hover-lift overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center text-lg">
                BOOK DETAILING SERVICE
                <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => scrollToSection('#premium')}
              className="group relative px-12 py-6 glass text-white font-bold rounded-2xl border-2 border-white/20 hover:border-white/40 shadow-xl transition-all duration-300 hover-lift overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center text-lg">
                VIEW PREMIUM SERVICES
                <svg className="w-6 h-6 ml-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Enhanced Stats Preview */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 glass rounded-2xl backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-black text-white mb-3">{stat.number}</div>
                <div className="text-white/70 text-sm font-semibold tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
          onClick={() => scrollToSection('#services')}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-sm mb-3 tracking-wider group-hover:text-white transition-colors">EXPLORE SERVICES</span>
            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2 group-hover:border-white/50 transition-colors">
              <div className="w-2 h-3 bg-gradient-to-b from-[#EC625F] to-[#ff6b6b] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Section Divider */}
      <div className="section-divider" />

      {/* Enhanced Stats Section */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="section-inner">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  Trusted Excellence
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-[#EC625F]/10 via-[#ff6b6b]/10 to-[#ff8e53]/10 -z-10 blur-sm" />
              </span>
            </h2>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-10 bg-white rounded-3xl shadow-2xl hover-lift transition-all duration-500 card-hover"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-4xl mb-8 mx-auto transform hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="stat-number text-6xl font-black text-[#0F172A] mb-4">
                  {stat.number}
                </div>
                <div className="text-xl text-[#475569] font-semibold tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Section Divider */}
      <div className="section-divider" />

      {/* Enhanced Services Section */}
      <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  Premium Services
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-[#EC625F]/10 via-[#ff6b6b]/10 to-[#ff8e53]/10 -z-10 blur-sm" />
              </span>
            </h2>
            <p className="text-2xl text-[#64748B] max-w-4xl mx-auto font-light leading-relaxed">
              Experience comprehensive detailing solutions using state-of-the-art equipment 
              and eco-friendly products for optimal, lasting results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={el => servicesRef.current[index] = el}
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift border border-gray-100/50 transition-all duration-500 card-hover"
              >
                <div className={`${service.gradient} p-10`}>
                  <div className="flex items-start mb-10">
                    <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center text-5xl mr-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-black text-[#0F172A]">{service.title}</h3>
                        <span className="px-5 py-2 bg-gradient-to-r from-[#EC625F]/10 to-[#ff6b6b]/10 text-[#EC625F] text-base font-bold rounded-full border border-[#EC625F]/20">
                          {service.time}
                        </span>
                      </div>
                      <p className="text-[#64748B] text-lg leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-10">
                    <h4 className="font-black text-[#0F172A] mb-6 text-xl tracking-wide">INCLUDED SERVICES:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-white/50 rounded-xl group-hover:bg-white/80 transition-all duration-300 border border-gray-100">
                          <svg className="w-6 h-6 text-[#EC625F] mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#334155] font-semibold">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className="mt-10 w-full py-5 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 text-[#0F172A] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-gray-100 group shadow-lg"
                  >
                    <span className="flex items-center justify-center text-lg">
                      Book This Service
                      <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Enhanced Premium Services Section */}
      <section id="premium" className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  Elite Packages
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-[#EC625F]/10 via-[#ff6b6b]/10 to-[#ff8e53]/10 -z-10 blur-sm" />
              </span>
            </h2>
            <p className="text-2xl text-[#64748B] max-w-4xl mx-auto font-light leading-relaxed">
              Experience our elite services with professional-grade products and expert craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {premiumServices.map((service) => (
              <div 
                key={service.id}
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift border-2 transition-all duration-500 relative card-hover"
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-8 py-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-black rounded-full shadow-2xl tracking-wider">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-10">
                  <div className="flex items-start mb-10">
                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${service.highlightColor} flex items-center justify-center text-5xl mr-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-3xl font-black text-[#0F172A] mb-4">{service.title}</h3>
                          <p className="text-[#64748B] text-lg leading-relaxed">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-black bg-gradient-to-r from-[#0F172A] to-[#334155] bg-clip-text text-transparent">
                            {service.price}
                          </div>
                          <div className="text-[#EC625F] font-bold text-lg mt-2">{service.duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Images Preview */}
                  <div className="mb-10">
                    <h4 className="font-black text-[#0F172A] mb-6 text-xl tracking-wide">GALLERY PREVIEW:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {service.images.map((image, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 img-hover-zoom"
                          onClick={() => openGalleryModal({
                            url: image,
                            title: service.title,
                            service: service.title
                          })}
                        >
                          <img 
                            src={image} 
                            alt={`${service.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-sm font-semibold">View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-10">
                    <h4 className="font-black text-[#0F172A] mb-6 text-xl tracking-wide">FEATURES:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl group-hover:from-white group-hover:to-gray-50 transition-all duration-300 border border-gray-100">
                          <svg className="w-6 h-6 text-[#EC625F] mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#334155] font-semibold">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className={`mt-10 w-full py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                      service.popular
                        ? 'btn-gradient text-white'
                        : 'bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 text-[#0F172A] border-2 border-gray-100'
                    }`}
                  >
                    {service.popular ? 'BOOK PREMIUM SERVICE →' : 'SELECT THIS SERVICE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Photo Gallery Section */}
      <section id="gallery" className="section-padding bg-gradient-to-b from-white to-gray-50/50" ref={galleryRef}>
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  Showcase Gallery
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-[#EC625F]/10 via-[#ff6b6b]/10 to-[#ff8e53]/10 -z-10 blur-sm" />
              </span>
            </h2>
            <p className="text-2xl text-[#64748B] max-w-4xl mx-auto font-light leading-relaxed mb-12">
              Browse through our portfolio of completed projects showcasing the quality and attention to detail we deliver.
            </p>
            
            {/* Enhanced Gallery Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {['all', 'exterior', 'interior', 'engine', 'finishing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedGalleryFilter(filter)}
                  className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    selectedGalleryFilter === filter
                      ? 'btn-gradient text-white shadow-2xl'
                      : 'bg-gray-100 text-[#64748B] hover:bg-gray-200 hover:text-[#0F172A]'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  {selectedGalleryFilter === filter && (
                    <span className="ml-2 w-2 h-2 bg-white rounded-full inline-block" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryImages.map((image) => (
              <div 
                key={image.id}
                className="gallery-item group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl"
                onClick={() => openGalleryModal(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="glass-dark p-6 rounded-2xl">
                    <h3 className="font-black text-2xl mb-3">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] px-4 py-2 rounded-full font-bold">
                        {image.category.toUpperCase()}
                      </span>
                      <span className="text-sm opacity-90 font-semibold">{image.service}</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6">
                  <span className="glass px-5 py-2 text-white font-bold rounded-full text-sm tracking-wider">
                    {image.beforeAfter ? 'BEFORE & AFTER' : 'VIEW'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => scrollToSection('#premium')}
              className="px-12 py-6 bg-gradient-to-r from-[#0F172A] to-[#334155] hover:from-[#1E293B] hover:to-[#0F172A] text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              VIEW ALL ELITE SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                  Transparent Pricing
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-[#EC625F]/10 via-[#ff6b6b]/10 to-[#ff8e53]/10 -z-10 blur-sm" />
              </span>
            </h2>
            <p className="text-2xl text-[#64748B] max-w-4xl mx-auto font-light leading-relaxed">
              Choose from our carefully crafted packages designed to meet every need and budget.
            </p>
          </div>
          
          <div ref={pricingRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift border-2 transition-all duration-500 relative card-hover ${
                  plan.popular 
                    ? 'border-[#EC625F] shadow-3xl scale-105' 
                    : 'border-gray-100/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-8 py-3 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] text-white font-black rounded-full shadow-2xl tracking-wider">
                      BEST VALUE
                    </div>
                  </div>
                )}
                
                <div className="p-10 pt-14">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-[#0F172A] mb-6">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-6">
                      <span className="text-7xl font-black bg-gradient-to-r from-[#0F172A] to-[#334155] bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-[#64748B] text-lg font-light">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                        <svg className="w-6 h-6 text-[#EC625F] mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[#334155] font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openModal(plan.name)}
                    className={`w-full py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                      plan.popular
                        ? 'btn-gradient text-white'
                        : 'bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 text-[#0F172A] border-2 border-gray-100'
                    }`}
                  >
                    {plan.popular ? 'GET STARTED NOW →' : 'SELECT PLAN'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Package */}
          <div className="mt-20 bg-gradient-to-r from-[#EC625F]/5 to-[#ff8e53]/5 rounded-3xl p-12 border-2 border-[#EC625F]/10 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-8 lg:mb-0 lg:pr-12">
                <h3 className="text-3xl font-black text-[#0F172A] mb-6">Need a Custom Package?</h3>
                <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
                  Our detailing experts can create a personalized package tailored to your vehicle's 
                  specific needs and your budget requirements with a complimentary consultation.
                </p>
              </div>
              <button 
                onClick={() => openModal('Custom')}
                className="px-12 py-6 bg-gradient-to-r from-[#0F172A] to-[#334155] hover:from-[#1E293B] hover:to-[#0F172A] text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                REQUEST FREE QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white">
        <div className="section-inner">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-10">
              Ready to Transform Your
              <span className="block mt-6">
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53] blur-xl opacity-50" />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] via-[#ff6b6b] to-[#ff8e53]">
                    Vehicle's Appearance?
                  </span>
                </span>
              </span>
            </h2>
            <p className="text-2xl text-white/80 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Book your appointment today and experience premium car care that exceeds expectations with our satisfaction guarantee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={() => openModal('Premium Detail')}
                className="px-16 py-7 btn-gradient text-white font-bold rounded-2xl shadow-2xl hover-lift text-xl group transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  BOOK APPOINTMENT
                  <svg className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <a 
                href="tel:+18885551234"
                className="px-16 py-7 glass text-white font-bold rounded-2xl border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 group hover-lift"
              >
                <span className="flex items-center justify-center text-xl">
                  CALL: (888) 555-1234
                  <svg className="w-7 h-7 ml-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#0F172A] text-white py-20">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center mb-10">
                <div className="mr-4">
                  <Logo />
                </div>
                <div>
                  <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#EC625F] to-[#ff6b6b]">
                    PRESTIGE
                  </div>
                  <div className="text-xs text-white/70 font-bold tracking-widest uppercase">AUTOMOTIVE EXCELLENCE</div>
                </div>
              </div>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">
                Premium car wash and detailing services using eco-friendly products 
                and professional equipment since 2012, delivering excellence in every detail.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social, idx) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#EC625F] hover:to-[#ff6b6b] hover:scale-110"
                  >
                    <span className="font-bold text-white/80 hover:text-white">{social.charAt(0)}</span>
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
                links: ['Ceramic Coating Pro', 'Paint Correction Elite', 'Leather Restoration Suite', 'Headlight Restoration Pro', 'Engine Bay Detailing', 'Complete Interior Care']
              },
              {
                title: "CONTACT INFO",
                links: ['📍 123 Premium Street, Auto City', '📞 (888) 555-1234', '✉️ info@prestigecarcare.com', '🕒 Mon-Sun: 7:00 AM - 10:00 PM']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-xl font-black mb-10 text-white tracking-wide">{column.title}</h4>
                <ul className="space-y-5">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href="#"
                        className="text-white/70 hover:text-[#EC625F] transition-all duration-300 text-lg flex items-center group"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-[#EC625F] to-[#ff6b6b] rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#1E293B] pt-12 text-center">
            <p className="text-white/60 text-lg">
              © {new Date().getFullYear()} PRESTIGE AUTOMOTIVE EXCELLENCE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="booking-modal bg-white rounded-3xl max-w-2xl w-full p-10 shadow-3xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-black text-[#0F172A]">Book {selectedPlan}</h3>
                <p className="text-[#64748B] text-lg mt-2">Fill out the form below to schedule your appointment</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 hover:rotate-90"
              >
                <svg className="w-7 h-7 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-8 modal-content">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#334155] font-bold text-lg mb-3">Full Name *</label>
                  <input 
                    type="text" 
                    className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#334155] font-bold text-lg mb-3">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#334155] font-bold text-lg mb-3">Preferred Date *</label>
                  <input 
                    type="date" 
                    className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#334155] font-bold text-lg mb-3">Vehicle Type *</label>
                  <select className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg">
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
                <label className="block text-[#334155] font-bold text-lg mb-3">Email Address *</label>
                <input 
                  type="email" 
                  className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#334155] font-bold text-lg mb-3">Special Requests</label>
                <textarea 
                  className="modal-input w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-[#EC625F] focus:ring-4 focus:ring-[#EC625F]/20 transition-all duration-300 text-lg resize-none"
                  rows="4"
                  placeholder="Any specific requirements, notes, or areas needing special attention..."
                />
              </div>
              
              <button 
                type="submit"
                className="modal-input w-full py-6 btn-gradient text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl text-xl"
              >
                CONFIRM BOOKING
              </button>
              
              <p className="text-center text-[#64748B] text-lg">
                We'll contact you within 1 hour to confirm your appointment details.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Gallery Image Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={closeGalleryModal}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] gallery-modal">
            <button 
              onClick={closeGalleryModal}
              className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl glass flex items-center justify-center transition-all duration-300 z-10 hover:rotate-90 hover:scale-110"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={selectedGalleryImage.url} 
              alt={selectedGalleryImage.title}
              className="w-full h-full object-contain rounded-3xl shadow-3xl"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-10 rounded-b-3xl">
              <h3 className="text-white text-3xl font-black mb-4">{selectedGalleryImage.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[#EC625F] font-bold text-xl">{selectedGalleryImage.service}</span>
                <span className="text-white/90 text-lg capitalize tracking-wide">{selectedGalleryImage.category} Service</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .section-padding {
          padding: 8rem 0;
        }
        
        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(236, 98, 95, 0.2), transparent);
          margin: 0 auto;
          max-width: 1200px;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          33% { 
            transform: translateY(-20px) translateX(10px); 
          }
          66% { 
            transform: translateY(10px) translateX(-10px); 
          }
        }
        
        .modal-input:focus {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .section-padding {
            padding: 5rem 0;
          }
          
          .section-inner {
            padding: 0 1.5rem;
          }
        }
        
        @media (max-width: 640px) {
          .section-padding {
            padding: 4rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CarWashWebsite;