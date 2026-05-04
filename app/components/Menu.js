"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { menuItems, categories } from "../data";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import useInView from "../hooks/useInView";
import Link from "next/link";

function MenuCard({ item, index }) {
  const { items, addItem, removeItem } = useCart();
  const { language, t } = useLanguage();
  const [cardRef, isInView] = useInView({ threshold: 0.15 });

  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem(item);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  // Get translated content
  const name = language === "pl" ? item.name : (item[language]?.name || item.name);
  const description = language === "pl" ? item.description : (item[language]?.description || item.description);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-background-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 card-glow ${
        isInView ? "animate-fadeInUp" : "opacity-0"
      }`}
      style={{ animationDelay: `${(index % 6) * 0.08}s` }}
    >
      {/* Image */}
      <Link href={`/product/${item.id}`} className="block relative aspect-[4/3] overflow-hidden bg-background-elevated">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold scale-90 group-hover:scale-100 transition-transform duration-500">
            {t("viewDetails")}
          </span>
        </div>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 badge badge-primary">
            {item.badge}
          </div>
        )}

        {/* Weight */}
        <div className="absolute top-3 right-3 badge bg-background/70 text-foreground-muted backdrop-blur-sm">
          {item.weight}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/product/${item.id}`}>
          <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-foreground-dim leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              {item.price.toFixed(2)}
            </span>
            <span className="text-sm text-foreground-dim">zł</span>
          </div>

          {quantity > 0 ? (
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-success/10 text-success border border-success/30 font-semibold transition-all duration-300">
              <button
                onClick={handleRemove}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-success hover:text-white transition-colors active:scale-95"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span className="w-4 text-center font-bold text-foreground select-none">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-success hover:text-white transition-colors active:scale-95"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 bg-primary/10 text-primary hover:bg-primary hover:text-background"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t("addToCart")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sectionRef, isInView] = useInView();
  const categoryScrollRef = useRef(null);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-12 ${isInView ? "animate-fadeInUp" : "opacity-0"}`}
        >
          <span className="badge badge-primary mb-4 text-sm">{t("ourMenu")}</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("discoverFlavors").split(" ")[0]} <span className="gradient-text">{t("discoverFlavors").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto text-lg">
            {t("menuDescription")}
          </p>
        </div>

        {/* Category Filter */}
        <div
          ref={categoryScrollRef}
          className="flex gap-2 mb-10 overflow-x-auto hide-scrollbar pb-2 justify-start lg:justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                activeCategory === cat.id
                  ? "category-active shadow-lg shadow-primary/20"
                  : "bg-background-card text-foreground-muted hover:text-foreground hover:bg-background-elevated border border-border"
              }`}
            >
              {cat[language] || cat.pl}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-foreground-muted">
            <p className="text-lg">{t("noItems")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
