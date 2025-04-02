
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
  
  // Add Icon class to fix the type errors
  export class Icon {
    constructor(options: any);
  }
  
  // Add icon factory function
  export function icon(options: any): Icon;
}
