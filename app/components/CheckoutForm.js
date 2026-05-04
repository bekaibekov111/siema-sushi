"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { saveOrder } from "../actions";
import MapWrapper from "./MapWrapper";

const RESTAURANT_ADDRESS = "Grochowska 256, Warsaw";
const RESTAURANT_COORDS = { lat: 52.2436, lng: 21.0826 };

export default function CheckoutForm({ onBack }) {
  const { items, totalPrice, clearCart, setIsOpen } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  
  // New State for Map & Delivery
  const [isDelivery, setIsDelivery] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null); // { lat, lng }
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Address Form State
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    apt: "",
    floor: "",
    entrance: "",
    comment: ""
  });

  const searchTimeoutRef = useRef(null);

  // Address Validation
  const isValidAddress = isDelivery 
    ? (selectedLocation !== null && addressDetails.street.length > 3)
    : true; // Pickup is always valid

  // Nominatim API: Search address as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setAddressDetails(prev => ({ ...prev, street: value }));

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (value.length > 3) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value + ", Warsaw")}&limit=5&addressdetails=1`);
          const data = await res.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  // Nominatim API: Reverse geocode when map is clicked
  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setSuggestions([]);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`);
      const data = await res.json();
      
      const road = data.address?.road || "";
      const houseNumber = data.address?.house_number || "";
      const fullStreet = houseNumber ? `${road} ${houseNumber}` : road;
      
      if (fullStreet) {
        setSearchQuery(fullStreet);
        setAddressDetails(prev => ({ ...prev, street: fullStreet }));
      }
    } catch (error) {
      console.error("Reverse geocoding failed", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.display_name.split(",")[0]); // Just get the street part
    setAddressDetails(prev => ({ ...prev, street: suggestion.display_name.split(",")[0] }));
    setSelectedLocation({ lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidAddress && isDelivery) return;
    
    setLoading(true);
    setPhoneError("");

    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();

    if (!name) {
      setPhoneError(t("enterName"));
      setLoading(false);
      return;
    }

    const phoneRegex = /^(?:\+48\s?)?(?:\d{3}[-\s]?\d{3}[-\s]?\d{3}|\d{9})$/;
    
    if (!phoneRegex.test(phone.trim())) {
      setPhoneError(t("invalidPhone"));
      setLoading(false);
      return;
    }

    const orderData = {
      orderType: isDelivery ? "delivery" : "pickup",
      customer: {
        name: name,
        phone: phone,
        address: isDelivery ? `${addressDetails.street}, Apt ${addressDetails.apt}, Floor ${addressDetails.floor}, Ent ${addressDetails.entrance}` : `Pickup at ${RESTAURANT_ADDRESS}`,
        notes: addressDetails.comment,
        coordinates: isDelivery ? selectedLocation : RESTAURANT_COORDS
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice,
      timestamp: new Date().toISOString(),
    };

    const result = await saveOrder(orderData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        clearCart();
        setIsOpen(false);
      }, 3000);
    } else {
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fadeIn">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
          ✅
        </div>
        <h3 className="text-2xl font-bold mb-2">{t("orderReceived")}</h3>
        <p className="text-foreground-muted mb-6">
          {t("orderSuccessMsg")} {isDelivery ? t("orderSuccessDelivery") : t("orderSuccessPickup")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-slideInRight">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border px-1">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-background-elevated hover:bg-border transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">{t("deliveryDetails")}</h2>
      </div>

      {/* Delivery / Pickup Toggle */}
      <div className="flex bg-background-elevated p-1 rounded-xl mb-6 mx-1">
        <button
          type="button"
          onClick={() => setIsDelivery(true)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
            isDelivery ? "bg-primary text-background shadow-md" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {t("delivery")}
        </button>
        <button
          type="button"
          onClick={() => setIsDelivery(false)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
            !isDelivery ? "bg-primary text-background shadow-md" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {t("pickup")}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-1 hide-scrollbar flex flex-col gap-6">
        
        {/* Map Section */}
        <div className="h-48 w-full shrink-0 relative z-10">
          <MapWrapper 
            onLocationSelect={handleLocationSelect} 
            selectedLocation={isDelivery ? selectedLocation : RESTAURANT_COORDS} 
            isDelivery={isDelivery}
          />
          {!isDelivery && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <span className="bg-background-card/90 backdrop-blur-md px-4 py-2 rounded-xl font-bold border border-border shadow-lg text-primary text-center">
                {t("pickupLocation")}:<br/>{RESTAURANT_ADDRESS}
              </span>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-50">
          <h3 className="font-bold text-lg mb-1">{isDelivery ? t("specifyAddress") : t("pickupDetails")}</h3>
          
          <div className="space-y-4">
            {/* Street with Autocomplete */}
            <div className="relative z-[100]">
              <input
                disabled={!isDelivery}
                type="text"
                value={isDelivery ? searchQuery : RESTAURANT_ADDRESS}
                onChange={handleSearchChange}
                placeholder={isDelivery ? t("streetPlaceholder") : RESTAURANT_ADDRESS}
                className="w-full bg-background-card border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3.5 outline-none transition-all text-sm disabled:opacity-50 disabled:bg-background-elevated disabled:text-foreground-muted"
              />
              
              {/* Autocomplete Dropdown */}
              {suggestions.length > 0 && isDelivery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background-card border border-border rounded-xl shadow-xl overflow-hidden z-[100]">
                  {suggestions.map((sug, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSuggestionClick(sug)}
                      className="px-4 py-3 border-b border-border/50 hover:bg-background-elevated cursor-pointer text-sm transition-colors last:border-0"
                    >
                      <div className="font-bold text-foreground truncate">{sug.display_name.split(",")[0]}</div>
                      <div className="text-xs text-foreground-dim truncate mt-0.5">{sug.display_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Details Grid */}
            {isDelivery && (
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder={t("aptPlaceholder")}
                  value={addressDetails.apt}
                  onChange={(e) => setAddressDetails(p => ({...p, apt: e.target.value}))}
                  className="bg-background-card border border-border focus:border-primary rounded-xl px-4 py-3 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder={t("floorPlaceholder")}
                  value={addressDetails.floor}
                  onChange={(e) => setAddressDetails(p => ({...p, floor: e.target.value}))}
                  className="bg-background-card border border-border focus:border-primary rounded-xl px-4 py-3 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder={t("entrancePlaceholder")}
                  value={addressDetails.entrance}
                  onChange={(e) => setAddressDetails(p => ({...p, entrance: e.target.value}))}
                  className="bg-background-card border border-border focus:border-primary rounded-xl px-4 py-3 outline-none text-sm"
                />
              </div>
            )}

            {/* Comments */}
            {isDelivery && (
              <input
                type="text"
                placeholder={t("courierComment")}
                value={addressDetails.comment}
                onChange={(e) => setAddressDetails(p => ({...p, comment: e.target.value}))}
                className="w-full bg-background-card border border-border focus:border-primary rounded-xl px-4 py-3 outline-none text-sm"
              />
            )}
          </div>

          <div className="h-px bg-border my-2"></div>

          {/* Contact Details (Minimal) */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              type="text"
              placeholder={t("yourName")}
              className="bg-background-card border border-border focus:border-primary rounded-xl px-4 py-3 outline-none text-sm"
            />
            <div className="relative">
              <input
                name="phone"
                type="tel"
                placeholder="+48 123 456 789 *"
                className={`w-full bg-background-card border ${phoneError ? 'border-accent focus:ring-accent' : 'border-border focus:border-primary focus:ring-primary'} focus:ring-1 rounded-xl px-4 py-3 outline-none transition-all text-sm`}
              />
              {phoneError && (
                <p className="absolute left-1 -bottom-4 text-accent text-[10px] font-medium whitespace-nowrap animate-shake">
                  {phoneError}
                </p>
              )}
            </div>
          </div>

        </form>
      </div>

      {/* Footer Action Area */}
      <div className="pt-4 border-t border-border mt-auto">
        <button
          form="checkout-form"
          disabled={loading || (!isValidAddress && isDelivery)}
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-background hover:bg-primary-light active:scale-[0.98]"
        >
          {loading ? (
             <span className="animate-pulse">{t("processing")}</span>
          ) : (!isValidAddress && isDelivery) ? (
            t("selectAddressMsg")
          ) : (
            `${t("placeOrderWithPrice")} ${(totalPrice + (isDelivery && totalPrice < 99 ? 5.9 : 0)).toFixed(2)} zł`
          )}
        </button>
      </div>
    </div>
  );
}
