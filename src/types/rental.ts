export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface Rental {
  id: string;
  name: string;
  kind: string;
  numGuests: number;
  numBedrooms: number;
  numBeds: number;
  numBathrooms: number;
  description: string;
  features: string[];
  restrictions: string[];
  geoPoint: GeoPoint;
}
