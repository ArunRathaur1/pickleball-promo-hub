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
delete (L.Icon.Default.prototype as any)._getIconUrl;
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
const MapClickHandler = ({
  setMarkerPosition,
  setFieldValue,
}: {
  setMarkerPosition: (position: [number, number]) => void;
  setFieldValue: (field: string, value: any) => void;
}) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const newPosition: [number, number] = [lat, lng];
      setMarkerPosition(newPosition);
      setFieldValue("locationCoords", newPosition);

      // Use reverse geocoding to get the address (optional)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.display_name) {
            setFieldValue("location", data.display_name);
          }
        })
        .catch((error) => console.error("Error getting address:", error));
    },
  });

  return null;
};

// Component to update map view when geolocation is obtained
const LocationMarker = ({
  setMarkerPosition,
  setFieldValue,
}: {
  setMarkerPosition: (position: [number, number]) => void;
  setFieldValue: (field: string, value: any) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    // Get user's location immediately when the component mounts
    map.locate({ setView: true, maxZoom: 16 });

    // Set up event listener for location found
    const onLocationFound = (e: L.LocationEvent) => {
      const userCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(userCoords);
      setFieldValue("locationCoords", userCoords);

      // Optionally get the address based on coordinates
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.display_name) {
            setFieldValue("location", data.display_name);
          }
        })
        .catch((error) => console.error("Error getting address:", error));
    };

    // Set up event listener for location error
    const onLocationError = (e: L.ErrorEvent) => {
      console.error("Error obtaining location:", e.message);
    };

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map, setMarkerPosition, setFieldValue]);

  return null;
};

export default function MapLocationSection({
  initialLocation,
  markerPosition,
  setMarkerPosition,
  setFieldValue,
  initialAddress,
}: MapLocationProps) {
  const [currentCenter, setCurrentCenter] =
    useState<[number, number]>(initialLocation);

  // This useEffect will run once when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentCenter(userCoords); // update map center
          setMarkerPosition(userCoords); // place marker
          setFieldValue("locationCoords", userCoords); // update form field

          // Optionally get the address based on coordinates
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${userCoords[0]}&lon=${userCoords[1]}&format=json`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.display_name) {
                setFieldValue("location", data.display_name);
              }
            })
            .catch((error) => console.error("Error getting address:", error));
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          // Handle errors - maybe show an alert to the user
          if (error.code === 1) {
            // Permission denied
            console.warn("User denied geolocation permission");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, [setFieldValue, setMarkerPosition]);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={currentCenter}
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
          <LocationMarker
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

      <div className="text-sm text-gray-600">
        Selected coordinates: {markerPosition[0].toFixed(6)},{" "}
        {markerPosition[1].toFixed(6)}
      </div>
    </div>
  );
}
