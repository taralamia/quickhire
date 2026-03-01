import { Router } from "express";
import jobRoutes from "./job.route";
import applicationRoutes from "./application.route";

const router = Router();

router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);

export default router;