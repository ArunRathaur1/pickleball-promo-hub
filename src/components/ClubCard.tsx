
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ClubCardProps {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  imageUrl: string;
  logoUrl: string;
  status?: 'pending' | 'approved' | 'rejected';
}

const ClubCard: React.FC<ClubCardProps> = ({
  id,
  name,
  location,
  country,
  description,
  imageUrl,
  logoUrl,
  status = 'approved'
}) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <Badge variant={status === 'approved' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}>
          {status}
        </Badge>
      </div>
      
      <div className="absolute -bottom-12 left-4 h-16 w-16 rounded-lg border-4 border-background bg-background transition-all duration-300 group-hover:-translate-y-2">
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="h-full w-full rounded object-cover" 
        />
      </div>
      
      <div className="flex flex-1 flex-col p-4 pt-8">
        <div className="mb-2 mt-4 space-y-1">
          <h3 className="line-clamp-1 font-bold text-lg">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span className="line-clamp-1">
              {location}, {country}
            </span>
          </div>
        </div>
        
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <Link to={`/club-details/${id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
