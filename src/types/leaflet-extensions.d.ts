
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// Add additional properties to the L namespace
declare module 'leaflet' {
  namespace Icon {
    interface Default {
      options: L.IconOptions;
      _getIconUrl: () => string;
    }
  }

  interface Map {
    _handlers: unknown[];
  }
}

// Fix GeoSearchControl constructor
declare module 'leaflet-geosearch' {
  interface GeoSearchControlOptions {
    provider: OpenStreetMapProvider;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    autoClose?: boolean;
    retainZoomLevel?: boolean;
    animateZoom?: boolean;
    keepResult?: boolean;
    searchLabel?: string;
    marker?: {
      icon: L.Icon;
      draggable: boolean;
    };
  }

  class GeoSearchControl {
    constructor(options: GeoSearchControlOptions);
  }
}

// Add custom property whileHover to Button
declare module '@/components/ui/button' {
  interface ButtonProps {
    whileHover?: Record<string, unknown>;
    whileTap?: Record<string, unknown>;
  }
}
