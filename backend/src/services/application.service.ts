import { ApplicationRepository } from "../repositories/application.repository";
import { CreateApplicationDto } from "../types/application.types";

export const applicationService = {
  // Get all applications, optionally for a specific job
  async getAll(job_id?: number) {
    return ApplicationRepository.findAll(job_id);
  },

  // Get a single application by ID
  async getById(id: number) {
    const application = await ApplicationRepository.findById(id);
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  },

  // Create a new application
  async create(data: CreateApplicationDto) {
    // You could add extra business rules here if needed
    return ApplicationRepository.create(data);
  },

  // Delete an application by ID
  async delete(id: number) {
    const application = await ApplicationRepository.findById(id);
    if (!application) {
      throw new Error("Application not found");
    }
    await ApplicationRepository.delete(id);
  },
};