import "dotenv/config";
import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// simple code
// app.use(cors());

// But we can make some changes and accept request from particular origin
// by below implementation
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    // many other options are there, can be used as required
  })
);

// Data may come from urls, jsons, req body
// We have to do some settings
// Code for handling jsons
app.use(express.json({ limit: "16kb" }));

// handling urls
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// handling files/folders in the server public assets
app.use(express.static("public"));

// setting and accesing cookies such that performing CRUD operations
app.use(express.cookieParser());

export { app };
