import { Router } from "express";
import { applicationController } from "../controllers/application.controller";
import { submitApplicationRules } from "../validators/application.validator";
import  validate  from "../middleware/validate";

const router = Router();

// GET /api/applications?job_id=1
router.get("/", applicationController.getAll);

// GET /api/applications/:id
router.get("/:id", applicationController.getById);

// POST /api/applications
router.post("/", submitApplicationRules, validate, applicationController.create);

// DELETE /api/applications/:id
router.delete("/:id", applicationController.delete);

export default router;