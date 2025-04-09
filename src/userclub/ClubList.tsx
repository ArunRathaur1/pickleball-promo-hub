
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import ClubCard from '@/components/ClubCard';
import FilterBar from '@/components/FilterBar';
import { Skeleton } from '@/components/ui/skeleton';

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

const ClubList = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('approved');
  const [countries, setCountries] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/clublist/all');
        setClubs(response.data);
        
        // Extract unique countries
        const uniqueCountries = Array.from(
          new Set(response.data.map((club: Club) => club.country))
        );
        setCountries(uniqueCountries);
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

  // Filter clubs based on search term, country, and status
  useEffect(() => {
    let result = clubs;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (club) =>
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by country
    if (selectedCountry && selectedCountry !== 'all') {
      result = result.filter((club) => club.country === selectedCountry);
    }
    
    // Filter by status
    if (selectedStatus && selectedStatus !== 'all') {
      result = result.filter((club) => club.status === selectedStatus);
    } else {
      // Default to showing only approved clubs if 'all' is not selected
      result = result.filter((club) => club.status === 'approved');
    }
    
    setFilteredClubs(result);
  }, [clubs, searchTerm, selectedCountry, selectedStatus]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  if (loading) {
    return (
      <div>
        <div className="h-20 mb-6">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        onSearchChange={handleSearchChange}
        onCountryChange={handleCountryChange}
        onStatusChange={handleStatusChange}
        countries={countries}
      />
      
      {filteredClubs.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-medium">No clubs found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club._id}
              id={club._id}
              name={club.name}
              location={club.location}
              country={club.country}
              description={club.description}
              imageUrl={club.clubimageUrl}
              logoUrl={club.logoimageUrl}
              status={club.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubList;
