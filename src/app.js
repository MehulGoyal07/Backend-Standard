import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

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
app.use(cookieParser());

// Routes Import
import userRoute from "./routes/user.routes.js";

// Routes declaration - done using app.use, directly not used as in seperate file
// app.use("/users", userRoute)

// Instead of giving directly /users we give /api/v1/users
app.use("/api/v1/users", userRoute);
// from here the control is passed to user.routes.js
// https://localhost:8000/api/v1/users then followed by /register or /login etc.

export { app };
