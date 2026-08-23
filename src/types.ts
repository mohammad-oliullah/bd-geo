/**
 * I will add bounday later for each area

export interface Polygon {
  type: "Polygon";
  coordinates: number[][][]; // [ring][point][lng, lat]
}

export interface MultiPolygon {
  type: "MultiPolygon";
  coordinates: number[][][][]; // [polygon][ring][point][lng, lat]
}

export type Boundary = Polygon | MultiPolygon;

*/

export interface Division {
  id: number;
  name: string;
  nameBn: string;
  latitude?: number;
  longitude?: number;
}

export interface District {
  id: number;
  name: string;
  nameBn: string;
  divisionId: number;
  latitude?: number;
  longitude?: number;
}

export interface Upazila {
  id: number;
  name: string;
  nameBn: string;
  districtId: number;
  type?: "upazila" | "thana";
  latitude?: number;
  longitude?: number;
}

export type AreaType = "union" | "ward";

export interface Area {
  id: number;
  name: string;
  nameBn: string;
  upazilaId: number;
  type: AreaType;
  latitude?: number;
  longitude?: number;
}

export interface Village {
  id: number;
  name: string;
  nameBn: string;
  areaId: number; // must reference an Area where type === 'union' — villages don't exist under wards
  latitude?: number;
  longitude?: number;
}
