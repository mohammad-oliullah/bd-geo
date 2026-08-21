# @olism/bd-geo

Bangladesh geographical data and utilities for JavaScript and TypeScript.

[![npm version](https://img.shields.io/npm/v/@olism/bd-geo.svg)](https://www.npmjs.com/package/@olism/bd-geo)
[![npm downloads](https://img.shields.io/npm/dm/@olism/bd-geo.svg)](https://www.npmjs.com/package/@olism/bd-geo)
[![License](https://img.shields.io/npm/l/@olism/bd-geo.svg)](LICENSE)

`@olism/bd-geo` provides structured geographical data for Bangladesh, including divisions, districts, thanas/upazilas, unions, and wards.

The package is designed for applications such as address forms, location selectors, delivery systems, real-estate platforms, e-commerce applications, and other Bangladesh-focused software.

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

## Geography Hierarchy

```text
Division
   │
   └── District
         │
         └── Thana / Upazila
                  │
                  └── Area
                       ├── Union
                       └── Ward
```

## Usage

Import the functions you need:

```ts
import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";
```

### Get all divisions

```ts
const divisions = getDivisions();

console.log(divisions);
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

### Get all districts

```ts
const districts = getDistricts();

console.log(districts);
```

### Get all thanas / upazilas

```ts
const thanas = getThanas();

console.log(thanas);
```

### Get all areas

```ts
const areas = getAreas();

console.log(areas);
```

## API

### `getDivisions()`

Returns all Bangladesh divisions.

```ts
const divisions = getDivisions();
```

Return type:

```ts
Division[]
```

---

### `getDistricts()`

Returns all Bangladesh districts.

```ts
const districts = getDistricts();
```

Return type:

```ts
District[]
```

---

### `getThanas()`

Returns all thanas/upazilas.

```ts
const thanas = getThanas();
```

Return type:

```ts
Thana[]
```

---

### `getAreas()`

Returns all available areas.

```ts
const areas = getAreas();
```

Return type:

```ts
Area[]
```

## TypeScript Types

### Division

```ts
export interface Division {
  id: number;
  name: string;
  nameBn: string;
  latitude?: number;
  longitude?: number;
}
```

### District

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

### Thana

A thana and upazila are represented by the same geographical level in this package.

```ts
export interface Thana {
  id: number;
  name: string;
  nameBn: string;
  districtId: number;
  latitude?: number;
  longitude?: number;
}
```

### Area

```ts
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
```

## Relationship IDs

Each geographical level references its parent.

```text
District.divisionId
        ↓
Division.id
```

```text
Thana.districtId
        ↓
District.id
```

```text
Area.thanaId
        ↓
Thana.id
```

For example:

```ts
const district = districts.find((district) => district.id === 1);

const division = divisions.find(
  (division) => division.id === district?.divisionId,
);
```

## Bangladesh Address Example

You can use the package to build cascading address selectors:

```ts
const divisions = getDivisions();

const districts = getDistricts().filter(
  (district) => district.divisionId === selectedDivisionId,
);

const thanas = getThanas().filter(
  (thana) => thana.districtId === selectedDistrictId,
);

const areas = getAreas().filter((area) => area.thanaId === selectedThanaId);
```

This can be used for:

- Address forms
- Checkout forms
- Delivery addresses
- Real-estate listings
- Job locations
- User profiles
- Registration forms
- Location filters
- Bangladesh map applications

## React Example

```tsx
import { useState } from "react";

import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";

export default function AddressForm() {
  const [divisionId, setDivisionId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [thanaId, setThanaId] = useState<number>();

  const divisions = getDivisions();

  const districts = getDistricts().filter(
    (district) => district.divisionId === divisionId,
  );

  const thanas = getThanas().filter((thana) => thana.districtId === districtId);

  const areas = getAreas().filter((area) => area.thanaId === thanaId);

  return (
    <div>
      <select
        value={divisionId ?? ""}
        onChange={(event) => setDivisionId(Number(event.target.value))}
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
        onChange={(event) => setDistrictId(Number(event.target.value))}
      >
        <option value="">Select District</option>

        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <select
        value={thanaId ?? ""}
        onChange={(event) => setThanaId(Number(event.target.value))}
      >
        <option value="">Select Thana / Upazila</option>

        {thanas.map((thana) => (
          <option key={thana.id} value={thana.id}>
            {thana.name}
          </option>
        ))}
      </select>

      <select>
        <option value="">Select Area</option>

        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

## Using @olism/bd-geo as Database Seed Data

`@olism/bd-geo` can also be used to populate geographical tables in applications built with NestJS, Next.js, Express.js, Prisma, Sequelize, TypeORM, Drizzle, or other database libraries.

The package provides plain JavaScript/TypeScript data, so you can transform it into your database's schema.

### Example Database Structure

A typical relational database can use:

```text
divisions
    │
    └── districts
          │
          └── thanas
                 │
                 └── areas
```

For example:

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

thanas
├── id
├── name
├── nameBn
├── districtId
├── latitude
└── longitude

areas
├── id
├── name
├── nameBn
├── thanaId
├── type
├── latitude
└── longitude
```

### NestJS + TypeORM

Install `@olism/bd-geo`:

```bash
npm install @olism/bd-geo
```

Example seed script:

```ts
import { DataSource } from "typeorm";

import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";

import { Division } from "./entities/division.entity";
import { District } from "./entities/district.entity";
import { Thana } from "./entities/thana.entity";
import { Area } from "./entities/area.entity";

export async function seed(dataSource: DataSource) {
  const divisionRepository = dataSource.getRepository(Division);
  const districtRepository = dataSource.getRepository(District);
  const thanaRepository = dataSource.getRepository(Thana);
  const areaRepository = dataSource.getRepository(Area);

  await divisionRepository.save(getDivisions());

  await districtRepository.save(getDistricts());

  await thanaRepository.save(getThanas());

  await areaRepository.save(getAreas());
}
```

Run your seed script according to your NestJS/TypeORM setup.

### NestJS + Prisma

Install the package:

```bash
npm install @olism/bd-geo
```

Example `prisma/seed.ts`:

```ts
import { PrismaClient } from "@prisma/client";

import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";

const prisma = new PrismaClient();

async function main() {
  await prisma.division.createMany({
    data: getDivisions(),
  });

  await prisma.district.createMany({
    data: getDistricts(),
  });

  await prisma.thana.createMany({
    data: getThanas(),
  });

  await prisma.area.createMany({
    data: getAreas(),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Make sure your Prisma models use compatible field names and types.

### Express.js + Sequelize

`@olism/bd-geo` works independently of your backend framework, so it can also be used directly with Sequelize.

```ts
import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";

import { Division } from "./models/division";
import { District } from "./models/district";
import { Thana } from "./models/thana";
import { Area } from "./models/area";

export async function seedDatabase() {
  await Division.bulkCreate(getDivisions());

  await District.bulkCreate(getDistricts());

  await Thana.bulkCreate(getThanas());

  await Area.bulkCreate(getAreas());
}
```

### Next.js + Prisma

You can use exactly the same Prisma seed approach in a Next.js application.

Create:

```text
prisma/
└── seed.ts
```

Then:

```ts
import { PrismaClient } from "@prisma/client";

import { getDivisions, getDistricts, getThanas, getAreas } from "@olism/bd-geo";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Bangladesh geographical data...");

  await prisma.division.createMany({
    data: getDivisions(),
  });

  await prisma.district.createMany({
    data: getDistricts(),
  });

  await prisma.thana.createMany({
    data: getThanas(),
  });

  await prisma.area.createMany({
    data: getAreas(),
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

### Important: Preserve Parent-Child Relationships

When inserting the data into a relational database, insert the records in hierarchical order:

```text
1. Divisions
      ↓
2. Districts
      ↓
3. Thanas / Upazilas
      ↓
4. Areas
```

This is important when your database uses foreign-key constraints.

For example:

```ts
await prisma.division.createMany({
  data: getDivisions(),
});

await prisma.district.createMany({
  data: getDistricts(),
});

await prisma.thana.createMany({
  data: getThanas(),
});

await prisma.area.createMany({
  data: getAreas(),
});
```

The IDs provided by `@olism/bd-geo` allow the relationships between the geographical levels to remain consistent.

### Using Only One Level

You don't have to seed the entire dataset.

For example, if your application only needs divisions and districts:

```ts
import { getDivisions, getDistricts } from "@olism/bd-geo";

await prisma.division.createMany({
  data: getDivisions(),
});

await prisma.district.createMany({
  data: getDistricts(),
});
```

Or only thanas:

```ts
import { getThanas } from "@olism/bd-geo";

const thanas = getThanas();
```

This makes `@olism/bd-geo` useful both as a complete Bangladesh geographical dataset and as a source for specific parts of an application's location system.

---

## Bangla Names

Each geographical entity contains both English and Bangla names.

```ts
{
  id: 10,
  name: "Dhaka",
  nameBn: "ঢাকা",
}
```

This makes it possible to build applications supporting both English and Bangla interfaces.

```tsx
<span>{division.nameBn}</span>
```

or:

```tsx
<span>{division.name}</span>
```

## Data Structure

The package currently organizes geographical data into:

```text
src/
├── types.ts
├── geo.ts
├── index.ts
└── data/
    ├── divisions.json
    ├── districts.json
    ├── thanas.json
    └── areas.json
```

The JSON files contain the underlying geographical dataset, while the TypeScript API provides access to that data.

## Current API

```ts
getDivisions();
getDistricts();
getThanas();
getAreas();
```

More query and search utilities will be added as the package evolves.

## Data Accuracy

Geographical data is an important part of this package.

Before using the data in production, verify the dataset against authoritative Bangladesh government sources where possible.

The project aims to maintain consistent:

- IDs
- English names
- Bangla names
- Parent relationships
- Administrative classifications
- Geographic coordinates

## Contributing

Contributions are welcome.

If you find incorrect geographical information, missing locations, incorrect Bangla names, or incorrect parent-child relationships, please open an issue or submit a pull request.

## Development

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## License

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

```

```
