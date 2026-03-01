export type JobType = 'Full-time' | 'Part-time' | 'Remote' | 'Contract';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  type: JobType;
  salary?: string | null;
  description: string;
  requirements?: string | null;
  created_at: Date;
}

export interface CreateJobDto {
  title: string;
  company: string;
  location: string;
  category: string;
  type?: JobType;
  salary?: string;
  description: string;
  requirements?: string;
}