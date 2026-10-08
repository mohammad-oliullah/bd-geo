import divisions from "./data/divisions.json";
import cityCorporations from "./data/city-corporations.json";
import districts from "./data/districts.json";
import thanas from "./data/upazilas.json";
import areas from "./data/areas.json";
import villages from "./data/villages.json";

import type {
  Division,
  District,
  Upazila,
  Area,
  Village,
  CityCorporation,
} from "./types";

const divisionData = divisions as Division[];
const districtData = districts as District[];
const thanaData = thanas as Upazila[];
const areaData = areas as Area[];
const cityCorporationData = cityCorporations as CityCorporation[];

export function getDivisions(): Division[] {
  return divisionData;
}

export function getCityCorporations(): CityCorporation[] {
  return cityCorporationData;
}

export function getDistricts(): District[] {
  return districtData;
}

/**
 * @deprecated Use `getUpazilas()` instead. This function will be removed in a future major version.
 */
export function getThanas(): Upazila[] {
  return thanaData;
}

export function getUpazilas(): Upazila[] {
  return thanaData;
}

export function getAreas(): Area[] {
  return areaData;
}

export function getVillages(): Village[] {
  return villages;
}
