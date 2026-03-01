import { JobRepository } from "../repositories/job.repository";
import { CreateJobDto } from "../types/job.types";

export const jobService = {
  async getAll(filters?: any) {
    return JobRepository.findAll(filters);
  },

  async getById(id: number) {
    const job = await JobRepository.findById(id);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  },

  async create(data: CreateJobDto) {
    return JobRepository.create(data);
  },

  async delete(id: number) {
    const job = await JobRepository.findById(id);
    if (!job) {
      throw new Error("Job not found");
    }
    await JobRepository.delete(id);
  },
};