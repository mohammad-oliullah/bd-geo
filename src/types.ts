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

export interface CityCorporation {
  id: number;
  divisionId: number;
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

export type AreaType = "pourashava" | "union";

export interface Area {
  id: number;
  name: string;
  nameBn: string;
  upazilaOrThanaId: number;
  type: AreaType;
  wardNo?: number;
  latitude?: number;
  longitude?: number;
}

export interface Village {
  id: number;
  name: string;
  nameBn: string;
  wardNo?: number;
  areaId: number; // must reference an Area where type === 'union' — villages don't exist under wards
  latitude?: number;
  longitude?: number;
}
