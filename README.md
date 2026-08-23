# @olism/bd-geo

Bangladesh geographical data and utilities for JavaScript and TypeScript.

[![npm version](https://img.shields.io/npm/v/@olism/bd-geo.svg)](https://www.npmjs.com/package/@olism/bd-geo)
[![npm downloads](https://img.shields.io/npm/dm/@olism/bd-geo.svg)](https://www.npmjs.com/package/@olism/bd-geo)
[![License](https://img.shields.io/npm/l/@olism/bd-geo.svg)](LICENSE)

> [!IMPORTANT]
> **Always use the latest version of `@olism/bd-geo`.**
>
> This package is actively maintained and geographical data is continuously being improved and expanded.
> New releases may include updated geographical data, additional locations, corrections, and API improvements.
>
> Check the latest version on [npm](https://www.npmjs.com/package/@olism/bd-geo) before installing or upgrading.

`@olism/bd-geo` provides structured geographical data for Bangladesh, including:

- Divisions
- Districts
- Upazilas / Thanas
- Unions
- Wards
- Villages

The package is designed for applications such as:

- Address forms
- Location selectors
- Delivery systems
- E-commerce applications
- Real-estate platforms
- Job platforms
- User profiles
- Registration forms
- Location filters
- Bangladesh-focused maps
- Database seed data

---

## Installation

### npm

```bash
npm install @olism/bd-geo
```

### Yarn

```bash
yarn add @olism/bd-geo
```

### pnpm

```bash
pnpm add @olism/bd-geo
```

---

## Geography Hierarchy

The geographical structure provided by the package is:

```text
Division
   │
   └── District
          │
          └── Upazila / Thana
                    │
                    └── Area
                         ├── Union
                         │     └── Village
                         │
                         └── Ward
```

### Important

- `Upazila` and `Thana` are represented by the same geographical level.
- `Area` can be either a `union` or a `ward`.
- A `Village` belongs to an `Area` whose type is `union`.
- Villages do not belong directly to wards.

---

# Quick Start

Import the functions you need:

```ts
import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";
```

Then use them directly:

```ts
const divisions = getDivisions();
const districts = getDistricts();
const upazilas = getUpazilas();
const areas = getAreas();
const villages = getVillages();
```

---

# API

## `getDivisions()`

Returns all available Bangladesh divisions.

```ts
const divisions = getDivisions();
```

Return type:

```ts
Division[]
```

Example:

```ts
[
  {
    id: 1,
    name: "Barishal",
    nameBn: "বরিশাল",
  },
  {
    id: 2,
    name: "Chattogram",
    nameBn: "চট্টগ্রাম",
  },
];
```

---

## `getDistricts()`

Returns all available Bangladesh districts.

```ts
const districts = getDistricts();
```

Return type:

```ts
District[]
```

Example:

```ts
[
  {
    id: 1,
    name: "Dhaka",
    nameBn: "ঢাকা",
    divisionId: 3,
  },
];
```

---

## `getUpazilas()`

Returns all available upazilas.

```ts
const upazilas = getUpazilas();
```

Return type:

```ts
Upazila[]
```

Example:

```ts
[
  {
    id: 1,
    name: "Mirpur",
    nameBn: "মিরপুর",
    districtId: 1,
    type: "thana",
  },
];
```

---

## `getThanas()`

> [!WARNING]
> `getThanas()` is deprecated.
>
> Use `getUpazilas()` for new applications.

```ts
const thanas = getThanas();
```

It returns the same data as:

```ts
getUpazilas();
```

This function is kept for backward compatibility.

### Recommended

```ts
const upazilas = getUpazilas();
```

### Legacy

```ts
const thanas = getThanas();
```

---

## `getAreas()`

Returns all available areas.

An area can be either:

```ts
"union";
```

or:

```ts
"ward";
```

Example:

```ts
const areas = getAreas();
```

Return type:

```ts
Area[]
```

Example:

```ts
[
  {
    id: 1,
    name: "Mirpur-1",
    nameBn: "মিরপুর-১",
    upazilaId: 1,
    type: "ward",
  },
];
```

---

## `getVillages()`

Returns all available villages.

```ts
const villages = getVillages();
```

Return type:

```ts
Village[]
```

Example:

```ts
[
  {
    id: 1,
    name: "Example Village",
    nameBn: "উদাহরণ গ্রাম",
    areaId: 10,
  },
];
```

A village's `areaId` references an area where:

```ts
area.type === "union";
```

---

# TypeScript Types

The package exports TypeScript types for all geographical levels.

## Division

```ts
export interface Division {
  id: number;
  name: string;
  nameBn: string;
  latitude?: number;
  longitude?: number;
}
```

---

## District

```ts
export interface District {
  id: number;
  name: string;
  nameBn: string;
  divisionId: number;
  latitude?: number;
  longitude?: number;
}
```

---

## Upazila

An upazila and thana are represented by the same geographical level.

```ts
export interface Upazila {
  id: number;
  name: string;
  nameBn: string;
  districtId: number;
  type?: "upazila" | "thana";
  latitude?: number;
  longitude?: number;
}
```

The optional `type` field can distinguish between:

```ts
"upazila";
```

and:

```ts
"thana";
```

---

## Area

```ts
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
```

---

## Village

```ts
export interface Village {
  id: number;
  name: string;
  nameBn: string;
  areaId: number;
  latitude?: number;
  longitude?: number;
}
```

A village must reference an `Area` whose type is `union`.

---

# Relationship IDs

Each geographical level references its parent.

```text
District.divisionId
        ↓
Division.id
```

```text
Upazila.districtId
        ↓
District.id
```

```text
Area.upazilaId
        ↓
Upazila.id
```

```text
Village.areaId
        ↓
Area.id
```

## Example

Find the division of a district:

```ts
const districts = getDistricts();
const divisions = getDivisions();

const district = districts.find((district) => district.id === 1);

const division = divisions.find(
  (division) => division.id === district?.divisionId,
);
```

---

# Cascading Address Selector

The package can easily be used to create cascading location selectors.

```ts
import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

const divisions = getDivisions();

const districts = getDistricts().filter(
  (district) => district.divisionId === selectedDivisionId,
);

const upazilas = getUpazilas().filter(
  (upazila) => upazila.districtId === selectedDistrictId,
);

const areas = getAreas().filter((area) => area.upazilaId === selectedUpazilaId);

const villages = getVillages().filter(
  (village) => village.areaId === selectedAreaId,
);
```

This gives you a hierarchy:

```text
Division
   ↓
District
   ↓
Upazila
   ↓
Area
   ↓
Village
```

---

# React Example

```tsx
import { useState } from "react";

import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

export default function AddressForm() {
  const [divisionId, setDivisionId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [upazilaId, setUpazilaId] = useState<number>();
  const [areaId, setAreaId] = useState<number>();

  const divisions = getDivisions();

  const districts = getDistricts().filter(
    (district) => district.divisionId === divisionId,
  );

  const upazilas = getUpazilas().filter(
    (upazila) => upazila.districtId === districtId,
  );

  const areas = getAreas().filter((area) => area.upazilaId === upazilaId);

  const villages = getVillages().filter((village) => village.areaId === areaId);

  return (
    <div>
      <select
        value={divisionId ?? ""}
        onChange={(event) => {
          setDivisionId(Number(event.target.value));
          setDistrictId(undefined);
          setUpazilaId(undefined);
          setAreaId(undefined);
        }}
      >
        <option value="">Select Division</option>

        {divisions.map((division) => (
          <option key={division.id} value={division.id}>
            {division.name}
          </option>
        ))}
      </select>

      <select
        value={districtId ?? ""}
        onChange={(event) => {
          setDistrictId(Number(event.target.value));
          setUpazilaId(undefined);
          setAreaId(undefined);
        }}
      >
        <option value="">Select District</option>

        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <select
        value={upazilaId ?? ""}
        onChange={(event) => {
          setUpazilaId(Number(event.target.value));
          setAreaId(undefined);
        }}
      >
        <option value="">Select Upazila / Thana</option>

        {upazilas.map((upazila) => (
          <option key={upazila.id} value={upazila.id}>
            {upazila.name}
          </option>
        ))}
      </select>

      <select
        value={areaId ?? ""}
        onChange={(event) => {
          setAreaId(Number(event.target.value));
        }}
      >
        <option value="">Select Area</option>

        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>

      <select>
        <option value="">Select Village</option>

        {villages.map((village) => (
          <option key={village.id} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

# Bangla Names

Every geographical entity contains both English and Bangla names.

Example:

```ts
{
  id: 10,
  name: "Dhaka",
  nameBn: "ঢাকা",
}
```

Use the English name:

```tsx
<span>{division.name}</span>
```

Or the Bangla name:

```tsx
<span>{division.nameBn}</span>
```

This makes the package suitable for applications with both English and Bangla interfaces.

---

# Filtering by Parent

## Districts by Division

```ts
const districts = getDistricts().filter(
  (district) => district.divisionId === divisionId,
);
```

## Upazilas by District

```ts
const upazilas = getUpazilas().filter(
  (upazila) => upazila.districtId === districtId,
);
```

## Areas by Upazila

```ts
const areas = getAreas().filter((area) => area.upazilaId === upazilaId);
```

## Villages by Area

```ts
const villages = getVillages().filter((village) => village.areaId === areaId);
```

---

# Filtering Unions and Wards

Because `Area` contains a `type` field, you can easily separate unions and wards.

## Get all unions

```ts
const unions = getAreas().filter((area) => area.type === "union");
```

## Get all wards

```ts
const wards = getAreas().filter((area) => area.type === "ward");
```

## Get unions in an Upazila

```ts
const unions = getAreas().filter(
  (area) => area.upazilaId === selectedUpazilaId && area.type === "union",
);
```

## Get wards in an Upazila

```ts
const wards = getAreas().filter(
  (area) => area.upazilaId === selectedUpazilaId && area.type === "ward",
);
```

---

# Village Relationship

Villages are linked to areas.

```text
Village
   │
   └── areaId
          │
          ↓
        Area
          │
          └── type: "union"
```

Example:

```ts
const areas = getAreas();
const villages = getVillages();

const village = villages.find((village) => village.id === 1);

const area = areas.find((area) => area.id === village?.areaId);
```

You can verify that the area is a union:

```ts
if (area?.type === "union") {
  console.log("This village belongs to a union.");
}
```

---

# Using the Package as Database Seed Data

`@olism/bd-geo` can be used as geographical seed data for applications using:

- Prisma
- TypeORM
- Sequelize
- Drizzle
- NestJS
- Next.js
- Express.js
- Other SQL/NoSQL database systems

The package provides plain JavaScript/TypeScript data, allowing you to transform it into your own database schema.

---

# Recommended Database Structure

A relational database can use the following structure:

```text
divisions
    │
    └── districts
          │
          └── upazilas
                │
                └── areas
                      │
                      ├── unions
                      │     └── villages
                      │
                      └── wards
```

Example tables:

```text
divisions

├── id
├── name
├── nameBn
├── latitude
└── longitude


districts

├── id
├── name
├── nameBn
├── divisionId
├── latitude
└── longitude


upazilas

├── id
├── name
├── nameBn
├── districtId
├── type
├── latitude
└── longitude


areas

├── id
├── name
├── nameBn
├── upazilaId
├── type
├── latitude
└── longitude


villages

├── id
├── name
├── nameBn
├── areaId
├── latitude
└── longitude
```

---

# Prisma

Install:

```bash
npm install @olism/bd-geo
```

Example `prisma/seed.ts`:

```ts
import { PrismaClient } from "@prisma/client";

import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Bangladesh geographical data...");

  await prisma.division.createMany({
    data: getDivisions(),
  });

  await prisma.district.createMany({
    data: getDistricts(),
  });

  await prisma.upazila.createMany({
    data: getUpazilas(),
  });

  await prisma.area.createMany({
    data: getAreas(),
  });

  await prisma.village.createMany({
    data: getVillages(),
  });

  console.log("Bangladesh geographical data seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Make sure your Prisma model field names match the data provided by the package.

---

# NestJS + TypeORM

Example seed:

```ts
import { DataSource } from "typeorm";

import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

import { Division } from "./entities/division.entity";
import { District } from "./entities/district.entity";
import { Upazila } from "./entities/upazila.entity";
import { Area } from "./entities/area.entity";
import { Village } from "./entities/village.entity";

export async function seed(dataSource: DataSource) {
  const divisionRepository = dataSource.getRepository(Division);

  const districtRepository = dataSource.getRepository(District);

  const upazilaRepository = dataSource.getRepository(Upazila);

  const areaRepository = dataSource.getRepository(Area);

  const villageRepository = dataSource.getRepository(Village);

  await divisionRepository.save(getDivisions());

  await districtRepository.save(getDistricts());

  await upazilaRepository.save(getUpazilas());

  await areaRepository.save(getAreas());

  await villageRepository.save(getVillages());
}
```

---

# Express.js + Sequelize

The package works independently of your backend framework.

Example:

```ts
import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

import { Division } from "./models/division";
import { District } from "./models/district";
import { Upazila } from "./models/upazila";
import { Area } from "./models/area";
import { Village } from "./models/village";

export async function seedDatabase() {
  await Division.bulkCreate(getDivisions());

  await District.bulkCreate(getDistricts());

  await Upazila.bulkCreate(getUpazilas());

  await Area.bulkCreate(getAreas());

  await Village.bulkCreate(getVillages());
}
```

---

# Next.js + Prisma

You can use the same Prisma seed approach in a Next.js application.

Create:

```text
prisma/
└── seed.ts
```

Then use:

```ts
import { PrismaClient } from "@prisma/client";

import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getAreas,
  getVillages,
} from "@olism/bd-geo";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Bangladesh geographical data...");

  await prisma.division.createMany({
    data: getDivisions(),
  });

  await prisma.district.createMany({
    data: getDistricts(),
  });

  await prisma.upazila.createMany({
    data: getUpazilas(),
  });

  await prisma.area.createMany({
    data: getAreas(),
  });

  await prisma.village.createMany({
    data: getVillages(),
  });

  console.log("Bangladesh geographical data seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

# Important: Preserve Parent-Child Relationships

When inserting geographical data into a relational database, insert the records in hierarchical order:

```text
1. Divisions
       ↓
2. Districts
       ↓
3. Upazilas
       ↓
4. Areas
       ↓
5. Villages
```

This is especially important when your database uses foreign-key constraints.

For example:

```ts
await prisma.division.createMany({
  data: getDivisions(),
});

await prisma.district.createMany({
  data: getDistricts(),
});

await prisma.upazila.createMany({
  data: getUpazilas(),
});

await prisma.area.createMany({
  data: getAreas(),
});

await prisma.village.createMany({
  data: getVillages(),
});
```

The IDs provided by `@olism/bd-geo` allow parent-child relationships to remain consistent.

---

# Using Only Specific Levels

You don't need to use the entire dataset.

For example, if your application only needs divisions and districts:

```ts
import { getDivisions, getDistricts } from "@olism/bd-geo";

const divisions = getDivisions();
const districts = getDistricts();
```

Only upazilas:

```ts
import { getUpazilas } from "@olism/bd-geo";

const upazilas = getUpazilas();
```

Only areas:

```ts
import { getAreas } from "@olism/bd-geo";

const areas = getAreas();
```

Only villages:

```ts
import { getVillages } from "@olism/bd-geo";

const villages = getVillages();
```

---

# Coordinates

Geographical records may contain optional coordinates:

```ts
{
  latitude?: number;
  longitude?: number;
}
```

Example:

```ts
{
  id: 10,
  name: "Dhaka",
  nameBn: "ঢাকা",
  latitude: 23.8103,
  longitude: 90.4125,
}
```

Coordinates can be useful for:

- Maps
- Location markers
- Distance calculations
- Delivery systems
- Location-based search
- Geographic visualizations

Coordinates should be treated as geographical reference data and verified before being used for high-precision applications.

---

# Data Structure

The package source is organized approximately as:

```text
src/
├── types.ts
├── geo.ts
├── index.ts
└── data/
    ├── divisions.json
    ├── districts.json
    ├── upazilas.json
    ├── areas.json
    └── villages.json
```

The JSON files contain the underlying geographical dataset.

The TypeScript API provides convenient access to that data.

---

# Current API

```ts
getDivisions();

getDistricts();

getUpazilas();

getAreas();

getVillages();
```

For backward compatibility:

```ts
getThanas();
```

`getThanas()` is deprecated. New applications should use:

```ts
getUpazilas();
```

---

# Data Accuracy

Geographical data is an important part of this package.

The dataset may evolve over time as geographical information is added, corrected, or improved.

Before using the data for critical production purposes, verify the relevant information against authoritative Bangladesh government sources where appropriate.

The project aims to maintain consistency in:

- IDs
- English names
- Bangla names
- Parent-child relationships
- Administrative classifications
- Area types
- Geographic coordinates

If you discover incorrect information, please contribute a correction.

---

# Contributing

Contributions are welcome.

You can contribute by:

- Adding missing geographical data
- Correcting English names
- Correcting Bangla names
- Correcting parent-child relationships
- Adding missing villages
- Correcting area types
- Improving coordinates
- Improving tests
- Improving documentation
- Reporting bugs

If you find an issue, please open an issue or submit a pull request in the project repository.

---

# Development

Clone the repository:

```bash
git clone https://github.com/mohammad-oliullah/bd-geo.git
```

Enter the project:

```bash
cd bd-geo
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build the package:

```bash
npm run build
```

---

# License

MIT License

Copyright (c) 2026 @olism/bd-geo contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
