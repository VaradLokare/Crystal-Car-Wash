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
  const [hoveredImage, setHoveredImage] = useState(null);
  
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef([]);
  const pricingRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryImagesRef = useRef([]);
  const logoRef = useRef(null);
  const timeline = useRef(null);

  // Color palette for better contrast and visibility
  const colors = {
    primary: '#0F62FE', // IBM Blue - better visibility
    secondary: '#FF6B35', // Orange for CTAs
    accent: '#00D4AA', // Teal for highlights
    dark: '#161616',
    gray: '#525252',
    lightGray: '#F4F4F4',
    white: '#FFFFFF',
    gradient1: 'linear-gradient(135deg, #0F62FE 0%, #4589FF 100%)',
    gradient2: 'linear-gradient(135deg, #FF6B35 0%, #FF9E3D 100%)',
    gradient3: 'linear-gradient(135deg, #00D4AA 0%, #34E4D8 100%)',
  };

  // Premium Services Data
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
        "/images/ceramic1.jpg",
        "/images/ceramic2.jpg",
        "/images/ceramic3.jpg"
      ],
      popular: true
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
        "/images/paint1.jpg",
        "/images/paint2.jpg",
        "/images/paint3.jpg"
      ],
      popular: false
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
        "/images/leather1.jpg",
        "/images/leather2.jpg",
        "/images/leather3.jpg"
      ],
      popular: false
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
        "/images/headlight1.jpg",
        "/images/headlight2.jpg",
        "/images/headlight3.jpg"
      ],
      popular: true
    }
  ];

  // Gallery Images Data - 8 images for the new gallery section
  const carWashGallery = [
    {
      id: 1,
      url: "/images/carwash1.jpg",
      title: "Foam Cannon Wash",
      category: "exterior",
      description: "High-pressure foam application for deep cleaning"
    },
    {
      id: 2,
      url: "/images/carwash2.jpg",
      title: "Hand Drying Technique",
      category: "exterior",
      description: "Microfiber hand drying for streak-free finish"
    },
    {
      id: 3,
      url: "/images/carwash3.jpg",
      title: "Wheel Detailing",
      category: "wheels",
      description: "Professional wheel cleaning and protection"
    },
    {
      id: 4,
      url: "/images/carwash4.jpg",
      title: "Interior Vacuum",
      category: "interior",
      description: "Deep vacuum cleaning with professional equipment"
    },
    {
      id: 5,
      url: "/images/carwash5.jpg",
      title: "Glass Polish",
      category: "exterior",
      description: "Crystal clear glass treatment"
    },
    {
      id: 6,
      url: "/images/carwash6.jpg",
      title: "Tire Shine",
      category: "wheels",
      description: "Premium tire dressing application"
    },
    {
      id: 7,
      url: "/images/carwash7.jpg",
      title: "Paint Decontamination",
      category: "exterior",
      description: "Clay bar treatment for smooth finish"
    },
    {
      id: 8,
      url: "/images/carwash8.jpg",
      title: "Final Inspection",
      category: "quality",
      description: "Quality check under specialized lighting"
    }
  ];

  // Process Gallery Images
  const galleryImages = [
    {
      id: 1,
      url: "/images/process1.jpg",
      title: "Ceramic Coating Application",
      category: "exterior",
      service: "Ceramic Coating Pro"
    },
    {
      id: 2,
      url: "/images/process2.jpg",
      title: "Headlight Restoration",
      category: "exterior",
      service: "Headlight Restoration Pro"
    },
    {
      id: 3,
      url: "/images/process3.jpg",
      title: "Leather Interior Detailing",
      category: "interior",
      service: "Leather Restoration Suite"
    },
    {
      id: 4,
      url: "/images/process4.jpg",
      title: "Paint Correction Process",
      category: "exterior",
      service: "Paint Correction Elite"
    },
    {
      id: 5,
      url: "/images/process5.jpg",
      title: "Engine Bay Cleaning",
      category: "engine",
      service: "Premium Engine Detail"
    },
    {
      id: 6,
      url: "/images/process6.jpg",
      title: "Final Polish Stage",
      category: "finishing",
      service: "Ultimate Detailing Package"
    }
  ];

  // Initialize GSAP timeline with enhanced animations
  useEffect(() => {
    timeline.current = gsap.timeline();
    
    // Logo animation
    if (logoRef.current) {
      gsap.from(logoRef.current, {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: "back.out(1.7)"
      });
    }

    // Hero animation sequence with 3D effects
    timeline.current
      .from(heroRef.current, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        rotationX: 15,
        transformPerspective: 1000,
        ease: "power3.out"
      })
      .from(titleRef.current, {
        duration: 1.8,
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotationX: 10,
        transformPerspective: 800,
        ease: "back.out(2)",
        delay: -1
      })
      .from(".hero-subtitle", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        rotationX: 5,
        ease: "power3.out",
        delay: -0.7
      })
      .from(".cta-buttons", {
        duration: 1,
        y: 40,
        opacity: 0,
        stagger: 0.3,
        scale: 0.9,
        ease: "back.out(1.5)",
        delay: -0.4
      });

    // Services animation with 3D card flip effect
    servicesRef.current.forEach((service, index) => {
      if (service) {
        gsap.from(service, {
          scrollTrigger: {
            trigger: service,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          duration: 1.2,
          y: 80,
          opacity: 0,
          rotationY: 20,
          transformPerspective: 1000,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    // Gallery animation with staggered items
    if (galleryRef.current) {
      gsap.from(galleryRef.current, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out"
      });
    }

    // Car Wash Gallery animation
    galleryImagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.from(image, {
          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          duration: 1,
          scale: 0.8,
          opacity: 0,
          rotationY: -30,
          transformPerspective: 800,
          stagger: 0.1,
          ease: "back.out(1.5)",
          delay: index * 0.05
        });
      }
    });

    // Pricing animation with 3D effect
    gsap.from(pricingRef.current, {
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 1.5,
      y: 100,
      opacity: 0,
      rotationX: -10,
      scale: 0.95,
      transformPerspective: 1000,
      ease: "back.out(1.5)"
    });

    // Stats animation with counting
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
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
            const value = Math.floor(this.targets()[0].innerText);
            this.targets()[0].innerText = value.toLocaleString();
          }
        });
      });
    }

    // Navbar animation with blur and color change
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "bottom top",
        end: "+=100",
        toggleActions: "play reverse play reverse"
      },
      duration: 0.6,
      backgroundColor: "rgba(22, 22, 22, 0.95)",
      backdropFilter: "blur(20px)",
      padding: "1rem 0",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      ease: "power2.out"
    });

    // Parallax effect for hero background elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: (i % 2 === 0) ? 100 : -100,
        rotation: (i % 2 === 0) ? 10 : -10,
        ease: "none"
      });
    });

    // Hover effect for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1.05,
          rotationY: 5,
          zIndex: 10,
          ease: "power2.out"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1,
          rotationY: 0,
          zIndex: 1,
          ease: "power2.out"
        });
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

  // Stats data
  const stats = [
    { number: "5000", label: "Happy Customers", icon: "😊" },
    { number: "12", label: "Years Experience", icon: "⭐" },
    { number: "98", label: "Satisfaction Rate", icon: "❤️" },
    { number: "24", label: "Support Available", icon: "🕒" }
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
      color: `from-[${colors.secondary}] to-[#FF9E3D]`
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
      color: `from-[${colors.primary}] to-[#4589FF]`,
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
      color: `from-[${colors.accent}] to-[#34E4D8]`,
      features: ["Degreasing", "Corrosion Protection", "Electrical Safety", "Dressing"],
      time: "1-2 hours"
    },
    {
      title: "Premium Wax & Polish",
      description: "Showroom-quality finishing with premium waxes and polishes for ultimate shine.",
      icon: "✨",
      color: `from-[${colors.secondary}] to-[#FF9E3D]`,
      features: ["Hand Waxing", "Polish Application", "Gloss Enhancement", "UV Protection"],
      time: "2-3 hours"
    }
  ];

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with 3D effect
    gsap.from(".booking-modal", {
      duration: 0.6,
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotationX: -15,
      transformPerspective: 1000,
      ease: "back.out(2)"
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openGalleryModal = (image) => {
    setSelectedGalleryImage(image);
  };

  const closeGalleryModal = () => {
    setSelectedGalleryImage(null);
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

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ backgroundColor: colors.lightGray }}>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-2 z-50 transition-all duration-300"
        style={{ 
          width: `${scrollProgress}%`,
          background: colors.gradient2
        }}
      />

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 py-4 px-4 md:px-8 transition-all duration-500"
        style={{ backgroundColor: 'rgba(22, 22, 22, 0.9)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo with Image - Replace with your actual logo image */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('#hero')}
              ref={logoRef}
            >
              {/* Logo Image - Replace src with your logo file */}
              <div className="mr-3 w-12 h-12 rounded-xl overflow-hidden bg-white p-2 shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="Prestige Car Care Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%230F62FE'/%3E%3Cpath d='M12 15L20 8L28 15V25L20 32L12 25V15Z' fill='white'/%3E%3Cpath d='M16 18L20 14L24 18V22L20 26L16 22V18Z' fill='%23FF6B35'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div>
                <div className="text-xl font-bold leading-tight" style={{ color: colors.white }}>
                  PRESTIGE
                </div>
                <div className="text-xs tracking-wider" style={{ color: colors.accent }}>
                  CAR CARE
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Premium', 'Gallery', 'CarWash', 'Pricing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="nav-link font-medium transition-all duration-300 relative group"
                  style={{ color: colors.white }}
                >
                  <span className="relative z-10 hover:opacity-80 transition-opacity">
                    {item}
                  </span>
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ background: colors.gradient2 }}
                  />
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="px-6 py-3 font-bold rounded-full hover-lift transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ background: colors.gradient2, color: colors.white }}
              >
                BOOK NOW
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: colors.white }}
            >
              <div className="w-8 h-8 relative">
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-4' : 'top-2'}`} />
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 top-4 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-4' : 'top-6'}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
               style={{ backgroundColor: colors.dark, backdropFilter: 'blur(20px)' }}>
            <div className="p-6 space-y-2">
              {['Services', 'Premium', 'Gallery', 'CarWash', 'Pricing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="block w-full text-left py-4 font-medium transition-colors duration-300 border-b last:border-0"
                  style={{ color: colors.white, borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => openModal('Premium Detail')}
                className="w-full py-4 font-bold rounded-lg hover-lift transition-all duration-300 mt-4"
                style={{ background: colors.gradient2, color: colors.white }}
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ backgroundColor: colors.dark }}
      >
        {/* Animated Background with 3D elements */}
        <div className="absolute inset-0">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.primary} 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          {/* 3D Floating Elements */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute rounded-xl opacity-10"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? colors.gradient1 : i % 3 === 1 ? colors.gradient2 : colors.gradient3,
                transform: `rotate(${Math.random() * 360}deg)`,
                filter: 'blur(40px)'
              }}
            />
          ))}
          
          {/* Animated Particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                background: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center" ref={heroRef}>
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full border mb-8 backdrop-blur-sm"
                 style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
              <span className="w-3 h-3 rounded-full mr-3 animate-pulse" style={{ background: colors.accent }} />
              <span className="text-white/90 text-sm font-semibold tracking-wider">PREMIUM CAR CARE SERVICES</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="block text-white">Elevate Your</span>
              <span className="block mt-4" style={{ 
                background: colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
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
              className="group relative px-12 py-6 font-bold rounded-full shadow-2xl hover-lift overflow-hidden transition-all duration-300"
              style={{ background: colors.gradient2, color: colors.white }}
            >
              <span className="relative z-10 flex items-center justify-center text-lg">
                BOOK DETAILING
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: colors.gradient3 }} />
            </button>
            
            <button 
              onClick={() => scrollToSection('#premium')}
              className="px-12 py-6 font-bold rounded-full border-2 shadow-xl transition-all duration-300 group hover-lift backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.3)',
                color: colors.white
              }}
            >
              <span className="flex items-center justify-center text-lg">
                VIEW PREMIUM SERVICES
                <svg className="w-6 h-6 ml-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl backdrop-blur-sm"
                   style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.white }}>{stat.number}{index === 2 ? '%' : index === 3 ? '/7' : '+'}</div>
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
            <div className="w-8 h-12 border-2 rounded-full flex justify-center"
                 style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              <div className="w-2 h-4 rounded-full mt-3" style={{ background: colors.gradient2 }} />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="section-inner">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-10 rounded-2xl hover-lift transition-all duration-300 relative overflow-hidden group"
                style={{ 
                  backgroundColor: colors.white,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                     style={{ background: colors.gradient1 }} />
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="stat-number text-6xl font-bold mb-4" style={{ color: colors.dark }}>
                  {stat.number}
                </div>
                <div className="text-xl" style={{ color: colors.gray }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: colors.dark }}>
              <span className="relative inline-block">
                <span className="relative z-10">
                  Our Services
                </span>
                <span className="absolute bottom-3 left-0 w-full h-4 -z-10 opacity-20"
                      style={{ background: colors.gradient1 }} />
              </span>
            </h2>
            <p className="text-2xl max-w-3xl mx-auto" style={{ color: colors.gray }}>
              We offer comprehensive detailing solutions using state-of-the-art equipment 
              and eco-friendly products for optimal results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={el => servicesRef.current[index] = el}
                className="group rounded-3xl overflow-hidden hover-lift transition-all duration-500 relative"
                style={{ 
                  backgroundColor: colors.white,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.05)'
                }}
              >
                <div className="p-10">
                  <div className="flex items-start mb-10">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl mr-8 transform group-hover:scale-110 transition-transform duration-500 shadow-2xl`}
                         style={{ background: service.color }}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold" style={{ color: colors.dark }}>{service.title}</h3>
                        <span className="px-4 py-2 rounded-full text-sm font-semibold"
                              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}>
                          {service.time}
                        </span>
                      </div>
                      <p className="text-lg" style={{ color: colors.gray }}>{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-10" style={{ borderColor: `${colors.dark}10` }}>
                    <h4 className="font-bold text-xl mb-6" style={{ color: colors.dark }}>Included Services:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-4 rounded-xl transition-all duration-300 group-hover:translate-x-2"
                             style={{ backgroundColor: `${colors.dark}03` }}>
                          <svg className="w-6 h-6 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               style={{ color: colors.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-lg" style={{ color: colors.dark }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className="mt-12 w-full py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] group-hover:shadow-lg border"
                    style={{ 
                      background: colors.gradient1,
                      color: colors.white,
                      borderColor: colors.primary
                    }}
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

      {/* Premium Services Section */}
      <section id="premium" className="section-padding" style={{ backgroundColor: `${colors.dark}05` }}>
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: colors.dark }}>
              <span className="relative inline-block">
                <span className="relative z-10">
                  Premium Services
                </span>
                <span className="absolute bottom-3 left-0 w-full h-4 -z-10 opacity-20"
                      style={{ background: colors.gradient2 }} />
              </span>
            </h2>
            <p className="text-2xl max-w-3xl mx-auto" style={{ color: colors.gray }}>
              Experience our elite services with professional-grade products and expert craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {premiumServices.map((service, index) => (
              <div 
                key={service.id}
                className="group rounded-3xl overflow-hidden hover-lift transition-all duration-500 relative"
                style={{ 
                  backgroundColor: colors.white,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.08)',
                  border: service.popular ? `3px solid ${colors.secondary}` : '3px solid transparent'
                }}
              >
                {service.popular && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="px-6 py-3 font-bold rounded-full shadow-lg"
                         style={{ background: colors.gradient2, color: colors.white }}>
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-10">
                  <div className="flex items-start mb-10">
                    <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl mr-8 transform group-hover:scale-110 transition-transform duration-500 shadow-2xl"
                         style={{ background: colors.gradient3 }}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="pr-4">
                          <h3 className="text-3xl font-bold mb-4" style={{ color: colors.dark }}>{service.title}</h3>
                          <p className="text-lg" style={{ color: colors.gray }}>{service.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold mb-2"
                               style={{ background: colors.gradient1, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {service.price}
                          </div>
                          <div className="font-semibold text-lg" style={{ color: colors.secondary }}>{service.duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Images Preview */}
                  <div className="mb-10">
                    <h4 className="font-bold text-xl mb-6" style={{ color: colors.dark }}>Gallery Preview:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {service.images.map((image, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 relative group/img"
                          onClick={() => openGalleryModal({
                            url: image,
                            title: service.title,
                            service: service.title
                          })}
                          onMouseEnter={() => setHoveredImage(`${service.id}-${idx}`)}
                          onMouseLeave={() => setHoveredImage(null)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-20">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                 style={{ backgroundColor: colors.white }}>
                              <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-10" style={{ borderColor: `${colors.dark}10` }}>
                    <h4 className="font-bold text-xl mb-6" style={{ color: colors.dark }}>Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-4 rounded-xl transition-all duration-300 hover:translate-x-2"
                             style={{ backgroundColor: `${colors.dark}03` }}>
                          <svg className="w-6 h-6 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               style={{ color: colors.accent }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-lg" style={{ color: colors.dark }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(service.title)}
                    className={`mt-12 w-full py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-lg ${
                      service.popular
                        ? 'shadow-xl hover:shadow-2xl'
                        : 'border'
                    }`}
                    style={service.popular ? {
                      background: colors.gradient2,
                      color: colors.white
                    } : {
                      background: colors.gradient1,
                      color: colors.white,
                      borderColor: colors.primary
                    }}
                  >
                    BOOK PREMIUM SERVICE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Wash Gallery Section - 8 Images */}
      <section id="carwash" className="section-padding" ref={galleryRef}>
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: colors.dark }}>
              <span className="relative inline-block">
                <span className="relative z-10">
                  Car Wash Gallery
                </span>
                <span className="absolute bottom-3 left-0 w-full h-4 -z-10 opacity-20"
                      style={{ background: colors.gradient3 }} />
              </span>
            </h2>
            <p className="text-2xl max-w-3xl mx-auto mb-12" style={{ color: colors.gray }}>
              Witness our meticulous car wash process through these 8 high-quality images showcasing our expertise.
            </p>
          </div>
          
          {/* 8-Image Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {carWashGallery.map((image, index) => (
              <div 
                key={image.id}
                ref={el => galleryImagesRef.current[index] = el}
                className="gallery-item rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 relative group"
                onMouseEnter={() => setHoveredImage(`carwash-${image.id}`)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => openGalleryModal(image)}
              >
                <div className="aspect-square overflow-hidden">
                  {/* Placeholder for your images - replace src with your actual image files */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                  <div className="mt-4 flex items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium mr-2"
                          style={{ backgroundColor: colors.accent, color: colors.white }}>
                      {image.category}
                    </span>
                    <span className="text-white/60 text-xs">View Details →</span>
                  </div>
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: colors.dark }}>
                    Step {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => scrollToSection('#gallery')}
              className="px-10 py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              style={{ background: colors.gradient1, color: colors.white }}
            >
              VIEW PROCESS GALLERY
            </button>
          </div>
        </div>
      </section>

      {/* Process Gallery Section */}
      <section id="gallery" className="section-padding" style={{ backgroundColor: `${colors.dark}05` }}>
        <div className="section-inner">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: colors.dark }}>
              <span className="relative inline-block">
                <span className="relative z-10">
                  Process Gallery
                </span>
                <span className="absolute bottom-3 left-0 w-full h-4 -z-10 opacity-20"
                      style={{ background: colors.gradient1 }} />
              </span>
            </h2>
            <p className="text-2xl max-w-3xl mx-auto mb-12" style={{ color: colors.gray }}>
              Browse through our detailed process showcasing the quality and attention to detail we deliver.
            </p>
            
            {/* Gallery Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'exterior', 'interior', 'engine', 'finishing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedGalleryFilter(filter)}
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg ${
                    selectedGalleryFilter === filter
                      ? 'shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  style={selectedGalleryFilter === filter ? {
                    background: colors.gradient2,
                    color: colors.white
                  } : {
                    backgroundColor: colors.white,
                    color: colors.gray,
                    border: `2px solid ${colors.dark}10`
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryImages.map((image) => (
              <div 
                key={image.id}
                className="rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 relative group"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                onClick={() => openGalleryModal(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="p-6 rounded-2xl backdrop-blur-sm"
                       style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <h3 className="font-bold text-2xl mb-3">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="px-4 py-2 rounded-full font-medium"
                            style={{ backgroundColor: colors.accent }}>
                        {image.category}
                      </span>
                      <span className="text-lg opacity-90">{image.service}</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: colors.dark }}>
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => openModal('Custom Gallery Tour')}
              className="px-10 py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              style={{ background: colors.gradient3, color: colors.white }}
            >
              SCHEDULE A TOUR
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="section-inner">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: colors.dark }}>
              <span className="relative inline-block">
                <span className="relative z-10">
                  Transparent Pricing
                </span>
                <span className="absolute bottom-3 left-0 w-full h-4 -z-10 opacity-20"
                      style={{ background: colors.gradient2 }} />
              </span>
            </h2>
            <p className="text-2xl max-w-3xl mx-auto" style={{ color: colors.gray }}>
              Choose from our carefully crafted packages designed to meet every need and budget.
            </p>
          </div>
          
          <div ref={pricingRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`rounded-3xl overflow-hidden hover-lift transition-all duration-500 relative ${
                  plan.popular 
                    ? 'scale-105 shadow-2xl' 
                    : 'shadow-xl'
                }`}
                style={{ 
                  backgroundColor: colors.white,
                  border: plan.popular ? `4px solid ${colors.secondary}` : '4px solid transparent'
                }}
              >
                {plan.popular && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="px-8 py-3 font-bold rounded-full shadow-2xl"
                         style={{ background: colors.gradient2, color: colors.white }}>
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-12 pt-16">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold mb-6" style={{ color: colors.dark }}>{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-6">
                      <span className="text-7xl font-bold" style={{ 
                        background: colors.gradient1,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xl" style={{ color: colors.gray }}>{plan.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-12">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-5 rounded-xl"
                           style={{ backgroundColor: `${colors.dark}03` }}>
                        <svg className="w-7 h-7 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             style={{ color: colors.primary }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-lg" style={{ color: colors.dark }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openModal(plan.name)}
                    className={`w-full py-6 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-xl ${
                      plan.popular
                        ? 'shadow-xl hover:shadow-2xl'
                        : 'border-2'
                    }`}
                    style={plan.popular ? {
                      background: colors.gradient2,
                      color: colors.white
                    } : {
                      background: colors.gradient1,
                      color: colors.white,
                      borderColor: colors.primary
                    }}
                  >
                    {plan.popular ? 'GET STARTED NOW' : 'SELECT PLAN'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Package */}
          <div className="mt-20 rounded-3xl p-12 border"
               style={{ 
                 background: colors.gradient3,
                 borderColor: colors.accent
               }}>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-8 lg:mb-0 lg:pr-12">
                <h3 className="text-3xl font-bold mb-6" style={{ color: colors.white }}>Need a Custom Package?</h3>
                <p className="text-xl mb-0" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Our detailing experts can create a personalized package tailored to your vehicle's 
                  specific needs and your budget requirements.
                </p>
              </div>
              <button 
                onClick={() => openModal('Custom')}
                className="px-12 py-6 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl"
                style={{ 
                  backgroundColor: colors.white,
                  color: colors.dark
                }}
              >
                REQUEST QUOTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.primary} 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="relative z-10 section-inner">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-12" style={{ color: colors.dark }}>
              Ready to Transform Your
              <span className="block mt-6" style={{ 
                background: colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Vehicle's Appearance?
              </span>
            </h2>
            <p className="text-2xl mb-16 max-w-2xl mx-auto" style={{ color: colors.gray }}>
              Book your appointment today and experience premium car care that exceeds expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={() => openModal('Premium Detail')}
                className="px-16 py-6 font-bold rounded-full shadow-2xl hover-lift text-xl group transition-all duration-300"
                style={{ background: colors.gradient2, color: colors.white }}
              >
                <span className="flex items-center justify-center">
                  BOOK NOW
                  <svg className="w-7 h-7 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <a 
                href="tel:+18885551234"
                className="px-16 py-6 font-bold rounded-full border-2 shadow-xl transition-all duration-300 group hover-lift text-xl"
                style={{ 
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                <span className="flex items-center justify-center">
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

      {/* Footer */}
      <footer className="py-20" style={{ backgroundColor: colors.dark }}>
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-3 shadow-lg mr-4">
                  <img 
                    src="/logo.png" 
                    alt="Prestige Car Care Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%230F62FE'/%3E%3Cpath d='M12 15L20 8L28 15V25L20 32L12 25V15Z' fill='white'/%3E%3Cpath d='M16 18L20 14L24 18V22L20 26L16 22V18Z' fill='%23FF6B35'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1" style={{ color: colors.white }}>
                    PRESTIGE
                  </div>
                  <div className="text-sm tracking-wider" style={{ color: colors.accent }}>CAR CARE</div>
                </div>
              </div>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Premium car wash and detailing services using eco-friendly products 
                and professional equipment since 2012.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <span className="text-white font-bold">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Quick Links",
                links: ['Home', 'Services', 'Premium', 'Gallery', 'CarWash', 'Pricing', 'Contact']
              },
              {
                title: "Premium Services",
                links: ['Ceramic Coating Pro', 'Paint Correction Elite', 'Leather Restoration Suite', 'Headlight Restoration Pro', 'Engine Bay Detailing', 'Complete Interior Care']
              },
              {
                title: "Contact Info",
                links: ['📍 123 Premium Street, Auto City', '📞 (888) 555-1234', '✉️ info@prestigecarcare.com', '🕒 Mon-Sun: 7:00 AM - 10:00 PM']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-xl font-bold mb-8" style={{ color: colors.white }}>{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href="#"
                        className="text-lg transition-colors duration-300 hover:translate-x-2 inline-block"
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-12 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              © {new Date().getFullYear()} PRESTIGE CAR CARE & DETAILING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="booking-modal rounded-3xl max-w-2xl w-full p-10 shadow-2xl"
               style={{ backgroundColor: colors.white }}>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-3xl font-bold mb-3" style={{ color: colors.dark }}>Book {selectedPlan}</h3>
                <p className="text-xl" style={{ color: colors.gray }}>Fill out the form below to schedule your appointment</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: `${colors.dark}05` }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     style={{ color: colors.gray }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Full Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-xl transition-all text-lg"
                    style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                    placeholder="John Doe"
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    className="w-full px-6 py-4 rounded-xl transition-all text-lg"
                    style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                    placeholder="(555) 123-4567"
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Preferred Date *</label>
                  <input 
                    type="date" 
                    className="w-full px-6 py-4 rounded-xl transition-all text-lg"
                    style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                    required
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Vehicle Type *</label>
                  <select className="w-full px-6 py-4 rounded-xl transition-all text-lg"
                          style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                          onFocus={(e) => e.target.style.borderColor = colors.primary}
                          onBlur={(e) => e.target.style.borderColor = 'transparent'}>
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
                <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Email Address *</label>
                <input 
                  type="email" 
                  className="w-full px-6 py-4 rounded-xl transition-all text-lg"
                  style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                  placeholder="john@example.com"
                  required
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-4" style={{ color: colors.dark }}>Special Requests</label>
                <textarea 
                  className="w-full px-6 py-4 rounded-xl transition-all text-lg resize-none"
                  style={{ backgroundColor: `${colors.dark}03`, border: `2px solid transparent` }}
                  rows="4"
                  placeholder="Any specific requirements, notes, or areas needing special attention..."
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-5 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl text-xl"
                style={{ background: colors.gradient1, color: colors.white }}
              >
                CONFIRM BOOKING
              </button>
              
              <p className="text-center text-lg" style={{ color: colors.gray }}>
                We'll contact you within 1 hour to confirm your appointment details.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Image Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={closeGalleryModal}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button 
              onClick={closeGalleryModal}
              className="absolute top-8 right-8 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 rounded-b-3xl"
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
              <h3 className="text-white text-4xl font-bold mb-4">{selectedGalleryImage.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold" style={{ color: colors.accent }}>
                  {selectedGalleryImage.service || selectedGalleryImage.description}
                </span>
                <span className="text-xl text-white/80 capitalize">
                  {selectedGalleryImage.category} Service
                </span>
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .hover-lift {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-5deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .section-padding {
            padding: 5rem 0;
          }
          
          .section-inner {
            padding: 0 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CarWashWebsite;