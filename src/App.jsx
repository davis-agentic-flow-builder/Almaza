import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  ShoppingBag,
  CreditCard,
  Train,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Zap,
  Download,
  Lock,
  Apple,
  Play,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

// --- COMPONENTS ---

// 1. NAVBAR - "The Floating Island"
const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 md:px-8 py-4 rounded-[2rem] transition-all duration-500 w-[92%] max-w-5xl ${scrolled
        ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="flex items-center flex-1 md:flex-none">
        <img src={`${BASE}logo.png`} alt="Almaza Logo" className="h-10 w-auto object-contain" />
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Features', 'Philosophy', 'Protocol', 'Pricing'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 hover:-translate-y-[1px]"
          >
            {item}
          </a>
        ))}
      </div>
      <a href="#download" className="btn-magnetic bg-accent text-primary px-5 py-2 rounded-full font-semibold text-sm shrink-0 whitespace-nowrap">
        <span className="btn-content">Get Started</span>
      </a>
    </nav>
  );
};

// 2. HERO SECTION - "The Opening Shot"
const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });
      gsap.from('.hero-img', {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col md:flex-row items-center justify-between pt-32 pb-24 px-8 md:px-16 bg-primary"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
        <img
          src={`${BASE}hero-bg.webp`}
          alt="Almaza Dark Mode Render Backdrop"
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setHeroLoaded(true)}
        />
        {/* Soft gradient overlay to blend the text area smoothly into the Midnight Luxe environment */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl text-left" ref={textRef}>
        <h1 className="flex flex-col gap-2">
          <span className="hero-text text-white/70 font-medium text-3xl md:text-5xl uppercase tracking-widest">
            Almaza Card.
          </span>
          <span className="hero-text font-drama text-accent text-4xl md:text-6xl leading-tight drop-shadow-2xl">
            Pay Anywhere.
          </span>
        </h1>
        <p className="hero-text text-white/70 font-mono mt-8 text-lg md:text-xl max-w-xl drop-shadow-md">
          Accepted Worldwide. Unlimited Top Up, No Hidden Fees,
          and Instant Activation.
        </p>
        <div className="hero-btn mt-10">
          <a href="#download" className="btn-magnetic bg-accent text-primary px-8 py-4 text-lg font-bold inline-block">
            <span className="btn-content flex items-center gap-2">
              Get Your Card <ArrowRight size={20} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

// 3. FEATURES SECTION - "Interactive Functional Artifacts"
const Features = () => {
  const containerRef = useRef(null);

  // Card 1: Shuffler Logic
  const initialShufflerCards = [
    { title: 'Currencies', desc: 'Auto-conversion globally.' },
    { title: 'Platforms', desc: 'Works on all major sites.' },
    { title: 'Vendors', desc: 'Secure local payments.' },
  ];
  const [shufflerCards, setShufflerCards] = useState(initialShufflerCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2: Typewriter Logic
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Netflix, Spotify, Adobe, Google Workspace, and digital services";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypewriterText(fullText.slice(0, i));
        i++;
      } else {
        i = 0; // Loop pattern
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Card 3: Scheduler Logic
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay((prev) => (prev + 1) % 7);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-8 md:px-16 bg-background relative z-20 rounded-t-[3rem] -mt-10 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-textDark mb-16 text-center">
          Perfect for <span className="font-drama text-accent">Real-World Spending.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Card 1: Diagnostic Shuffler */}
          <div className="feature-card bg-white p-8 rounded-[2rem] shadow-xl border border-black/5 flex flex-col h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="text-accent" />
              <h3 className="font-sans font-bold text-lg text-textDark">Online Shopping</h3>
            </div>
            <p className="text-textDark/60 mb-8 font-mono text-xs md:text-sm leading-relaxed">
              Amazon, eBay, Shopify stores, and any online retailer worldwide
            </p>
            <div className="relative flex-grow mt-auto">
              {shufflerCards.map((card, idx) => (
                <div
                  key={card.title}
                  className="absolute w-full bg-background rounded-xl p-5 shadow-sm border border-black/5 flex flex-col items-start gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    top: `${idx * 20}px`,
                    zIndex: 3 - idx,
                    transform: `scale(${1 - idx * 0.05})`,
                    opacity: 1 - idx * 0.2,
                  }}
                >
                  <span className="font-sans font-bold text-textDark text-lg">{card.title}</span>
                  <span className="text-sm font-mono text-textDark/60">{card.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="feature-card bg-[#111] p-8 rounded-[2rem] shadow-xl border border-white/5 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CreditCard className="text-accent" />
                <h3 className="font-sans font-bold text-white">Seamless Subscriptions</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">Live Feed</span>
              </div>
            </div>
            <p className="text-white/60 mb-8 font-mono text-sm">
              Manage automated recurring payments centrally.
            </p>
            <div className="bg-black/50 p-6 rounded-xl flex-grow font-mono text-green-400 text-sm overflow-hidden border border-white/10">
              <p>{typewriterText}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse"></span></p>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="feature-card bg-white p-8 rounded-[2rem] shadow-xl border border-black/5 flex flex-col h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              <Train className="text-accent" />
              <h3 className="font-sans font-bold text-textDark">Everyday Payments</h3>
            </div>
            <p className="text-textDark/60 mb-8 font-mono text-sm">
              For your coffee, groceries, subscriptions, and everything in between.
            </p>

            <div className="mt-auto bg-background p-4 rounded-xl border border-black/5">
              <div className="flex justify-between mb-4 px-2">
                {days.map((d, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center w-8 h-8 rounded-full font-mono text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-white font-bold' : 'text-textDark/40'}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500 ease-in-out"
                  style={{ width: `${(activeDay / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 4. PHILOSOPHY SECTION - "The Manifesto"
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative py-40 px-8 bg-primary overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
          alt="Abstract dark shapes"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8 text-center px-4">
        <p className="manifesto-line text-white/50 font-mono text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto">
          Most modern banking focuses on: arbitrary geographical borders and plastic barriers.
        </p>
        <h2 className="manifesto-line text-white text-4xl md:text-7xl font-sans font-bold leading-tight">
          We focus on: <br />
          <span className="font-drama text-accent">Unlocked Utility.</span>
        </h2>
      </div>
    </section>
  );
};

// 5. PROTOCOL - "Sticky Stacking Archive"
const Protocol = () => {
  const containerRef = useRef(null);

  const steps = [
    { num: '01', title: 'Download', desc: 'Download the Almaza app from App Store or Google Play. Launch instantly.', icon: <Download className="w-8 h-8 text-accent" /> },
    { num: '02', title: 'Create Virtual Card', desc: 'Tap "Create Card" and your card is generated instantly. Ready to use immediately.', icon: <CheckCircle2 className="w-8 h-8 text-accent" /> },
    { num: '03', title: 'Fund & Spend', desc: 'Load with multiple options. Start spending at millions of locations worldwide.', icon: <Activity className="w-8 h-8 text-accent" /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      // Animate the Virtual Card Drawing when it comes into view
      const virtualCardTrigger = {
        trigger: cards[1], // The second card (index 1)
        start: "top center", // Play animation when it reaches center of viewport
        toggleActions: "play none none reverse" // Reverse when scrolled back up
      };

      gsap.to('.draw-path', {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: virtualCardTrigger
      });

      gsap.to('.chip-path', {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
        scrollTrigger: virtualCardTrigger
      });

      gsap.to('.scan-line', {
        opacity: 1,
        y: 54,
        duration: 1.5,
        repeat: -1,
        yoyo: true, // Go back up gracefully
        delay: 2.2,
        ease: "power1.inOut",
        scrollTrigger: virtualCardTrigger
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="bg-background relative z-10 w-full pt-12 pb-32">
      <div className="max-w-5xl mx-auto px-8 w-full relative">
        <div className="mb-24 flex items-center gap-4">
          <span className="h-px w-12 bg-accent inline-block"></span>
          <span className="font-mono text-sm tracking-widest text-textDark/60 uppercase">3 Easy Steps</span>
        </div>

        <div className="flex flex-col gap-12 pb-[10vh]">
          {steps.map((step, index) => (
            <div
              key={index}
              className="protocol-card sticky top-[15vh] w-full bg-white/90 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-white/40 flex flex-col md:flex-row gap-8 items-center justify-between"
              style={{ zIndex: index }}
            >
              <div className="flex-1 w-full relative z-10">
                <div className="font-mono text-6xl text-black/5 opacity-50 mb-6 font-bold absolute -top-4 right-0">{step.num}</div>
                {step.icon}
                <h3 className="text-3xl font-sans font-bold mt-6 mb-4 text-textDark">{step.title}</h3>
                <p className="text-textDark/70 font-mono text-lg">{step.desc}</p>
              </div>
              <div className="flex-1 right-0 w-full md:w-1/2 h-48 bg-background rounded-[2rem] border border-black/5 flex items-center justify-center relative shadow-inner overflow-hidden">
                {/* Abstract visual representations for each step */}
                {index === 0 && (
                  <div className="px-5 py-2 bg-accent/10 border border-accent/20 rounded-xl font-mono text-accent font-bold text-sm tracking-widest uppercase">
                    takes 30sec
                  </div>
                )}
                {index === 1 && (
                  <div className="virtual-card-container relative w-full h-full flex items-center justify-center p-6 mt-4">
                    <svg className="w-full h-full max-w-[200px]" viewBox="0 0 100 64" fill="none">
                      {/* Card Outline - Drawn in */}
                      <rect
                        x="5" y="5" width="90" height="54" rx="6"
                        className="stroke-accent stroke-1 drop-shadow-md draw-path opacity-0"
                        strokeDasharray="300"
                        strokeDashoffset="300"
                      />
                      {/* Chip Outline - Fades in */}
                      <rect
                        x="15" y="25" width="14" height="12" rx="2"
                        className="stroke-accent/50 stroke-[0.5] opacity-0 chip-path"
                      />
                      {/* Chip Lines */}
                      <path
                        d="M15 31 L29 31 M22 25 L22 37"
                        className="stroke-accent/50 stroke-[0.5] opacity-0 chip-path"
                      />
                      {/* Scanning Laser Line */}
                      <line
                        x1="5" y1="5" x2="95" y2="5"
                        stroke="url(#laserGradient)" strokeWidth="1"
                        className="opacity-0 scan-line"
                      />
                      <defs>
                        <linearGradient id="laserGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="transparent" />
                          <stop offset="50%" stopColor="currentColor" className="text-accent" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
                {index === 2 && (
                  <svg className="w-full h-12 stroke-accent drop-shadow-md" fill="none" viewBox="0 0 100 20">
                    <path strokeLinecap="round" strokeWidth="1" strokeDasharray="100" strokeDashoffset="100" className="animate-[dash_3s_linear_infinite]" d="M0 10 L20 10 L30 0 L40 20 L50 10 L100 10"></path>
                    <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5.5. SECURITY - "Our Priority"
const Security = () => {
  const containerRef = useRef(null);

  const mainFeatures = [
    {
      title: "$50M Insurance Coverage",
      desc: "Your funds are protected by comprehensive insurance coverage through leading underwriters.",
    },
    {
      title: "End-to-End Encryption",
      desc: "Military-grade encryption protects your data and transactions from end to end.",
    },
    {
      title: "Real-Time Monitoring",
      desc: "24/7 fraud detection and instant transaction alerts keep your account secure.",
    }
  ];

  const sideFeatures = [
    "Two-Factor Authentication",
    "Biometric Lock",
    "Instant Freeze/Unfreeze",
    "Transaction Limits"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.security-main', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.security-list-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Animate the concentric rings
      gsap.to('.ring-outer', {
        rotation: 360,
        transformOrigin: "center center",
        repeat: -1,
        ease: "none",
        duration: 25
      });

      gsap.to('.ring-inner', {
        rotation: -360,
        transformOrigin: "center center",
        repeat: -1,
        ease: "none",
        duration: 15
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="security" ref={containerRef} className="py-12 px-8 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 relative z-10">

        {/* Left Side: Content */}
        <div className="security-main flex-1">
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-2">
            Your Security is <span className="font-drama italic text-accent">Our Priority.</span>
          </h2>
          <p className="text-white/60 font-mono text-sm mb-6 max-w-xl">
            Advanced security measures and insurance coverage to protect your digital assets at every step.
          </p>

          <div className="space-y-4">
            {mainFeatures.map((f, i) => (
              <div key={i} className="security-list-item">
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">{f.title}</h3>
                  <p className="text-white/40 font-mono text-xs leading-relaxed max-w-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Feature Box with Animated Background */}
        <div className="security-box flex-[0.8] w-full max-w-md">
          <div className="bg-[#1a1a24] p-6 lg:p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group min-h-[260px] flex flex-col justify-center">

            {/* Ambient Lighting inside box */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/5 blur-[80px] pointer-events-none transition-all duration-700 z-0"></div>

            {/* Background Visualization Diagram */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-20 pointer-events-none z-0">
              <svg className="w-full max-w-[200px] h-full absolute inset-0 text-accent mx-auto" viewBox="0 0 200 200">
                {/* Outer Dashed Ring */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="ring-outer" />
                {/* Inner Solid Ring */}
                <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="0.5" className="ring-inner opacity-50" />
                {/* Inner Dashed Ring */}
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="15 10" className="ring-inner" />
              </svg>
              {/* Center Lock Core */}
              <div className="absolute z-0 w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse"></div>
                <Lock className="w-5 h-5 text-accent opacity-50" />
              </div>

              {/* Floating Connection Points */}
              <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-accent animate-ping duration-[3000ms]"></div>
              <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 rounded-full bg-accent/70"></div>
              <div className="absolute top-[30%] right-[25%] w-1 h-1 rounded-full bg-white/50"></div>
            </div>

            {/* Original Foreground Content */}
            <div className="relative z-10 w-full mt-2">
              <div className="text-center mb-4">
                <h3 className="text-xl font-sans font-bold text-white mb-1 drop-shadow-md">Security Features</h3>
                <p className="text-white/60 font-mono text-[9px] uppercase tracking-widest bg-black/40 inline-block px-2 py-0.5 rounded-full backdrop-blur-md">Your protection, simplified</p>
              </div>

              <div className="space-y-2">
                {sideFeatures.map((f, i) => (
                  <div key={i} className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between hover:border-accent/40 hover:bg-black/60 transition-all duration-300 shadow-sm">
                    <span className="text-white/90 text-sm font-medium">{f}</span>
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                      <CheckCircle2 className="text-green-500 w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// 6. PRICING / MEMBERSHIP
const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-8 bg-background text-center relative z-20">
      <h2 className="text-4xl md:text-5xl font-sans font-bold text-textDark mb-16">
        Access the <span className="font-drama italic text-accent">Network.</span>
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Standard Tier */}
        <div className="w-full md:w-1/3 bg-white p-10 rounded-[2rem] shadow-lg border border-black/5 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Essential</h3>
          <p className="font-mono text-sm text-textDark/60 mb-8">Virtual Card Access</p>
          <div className="text-4xl font-bold font-sans mb-8">Free</div>
          <ul className="text-left font-mono text-sm text-textDark/70 space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Global Shopping</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> App Access</li>
          </ul>
          <button className="w-full py-4 rounded-full border border-black/10 font-bold hover:bg-black/5 transition-colors">Select</button>
        </div>

        {/* Premium Tier */}
        <div className="w-full md:w-1/3 bg-primary p-12 rounded-[2rem] shadow-2xl border border-accent/20 flex flex-col scale-100 md:scale-105 relative z-10 text-white">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recommended</div>
          <h3 className="text-2xl font-bold mb-2 text-accent">Performance</h3>
          <p className="font-mono text-sm text-white/50 mb-8">Heavy Transactors</p>
          <div className="text-5xl font-bold font-sans mb-8">$0<span className="text-lg text-white/50 font-mono">/mo</span></div>
          <ul className="text-left font-mono text-sm text-white/80 space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Zero FX Fees</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Priority Routing</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Concierge Support</li>
          </ul>
          <button className="btn-magnetic w-full py-4 rounded-full bg-accent text-primary font-bold">
            <span className="btn-content">Join Now</span>
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="w-full md:w-1/3 bg-white p-10 rounded-[2rem] shadow-lg border border-black/5 flex flex-col">
          <h3 className="text-xl font-bold mb-2">Corporate</h3>
          <p className="font-mono text-sm text-textDark/60 mb-8">Team Expense Management</p>
          <div className="text-4xl font-bold font-sans mb-8">Custom</div>
          <ul className="text-left font-mono text-sm text-textDark/70 space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Bulk Card Issuance</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> API Access</li>
          </ul>
          <button className="w-full py-4 rounded-full border border-black/10 font-bold hover:bg-black/5 transition-colors">Contact Sales</button>
        </div>
      </div>
    </section>
  )
}

// 6.5. TESTIMONIALS - "Voices of the Elite"
const Testimonials = () => {
  const containerRef = useRef(null);

  const testimonials = [
    {
      quote: "Almaza hasn't just replaced my banking; it's redefined how I deploy capital across borders.",
      name: "Alexander Voss",
      role: "Founder, Arca Global",
      img: `${BASE}alexander_voss.png`
    },
    {
      quote: "The speed of execution is unparalleled. From top-up to transaction, everything is friction-less.",
      name: "Elena Rossi",
      role: "CMO, Solis Creative",
      img: `${BASE}elena_rossi.png`
    },
    {
      quote: "Finally, a financial instrument that matches the aesthetic and speed of high-end business.",
      name: "Marcus Thorne",
      role: "Director, OMNI Group",
      img: `${BASE}marcus_thorne.png`
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="py-32 px-8 bg-background relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-sans font-bold text-textDark mb-20 text-center">
          Voices of the <span className="font-drama italic text-accent">Elite.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 hover:scale-[1.02] transition-transform duration-500 ease-out"
            >
              <div className="mb-8">
                <p className="text-xl md:text-2xl font-drama italic text-textDark leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <h4 className="font-bold text-textDark">{t.name}</h4>
                  <p className="text-xs font-mono text-textDark/50 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6.7. DOWNLOAD CTA - "Take the Network with You"
const DownloadCTA = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.cta-image', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="download" ref={containerRef} className="py-24 px-0 md:px-8 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10 px-4 md:px-0">
        <div className="cta-content flex-[0.7] text-left">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-textDark mb-8 leading-tight">
            Ready to Start <span className="font-drama italic text-accent">Spending?</span>
          </h2>
          <p className="text-textDark/60 font-mono text-lg mb-10 max-w-xl">
            Join 2 million users who trust Almaza for instant, private, and secure spending worldwide.
          </p>

          <div className="flex flex-row gap-3 md:gap-4">
            {/* App Store Badge - Official Look */}
            <button className="btn-magnetic flex items-center gap-2 md:gap-3 bg-black text-white px-4 py-2.5 md:px-8 md:py-3.5 rounded-2xl font-bold shadow-xl transition-all duration-300">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <div className="text-left">
                <p className="text-[8px] md:text-[10px] uppercase font-mono leading-none opacity-80">Download on the</p>
                <p className="text-sm md:text-xl font-sans tracking-tight leading-tight whitespace-nowrap">App Store</p>
              </div>
            </button>

            {/* Google Play Badge - Official Color Icon */}
            <button className="btn-magnetic flex items-center gap-2 md:gap-3 bg-black text-white px-4 py-2.5 md:px-8 md:py-3.5 rounded-2xl font-bold shadow-xl transition-all duration-300">
              <svg viewBox="0 0 48 48" className="shrink-0 w-6 h-6 md:w-7 md:h-7">
                <path fill="#4DB6AC" d="M7.6,44l23.5-20L7.6,4v40z" opacity=".2" />
                <path fill="#37474F" d="M7.6,4c-0.3,0-0.6,0.1-0.8,0.3L30.3,24L45,15.6L7.6,4z" opacity=".2" />
                <path fill="#37474F" d="M45,32.4L30.3,24L6.8,43.7c0.2,0.2,0.5,0.3,0.8,0.3L45,32.4z" opacity=".2" />
                <path fill="#1A237E" d="M45,15.6l-14.7,8.4l14.7,8.4L45,15.6z" opacity=".1" />
                <path fill="#F44336" d="M45,15.6L7.6,4C7.1,3.8,6.5,4,6.3,4.5C6.1,4.7,6,4.9,6,5.1v37.8c0,0.5,0.3,1,0.8,1.2 c0.2,0.1,0.5,0.1,0.7,0.1l37.5-21.5c0.5-0.3,0.7-0.8,0.4-1.3C45.3,16,45.1,15.8,45,15.6z" />
                <path fill="#FFD600" d="M45,15.6L7.6,4c-0.4-0.3-1-0.2-1.3,0.3C6.1,4.5,6,4.8,6,5.1v17.4l16.1,1.5L45,15.6z" />
                <path fill="#4CAF50" d="M6,22.5v20.4c0,0.5,0.4,1,0.9,1c0.3,0,0.5-0.1,0.7-0.2l37.3-21.3L6,22.5z" />
                <path fill="#1976D2" d="M22.1,24L6,38.6v4.3c0,0.5,0.4,1,0.9,1c0.3,0,0.5-0.1,0.7-0.2L45,24L22.1,24z" />
              </svg>
              <div className="text-left">
                <p className="text-[8px] md:text-[10px] uppercase font-mono leading-none opacity-80">Get it on</p>
                <p className="text-sm md:text-xl font-sans tracking-tight leading-tight">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        <div className="cta-image flex-[1.2] w-full max-w-4xl lg:-mr-32 scale-[1.5] md:scale-100 translate-x-12 md:translate-x-0 mt-12 md:mt-0">
          <img
            src={`${BASE}phone_and_card.webp`}
            alt="Almaza Mobile App"
            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </section>
  );
};

// 7. FOOTER
const Footer = () => {
  return (
    <footer className="bg-primary text-white p-12 md:p-24 rounded-t-[4rem] relative mt-12 z-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

        <div className="max-w-sm">
          <div className="mb-6">
            <img src={`${BASE}logo.png`} alt="Almaza Logo" className="h-12 w-auto object-contain" />
          </div>
          <p className="text-white/50 font-mono text-sm mb-12">
            The standard in borderless utility. Powered by cryptographic precision.
          </p>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-4 h-4">
              <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-30"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full relative z-10"></div>
            </div>
            <span className="font-mono text-xs text-white/50 tracking-widest uppercase">System Operational</span>
          </div>
        </div>

        <div className="flex gap-16 font-mono text-sm">
          <div>
            <h4 className="text-white font-bold mb-6 font-sans">Product</h4>
            <ul className="space-y-3 text-white/50">
              <li><a href="#" className="hover:text-accent transition-colors">Virtual Cards</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 font-sans">Legal</h4>
            <ul className="space-y-3 text-white/50">
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 text-center text-white/30 font-mono text-xs">
        © {new Date().getFullYear()} Almaza Inc. All rights reserved.
      </div>
    </footer>
  );
};

// MAIN APP
function App() {
  return (
    <div className="bg-background min-h-screen text-textDark selection:bg-accent/30 selection:text-textDark overflow-hidden overflow-x-hidden w-full max-w-[100vw]">
      {/* Global Noise Overlay Filter - safely loaded inside React to prevent pre-render artifacting */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="1" />
      </svg>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      {/* Spacer to handle the pinned scrolling section overlap cleanly */}
      <div className="h-[20vh] bg-background"></div>
      <Protocol />
      {/* Spacer after pinned section */}
      <div className="h-[10vh] bg-background"></div>
      <Security />
      <Pricing />
      <Testimonials />
      <DownloadCTA />
      <Footer />
    </div>
  );
}

export default App;
