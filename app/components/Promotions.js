"use client";

import { promotions } from "../data";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import useInView from "../hooks/useInView";

export default function Promotions() {
  const { t, language } = useLanguage();
  const [sectionRef, isInView] = useInView();
  const [copied, setCopied] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="promotions" className="py-20 sm:py-28 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-14 ${isInView ? "animate-fadeInUp" : "opacity-0"}`}
        >
          <span className="badge badge-accent mb-4 text-sm">{t("offers")}</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("specialOffers")}
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto text-lg">
            {t("promoDesc")}
          </p>
        </div>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => {
            const title = language === "pl" ? promo.title : (promo[language]?.title || promo.title);
            const description = language === "pl" ? promo.description : (promo[language]?.description || promo.description);
            
            return (
              <div
                key={promo.id}
                className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${promo.gradient} border border-border overflow-hidden group hover:border-primary/30 transition-all duration-500 ${
                  isInView ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                {/* Icon */}
                <div className="text-4xl mb-4">{promo.icon}</div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                  {title}
                </h3>

                <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                  {description}
                </p>

                {promo.code && (
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-dashed border-primary/40 hover:bg-background transition-colors"
                  >
                    <span className="text-xs text-foreground-dim uppercase tracking-wider">
                      {t("code")}:
                    </span>
                    <span className="font-mono font-bold text-primary text-sm">
                      {copied === promo.code ? t("codeCopied") : promo.code}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
