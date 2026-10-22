# ExamPro – Examination Management System
**Data Alcott Systems Web Development Internship Task – WD-COL-003**

![ExamPro Academic Dashboard Banner](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80)

---

## 1. Project Overview & Objective

**ExamPro** is a modern, responsive, institutional Examination Management System designed for universities, colleges, and educational boards. Built as a pure frontend solution using **HTML5, CSS3, and Vanilla JavaScript**, it provides an end-to-end workflow for:
- Scheduling academic examinations across departments.
- Managing accredited curriculum subjects and credit allocations.
- Generating and printing authenticated student **Hall Tickets / Admit Cards**.
- Conducting **simulated timed online examinations** with live countdowns, question navigation palettes, and instant automated objective grading.
- Evaluating answer sheets with descriptive scoring, faculty remarks, and score reconciliation.
- Processing final results, enforcing subject-level passing rubrics, computing letter grades, and managing public publication status.
- Generating official, printable **Student Marksheets and Grade Cards** complete with institutional seals and signatures.
- Analyzing performance through institutional analytics, pass/fail metrics, and exportable reports.

> **Internship Assignment:** Data Alcott Systems Web Development Task ID: `WD-COL-003`  
> **Deployment Architecture:** Client-side Single Page Application (SPA) with browser `LocalStorage` persistence. Zero external backend dependencies.

---

## 2. Core Features & Functional Modules

### A. Executive Dashboard
- **Dynamic KPI Cards:** Calculates live statistics directly from application data: *Total Exams*, *Upcoming Exams*, *Completed Exams*, *Enrolled Students*, *Results Published*, and *Results Pending*.
- **Visual Analytics:** Interactive **Chart.js** Doughnut chart for exam status distribution and Bar chart for subject-wise average marks (with graceful HTML5 bar fallbacks if offline).
- **Upcoming Examination Schedule:** Table of upcoming sessions with date, time, venue, and status badges.
- **Recent Publications:** List of published academic results with percentages and grades.
- **Rapid Operational Actions:** Instant 1-click shortcuts to schedule exams, add subjects, issue hall tickets, and process results.

### B. Examination Scheduling (Full CRUD)
- **Schedule Examinations:** Create sessions with Exam ID (unique validation), Exam Name, Subject Code, Exam Type (Mid-Term, Final, Practical, Online, Quiz), Date, Start Time, End Time, Duration, Maximum Marks, Passing Marks, Venue, and Lifecycle Status.
- **Interactive Multi-Filtering:** Filter by search keyword, Exam Type, Subject, and Status.
- **Inspection & Editing:** Modal view of complete timetable and venue details.
- **Delete Protection:** Confirmation modal to prevent accidental deletion.
- **Export to CSV:** Client-side native CSV export of scheduled exam timetables.

### C. Curriculum & Subject Management
- **Course Catalog:** Manage course codes (`CS-301`, `CS-302`, etc.), titles, departments, semesters, assigned faculty, credits, maximum marks, passing marks, and syllabus overviews.
- **Relational Integrity Warning:** When attempting to delete a subject linked to active exams, a protective warning notifies the administrator.
- **Departmental & Semester Filtering:** Instant lookup by department or semester.
- **Export to CSV:** Instant download of curriculum courses.

### D. Hall Ticket & Admit Card Generation
- **Official Academic Pass:** Formats an authentic admission ticket with institution emblem, barcode lines, hall ticket serial number, student photograph placeholder, timetable, venue allocation, and candidate/invigilator signature areas.
- **Print Optimization (`@media print`):** Strips all dashboard navigation, top bars, and buttons, formatting an A4 document ready for printing or saving to PDF.
- **Direct PDF Export:** Generates clean PDFs via client-side `jsPDF` library.

### E. Simulated Online Examination Portal
- **Candidate Lobby:** Review examination guidelines and require candidate confirmation before starting the countdown.
- **Live Countdown Timer:** Configured for demo duration (15:00) with visual danger warnings when under 2 minutes. Automatic submission occurs when the clock hits zero.
- **Interactive Question Arena:** Displays one multiple-choice question at a time with 4 options and automatic response saving.
- **Question Palette:** 10-question grid showing color-coded states: *Answered (Green)*, *Flagged for Review (Amber)*, and *Unanswered (Gray)*.
- **Automated Objective Grading:** Evaluates responses immediately against the answer key, calculating percentage, grade, pass/fail status, and a full explanation breakdown.
- **Session Persistence:** Saves the completed attempt to LocalStorage under Answer Sheets and Results.

### F. Answer Sheet Management & Faculty Evaluation
- **Submitted Attempts Roster:** Displays candidate name, exam, submission timestamp, auto score, descriptive score, and evaluation status.
- **Evaluation Modal:** Allows faculty to review objective answers and manually award descriptive scores (0–10 marks) with evaluator feedback remarks.
- **Dynamic Synchronization:** Updating descriptive marks recalculates the candidate's total exam score and updates the central Result Processing ledger.

