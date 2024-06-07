### Install dependencies

```
bun i drizzle-orm libsql/client
```

```
bun i -d drizzle-kit
```

### Create a D1 database

```
bunx wrangler d1 create bookish-dribble
```

### Configure Drizzle

add the following configs to drizzle.config.json file

```
{
    "dialect": "sqlite",
    "out": "drizzle",
    "schema": "src/db/schema.ts"
}
```

### Add scripts

add the following scripts to package.json

```
"db:generate": "drizzle-kit generate:sqlite",
"db:up": "drizzle-kit up:sqlite"
```

### Define schema

define categories schema in ./src/db/schema.ts

```
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  // id is set on insert, incrementing
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

  // name of the category with 256 max character length
  name: text('name', { length: 256 }).notNull(),
});

export const sizecharts = sqliteTable("sizecharts", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    chart: text("chart").notNull(),
})

export const products = sqliteTable("products", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    price: integer("price", { mode: "number" }).notNull(),

    // html string will are stored in info
    info: text("info").notNull(),

    // pictures are stored in JSON string format
    pictures: text("pictures").notNull(),

    categoryId: integer('categoryId', { mode: 'number' }).notNull.references(() => categories.id),

    sizechartId: integer('sizechartId', { mode: 'number' }).notNull().references(() => sizecharts.id),
})
```

### Generate migration

```
bun run db:generate
```

### Apply migration to local database

```
bunx wrangler d1 execute bookish-dribble --local --file=./drizzle/<migration file name here>
```

### Apply migrations to D1 db on Cloudflare

```
bunx wrangler d1 execute bookish-dribble --remote --file=./drizzle/<migration file name here>
```

### drizzle connection

```
export type Env {
    DB: D1Database;
}

```

### Insert a new category

```
const db = drizzle(c.env.DB);
const { name } = await c.req.json();
const result = await db.insert(categories).values({ name }).returning();
return c.json(result);
```
