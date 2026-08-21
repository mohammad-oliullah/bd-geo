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

export interface Thana {
  id: number;
  name: string;
  nameBn: string;
  districtId: number;
  latitude?: number;
  longitude?: number;
}

export type AreaType = "union" | "ward";

export interface Area {
  id: number;
  name: string;
  nameBn: string;
  thanaId: number;
  type: AreaType;
  latitude?: number;
  longitude?: number;
}
