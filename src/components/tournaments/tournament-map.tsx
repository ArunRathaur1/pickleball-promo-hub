
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export function TournamentMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  // Mock tournament locations
  const tournamentLocations = [
    { name: "National Pickleball Championship", coordinates: [-116.3108, 33.7193] }, // Indian Wells
    { name: "City Pickleball Open", coordinates: [-73.9654, 40.7829] }, // Central Park
    { name: "Southern Regional Pickleball Classic", coordinates: [-84.3880, 33.7490] }, // Atlanta
  ];
  
  const initializeMap = async () => {
    if (!mapboxToken) return;
    
    try {
      // Dynamically import mapbox-gl to avoid server-side rendering issues
      const mapboxgl = (await import('mapbox-gl')).default;
      // Import CSS
      import('mapbox-gl/dist/mapbox-gl.css');
      
      if (!mapContainerRef.current) return;
      
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of US
        zoom: 3,
      });
      
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.on('load', () => {
        // Add markers for tournament locations
        tournamentLocations.forEach(location => {
          const marker = document.createElement('div');
          marker.className = 'custom-marker';
          marker.style.width = '25px';
          marker.style.height = '25px';
          marker.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
          marker.style.backgroundSize = 'cover';
          
          new mapboxgl.Marker(marker)
            .setLngLat(location.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
            .addTo(map);
        });
        
        setMapLoaded(true);
      });
      
      return () => map.remove();
    } catch (error) {
      console.error("Error loading map:", error);
      toast({
        variant: "destructive",
        title: "Map Error",
        description: "Failed to load the map. Please try again later.",
      });
    }
  };
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      initializeMap();
    } else {
      toast({
        variant: "destructive",
        title: "Token Required",
        description: "Please enter your Mapbox token to view the map.",
      });
    }
  };
  
  return (
    <div className="w-full">
      {!mapLoaded && (
        <div className="mb-6 p-4 border border-border rounded-md bg-muted/50">
          <h3 className="text-lg font-medium mb-2">Tournament Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To view tournaments on the map, please enter your Mapbox access token below:
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox public token..."
                required
              />
              <p className="text-xs text-muted-foreground">
                Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-pickle hover:underline">mapbox.com</a>
              </p>
            </div>
            <Button type="submit" size="sm">
              Load Map
            </Button>
          </form>
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className={`w-full h-[400px] rounded-lg border border-border ${!mapLoaded ? 'hidden' : ''}`}
      />
      
      {!mapLoaded && (
        <div className="border border-border rounded-lg h-[400px] flex items-center justify-center bg-muted/30">
          <p className="text-muted-foreground">Enter your Mapbox token to view the tournament map</p>
        </div>
      )}
    </div>
  );
}
