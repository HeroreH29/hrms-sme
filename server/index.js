import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { dbConn, dbConnEvents } from "./config/dbConn.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import { roleSeeder } from "./seed/roleSeeder.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (_, res) => res.send("HRMS API running... Welcome!"));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.post("/api/attendance", (req, res) => {
  console.log(req.body);
});

// error handler
app.use(errorHandler);

// db connection events
dbConnEvents();

// server start
app.listen(5000, async () => {
  console.log("Server running on port 5000");
  // db connection start
  dbConn();

  // role seeder
  roleSeeder();
});
