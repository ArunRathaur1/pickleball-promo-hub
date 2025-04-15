
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// Fix Leaflet marker icon issues
delete (L.Icon as any).Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface MapLocationProps {
  initialLocation: [number, number];
  markerPosition: [number, number];
  setMarkerPosition: (position: [number, number]) => void;
  setFieldValue: (field: string, value: any) => void;
  initialAddress?: string;
}

// Component to add search control to the map
const SearchControl = ({
  setMarkerPosition,
  setFieldValue,
  initialAddress,
}: {
  setMarkerPosition: (position: [number, number]) => void;
  setFieldValue: (field: string, value: any) => void;
  initialAddress?: string;
}) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: "Search for a location...",
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
    });

    map.addControl(searchControl);

    // Handle search result selection
    map.on("geosearch/showlocation", (e: any) => {
      const { location } = e;
      const newPosition: [number, number] = [location.y, location.x];
      setMarkerPosition(newPosition);
      setFieldValue("locationCoords", newPosition);
      if (location.label) {
        setFieldValue("location", location.label);
      }
    });

    // Autofill search bar if initialAddress is provided
    if (initialAddress) {
      setTimeout(() => {
        const input = document.querySelector(
          ".leaflet-control-geosearch input"
        ) as HTMLInputElement;
        if (input) {
          input.value = initialAddress;
        }
      }, 1000);
    }

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, setMarkerPosition, setFieldValue, initialAddress]);

  return null;
};

// Component to handle map clicks
export function MapClickHandler({
  setMarkerPosition,
  setFieldValue,
}: Pick<MapLocationProps, "setMarkerPosition" | "setFieldValue">) {
  // Fix: properly use useMapEvents
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setFieldValue("locationCoords", [lat, lng]);
    },
  });
  return null;
}

export default function MapLocationSection({
  initialLocation,
  markerPosition,
  setMarkerPosition,
  setFieldValue,
  initialAddress,
}: MapLocationProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={initialLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <SearchControl
            setMarkerPosition={setMarkerPosition}
            setFieldValue={setFieldValue}
            initialAddress={initialAddress}
          />
          <MapClickHandler
            setMarkerPosition={setMarkerPosition}
            setFieldValue={setFieldValue}
          />
          <Marker position={markerPosition}>
            <Popup>
              Selected Location: {markerPosition[0].toFixed(4)},{" "}
              {markerPosition[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Current coordinates display */}
      <div className="text-sm text-gray-600">
        Selected coordinates: {markerPosition[0].toFixed(6)},{" "}
        {markerPosition[1].toFixed(6)}
      </div>
    </div>
  );
}
