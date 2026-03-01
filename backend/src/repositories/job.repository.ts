import { pool } from "../config/db";
import { Job, CreateJobDto } from "../types/job.types";
import { JobFilters } from "../types/common.types";
export const JobRepository = {
  // Get all jobs with optional filters
  async findAll(filters?: JobFilters): Promise<Job[]> {
    let query = "SELECT * FROM jobs";
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters) {
      if (filters.search) {
        values.push(`%${filters.search}%`);
        conditions.push(`title ILIKE $${values.length}`);
      }
      if (filters.category) {
        values.push(filters.category);
        conditions.push(`category = $${values.length}`);
      }
      if (filters.location) {
        values.push(filters.location);
        conditions.push(`location = $${values.length}`);
      }
      if (filters.type) {
        values.push(filters.type);
        conditions.push(`type = $${values.length}`);
      }
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const { rows } = await pool.query<Job>(query, values);
    return rows;
  },

  // Get single job by ID
  async findById(id: number): Promise<Job | null> {
    const { rows } = await pool.query<Job>(
      "SELECT * FROM jobs WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  },

  // Create new job
  async create(job: CreateJobDto): Promise<Job> {
    const {
      title,
      company,
      location,
      category,
      type = "Full-time",
      salary,
      description,
      requirements,
    } = job;

    const { rows } = await pool.query<Job>(
      `INSERT INTO jobs (title, company, location, category, type, salary, description, requirements)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [title, company, location, category, type, salary, description, requirements]
    );

    return rows[0];
  },

  // Delete job by ID
  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
  },
};