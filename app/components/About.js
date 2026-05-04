"use client";

import Image from "next/image";
import useInView from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const [sectionRef, isInView] = useInView();
  const [imageRef, imageInView] = useInView();

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            ref={imageRef}
            className={`relative ${imageInView ? "animate-slideInLeft" : "opacity-0"}`}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/restaurant-interior.png"
                alt="Sushi Siema restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-primary/10" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 glass rounded-2xl p-5 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4.9/5</div>
                  <div className="text-xs text-foreground-muted">
                    {t("reviewsCount")}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-3xl -z-10" />
          </div>

          {/* Text Side */}
          <div
            ref={sectionRef}
            className={`${isInView ? "animate-slideInRight" : "opacity-0"}`}
          >
            <span className="badge badge-primary mb-6 text-sm">{t("ourStory")}</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {t("aboutTitlePart1")} <span className="gradient-text">{t("aboutTitlePart2")}</span>
            </h2>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>{t("aboutText1")}</p>
              <p>{t("aboutText2")}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🐟", label: t("freshDaily"), desc: t("freshDailyDesc") },
                { icon: "🇯🇵", label: t("authentic"), desc: t("authenticDesc") },
                { icon: "⚡", label: t("fastDelivery"), desc: t("fastDeliveryDesc") },
                { icon: "🌿", label: t("ecoFriendly"), desc: t("ecoFriendlyDesc") },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className="p-4 rounded-xl bg-background-card border border-border hover:border-primary/20 transition-colors duration-300"
                >
                  <div className="text-2xl mb-2">{feat.icon}</div>
                  <div className="font-semibold text-sm text-foreground mb-0.5">
                    {feat.label}
                  </div>
                  <div className="text-xs text-foreground-dim">{feat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
