import divisions from "./data/divisions.json";
import districts from "./data/districts.json";
import thanas from "./data/thanas.json";
import areas from "./data/areas.json";

import type { Division, District, Thana, Area } from "./types";

const divisionData = divisions as Division[];
const districtData = districts as District[];
const thanaData = thanas as Thana[];
const areaData = areas as Area[];

export function getDivisions(): Division[] {
  return divisionData;
}

export function getDistricts(): District[] {
  return districtData;
}

export function getThanas(): Thana[] {
  return thanaData;
}

export function getAreas(): Area[] {
  return areaData;
}
