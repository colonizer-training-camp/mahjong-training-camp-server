import express from "express";
import http from "http";
import { v4 as uuidv4 } from "uuid";

export const app = express();
export const server = http.createServer(app);
export const serverUUID = uuidv4();
