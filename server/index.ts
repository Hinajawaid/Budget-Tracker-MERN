import express, { Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./src/routes/User";
import budgetRouter from "./src/routes/Budget";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";

require("./src/middlewares/auth");

import cors from "cors";
import { auth } from "./src/middlewares/auth";

const app: Express = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connect = mongoose.connect("mongodb://127.0.0.1:27017/budget-tracker");
connect
  .then((db) => console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

// setup cors
// const allowedOrigins = ["http://localhost:5173"];
// const options: cors.CorsOptions = {
//   // origin: allowedOrigins,
//   origin: allowedOrigins,
// };
app.use(cors());
// const allowedOrigins = ["http://localhost:5173/", "http://localhost:5174/"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// app.use(cors(options));
app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use("/users", userRouter);
app.use("/budget", auth, budgetRouter);

// app.listen(port, () => {
//   console.log(`[Server]: I am running at http://localhost:${port}`);
// });
const server = app.listen(port, "0.0.0.0", () => {
  const address = server.address?.();
  if (address) {
    console.log(`Server is running on :${port}`);
  } else {
    console.error(`Failed to get server address`);
  }
});
