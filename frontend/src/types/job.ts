import type { Company } from './company';

export type JobType = 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship';

export type JobCategory = 
  | 'Design' 
  | 'Sales' 
  | 'Marketing' 
  | 'Finance' 
  | 'Technology' 
  | 'Engineering' 
  | 'Business' 
  | 'HR';

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  jobTypes: JobType[];
  category: JobCategory;
  postedAt: Date;
  applicationDeadline?: Date;
}
