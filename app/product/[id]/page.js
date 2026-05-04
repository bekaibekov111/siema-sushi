"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems, categories } from "../../data";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect } from "react";

export default function ProductPage({ params }) {
  const { language, t } = useLanguage();
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);
  const item = menuItems.find((i) => i.id === id);

  const { items, addItem, removeItem } = useCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItem = items.find((i) => i.id === id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [items, id]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="btn btn-primary">
          Back to Menu
        </Link>
      </div>
    );
  }

  // Get translated content
  const name = language === "pl" ? item.name : (item[language]?.name || item.name);
  const description = language === "pl" ? item.description : (item[language]?.description || item.description);
  const categoryName = categories.find(c => c.id === item.category)?.[language] || item.category;

  const relatedItems = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  const handleAdd = () => addItem(item);
  const handleRemove = () => removeItem(item.id);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-foreground-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{categoryName}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Big Picture */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-background-elevated border border-border shadow-2xl">
            <Image
              src={item.image}
              alt={name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {item.badge && (
              <div className="absolute top-6 left-6 badge badge-primary scale-125 origin-top-left">
                {item.badge}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">
                {categoryName}
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                {name}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">
                  {item.price.toFixed(2)} zł
                </span>
                <span className="px-3 py-1 rounded-full bg-background-elevated border border-border text-foreground-muted text-sm font-medium">
                  {item.weight}
                </span>
              </div>
              <p className="text-xl text-foreground-dim leading-relaxed mb-10 max-w-xl">
                {description}
              </p>
            </div>

            {/* Interaction */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-border">
              {quantity > 0 ? (
                <div className="flex items-center gap-6 p-2 rounded-2xl bg-success/10 text-success border border-success/20">
                  <button
                    onClick={handleRemove}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-background shadow-lg hover:bg-success hover:text-white transition-all active:scale-95"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center text-2xl font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-background shadow-lg hover:bg-success hover:text-white transition-all active:scale-95"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-background font-bold text-lg hover:bg-primary-light transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {t("addToCart")}
                </button>
              )}
            </div>
            
            <p className="mt-6 text-sm text-foreground-muted flex items-center gap-2">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("freshlyPrepared")}
            </p>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("recommended")}</h2>
              <p className="text-foreground-muted">{t("otherDelicious")} {categoryName}</p>
            </div>
            <Link href="/" className="text-primary font-semibold hover:underline hidden sm:block">
              {t("backToMenu")}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((related) => {
              const rName = language === "pl" ? related.name : (related[language]?.name || related.name);
              return (
                <Link
                  key={related.id}
                  href={`/product/${related.id}`}
                  className="group bg-background-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 card-glow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={related.image}
                      alt={rName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">{rName}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">{related.price.toFixed(2)} zł</span>
                      <span className="text-xs text-foreground-muted">{related.weight}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
