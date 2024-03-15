/* eslint-disable no-console */
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import api from "./api";
import config from "./config";
import runtypeErrorHandler from "./middlewares/runtypeErrorHandler";
import { app, server } from "./server";
import swagger from "./swagger";

declare global {
  namespace Express {
    interface Request {
      //   user?: User;
    }
  }
}

app.set("port", config.PORT || 3001);

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV !== "production" ? true : /solved\.ac$/,
    optionsSuccessStatus: 200,
  })
);
// XXX: Wrong types in @types/express: https://stackoverflow.com/a/59186658/2688304
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.options("*", cors());

app.use(compression());
app.use(cookieParser(config.COOKIE_SECRET));
app.use(
  express.json({
    limit: config.BODY_PARSER_LIMIT,
    verify: (req, res, buf, encoding) => {
      // Add raw body for discord
      if (!req.headers["x-signature-ed25519"]) return;
      if (buf && buf.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (req as any).rawBody = buf.toString(
          (encoding as BufferEncoding) || "utf8"
        );
      }
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan((tokens, req, res) => {
    return [
      "req:",
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      "-",
      tokens["user-agent"](req, res),
    ].join(" ");
  })
);

app.use("/api/v3", api);

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));
}

process.on("unhandledRejection", () => {
  //   AdminReport.reportInternalError(error as Error).catch(console.error) // eslint-disable-line no-console
});

app.use(runtypeErrorHandler);

process.on("SIGINT", () => {
  app.use((req, res, next) => {
    res.set("Connection", "close");
    next();
  });
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
