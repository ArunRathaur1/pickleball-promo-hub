
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
    static Default: {
      prototype: any;
      _getIconUrl: any;
      mergeOptions: (options: any) => void;
    };
  }
  
  // Add icon factory function
  export function icon(options: any): Icon;
  
  // Add Map interface
  export interface Map {
    setView(center: [number, number], zoom: number): this;
    addControl(control: any): this;
    removeControl(control: any): this;
    on(type: string, fn: any): this;
    off(type: string, fn: any): this;
  }
}
