Quiz Builder
Full-stack quiz builder application built with Next.js on the frontend and Node.js + TypeScript on the backend.

Tech Stack
Backend
Node.js (Express)
TypeScript
Prisma ORM
SQLite
Frontend
React
TypeScript
Next.js (App Router)
Code Quality
ESLint
Prettier
Features
Create quizzes with multiple question types
Boolean questions (True / False)
Input questions (short text answer)
Checkbox questions (multiple correct answers)
View all quizzes
View quiz details
Delete quizzes
API Endpoints
POST /quizzes — create a new quiz
GET /quizzes — get all quizzes with title and number of questions
GET /quizzes/:id — get full quiz details
DELETE /quizzes/:id — delete a quiz
Frontend Pages
/create — create quiz form
/quizzes — quiz list
/quizzes/:id — quiz details (read-only)
Project Structure
quiz-builder/
├── backend/
├── frontend/
└── README.md
Getting Started
1. Clone the Repository
git clone <your-repo-link>
cd quiz-builder
2. Backend Setup
cd backend
npm install
Create .env in backend/:

PORT=4000
DATABASE_URL="file:./dev.db"
FRONTEND_URL="http://localhost:3000"
Initialize the database:

npx prisma generate
npx prisma migrate dev --name init
Run the backend:

npm run dev
Backend runs on http://localhost:4000

3. Frontend Setup
cd frontend
npm install
Create .env.local in frontend/:

NEXT_PUBLIC_API_URL=http://localhost:4000
Run the frontend:

npm run dev
Frontend runs on http://localhost:3000

Lint and Format
Backend
npm run lint
npm run format
Frontend
npm run lint
npm run format
Notes
.env files are not committed to the repository
SQLite is used for simple local setup
