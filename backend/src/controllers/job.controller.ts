import { Request, Response, NextFunction } from "express";
import { jobService } from "../services/job.service";
import { ApiResponse, AppError } from "../types/common.types";
import { CreateJobDto } from "../types/job.types";

export const jobController = {
  // GET /api/jobs
  async getAll(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const filters = req.query;
      const jobs = await jobService.getAll(filters);
      res.json({ success: true, data: jobs, count: jobs.length });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/jobs/:id
  async getById(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const job = await jobService.getById(id);
      res.json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/jobs
  async create(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const data: CreateJobDto = req.body;
      const job = await jobService.create(data);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/jobs/:id
  async delete(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await jobService.delete(id);
      res.json({ success: true, message: "Job deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};