### G. Academic Result Processing
- **Grading Scale Logic:**
  - `90% – 100%`: **A+** (Distinction)
  - `80% – 89%`: **A** (Excellent)
  - `70% – 79%`: **B+** (Very Good)
  - `60% – 69%`: **B** (Good)
  - `50% – 59%`: **C** (Average)
  - `40% – 49%`: **D** (Pass)
  - `< 40%`: **F** (Fail)
- **Subject-Level Passing Rule:** A candidate must score $\ge$ the passing mark in *every* enrolled subject to achieve an overall **PASS**.
- **Publication Control:** Toggle individual results between *Published* and *Pending*, or use the *Publish All Results* action.
- **Institutional Merit List:** Automatic rank computation with tie handling.

### H. Official Student Marksheet & Grade Transcript
- **Autonomous Institution Header:** Institutional crest, autonomous accreditation markers, transcript serial number, and academic session.
- **Tabular Grade Breakdown:** Subject Code, Course Title, Credits, Max Marks, Pass Marks, Marks Obtained, Letter Grade, and Subject Pass/Fail Status.
- **Grand Totals & Honors:** Cumulative percentage, 10-point GPA, overall merit rank, and classification honors (*First Class with Distinction*).
- **Student Privacy Protection:** Students cannot access unpublished marksheets; a "Pending Publication" moderation notice is displayed until faculty publish the results.
- **Print & PDF Support:** Print-ready formatting for academic transcripts.

### I. Institutional Reports & Analytics
- **6 Report Profiles:**
  1. Examination Schedule Timetable
  2. Student Result & Grade Summary
  3. Subject-wise Performance & Pass Rates
  4. Pass / Fail Demographic Analysis
  5. Institutional Merit List & Honors
  6. Examination Cycle Completion Status
- **Dynamic Visuals:** Chart.js visualizations for grade distribution and subject weightages.
- **Export Capabilities:** Export filtered report views to CSV or print.

### J. Authentication & Role-Based Access Control (RBAC)
- **3 Demo Personas:**
  - **Administrator:** Full administrative control over all 9 modules.
  - **Teacher / Faculty:** Access to Assigned Exams, Subjects, Answer Sheets, Result Processing, and Reports.
  - **Student:** Access to Dashboard, Exam Schedule, Hall Tickets, Simulated Online Exam, and Published Marksheets.
- **Demo Switcher:** Quick 1-click role switcher in the sidebar and top navigation profile menu.
- **LocalStorage Session:** User authentication and preferences persist across browser reloads.

---

## 3. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Structure** | HTML5 | Semantic elements (`<aside>`, `<header>`, `<main>`, `<section>`, `<nav>`, `<table>`) |
| **Styling** | CSS3 | CSS Custom Properties, Flexbox, Grid, `@media print`, Dark/Light Mode |
| **Logic** | Vanilla JavaScript | ES6+ Classes, Modules, Event delegation, Arrays/Objects data layer |
| **Persistence** | Browser `localStorage` | Independent JSON storage with automatic seeding and reset capability |
| **Charts** | Chart.js (CDN) | Doughnut & Bar charts with responsive resizing and pure HTML/CSS fallbacks |
| **PDF Export** | jsPDF (CDN) | Client-side vectorized document generator with native browser print fallbacks |
| **Data Export** | Native CSV Generator | Client-side URI blob download without external dependencies |
| **Typography** | Google Fonts | `Plus Jakarta Sans` (UI interface) and `JetBrains Mono` (tabular numbers) |

---

## 4. Folder Structure

```
exampro-examination-management/
├── index.html        # Single-page application HTML structure & accessible modals
├── style.css         # Complete CSS styling, theme variables & print stylesheet
├── script.js         # Vanilla JavaScript engine, state store & module controllers
├── README.md         # Full project documentation, setup & deployment guide
├── metadata.json     # Application metadata and capabilities
├── package.json      # Development scripts and project configuration
└── tsconfig.json     # TypeScript configuration
```

---

## 5. Local Setup Instructions (VS Code)

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
- Visual Studio Code installed on your computer.

### Step-by-Step Execution:
1. **Clone or Download** the project repository to your local computer:
   ```bash
   git clone https://github.com/your-username/exampro-exam-management.git
   cd exampro-exam-management
   ```
2. **Open in VS Code:**
   - Launch Visual Studio Code.
   - Go to **File -> Open Folder...** and select the project folder.
3. **Run with VS Code Live Server:**
   - Install the **Live Server** extension by *Ritwick Dey* from the VS Code Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Right-click on `index.html` in the file explorer.
   - Select **"Open with Live Server"** (or click **Go Live** in the bottom status bar).
   - Your default browser will launch at `http://127.0.0.1:5500/index.html`.
4. **Direct Browser Execution (No Server Required):**
   - You can also double-click `index.html` directly to open it in any browser (`file:///.../index.html`). All core features and LocalStorage will work seamlessly.

---

## 6. Demo Login Credentials

