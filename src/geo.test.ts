import { describe, expect, it } from "vitest";

import {
  getDivisions,
  getDistricts,
  getThanas,
  getUpazilas,
  getAreas,
  getVillages,
} from "./geo";

describe("bd-geo", () => {
  // ─────────────────────────────────────────────────────────────
  // Basic dataset shape
  // ─────────────────────────────────────────────────────────────

  it("should return all 8 divisions", () => {
    const divisions = getDivisions();

    expect(divisions).toHaveLength(8);
  });

  it("should return all 64 districts", () => {
    const districts = getDistricts();

    expect(districts).toHaveLength(64);
  });

  it("should return upazilas", () => {
    const upazilas = getUpazilas();

    expect(upazilas.length).toBeGreaterThan(0);
  });

  it("should return areas", () => {
    const areas = getAreas();

    expect(areas.length).toBeGreaterThan(0);
  });

  it("should return villages", () => {
    const villages = getVillages();

    expect(villages.length).toBeGreaterThan(0);
  });

  // ─────────────────────────────────────────────────────────────
  // Backward compatibility
  // ─────────────────────────────────────────────────────────────

  it("getThanas() should return the same data as getUpazilas()", () => {
    expect(getThanas()).toEqual(getUpazilas());
  });

  // ─────────────────────────────────────────────────────────────
  // Unique IDs
  // ─────────────────────────────────────────────────────────────

  it("should have unique division IDs", () => {
    const divisions = getDivisions();
    const ids = divisions.map((division) => division.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have unique district IDs", () => {
    const districts = getDistricts();
    const ids = districts.map((district) => district.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have unique upazila IDs", () => {
    const upazilas = getUpazilas();
    const ids = upazilas.map((upazila) => upazila.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should not have duplicate area names of the same type within the same upazila", () => {
    const areas = getAreas();

    const keys = areas.map(
      (area) => `${area.upazilaId}:${area.type}:${area.name}`,
    );

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("should have unique village IDs", () => {
    const villages = getVillages();
    const ids = villages.map((village) => village.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  // ─────────────────────────────────────────────────────────────
  // Foreign key relationships
  // ─────────────────────────────────────────────────────────────

  it("should have valid district → division relationships", () => {
    const divisions = getDivisions();
    const districts = getDistricts();

    for (const district of districts) {
      const division = divisions.find(
        (division) => division.id === district.divisionId,
      );

      expect(
        division,
        `District "${district.name}" has invalid divisionId ${district.divisionId}`,
      ).toBeDefined();
    }
  });

  it("should have valid upazila → district relationships", () => {
    const districts = getDistricts();
    const upazilas = getUpazilas();

    for (const upazila of upazilas) {
      const district = districts.find(
        (district) => district.id === upazila.districtId,
      );

      expect(
        district,
        `Upazila "${upazila.name}" has invalid districtId ${upazila.districtId}`,
      ).toBeDefined();
    }
  });

  it("should have valid area → upazila relationships", () => {
    const upazilas = getUpazilas();
    const areas = getAreas();

    for (const area of areas) {
      const upazila = upazilas.find((upazila) => upazila.id === area.upazilaId);

      expect(
        upazila,
        `Area "${area.name}" has invalid upazilaId ${area.upazilaId}`,
      ).toBeDefined();
    }
  });

  it("should have valid village → area relationships", () => {
    const areas = getAreas();
    const villages = getVillages();

    const areaIds = new Set(areas.map((area) => area.id));

    for (const village of villages) {
      expect(
        areaIds.has(village.areaId),
        `Village "${village.name}" has invalid areaId ${village.areaId}`,
      ).toBe(true);
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Village → Union relationship
  // ─────────────────────────────────────────────────────────────

  it("should only allow villages under union areas", () => {
    const areas = getAreas();
    const villages = getVillages();

    const unionIds = new Set(
      areas.filter((area) => area.type === "union").map((area) => area.id),
    );

    for (const village of villages) {
      expect(
        unionIds.has(village.areaId),
        `Village "${village.name}" has areaId ${village.areaId}, but that area is not a union`,
      ).toBe(true);
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Area types
  // ─────────────────────────────────────────────────────────────

  it("should have valid area types", () => {
    const areas = getAreas();

    for (const area of areas) {
      expect(["union", "ward"]).toContain(area.type);
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Upazila types
  // ─────────────────────────────────────────────────────────────

  it("should have valid upazila types when provided", () => {
    const upazilas = getUpazilas();

    for (const upazila of upazilas) {
      if (upazila.type !== undefined) {
        expect(["upazila", "thana"]).toContain(upazila.type);
      }
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Required names
  // ─────────────────────────────────────────────────────────────

  it("should contain English names", () => {
    const divisions = getDivisions();
    const districts = getDistricts();
    const upazilas = getUpazilas();
    const areas = getAreas();
    const villages = getVillages();

    for (const division of divisions) {
      expect(division.name).toBeTruthy();
    }

    for (const district of districts) {
      expect(district.name).toBeTruthy();
    }

    for (const upazila of upazilas) {
      expect(upazila.name).toBeTruthy();
    }

    for (const area of areas) {
      expect(area.name).toBeTruthy();
    }

    for (const village of villages) {
      expect(village.name).toBeTruthy();
    }
  });

  it("should contain Bangla names", () => {
    const divisions = getDivisions();
    const districts = getDistricts();
    const upazilas = getUpazilas();
    const areas = getAreas();
    const villages = getVillages();

    for (const division of divisions) {
      expect(division.nameBn).toBeTruthy();
    }

    for (const district of districts) {
      expect(district.nameBn).toBeTruthy();
    }

    for (const upazila of upazilas) {
      expect(upazila.nameBn).toBeTruthy();
    }

    for (const area of areas) {
      expect(area.nameBn).toBeTruthy();
    }

    for (const village of villages) {
      expect(village.nameBn).toBeTruthy();
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Duplicate sibling names
  // ─────────────────────────────────────────────────────────────

  it("should not have duplicate district names within the same division", () => {
    const districts = getDistricts();

    const byDivision = new Map<number, string[]>();

    for (const district of districts) {
      const list = byDivision.get(district.divisionId) ?? [];

      list.push(district.name);
      byDivision.set(district.divisionId, list);
    }

    for (const [divisionId, names] of byDivision) {
      expect(
        new Set(names).size,
        `Division ${divisionId} has duplicate district names: ${names.join(", ")}`,
      ).toBe(names.length);
    }
  });

  it("should not have duplicate upazila names within the same district", () => {
    const upazilas = getUpazilas();

    const byDistrict = new Map<number, string[]>();

    for (const upazila of upazilas) {
      const list = byDistrict.get(upazila.districtId) ?? [];

      list.push(upazila.name);
      byDistrict.set(upazila.districtId, list);
    }

    for (const [districtId, names] of byDistrict) {
      expect(
        new Set(names).size,
        `District ${districtId} has duplicate upazila names: ${names.join(", ")}`,
      ).toBe(names.length);
    }
  });

  it("should not have duplicate area names within the same upazila", () => {
    const areas = getAreas();

    const byUpazila = new Map<number, string[]>();

    for (const area of areas) {
      const list = byUpazila.get(area.upazilaId) ?? [];

      list.push(area.name);
      byUpazila.set(area.upazilaId, list);
    }

    for (const [upazilaId, names] of byUpazila) {
      expect(
        new Set(names).size,
        `Upazila ${upazilaId} has duplicate area names: ${names.join(", ")}`,
      ).toBe(names.length);
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Geographic sanity checks
  // ─────────────────────────────────────────────────────────────

  it("should have coordinates within Bangladesh's real bounding box", () => {
    // Approximate Bangladesh bounding box:
    // Latitude: 20.5 – 26.7
    // Longitude: 88.0 – 92.7

    const allRecords = [
      ...getDivisions(),
      ...getDistricts(),
      ...getUpazilas(),
      ...getAreas(),
      ...getVillages(),
    ];

    const allWithCoords = allRecords.filter(
      (record) => record.latitude != null && record.longitude != null,
    );

    for (const record of allWithCoords) {
      expect(
        record.latitude,
        `"${record.name}" latitude ${record.latitude} is outside Bangladesh's bounds`,
      ).toBeGreaterThanOrEqual(20.5);

      expect(record.latitude).toBeLessThanOrEqual(26.7);

      expect(
        record.longitude,
        `"${record.name}" longitude ${record.longitude} is outside Bangladesh's bounds`,
      ).toBeGreaterThanOrEqual(88.0);

      expect(record.longitude).toBeLessThanOrEqual(92.7);
    }
  });
});
