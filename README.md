# 🤖 AI Resume Analysis & Job Preparation

### A Full Stack GenAI Web Application for Resume Analysis, Job Matching & Interview Preparation

An AI-powered full-stack web application that helps job seekers analyze their resumes against job descriptions, identify skill gaps, prepare for interviews, and generate personalized job preparation plans using **Google Gemini AI**.

---

# 📖 About

**AI Resume Analysis & Job Preparation** is a full-stack web application developed to help students and job seekers prepare more effectively for job opportunities.

The application uses **Google Gemini AI** to analyze a user's resume, self-description, and target job description to generate a personalized interview preparation report.

The platform focuses on:

* 📄 **Resume Analysis** – Analyze resume content and evaluate its relevance to a target job.
* 🎯 **Job Matching** – Generate an AI-based match score between the resume and job description.
* 🧩 **Skill Gap Detection** – Identify missing or weak skills required for the target role.
* 💻 **Technical Interview Preparation** – Generate role-specific technical interview questions with suggested answers.
* 🗣️ **Behavioral Interview Preparation** – Generate behavioral questions and sample answers.
* 📅 **Preparation Plan** – Generate a structured day-wise preparation plan.
* 📑 **ATS-Friendly Resume Generation** – Generate an optimized resume based on the analyzed information.

The project was **designed and developed independently as a solo project**.

---

# ✨ Features

### 👤 User Module

* User Registration & Login
* Secure JWT Authentication
* Protected Routes
* Resume Upload
* Self-Description Input
* Job Description Input
* Personalized Job Preparation
* View Generated Reports
* Resume Analysis

---

### 🤖 AI Resume Analysis

* AI-powered resume analysis using Google Gemini
* Resume and job description comparison
* AI-generated ATS Match Score
* Resume Strength Analysis
* Identification of relevant skills
* Identification of missing skills
* Skill gap severity classification
* Personalized recommendations

---

### 💼 Job Preparation

The application generates a personalized preparation report containing:

#### 💻 Technical Interview Questions

* Role-specific technical questions
* Interviewer intention
* Suggested answers
* Questions based on detected skill gaps

#### 🗣️ Behavioral Interview Questions

* Common behavioral interview questions
* Interviewer intention
* Suggested answers
* Personalized preparation guidance

#### 🧩 Skill Gap Analysis

Skills are categorized based on their importance and current relevance to the target job.

* High Priority
* Medium Priority
* Low Priority

#### 📅 Preparation Plan

Generates a structured preparation roadmap including:

* Day-wise topics
* Technical preparation
* Skill improvement areas
* Interview preparation
* Recommended focus areas

---

### 📄 Resume Generation

* Generate an ATS-optimized resume
* Generate resume content based on job requirements
* Resume formatting using automated document generation
* PDF processing and generation support

---

# 🛠️ Tech Stack

| Frontend     | Backend       | Database      | AI & Tools       |
| ------------ | ------------- | ------------- | ---------------- |
| React.js     | Node.js       | MongoDB       | Google Gemini AI |
| Vite         | Express.js    | Mongoose      | Google GenAI SDK |
| Tailwind CSS | JWT           | MongoDB Atlas | PDF Parse        |
| React Router | Bcrypt.js     |               | Puppeteer        |
| Axios        | Multer        |               | Zod              |
| Lucide React | Cookie Parser |               | Git              |
|              | CORS          |               | GitHub           |
|              | Dotenv        |               | Postman          |

---

# 🧠 AI Technology

The project uses **Google Gemini** through the official Google GenAI SDK.

AI is used to:

1. Analyze the uploaded resume.
2. Understand the user's self-description.
3. Analyze the target job description.
4. Compare the candidate's skills with job requirements.
5. Generate an ATS-style match score.
6. Identify skill gaps.
7. Generate technical interview questions.
8. Generate behavioral interview questions.
9. Provide suggested answers.
10. Generate a personalized preparation plan.

Structured AI responses are validated using **Zod** to maintain a consistent data format.

---

# 📂 Folder Structure

```text
AI-Resume-Analysis-and-Job-Preparation
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   ├── uploads
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> Folder names may vary slightly depending on the current project structure.

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

```bash
cd AI-Resume-Analysis-and-Job-Preparation
```
---

## 2. Install Backend Dependencies

```bash
cd Backend
npm install
```
---

## 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```
---

