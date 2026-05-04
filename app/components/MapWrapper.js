"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the actual map to avoid "window is not defined" SSR errors
const InteractiveMap = dynamic(
  () => import("./InteractiveMap"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-background-elevated flex items-center justify-center animate-pulse rounded-2xl">
        <span className="text-foreground-muted">Loading map...</span>
      </div>
    )
  }
);

export default function MapWrapper({ onLocationSelect, selectedLocation, isDelivery }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`w-full h-full relative ${!isDelivery ? 'pointer-events-none' : ''}`}>
      <InteractiveMap 
        onLocationSelect={onLocationSelect} 
        selectedLocation={selectedLocation} 
        isDelivery={isDelivery}
      />
    </div>
  );
}
