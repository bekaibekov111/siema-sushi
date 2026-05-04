"use client";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

export default function Cart() {
  const { items, isOpen, setIsOpen, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { language, t } = useLanguage();
  const [view, setView] = useState("cart"); // 'cart' or 'checkout'

  // Reset view when cart closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setView("cart"), 500);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setIsOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        id="cart-panel"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-background-light border-l border-border shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {view === "cart" ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{t("yourCart")}</h2>
                {totalItems > 0 && (
                  <span className="badge badge-primary">{totalItems} {t("items")}</span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-background-elevated transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-5xl mb-4">🍣</div>
                  <h3 className="text-lg font-semibold mb-2">{t("cartEmpty")}</h3>
                  <p className="text-sm text-foreground-muted mb-6">
                    {t("addRolls")}
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-xl bg-primary text-background font-semibold text-sm hover:bg-primary-light transition-colors"
                  >
                    {t("browseMenu")}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const name = language === "pl" ? item.name : (item[language]?.name || item.name);
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-xl bg-background-card border border-border animate-fadeIn"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {name}
                          </h4>
                          <div className="text-sm text-primary font-bold mt-1">
                            {(item.price * item.quantity).toFixed(2)} zł
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="quantity-btn"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-7 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="quantity-btn"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-sm text-foreground-dim hover:text-accent transition-colors py-2"
                  >
                    {t("clearCart")}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                {/* Delivery note */}
                {totalPrice < 99 && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 text-sm">
                    <span className="text-primary">🚗</span>
                    <span className="text-foreground-muted">
                      {t("addMoreForFree").replace("{amount}", (99 - totalPrice).toFixed(2))}
                    </span>
                  </div>
                )}
                {totalPrice >= 99 && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 text-sm">
                    <span>✅</span>
                    <span className="text-success font-medium">{t("freeDeliveryUnlocked")}</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">{t("total")}</span>
                  <span className="text-2xl font-bold text-foreground">
                    {totalPrice.toFixed(2)} <span className="text-sm text-foreground-muted">zł</span>
                  </span>
                </div>

                {/* Go to Checkout button */}
                <button
                  id="checkout-btn"
                  onClick={() => setView("checkout")}
                  className="w-full py-4 rounded-2xl bg-primary text-background font-bold text-lg hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  {t("checkout")}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="p-6 h-full">
            <CheckoutForm onBack={() => setView("cart")} />
          </div>
        )}
      </div>
    </>
  );
}
