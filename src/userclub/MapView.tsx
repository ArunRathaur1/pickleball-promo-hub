
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add your Mapbox token here - in production this should be an environment variable
// or retrieved from your backend through an API
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

interface Club {
  _id: string;
  name: string;
  email: string;
  contact: string;
  location: string;
  country: string;
  description: string;
  locationCoordinates: number[];
  clubimageUrl: string;
  logoimageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MapView = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/clublist/all');
        const approvedClubs = response.data.filter((club: Club) => club.status === 'approved');
        setClubs(approvedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load clubs. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [toast]);

  useEffect(() => {
    if (!mapContainer.current || !clubs.length || !mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20], // Default center of the world
        zoom: 1.5,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
    }

    // Clear previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each club
    clubs.forEach((club) => {
      if (!map.current) return;
      
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'club-marker';
      markerEl.innerHTML = `
        <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
          <div class="w-4 h-4 bg-white rounded-full"></div>
        </div>
      `;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <div class="font-bold">${club.name}</div>
            <div class="text-sm">${club.location}, ${club.country}</div>
            <div class="mt-2">
              <img src="${club.logoimageUrl}" alt="${club.name}" class="w-12 h-12 object-cover rounded-full mx-auto" />
            </div>
            <button 
              class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full w-full"
              onclick="window.location.href='/club-details/${club._id}'"
            >
              View Details
            </button>
          </div>
        `);

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([club.locationCoordinates[1], club.locationCoordinates[0]])
        .setPopup(popup)
        .addTo(map.current);
      
      markersRef.current.push(marker);

      // Make marker clickable
      markerEl.addEventListener('click', () => {
        popup.addTo(map.current!);
      });
    });

    // Fit map to show all markers if there are any
    if (clubs.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      clubs.forEach(club => {
        bounds.extend([club.locationCoordinates[1], club.locationCoordinates[0]]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [clubs, mapToken]);

  // Handle token input if default token is not set
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapToken(e.target.value);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[60vh] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!mapToken && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-amber-800">Mapbox Token Required</h3>
          <p className="text-amber-700 text-sm mb-2">
            Please enter your Mapbox public token to view the map.
            You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>.
          </p>
          <Input
            type="text"
            placeholder="Enter Mapbox token"
            onChange={handleTokenChange}
            className="w-full"
          />
        </div>
      )}

      <div 
        ref={mapContainer} 
        className="h-[60vh] w-full rounded-xl overflow-hidden shadow-md border"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {clubs.slice(0, 3).map(club => (
          <div 
            key={club._id}
            className="bg-card p-4 rounded-lg shadow-sm flex items-center gap-3 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(`/club-details/${club._id}`)}
          >
            <img 
              src={club.logoimageUrl} 
              alt={club.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-medium line-clamp-1">{club.name}</h3>
              <p className="text-xs text-muted-foreground">{club.location}, {club.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
