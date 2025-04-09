
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add your Mapbox token here
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
  createdAt: string;
}

const ClubDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/clublist/${id}`);
        setClub(response.data);
      } catch (error) {
        console.error('Error fetching club details:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load club details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, toast]);

  useEffect(() => {
    if (!mapContainer.current || !club || !MAPBOX_TOKEN) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [club.locationCoordinates[1], club.locationCoordinates[0]],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker
    const markerEl = document.createElement('div');
    markerEl.className = 'club-marker';
    markerEl.innerHTML = `
      <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <div class="w-4 h-4 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    `;
    
    new mapboxgl.Marker(markerEl)
      .setLngLat([club.locationCoordinates[1], club.locationCoordinates[0]])
      .addTo(map.current);

    return () => {
      if (map.current) map.current.remove();
    };
  }, [club]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mb-6">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-6" />
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="md:w-1/3">
            <Skeleton className="h-64 w-full rounded-lg mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Club not found</h2>
        <p className="text-muted-foreground mb-4">
          The club you are looking for does not exist or has been removed.
        </p>
        <Link to="/club">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clubs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/club" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Clubs
      </Link>

      <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8">
        <img 
          src={club.clubimageUrl} 
          alt={club.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <Badge className="mb-2 w-fit">{club.status}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{club.name}</h1>
          <div className="flex items-center text-white/90 mt-1">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{club.location}, {club.country}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center mb-6">
            <img 
              src={club.logoimageUrl} 
              alt={`${club.name} logo`} 
              className="w-16 h-16 rounded-full object-cover border-4 border-background shadow-md mr-4" 
            />
            <div>
              <h2 className="text-2xl font-bold">{club.name}</h2>
              <p className="text-muted-foreground">
                Member since {new Date(club.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-2">About the Club</h3>
            <p className="text-base/relaxed">{club.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center p-4 rounded-lg border bg-card/50">
              <Mail className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                <p className="font-medium">{club.email}</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border bg-card/50">
              <Phone className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                <p className="font-medium">{club.contact}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="rounded-lg overflow-hidden border shadow-sm h-64" ref={mapContainer} />

          <div className="rounded-lg border p-4 bg-card/50">
            <h3 className="font-semibold mb-2">Contact Details</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{club.location}, {club.country}</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{club.contact}</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{club.email}</span>
              </li>
            </ul>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
            Contact Club
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
