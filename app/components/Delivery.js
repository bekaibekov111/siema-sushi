"use client";

import { deliveryZones } from "../data";
import useInView from "../hooks/useInView";

export default function Delivery() {
  const [sectionRef, isInView] = useInView();

  return (
    <section id="delivery" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-14 ${isInView ? "animate-fadeInUp" : "opacity-0"}`}
        >
          <span className="badge badge-success mb-4 text-sm">🚀 Fast Delivery</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Delivery <span className="gradient-text">Zones</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto text-lg">
            We deliver across Warsaw. Check your zone and estimated delivery time below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery Info Cards */}
          <div className="space-y-3">
            {/* Info Banner */}
            <div className="p-5 rounded-2xl glass border border-primary/20 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Free delivery on orders over 99 zł</div>
                  <div className="text-sm text-foreground-muted">Minimum order: 49 zł</div>
                </div>
              </div>
            </div>

            {/* Zone Table */}
            <div className="rounded-2xl overflow-hidden border border-border">
              <div className="grid grid-cols-3 gap-0 p-4 bg-background-elevated text-xs font-semibold uppercase tracking-wider text-foreground-dim">
                <span>Zone</span>
                <span className="text-center">Time</span>
                <span className="text-right">Fee</span>
              </div>
              {deliveryZones.map((zone, index) => (
                <DeliveryRow key={zone.zone} zone={zone} index={index} />
              ))}
            </div>

            {/* Working hours */}
            <div className="p-5 rounded-2xl bg-background-card border border-border mt-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Delivery Hours
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between text-foreground-muted">
                  <span>Mon – Thu</span>
                  <span className="text-foreground">11:00 – 22:00</span>
                </div>
                <div className="flex justify-between text-foreground-muted">
                  <span>Fri – Sat</span>
                  <span className="text-foreground">11:00 – 23:00</span>
                </div>
                <div className="flex justify-between text-foreground-muted">
                  <span>Sunday</span>
                  <span className="text-foreground">12:00 – 21:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-2.25m0 0l-3.69-3.338A1.125 1.125 0 0016.77 12H14.25m4 6.75V12m-4.5 6.75h.008v.008h-.008v-.008zm0 0H10.5" />
                  </svg>
                ),
                title: "Fast Delivery",
                desc: "Average 25-35 min delivery time across all zones in Warsaw",
                color: "text-primary",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Sealed & Safe",
                desc: "Tamper-proof packaging keeps your food fresh and secure",
                color: "text-success",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                title: "Live Tracking",
                desc: "Track your order in real-time from kitchen to your door",
                color: "text-accent",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
                title: "Easy Payment",
                desc: "Card, BLIK, Apple Pay, Google Pay — pay however you like",
                color: "text-primary",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-all duration-300 group"
              >
                <div className={`${feature.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-foreground-dim leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryRow({ zone, index }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`grid grid-cols-3 gap-0 p-4 border-t border-border text-sm hover:bg-background-elevated/50 transition-colors duration-300 ${
        isInView ? "animate-fadeInUp" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span className="text-foreground font-medium">{zone.zone}</span>
      <span className="text-center text-foreground-muted flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {zone.time}
      </span>
      <span className={`text-right font-semibold ${zone.fee === "Free" ? "text-success" : "text-foreground"}`}>
        {zone.fee}
      </span>
    </div>
  );
}
