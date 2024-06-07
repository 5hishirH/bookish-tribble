import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { categories } from "../db/schema";

export type Env = {
  DB: D1Database;
};

const category = new Hono<{ Bindings: Env }>();

category
  .get("/", async (c) => {
    try {
      const db = drizzle(c.env.DB);

      const result = await db.select().from(categories).all();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .post("/new", async (c) => {
    try {
      const db = drizzle(c.env.DB);

      const { name } = await c.req.json();

      const result = await db.insert(categories).values({ name }).returning();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  });

export default category;
