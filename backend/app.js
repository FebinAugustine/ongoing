import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
// import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

// 1. Basic Express Middleware (should come first)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// 2. Security Middleware
app.use(helmet());

// 3. CORS Configuration (simplified - remove duplicate)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-production-domain.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// 4. Rate Limiting (after CORS but before routes)

// Routes import
import authRouter from "./routes/auth.routes.js";

// Routes declaration
app.use("/api/v1/auth", authRouter);

// 7. Error handling middleware (MUST be last)
// app.use(errorHandler);

export default app;
