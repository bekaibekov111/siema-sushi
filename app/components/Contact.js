"use client";

import useInView from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [sectionRef, isInView] = useInView();

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-14 ${isInView ? "animate-fadeInUp" : "opacity-0"}`}
        >
          <span className="badge badge-primary mb-4 text-sm">📍 {t("findUs")}</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("getInTouch").split(" ")[0]} <span className="gradient-text">{t("getInTouch").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto text-lg">
            {t("touchDesc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="map-container aspect-[4/3] lg:aspect-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.827170195614!2d21.0850259!3d52.2392762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc256d0d2427%3A0x5e08b1f5f3e0c0!2sGrochowska%20256%2C%2004-365%20Warszawa%2C%20Poland!5e0!3m2!1sen!2spl!4v1714867200000!5m2!1sen!2spl"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sushi Siema location"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {/* Address */}
            <div className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("addressLabel")}</h4>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    ul. Grochowska 256<br />
                    04-398 Warszawa, Poland
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("phoneLabel")}</h4>
                  <a href="tel:+48573555564" className="text-foreground-muted text-sm hover:text-primary transition-colors">
                    +48 573 555 564
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t("emailLabel")}</h4>
                  <a href="mailto:hello@sushisiema.pl" className="text-foreground-muted text-sm hover:text-primary transition-colors">
                    hello@sushisiema.pl
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{t("workingHours")}</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-foreground-muted">
                      <span>{t("monThu")}</span>
                      <span className="text-foreground font-medium">12:00 – 22:00</span>
                    </div>
                    <div className="flex justify-between text-foreground-muted">
                      <span>{t("friSat")}</span>
                      <span className="text-foreground font-medium">12:00 – 22:00</span>
                    </div>
                    <div className="flex justify-between text-foreground-muted">
                      <span>{t("sun")}</span>
                      <span className="text-foreground font-medium">12:00 – 22:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
