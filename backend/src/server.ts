import "dotenv/config";
import crypto from "node:crypto";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
const publicApiUrl = process.env.PUBLIC_API_URL ?? `http://localhost:${port}`;
const mongo = new MongoClient(
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017",
);
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(cookieParser());
app.use(
  express.json({
    verify: (req, _res, buffer) => {
      (req as express.Request & { rawBody?: string }).rawBody =
        buffer.toString();
    },
  }),
);

app.get("/api/health", async (_req, res) => {
  try {
    await mongo.db(process.env.MONGODB_DB ?? "repowise").command({ ping: 1 });
    res.json({
      success: true,
      data: { api: "ok", database: "ok" },
      error: null,
    });
  } catch {
    res
      .status(503)
      .json({
        success: false,
        data: null,
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "MongoDB is unavailable.",
        },
      });
  }
});
app.get("/api/auth/github", (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID ?? "",
    redirect_uri: `${publicApiUrl}/api/auth/github/callback`,
    scope: "read:user user:email repo",
    state: crypto.randomUUID(),
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});
app.get("/api/auth/github/callback", async (req, res) => {
  const code = String(req.query.code ?? "");
  if (
    !code ||
    !process.env.GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET
  )
    return res.redirect(`${frontendUrl}/?error=oauth_failed`);
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const token = (await response.json()) as { access_token?: string };
  if (!response.ok || !token.access_token)
    return res.redirect(`${frontendUrl}/?error=oauth_failed`);
  res.cookie("repowise_session", token.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 604800000,
  });
  res.redirect(`${frontendUrl}/dashboard`);
});
app.post("/api/webhooks/github", (req, res) => {
  const signature = req.header("x-hub-signature-256") ?? "";
  const raw = (req as express.Request & { rawBody?: string }).rawBody ?? "";
  const expected = `sha256=${crypto
    .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET ?? "")
    .update(raw)
    .digest("hex")}`;
  if (
    !signature ||
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  )
    return res
      .status(401)
      .json({
        success: false,
        data: null,
        error: {
          code: "INVALID_SIGNATURE",
          message: "Webhook signature could not be verified.",
        },
      });
  res
    .status(202)
    .json({
      success: true,
      data: {
        accepted: true,
        repository: req.body.repository?.full_name,
        ref: req.body.ref,
      },
      error: null,
    });
});

mongo
  .connect()
  .then(() =>
    app.listen(port, () =>
      console.log(`RepoWise backend listening on port ${port}`),
    ),
  )
  .catch((error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  });
