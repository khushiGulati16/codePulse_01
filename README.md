# CodePulse - Collaborative Coding Platform

This project is built to align with the **CE-01 Syllabus** requirements while delivering a fully functional coding platform (LeetCode clone) engineered by a team of 4 members.

---

## 📚 CE-01 Syllabus Alignment (Viva Preparation)

Your course plan (CE-01) requires specific technologies. Here is how CodePulse maps to your syllabus so you can justify it to your examiner:

1. **Starting with NodeJS (Lecture 1-10):** The entire backend is built on **Node.js** and **Express.js**, serving APIs and handling logic.
2. **Advanced Git (Lecture 11-17):** The project follows a strict collaborative branching model with version control.
3. **SQL Database - MySQL (Lecture 18-21):** We use **MySQL** as our primary relational database to store Users, Problems, and Submissions securely.
4. **Learn ORM - Sequelize (Lecture 22-25):** The database logic is fully migrated to **Sequelize ORM** for secure and scalable data modeling.
5. **Sockets (Lecture 26-30):** **WebSockets (Socket.io)** are integrated to provide a real-time terminal experience (live execution logs) and global "Problem Solved" notifications.
6. **GraphQL (Lecture 36-40):** *(Future Scope: Fetching submission history could be migrated to GraphQL to avoid redundant data fetching.)*

---

## 👨‍💻 Team Breakdown & Feature Explanations (Kaam Divide Karo)

*Here is what each person needs to say in the Viva about their specific feature:*

### Person 1: Authentication & Security
**Branch:** `feature/auth-login`  
**What is happening here? (Viva Explanation):**
- **Feature:** Login, Register, and JWT Security.
- **How it works:** When a user registers, their password is encrypted using `bcryptjs` before saving to **MySQL**.
- **Viva Key Point:** "I created a custom Node.js middleware that verifies the Bearer token's integrity. Users cannot submit code or access protected data without a valid session."

### Person 2: Problems & Listing (Contributor)
**Branch:** `feature/problems`  
**What is happening here? (Viva Explanation):**
- **Feature:** Problem list dashboard and details page.
- **How it works:** I built the REST APIs to fetch coding problems from our MySQL database using Sequelize models.
- **Viva Key Point:** "I structured the `problems` table schema and designed the React frontend components to display problems formatted with difficulty levels (Easy, Medium, Hard)."

### Person 3: Execution Engine & Admin Hub (Lead Developer)
**Branch:** `feature/code-engine-admin`  
**What is happening here? (Viva Explanation):**
- **Feature:** Code execution sandbox, Socket.io logs, and Admin Management Panel.
- **How it works:** I designed the **Core Logic**. When code is submitted, my backend creates a temporary sandbox to compile (g++/java) and run the code.
- **Viva Key Point:** "Mera focus **System Architecture** par tha. Maine `child_process` se secure code execution engine banaya, `Socket.io` se real-time execution logs integrate kiye, aur **Admin Dashboard** design kiya jisse problems ko CRUD (Manage) kiya ja sake aur user stats dekhe ja sakein."

### Person 4: Submissions & Data Analysis
**Branch:** `feature/submissions`  
**What is happening here? (Viva Explanation):**
- **Feature:** Submission tracking and performance analysis.
- **How it works:** Once execution is complete, I compare the output against expected testcases to assign a status like `Accepted` or `Wrong Answer`.
- **Viva Key Point:** "I managed the relational data aspect. I use Sequelize associations to link `Users`, `Problems`, and `Submissions`, allowing us to track complete user history and global solve rates."

---

## 🚀 How to Run the Project
1. Configure `.env` with your MySQL credentials.
2. **Backend**: `cd backend && npm install && npm run dev`
3. **Frontend**: `cd frontend && npm install && npm run dev`
4. **Seeding**: Use `node seed.js` for users and `node extended_seed.js` for problems.
