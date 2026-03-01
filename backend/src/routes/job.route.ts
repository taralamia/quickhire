import { Router } from "express";
import { jobController } from "../controllers/job.controller";
import { submitApplicationRules } from "../validators/job.validator";
import validate from "../middleware/validate"
const router = Router();

// GET /api/jobs
router.get("/", jobController.getAll);

// GET /api/jobs/:id
router.get("/:id", jobController.getById);

// POST /api/jobs
router.post("/", submitApplicationRules, validate, jobController.create);

// DELETE /api/jobs/:id
router.delete("/:id", jobController.delete);

export default router;