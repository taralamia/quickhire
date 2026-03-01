export interface Application {
  id: number;
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string | null;
  created_at: Date;
}
export interface CreateApplicationDto {
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
}