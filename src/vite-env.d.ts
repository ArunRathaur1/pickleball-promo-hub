
/// <reference types="vite/client" />

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

declare module 'leaflet' {
  namespace Icon {
    interface DefaultIconOptions {
      iconUrl: string;
      shadowUrl: string;
      iconSize: [number, number];
      iconAnchor: [number, number];
      popupAnchor: [number, number];
      shadowSize: [number, number];
    }
    
    class Default {
      constructor(options?: Partial<DefaultIconOptions>);
      static mergeOptions(options: Partial<DefaultIconOptions>): void;
    }
  }
  
  interface Map {
    new(element: string | HTMLElement, options?: MapOptions): Map;
  }
  
  interface LocationEvent extends LeafletEvent {
    latlng: LatLng;
    bounds: LatLngBounds;
    accuracy: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
    speed?: number;
    timestamp: number;
  }
  
  interface ErrorEvent extends LeafletEvent {
    message: string;
    code: number;
  }
  
  namespace Marker {
    interface MarkerOptions {
      icon?: Icon;
      clickable?: boolean;
      draggable?: boolean;
      keyboard?: boolean;
      title?: string;
      alt?: string;
      zIndexOffset?: number;
      opacity?: number;
      riseOnHover?: boolean;
      riseOffset?: number;
      pane?: string;
      shadowPane?: string;
      bubblingMouseEvents?: boolean;
      autoPanOnFocus?: boolean;
    }
  }
  
  class Marker {
    constructor(latlng: LatLngExpression, options?: Marker.MarkerOptions);
  }
}

export {};
