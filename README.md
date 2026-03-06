# QuickHire – Job Listing Platform
![GitHub license](https://img.shields.io/github/license/Sk-Azraf-Sami/hands-on-volunteering-platform)
![GitHub last commit](https://img.shields.io/github/last-commit/taralamia/quickhire)
![GitHub repo size](https://img.shields.io/github/repo-size/taralamia/quickhire)
![GitHub contributors](https://img.shields.io/github/contributors/taralamia/quickhire)
![GitHub pull requests](https://img.shields.io/github/issues-pr/taralamia/quickhire)
![GitHub top language](https://img.shields.io/github/languages/top/taralamia/quickhire)
## Project Overview
QuickHire is a full-stack job listing platform where users can browse job listings, search for relevant opportunities, view detailed job descriptions, and submit applications.

The project is built with a React frontend and a Node.js + Express backend using PostgreSQL.

The frontend currently uses mock data to satisfy UI requirements, while the backend provides fully functional REST APIs that can directly power the frontend when integrated.

## Website Overview
https://github.com/user-attachments/assets/6625f889-75d5-4859-9886-2d5ea81357d5

## Technologies Used
- Typescript
- Express.js
- PostgreSQL
- React.js
- Vite
- Tailwind CSS
## Tools
- Postman(API Testing)
- Docker(PostgreSQL)
## Features
## Job Browsing
- View available job listings
- Search jobs
- Filter jobs by category and location
- View job details
## Job Application
- Submit job applications
- Provide resume link and cover note
## Admin Features
- Create job listings
- Delete job listings
## Setup Instructions

1. Clone the repository:
  ```
   git clone https://github.com/yourusername/quickhire.git
   ```
2. Navigate to the project directory and install dependencies:
    ```
   cd hands-on-volunteering-platform
   npm install
   ```

   
3. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```
4. Create a `.env` file
   Example:
   ```env
    PORT=5000
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/quickhire
    CORS_ORIGIN=http://localhost:5173
   ```
5. Start the backend server:
   ```
   npm run dev
   ```
6. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```
7. Start the frontend application:
   ```
   npm run dev
   ```
## API Documentation
[Ref: [Postman Collection](backend/postman/quickhire.postman_collection.json )] 
### Jobs
- **Get all jobs**: `GET /api/jobs`
- **Get single job**: `GET /api/jobs/:id`
- **Create job**: `POST /api/jobs`
- **Request Body:**
    ```json
    {
    "title": "Backend Engineer",
    "company": "Google",
    "location": "Remote",
    "category": "Engineering",
    "description": "Develop backend systems"
    }
    ```
- **Delete Job**: `DELETE /api/jobs/:id`
### Applications
- **Submit job application**: `POST /api/applications`
  - **Request Body:**
    ```json
    {
     "name": "John Doe",
    "email": "john@example.com",
    "resumeUrl": "https://resume-link.com",
    "coverNote": "I am interested in this role",
    "jobId": 1
    }
    ```
  ## Notes
- Frontend requirements are fully implemented.

- Backend APIs are fully functional and tested using Postman.

- Frontend currently uses mock data but can easily integrate with backend APIs.
## Author
**Tabassum**\
Full Stack Developer \| CSE Graduate