You can use the 1-click demo login buttons in the Sign In modal or enter the credentials below:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@exampro.demo` | `Admin123!` | Complete access to all 9 modules, settings, and publications. |
| **Teacher / Faculty** | `teacher@exampro.demo` | `Teacher123!` | Exam scheduling, subjects, answer sheet evaluation, result processing, and reports. |
| **Student** | `student@exampro.demo` | `Student123!` | Personal schedule, hall ticket pass, online simulated testing, and published marksheet. |

> **Note on Security:** This client-side demonstration stores credentials in LocalStorage for testing purposes. It is not intended for production institutional authentication without a secured backend and hashed credentials.

---

## 7. Data Storage & LocalStorage Architecture

ExamPro uses seven dedicated LocalStorage keys to maintain state:
- `exampro_current_user`: Active authenticated session and assigned role.
- `exampro_theme`: UI appearance setting (`light` or `dark`).
- `exampro_subjects`: Array of curriculum course modules.
- `exampro_exams`: Array of scheduled examination sessions.
- `exampro_students`: Registered student directory with photos and details.
- `exampro_questions`: Active question bank for online simulations.
- `exampro_answer_sheets`: Submitted examination attempts and descriptive evaluations.
- `exampro_results`: Academic grade records with pass/fail determinations.

### Reset Demo Data
If you modify or delete records during testing and wish to restore the original clean institutional datasets, click the **"Reset Demo Data"** button located at the bottom of the left sidebar.

---

## 8. Deployment Guides

### A. GitHub Pages Deployment
1. Initialize Git and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Initial release of ExamPro Examination Management System"
   ```
2. Create a new repository on GitHub named `exampro`.
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/your-username/exampro.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Navigate to **Settings -> Pages**.
   - Under **Build and deployment -> Source**, select **Deploy from a branch**.
   - Select branch `main` and folder `/(root)`, then click **Save**.
5. Your system will be live at `https://your-username.github.io/exampro/` within minutes.

### B. Netlify Deployment
1. Visit [Netlify](https://www.netlify.com/) and sign in.
2. Drag and drop the folder containing `index.html`, `style.css`, and `script.js` directly onto the Netlify drop zone.
3. Your application is instantly deployed with an SSL-secured URL.

### C. Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the project root and accept the default settings.
3. Or import your GitHub repository directly from the [Vercel Dashboard](https://vercel.com/).

---

## 9. Screenshots Checklist for Submission

For the internship assignment report, capture screenshots of the following views:
- [x] **Dashboard:** Overview with KPI cards, Chart.js doughnut & bar charts, and upcoming exams.
- [x] **Exam Scheduling:** Data table showing scheduled sessions, status badges, and the Add Exam modal.
- [x] **Curriculum Subjects:** Subject management table with credit ratings and syllabus modal.
- [x] **Hall Ticket Generation:** Preview of the formatted admission ticket with barcode and signatures.
- [x] **Simulated Online Exam (Active):** Live countdown timer, multiple-choice question, and question palette.
- [x] **Exam Result Summary:** Auto-evaluated score card with percentage and question explanation breakdown.
- [x] **Answer Sheet Evaluation:** Faculty evaluation interface awarding descriptive marks and remarks.
- [x] **Result Processing:** Master marks table showing grades and publish/unpublish toggles.
- [x] **Student Marksheet:** Official academic transcript with gold/red seal and graduation classification.
- [x] **Reports & Analytics:** Filtered reports with Chart.js analytics and CSV export.
- [x] **Dark Mode View:** UI displayed in high-contrast dark theme.
- [x] **Mobile Responsiveness:** Sidebar collapsed into hamburger navigation on a mobile viewport.

---

## 10. Known Limitations & Technical Notes

1. **Client-Side Storage Scope:** `localStorage` is scoped to the specific browser and machine. Data entered on one device does not automatically sync to other devices.
2. **Simulated Security:** The examination interface is a client-side simulation. In a real-world high-stakes environment, question delivery, timing enforcement, and anti-cheating proctoring would be executed on a secured backend server.
3. **Browser Print Margins:** For optimal Hall Ticket and Marksheet printing, ensure that **"Background graphics"** is enabled in your browser print settings.

---

## 11. Learning Outcomes & Engineering Competencies

Through the completion of **WD-COL-003**, the following engineering competencies were demonstrated:
- **Architectural UI/UX Design:** Engineered a cohesive, accessible educational SaaS interface following strict color balance (`#DC2626` primary), typography pairing, and zero-pill metadata discipline.
- **State Management without Frameworks:** Implemented a reactive, centralized data-store using Vanilla JavaScript, coordinating CRUD operations across multiple related entities (Exams, Subjects, Students, Results).
- **Print Stylesheet Engineering:** Crafted precise `@media print` CSS rules allowing web views to transform into official, paper-ready institutional documents.
- **Client-Side Data Synthesis:** Designed automated grading algorithms, grade band mappings, merit rank calculations, and native CSV export routines.

---

*Project developed for Data Alcott Systems Web Development Internship Task WD-COL-003.*
