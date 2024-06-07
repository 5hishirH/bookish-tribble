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

    categoryId: integer('categoryId', { mode: 'number' }).notNull().references(() => categories.id),

    sizechartId: integer('sizechartId', { mode: 'number' }).notNull().references(() => sizecharts.id),
});