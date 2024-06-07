import { Hono } from "hono";
import category from "./routes/category";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Bookish Dribble!");
});

app.route("/category", category);

export default app;
