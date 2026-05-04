"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const warsawTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Warsaw",
        hour: "numeric",
        hour12: false,
      }).format(now);

      const hour = parseInt(warsawTime);
      setIsOpen(hour >= 12 && hour < 22);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    checkOpenStatus();
    window.addEventListener("mousemove", handleMouseMove);
    const interval = setInterval(checkOpenStatus, 60000);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInLeft">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-elevated border border-border mb-6">
            <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-success" : "bg-error"} animate-pulse`} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isOpen ? t("openNow") : t("closedNow")} • 12:00 — 22:00
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold leading-[1.1] mb-6">
            {t("heroTitle")}
            <span className="gradient-text">Sushi Siema</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground-muted mb-10 max-w-xl leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-lg hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-95"
            >
              {t("heroOrderBtn")}
            </a>
          </div>
        </div>

        <div className="relative animate-fadeInRight hidden lg:flex justify-center items-center">
          <div 
            className="relative w-full aspect-square transition-transform duration-200 ease-out flex justify-center items-center"
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            }}
          >
            {/* Sushi Container */}
            <div className="relative w-[110%] h-[110%] sushi-float group hover:scale-[1.05] transition-transform duration-500">
              {/* Aroma / Steam Effect */}
              <div className="steam-container">
                <div className="steam-particle" style={{ left: '40%', animationDelay: '0s' }} />
                <div className="steam-particle" style={{ left: '50%', animationDelay: '1s' }} />
                <div className="steam-particle" style={{ left: '60%', animationDelay: '2.5s' }} />
              </div>

              <Image
                src="/images/hero-nigiri.png"
                alt="Premium Salmon Nigiri"
                fill
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] z-10"
                priority
              />

              {/* Glossy Shine Overlay */}
              <div className="sushi-shine-overlay z-20 mix-blend-overlay" />
              
              {/* Decorative Glow behind sushi */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[60px] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
