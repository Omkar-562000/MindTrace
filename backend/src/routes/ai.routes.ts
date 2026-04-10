import { Router } from "express";
import { brainDump, chat } from "../controllers/ai.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { brainDumpRequestSchema, chatRequestSchema } from "../validations/ai.validation";

const router = Router();

router.post("/chat", requireAuth, validateBody(chatRequestSchema), chat);
router.post("/brain-dump", requireAuth, validateBody(brainDumpRequestSchema), brainDump);

export default router;
