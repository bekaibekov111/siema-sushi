"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Center of Warsaw
const WARSAW_CENTER = [52.2297, 21.0122];

// Component to handle map clicks
function MapEvents({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect({ lat, lng });
    },
  });
  return null;
}

// Component to fly to new location
function MapController({ selectedLocation }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 16, {
        duration: 1.5
      });
    }
  }, [selectedLocation, map]);
  return null;
}

export default function InteractiveMap({ onLocationSelect, selectedLocation }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-border relative z-0">
      <MapContainer 
        center={WARSAW_CENTER} 
        zoom={12} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={customIcon} />
        )}
        
        <MapEvents onLocationSelect={onLocationSelect} />
        <MapController selectedLocation={selectedLocation} />
      </MapContainer>
      
      {/* Decorative Delivery Zones (Visual Only for Demo) */}
      <div className="absolute top-4 left-4 z-[400] bg-background/90 backdrop-blur-md px-3 py-2 rounded-xl border border-border shadow-lg pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-xs font-bold">Delivery Zone Active</span>
        </div>
      </div>
    </div>
  );
}
