CREATE TABLE IF NOT EXISTS jobs (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255)  NOT NULL,
  company      VARCHAR(255)  NOT NULL,
  location     VARCHAR(255)  NOT NULL,
  category     VARCHAR(100)  NOT NULL,
  type         VARCHAR(50)   NOT NULL DEFAULT 'Full-time',
  salary       VARCHAR(100),
  description  TEXT          NOT NULL,
  requirements TEXT,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id           SERIAL PRIMARY KEY,
  job_id       INTEGER       NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  name         VARCHAR(255)  NOT NULL,
  email        VARCHAR(255)  NOT NULL,
  resume_link  TEXT          NOT NULL,
  cover_note   TEXT,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Seed sample data
INSERT INTO jobs (title, company, location, category, type, salary, description, requirements) VALUES
('Senior Frontend Developer', 'TechCorp BD', 'Dhaka, Bangladesh', 'Engineering', 'Full-time', '$2000-$3000/mo',
 'We are looking for a skilled Frontend Developer to join our product team. You will build modern web UIs using React and collaborate closely with our design and backend teams.',
 'React, TypeScript, Tailwind CSS, 3+ years experience'),
('Product Designer', 'Creative Studio', 'Remote', 'Design', 'Remote', '$1500-$2500/mo',
 'Join our creative team as a Product Designer. You will own the end-to-end design process from wireframes to high-fidelity prototypes.',
 'Figma, UX Research, 2+ years experience'),
('Node.js Backend Engineer', 'StartupXYZ', 'Dhaka, Bangladesh', 'Engineering', 'Full-time', '$1800-$2800/mo',
 'Build scalable REST APIs and microservices for our growing platform.',
 'Node.js, PostgreSQL, Express, Docker'),
('Marketing Manager', 'BrandHouse', 'Chittagong, Bangladesh', 'Marketing', 'Full-time', '$1200-$2000/mo',
 'Lead our digital marketing campaigns and grow our online presence.',
 'SEO, Social Media, Google Ads, 3+ years'),
('DevOps Engineer', 'CloudBase', 'Remote', 'Engineering', 'Contract', '$3000-$4000/mo',
 'Maintain and improve our cloud infrastructure on AWS.',
 'AWS, Docker, Kubernetes, CI/CD'),
('UI/UX Designer', 'PixelPerfect', 'Dhaka, Bangladesh', 'Design', 'Part-time', '$800-$1200/mo',
 'Design beautiful and functional interfaces for mobile and web apps.',
 'Figma, Adobe XD, Prototyping');