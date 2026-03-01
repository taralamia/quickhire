import { pool } from "../config/db";
import { Application, CreateApplicationDto } from "../types/application.types";

export const ApplicationRepository = {
  // Get all applications (for a specific job)
  async findAll(job_id?: number): Promise<Application[]> {
    let query = "SELECT * FROM applications";
    const values: any[] = [];

    if (job_id) {
      query += " WHERE job_id = $1";
      values.push(job_id);
    }

    query += " ORDER BY created_at DESC";

    const { rows } = await pool.query<Application>(query, values);
    return rows;
  },

  // Get single application by ID
  async findById(id: number): Promise<Application | null> {
    const { rows } = await pool.query<Application>(
      "SELECT * FROM applications WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  },

  // Create new application
  async create(application: CreateApplicationDto): Promise<Application> {
    const { job_id, name, email, resume_link, cover_note } = application;

    const { rows } = await pool.query<Application>(
      `INSERT INTO applications (job_id, name, email, resume_link, cover_note)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [job_id, name, email, resume_link, cover_note]
    );

    return rows[0];
  },

  // Delete application by ID
  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM applications WHERE id = $1", [id]);
  },
};