import { Hono } from "@hono";
import { serveStatic } from "@hono/deno";
import { logger } from "@hono/logger";
import { prettyJSON } from "@hono/pretty-json";
import { cors } from "@hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "@hono-openapi";
import { prometheus } from "@hono/prometheus";
import defaultRouter from "./routes/default.ts";
import authRouter from "./routes/auth.ts";
import userRouter from "./routes/user.ts";
import playgroundRouter from "./routes/playground.ts";
import triggerMeNotRouter from "./routes/triggerMeNot.ts";
import githubRouter from "./routes/github.ts";
import { seedDatabase } from "./db/seed.ts";

await seedDatabase();

const app = new Hono().basePath("/api");

app.use(logger());
app.use(prettyJSON());
app.use(cors());

{
  const { printMetrics, registerMetrics } = prometheus();

  app.use(registerMetrics);
  app.get("/metrics", printMetrics);
}

app.get("/static/*", serveStatic({ precompressed: true }));
app.use("/static/*", serveStatic({ root: "./static" }));
app.use("/favicon.ico", serveStatic({ path: "./static/favicon.ico" }));

app.route("/", defaultRouter);
app.route("/auth", authRouter);
app.route("/user", userRouter);
app.route("/playground", playgroundRouter);
app.route("/trigger-me-not", triggerMeNotRouter);
app.route("/github", githubRouter);

app.get(
  "/openapi",
  openAPISpecs(app as unknown as Hono, {
    documentation: {
      info: {
        title: "TriggerMeNot API",
        version: "1.0.0",
        description: "API for TriggerMeNot",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        {
          url: `http://localhost:${Deno.env.get("PORT") || 8080}`,
          description: "Local server",
        },
      ],
    },
  }),
);

app.get(
  "/doc",
  swaggerUI({
    url: "/api/openapi",
  }),
);
app.get(
  "/reference",
  apiReference({
    theme: "saturn",
    spec: {
      url: "/api/openapi",
    },
  }),
);

export default app;
