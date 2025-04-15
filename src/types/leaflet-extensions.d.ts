
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// Add additional properties to the L namespace
declare module 'leaflet' {
  namespace Icon {
    interface IconOptions {
      iconRetinaUrl?: string;
      iconUrl: string;
      shadowUrl?: string;
      iconSize?: [number, number];
      iconAnchor?: [number, number];
      popupAnchor?: [number, number];
      shadowSize?: [number, number];
    }

    // Fix Default accessor
    class Default extends L.Icon {
      constructor(options?: IconOptions);
      _getIconUrl(name: string): string;
    }
  }

  interface Map {
    _handlers: unknown[];
    addControl: (control: any) => this;
    removeControl: (control: any) => this;
    on: (event: string, handler: any) => this;
    off: (event: string, handler: any, context?: any) => this;
    setView: (center: L.LatLngExpression, zoom?: number, options?: L.ZoomPanOptions) => this;
  }

  namespace Marker {
    interface Options {
      icon?: L.Icon;
      draggable?: boolean;
    }
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

  export class GeoSearchControl {
    constructor(options: GeoSearchControlOptions);
  }

  export class OpenStreetMapProvider {
    constructor();
    search: (options: { query: string }) => Promise<any[]>;
  }

  export function SearchControl(options: GeoSearchControlOptions): any;
}

// Add custom property whileHover to Button
declare module '@/components/ui/button' {
  interface ButtonProps {
    whileHover?: Record<string, unknown>;
    whileTap?: Record<string, unknown>;
  }
}
