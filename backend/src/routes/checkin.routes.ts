import { Router } from "express";
import { addCheckin, checkinSchema, history } from "../controllers/checkin.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";

const router = Router();

router.post("/", requireAuth, validateBody(checkinSchema), addCheckin);
router.get("/history", requireAuth, history);

export default router;