# 🔑 Environment Variables

Create a `.env` file inside the **Backend** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

> Never commit your `.env` file or API keys to GitHub.

---

# ▶️ Running the Application

## Start Backend

Navigate to the backend folder:

```bash
cd Backend
```

Run the development server:

```bash
npm run dev
```

The backend will start using **Nodemon**.

---

## Start Frontend

Open another terminal:

```bash
cd Frontend
```

Run:

```bash
npm run dev
```

The frontend will be available through the Vite development server.

---

# 🔄 Application Workflow

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Upload Resume     │
                    │ + Self Description   │
                    │ + Job Description    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Node / Express   │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Extract Resume    │
                    │      Content        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Google Gemini    │
                    │         AI          │
                    └──────────┬──────────┘
                               │
                               ▼
             ┌──────────────────────────────────┐
             │        AI Generated Report       │
             │                                  │
             │  • ATS Match Score               │
             │  • Resume Strengths              │
             │  • Skill Gaps                    │
             │  • Technical Questions           │
             │  • Behavioral Questions          │
             │  • Suggested Answers             │
             │  • Preparation Plan              │
             └────────────────┬─────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   Report Dashboard  │
                    └─────────────────────┘
```

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose** for data management.

The database is used to store application data such as:

* User information
* Authentication-related data
* Generated interview reports
* Resume analysis results
* Technical interview questions
* Behavioral interview questions
* Skill gaps
* Preparation plans

---

# 🔐 Authentication & Security

The application includes:

* JWT-based authentication
* HTTP cookies for authentication
* Password hashing using Bcrypt.js
* Protected backend routes
* CORS configuration
* Environment variables for sensitive credentials
* Input validation using Zod

---

# 📄 Resume Processing

The application supports PDF resume processing.

The backend uses:

* **Multer** for file uploads
* **pdf-parse** for extracting resume text
* **Google Gemini AI** for analyzing extracted resume content
* **Puppeteer** for automated document/PDF generation

---

# 📱 User Experience

The frontend is built with React and Tailwind CSS with a focus on:

* Clean and modern UI
* Responsive design
* Interactive report dashboard
* Easy resume upload
* Clear AI-generated insights
* Skill gap visualization
* Interview preparation sections
* Structured preparation plan

---

# 🚀 Current Status

The project is currently under active development.

### Currently Implemented

* ✅ User Authentication
* ✅ Resume Upload
* ✅ Resume Text Extraction
* ✅ Job Description Analysis
* ✅ AI Resume Analysis
* ✅ ATS Match Score
* ✅ Resume Strengths
* ✅ Skill Gap Analysis
* ✅ Technical Interview Questions
* ✅ Behavioral Interview Questions
* ✅ Suggested Answers
* ✅ Day-wise Preparation Plan
* ✅ AI-generated Resume Content
* ✅ Responsive React Frontend

### Planned Improvements

* 🔄 More advanced ATS analysis
* 🔄 Multiple resume templates
* 🔄 Resume editing before download
* 🔄 Job-specific resume customization
* 🔄 More detailed skill recommendations
* 🔄 Interview simulation / mock interview
* 🔄 AI-powered interview feedback
* 🔄 Job application tracking
* 🔄 Saved job preparation history
* 🔄 LinkedIn profile optimization
* 🔄 Additional AI-powered career features

---

# 🌐 Live Demo

**Live Demo: Coming Soon**

The project does not currently have a live production demo.

---

# 📌 Future Improvements

Some features planned for future versions include:

* 🎤 AI Mock Interview
* 🗣️ Voice-based Interview Practice
* 📊 Advanced Resume Analytics
* 🎯 Job Recommendation System
* 💼 Job Application Tracker
* 🔗 LinkedIn Profile Analysis
* 📄 Multiple ATS Resume Templates
* ✍️ AI Resume Editor
* 📈 Career Progress Dashboard
* 🤖 More personalized AI career recommendations

---

# 🤝 Contributing

This project is currently developed and maintained as a **solo project**.

Suggestions and feedback are welcome as the project continues to evolve.

If you would like to experiment with the project:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Diya Shah**

🎓 MSc Information Technology
🎓 B.Sc. Information Technology

💻 Full Stack Developer | MERN Stack | Exploring Generative AI

🔗 GitHub: https://github.com/deeyaShah
