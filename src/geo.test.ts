import { describe, expect, it } from "vitest";

import { getDivisions, getDistricts, getThanas, getAreas } from "./geo";

describe("bd-geo", () => {
  it("should return all 8 divisions", () => {
    const divisions = getDivisions();

    expect(divisions).toHaveLength(8);
  });

  it("should return all 64 districts", () => {
    const districts = getDistricts();

    expect(districts).toHaveLength(64);
  });

  it("should return all 198 thanas", () => {
    const thanas = getThanas();

    expect(thanas).toHaveLength(198);
  });

  it("should return areas", () => {
    const areas = getAreas();

    expect(areas.length).toBeGreaterThan(0);
  });

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

  it("should have unique thana IDs", () => {
    const thanas = getThanas();

    const ids = thanas.map((thana) => thana.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have unique area IDs", () => {
    const areas = getAreas();

    const ids = areas.map((area) => area.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

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

  it("should have valid thana → district relationships", () => {
    const districts = getDistricts();
    const thanas = getThanas();

    for (const thana of thanas) {
      const district = districts.find(
        (district) => district.id === thana.districtId,
      );

      expect(
        district,
        `Thana "${thana.name}" has invalid districtId ${thana.districtId}`,
      ).toBeDefined();
    }
  });

  it("should have valid area → thana relationships", () => {
    const thanas = getThanas();
    const areas = getAreas();

    for (const area of areas) {
      const thana = thanas.find((thana) => thana.id === area.thanaId);

      expect(
        thana,
        `Area "${area.name}" has invalid thanaId ${area.thanaId}`,
      ).toBeDefined();
    }
  });

  it("should have valid area types", () => {
    const areas = getAreas();

    for (const area of areas) {
      expect(["union", "ward"]).toContain(area.type);
    }
  });

  it("should contain Bangla names", () => {
    const divisions = getDivisions();
    const districts = getDistricts();
    const thanas = getThanas();
    const areas = getAreas();

    for (const division of divisions) {
      expect(division.nameBn).toBeTruthy();
    }

    for (const district of districts) {
      expect(district.nameBn).toBeTruthy();
    }

    for (const thana of thanas) {
      expect(thana.nameBn).toBeTruthy();
    }

    for (const area of areas) {
      expect(area.nameBn).toBeTruthy();
    }
  });
});
