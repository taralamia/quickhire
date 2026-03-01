import { Request, Response, NextFunction } from "express";
import { applicationService } from "../services/application.service";
import { CreateApplicationDto } from "../types/application.types";
import { ApiResponse } from "../types/common.types";
export const applicationController = {
  // GET /api/applications?job_id=1
  async getAll(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const job_id = req.query.job_id ? Number(req.query.job_id) : undefined;
      const applications = await applicationService.getAll(job_id);
      res.json({ success: true, data: applications, count: applications.length });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/applications/:id
  async getById(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const application = await applicationService.getById(id);
      res.json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/applications
  async create(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const data: CreateApplicationDto = req.body;
      const application = await applicationService.create(data);
      res.status(201).json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/applications/:id
  async delete(req: Request, res: Response<ApiResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await applicationService.delete(id);
      res.json({ success: true, message: "Application deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};