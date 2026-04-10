import { Router } from "express";
import { studyPlan } from "../controllers/study-plan.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", requireAuth, studyPlan);

export default router;
