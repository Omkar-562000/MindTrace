import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import checkinRoutes from "./routes/checkin.routes";
import analyzeRoutes from "./routes/analyze.routes";
import studyPlanRoutes from "./routes/study-plan.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import "./database/db";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/checkin", checkinRoutes);
app.use("/analyze", analyzeRoutes);
app.use("/study-plan", studyPlanRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
