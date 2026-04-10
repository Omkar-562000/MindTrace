import { Router } from "express";
import { analyze, analyzeSchema } from "../controllers/analyze.controller";
import { validateBody } from "../middleware/validate.middleware";

const router = Router();

router.post("/", validateBody(analyzeSchema), analyze);

export default router;
