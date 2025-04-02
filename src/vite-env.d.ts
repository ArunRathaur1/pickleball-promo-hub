
/// <reference types="vite/client" />

declare module 'leaflet' {
  export interface MapOptions {
    center?: [number, number];
    zoom?: number;
  }
  
  export interface TileLayerOptions {
    attribution?: string;
  }
  
  export interface MarkerOptions {
    icon?: any;
  }
}
