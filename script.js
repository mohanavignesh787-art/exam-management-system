/**
 * ExamPro – Examination Management System
 * Data Alcott Systems Web Development Task – WD-COL-003
 * Frontend-only application using HTML5, CSS3, Vanilla JavaScript, and LocalStorage.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Initial Default Seed Data
  // ---------------------------------------------------------------------------
  const DEFAULT_USERS = {
    admin: {
      id: 'USR-001',
      name: 'Dr. Sarah Jenkins',
      email: 'admin@exampro.demo',
      role: 'admin',
      dept: 'Academic Affairs',
      avatar: 'SJ'
    },
    teacher: {
      id: 'USR-002',
      name: 'Prof. Marcus Thorne',
      email: 'teacher@exampro.demo',
      role: 'teacher',
      dept: 'Computer Science',
      avatar: 'MT'
    },
    student: {
      id: 'USR-003',
      name: 'Alex Vance',
      email: 'student@exampro.demo',
      role: 'student',
      studentId: 'STU-2024-001',
      dept: 'Computer Science',
      sem: '6',
      avatar: 'AV'
    }
  };

  const DEFAULT_STUDENTS = [
    { id: 'STU-2024-001', name: 'Alex Vance', email: 'alex.vance@student.edu', dept: 'Computer Science', sem: '6', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-002', name: 'Sophia Chen', email: 'sophia.c@student.edu', dept: 'Computer Science', sem: '6', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-003', name: 'Rahul Sharma', email: 'rahul.s@student.edu', dept: 'Information Technology', sem: '6', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-004', name: 'Emily Watson', email: 'emily.w@student.edu', dept: 'Electronics', sem: '4', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-005', name: 'David Kim', email: 'david.k@student.edu', dept: 'Mechanical', sem: '4', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-006', name: 'Aaliyah Khan', email: 'aaliyah.k@student.edu', dept: 'Computer Science', sem: '6', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-007', name: 'Liam O’Connor', email: 'liam.o@student.edu', dept: 'Information Technology', sem: '6', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-008', name: 'Zara Patel', email: 'zara.p@student.edu', dept: 'Electronics', sem: '4', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-009', name: 'Carlos Mendez', email: 'carlos.m@student.edu', dept: 'Mechanical', sem: '4', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { id: 'STU-2024-010', name: 'Maya Lin', email: 'maya.l@student.edu', dept: 'Computer Science', sem: '8', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' }
  ];

  const DEFAULT_SUBJECTS = [
    {
      code: 'CS-301',
      name: 'Advanced Algorithms & Complexity',
      dept: 'Computer Science',
      sem: '6',
      teacher: 'Prof. Marcus Thorne',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'Dynamic programming, greedy strategies, graph algorithms, NP-completeness, network flow, and amortized runtime complexity analysis.'
    },
    {
      code: 'CS-302',
      name: 'Database Management Systems',
      dept: 'Computer Science',
      sem: '6',
      teacher: 'Dr. Robert Chen',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'Relational calculus, SQL tuning, indexing (B+ trees), ACID properties, concurrency control, and distributed storage engines.'
    },
    {
      code: 'CS-303',
      name: 'Web Technologies & Frameworks',
      dept: 'Computer Science',
      sem: '6',
      teacher: 'Prof. Sarah Vance',
      credits: 3,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'DOM architectures, asynchronous JavaScript, REST APIs, client-side caching, responsive CSS systems, and frontend security best practices.'
    },
    {
      code: 'CS-304',
      name: 'Computer Networks & Protocols',
      dept: 'Computer Science',
      sem: '6',
      teacher: 'Prof. Marcus Thorne',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'OSI 7-layer hierarchy, TCP/IP flow control, congestion mitigation, subnetting, routing protocols (OSPF, BGP), and TLS handshakes.'
    },
    {
      code: 'EC-201',
      name: 'Digital Signal Processing',
      dept: 'Electronics',
      sem: '4',
      teacher: 'Dr. Anita Roy',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'Discrete Fourier transforms, FFT algorithms, digital FIR and IIR filter synthesis, state-space representations, and spectrum analyzers.'
    },
    {
      code: 'IT-305',
      name: 'Cloud Computing & DevOps',
      dept: 'Information Technology',
      sem: '6',
      teacher: 'Prof. Kevin Patel',
      credits: 3,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'Virtualization, microservices container orchestration, CI/CD pipelines, cloud storage primitives, and horizontal autoscaling.'
    },
    {
      code: 'AI-401',
      name: 'Artificial Intelligence & Machine Learning',
      dept: 'Computer Science',
      sem: '8',
      teacher: 'Dr. Elena Rostova',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'Supervised regression, neural networks, backpropagation, decision trees, clustering algorithms, and model validation techniques.'
    },
    {
      code: 'ME-204',
      name: 'Thermodynamics & Fluid Mechanics',
      dept: 'Mechanical',
      sem: '4',
      teacher: 'Prof. David Miller',
      credits: 4,
      maxMarks: 100,
      passMarks: 40,
      syllabus: 'First and second laws of thermodynamics, Carnot cycles, entropy, Navier-Stokes approximations, boundary layers, and laminar flow.'
    }
  ];

  const DEFAULT_EXAMS = [
    {
      id: 'EXM-2026-001',
      name: 'End-Semester Final Examination',
      subjectCode: 'CS-301',
      type: 'Final Examination',
      date: '2026-11-05',
      startTime: '09:30',
      endTime: '12:30',
      duration: 180,
      maxMarks: 100,
      passMarks: 40,
      venue: 'Hall A-102 (Desk: CS-42)',
      status: 'Scheduled'
    },
    {
      id: 'EXM-2026-002',
      name: 'Mid-Term Assessment Test',
      subjectCode: 'CS-302',
      type: 'Mid-Term Examination',
      date: '2026-10-28',
      startTime: '10:00',
      endTime: '11:30',
      duration: 90,
      maxMarks: 50,
      passMarks: 20,
      venue: 'Hall B-204',
      status: 'Scheduled'
    },
    {
      id: 'EXM-2026-003',
      name: 'Online MCQ Assessment',
      subjectCode: 'CS-303',
      type: 'Online Examination',
      date: '2026-10-24',
      startTime: '14:00',
      endTime: '14:30',
      duration: 30,
      maxMarks: 20,
      passMarks: 8,
      venue: 'Virtual Test Center (Portal)',
      status: 'Scheduled'
    },
    {
      id: 'EXM-2026-004',
      name: 'Practical Networks Laboratory Examination',
      subjectCode: 'CS-304',
      type: 'Practical Examination',
      date: '2026-11-10',
      startTime: '09:00',
      endTime: '12:00',
      duration: 180,
      maxMarks: 50,
      passMarks: 20,
      venue: 'Systems Lab 2 (Workstation B)',
      status: 'Scheduled'
    },
    {
      id: 'EXM-2026-005',
      name: 'Continuous Assessment Quiz 1',
      subjectCode: 'IT-305',
      type: 'Quiz/Test',
      date: '2026-10-18',
      startTime: '11:00',
      endTime: '11:45',
      duration: 45,
      maxMarks: 25,
      passMarks: 10,
      venue: 'Seminar Hall 3',
      status: 'Completed'
    },
    {
      id: 'EXM-2026-006',
      name: 'Digital Signal Processing Mid-Term',
      subjectCode: 'EC-201',
      type: 'Mid-Term Examination',
      date: '2026-10-15',
      startTime: '09:30',
      endTime: '11:00',
      duration: 90,
      maxMarks: 50,
      passMarks: 20,
      venue: 'Hall C-101',
      status: 'Results Pending'
    },
    {
      id: 'EXM-2026-007',
      name: 'Autonomous Systems & ML Assessment',
      subjectCode: 'AI-401',
      type: 'Final Examination',
      date: '2026-10-10',
      startTime: '14:00',
      endTime: '17:00',
      duration: 180,
      maxMarks: 100,
      passMarks: 40,
      venue: 'Auditorium 1',
      status: 'Completed'
    },
    {
      id: 'EXM-2026-008',
      name: 'Thermodynamics Workshop Practicals',
      subjectCode: 'ME-204',
      type: 'Practical Examination',
      date: '2026-10-22',
      startTime: '10:00',
      endTime: '13:00',
      duration: 180,
      maxMarks: 50,
      passMarks: 20,
      venue: 'Mechanical Workshop Bay 4',
      status: 'In Progress'
    }
  ];

  const ONLINE_QUESTIONS = [
    {
      id: 'Q-01',
      subjectCode: 'CS-303',
      prompt: 'Which HTTP status code is officially returned by a RESTful server when a new resource has been successfully created?',
      options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
      correctIndex: 1,
      marks: 2,
      explanation: 'HTTP 201 Created indicates that the request has succeeded and led to the creation of a new resource.'
    },
    {
      id: 'Q-02',
      subjectCode: 'CS-303',
      prompt: 'In modern browser JavaScript engines, which mechanism prevents the main execution thread from blocking on asynchronous I/O tasks?',
      options: ['Call Stack Truncation', 'Event Loop & Task Queue', 'Synchronous Thread Pool', 'Web Worker Serialization'],
      correctIndex: 1,
      marks: 2,
      explanation: 'The Event Loop constantly monitors the Call Stack and moves tasks from the callback/microtask queue when the stack clears.'
    },
    {
      id: 'Q-03',
      subjectCode: 'CS-303',
      prompt: 'Which CSS layout module provides two-dimensional layout control handling both rows and columns simultaneously?',
      options: ['CSS Flexible Box (Flexbox)', 'CSS Multi-column Layout', 'CSS Grid Layout', 'CSS Table Model'],
      correctIndex: 2,
      marks: 2,
      explanation: 'CSS Grid is designed for two-dimensional layouts, whereas Flexbox is primarily one-dimensional.'
    },
    {
      id: 'Q-04',
      subjectCode: 'CS-303',
      prompt: 'What is the primary role of the HTTP `Content-Security-Policy` (CSP) response header in web security?',
      options: ['Encrypts request payload with AES-256', 'Mitigates Cross-Site Scripting (XSS) and data injection', 'Forces TLS 1.3 protocol negotiation', 'Prevents DNS rebinding attacks'],
      correctIndex: 1,
      marks: 2,
      explanation: 'Content-Security-Policy (CSP) restricts resource loading locations, mitigating XSS and script injection attacks.'
    },
    {
      id: 'Q-05',
      subjectCode: 'CS-303',
      prompt: 'Which client-side storage mechanism retains stored data across browser restarts and is scoped per origin with no automatic expiry?',
      options: ['sessionStorage', 'HTTP Cookie without max-age', 'localStorage', 'SharedMemory Buffer'],
      correctIndex: 2,
      marks: 2,
      explanation: 'localStorage persists indefinitely across browser tabs and sessions until explicitly cleared.'
    },
    {
      id: 'Q-06',
      subjectCode: 'CS-303',
      prompt: 'In a normalized relational database (3NF), what does Third Normal Form strictly eliminate?',
      options: ['Repeating groups', 'Partial functional dependencies', 'Transitive functional dependencies', 'Foreign key constraints'],
      correctIndex: 2,
      marks: 2,
      explanation: '3NF requires 2NF plus the elimination of transitive dependencies between non-key attributes.'
    },
    {
      id: 'Q-07',
      subjectCode: 'CS-303',
      prompt: 'What is the worst-case time complexity of finding an item in a balanced Binary Search Tree (such as an AVL or Red-Black Tree) with N nodes?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctIndex: 1,
      marks: 2,
      explanation: 'Balanced BSTs maintain height proportional to log(N), ensuring O(log N) worst-case lookup time.'
    },
    {
      id: 'Q-08',
      subjectCode: 'CS-303',
      prompt: 'In the TCP protocol, how many packet exchanges are required to establish a reliable full-duplex connection?',
      options: ['Two-way Handshake', 'Three-way Handshake (SYN, SYN-ACK, ACK)', 'Four-way Handshake', 'Single Datagram Ping'],
      correctIndex: 1,
      marks: 2,
      explanation: 'TCP uses a 3-way handshake: Client SYN -> Server SYN-ACK -> Client ACK.'
    },
    {
      id: 'Q-09',
      subjectCode: 'CS-303',
      prompt: 'Which semantic HTML5 element must be used to enclose self-contained content with an optional caption?',
      options: ['<article>', '<figure> and <figcaption>', '<section>', '<aside>'],
      correctIndex: 1,
      marks: 2,
      explanation: '<figure> encapsulates diagrams, photos, or code listings, paired with <figcaption>.'
    },
    {
      id: 'Q-10',
      subjectCode: 'CS-303',
      prompt: 'Which algorithm design technique is utilized in Dijkstra’s Shortest Path algorithm on non-negative weighted graphs?',
      options: ['Divide and Conquer', 'Greedy Strategy', 'Backtracking with Pruning', 'Randomized Monte Carlo'],
      correctIndex: 1,
      marks: 2,
      explanation: 'Dijkstras algorithm always greedily selects the vertex with the minimum tentative distance.'
    }
  ];

  const DEFAULT_ANSWER_SHEETS = [
    {
      id: 'AS-2026-001',
      studentId: 'STU-2024-001',
      examId: 'EXM-2026-003',
      submittedAt: '2026-10-22 14:28:15',
      objectiveScore: 18,
      objectiveMax: 20,
      descriptiveScore: 0,
      descriptiveMax: 0,
      totalScore: 18,
      totalMax: 20,
      status: 'Evaluated',
      evaluatorRemarks: 'Exceptional conceptual understanding of REST architecture and data structures.',
      studentAnswers: {
        'Q-01': 1, 'Q-02': 1, 'Q-03': 2, 'Q-04': 1, 'Q-05': 2,
        'Q-06': 2, 'Q-07': 1, 'Q-08': 1, 'Q-09': 1, 'Q-10': 0
      }
    },
    {
      id: 'AS-2026-002',
      studentId: 'STU-2024-002',
      examId: 'EXM-2026-003',
      submittedAt: '2026-10-22 14:25:40',
      objectiveScore: 20,
      objectiveMax: 20,
      descriptiveScore: 0,
      descriptiveMax: 0,
      totalScore: 20,
      totalMax: 20,
      status: 'Evaluated',
      evaluatorRemarks: 'Perfect score. All 10 objective questions answered accurately.',
      studentAnswers: {
        'Q-01': 1, 'Q-02': 1, 'Q-03': 2, 'Q-04': 1, 'Q-05': 2,
        'Q-06': 2, 'Q-07': 1, 'Q-08': 1, 'Q-09': 1, 'Q-10': 1
      }
    },
    {
      id: 'AS-2026-003',
      studentId: 'STU-2024-003',
      examId: 'EXM-2026-005',
      submittedAt: '2026-10-18 11:42:00',
      objectiveScore: 14,
      objectiveMax: 15,
      descriptiveScore: 7,
      descriptiveMax: 10,
      totalScore: 21,
      totalMax: 25,
      status: 'Evaluated',
      evaluatorRemarks: 'Good analytical breakdown of microservices and container networking.',
      descriptiveAnswer: 'Cloud virtualization abstracts underlying compute resources via hypervisors, enabling multi-tenant provisioning, high availability, and isolated VPC networks.',
      studentAnswers: { 'Q-01': 1, 'Q-02': 1, 'Q-03': 2 }
    },
    {
      id: 'AS-2026-004',
      studentId: 'STU-2024-004',
      examId: 'EXM-2026-006',
      submittedAt: '2026-10-15 11:00:00',
      objectiveScore: 16,
      objectiveMax: 20,
      descriptiveScore: 18,
      descriptiveMax: 30,
      totalScore: 34,
      totalMax: 50,
      status: 'Pending Evaluation',
      evaluatorRemarks: 'Awaiting faculty review of Z-transform derivation and IIR filter stability proof.',
      descriptiveAnswer: 'The bilinear transform maps the analog s-plane to the discrete z-plane while warping frequencies, maintaining filter causality and bounded-input stability.',
      studentAnswers: { 'Q-01': 1, 'Q-02': 1 }
    }
  ];

  const DEFAULT_RESULTS = [
    {
      id: 'RES-2026-001',
      studentId: 'STU-2024-001',
      examId: 'EXM-2026-001',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'CS-301', name: 'Advanced Algorithms', credits: 4, max: 100, pass: 40, obtained: 88, grade: 'A', status: 'PASS' },
        { code: 'CS-302', name: 'Database Management Systems', credits: 4, max: 100, pass: 40, obtained: 92, grade: 'A+', status: 'PASS' },
        { code: 'CS-303', name: 'Web Technologies & Frameworks', credits: 3, max: 100, pass: 40, obtained: 84, grade: 'A', status: 'PASS' },
        { code: 'CS-304', name: 'Computer Networks & Protocols', credits: 4, max: 100, pass: 40, obtained: 78, grade: 'B+', status: 'PASS' }
      ],
      totalObtained: 342,
      totalMax: 400,
      totalPass: 160,
      percentage: 85.5,
      grade: 'A',
      overallResult: 'PASS',
      rank: 2,
      published: true,
      publishedDate: '2026-10-20'
    },
    {
      id: 'RES-2026-002',
      studentId: 'STU-2024-002',
      examId: 'EXM-2026-001',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'CS-301', name: 'Advanced Algorithms', credits: 4, max: 100, pass: 40, obtained: 95, grade: 'A+', status: 'PASS' },
        { code: 'CS-302', name: 'Database Management Systems', credits: 4, max: 100, pass: 40, obtained: 96, grade: 'A+', status: 'PASS' },
        { code: 'CS-303', name: 'Web Technologies & Frameworks', credits: 3, max: 100, pass: 40, obtained: 91, grade: 'A+', status: 'PASS' },
        { code: 'CS-304', name: 'Computer Networks & Protocols', credits: 4, max: 100, pass: 40, obtained: 89, grade: 'A', status: 'PASS' }
      ],
      totalObtained: 371,
      totalMax: 400,
      totalPass: 160,
      percentage: 92.75,
      grade: 'A+',
      overallResult: 'PASS',
      rank: 1,
      published: true,
      publishedDate: '2026-10-20'
    },
    {
      id: 'RES-2026-003',
      studentId: 'STU-2024-003',
      examId: 'EXM-2026-005',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'IT-305', name: 'Cloud Computing & DevOps', credits: 3, max: 25, pass: 10, obtained: 21, grade: 'A', status: 'PASS' }
      ],
      totalObtained: 21,
      totalMax: 25,
      totalPass: 10,
      percentage: 84.0,
      grade: 'A',
      overallResult: 'PASS',
      rank: 1,
      published: true,
      publishedDate: '2026-10-19'
    },
    {
      id: 'RES-2026-004',
      studentId: 'STU-2024-004',
      examId: 'EXM-2026-006',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'EC-201', name: 'Digital Signal Processing', credits: 4, max: 50, pass: 20, obtained: 34, grade: 'B', status: 'PASS' }
      ],
      totalObtained: 34,
      totalMax: 50,
      totalPass: 20,
      percentage: 68.0,
      grade: 'B',
      overallResult: 'PASS',
      rank: 1,
      published: false,
      publishedDate: null
    },
    {
      id: 'RES-2026-005',
      studentId: 'STU-2024-005',
      examId: 'EXM-2026-001',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'CS-301', name: 'Advanced Algorithms', credits: 4, max: 100, pass: 40, obtained: 72, grade: 'B+', status: 'PASS' },
        { code: 'CS-302', name: 'Database Management Systems', credits: 4, max: 100, pass: 40, obtained: 65, grade: 'B', status: 'PASS' },
        { code: 'CS-303', name: 'Web Technologies & Frameworks', credits: 3, max: 100, pass: 40, obtained: 74, grade: 'B+', status: 'PASS' },
        { code: 'CS-304', name: 'Computer Networks & Protocols', credits: 4, max: 100, pass: 40, obtained: 61, grade: 'B', status: 'PASS' }
      ],
      totalObtained: 272,
      totalMax: 400,
      totalPass: 160,
      percentage: 68.0,
      grade: 'B',
      overallResult: 'PASS',
      rank: 3,
      published: true,
      publishedDate: '2026-10-20'
    },
    {
      id: 'RES-2026-006',
      studentId: 'STU-2024-006',
      examId: 'EXM-2026-001',
      academicYear: '2025-2026',
      subjectMarks: [
        { code: 'CS-301', name: 'Advanced Algorithms', credits: 4, max: 100, pass: 40, obtained: 34, grade: 'F', status: 'FAIL' },
        { code: 'CS-302', name: 'Database Management Systems', credits: 4, max: 100, pass: 40, obtained: 55, grade: 'C', status: 'PASS' },
        { code: 'CS-303', name: 'Web Technologies & Frameworks', credits: 3, max: 100, pass: 40, obtained: 52, grade: 'C', status: 'PASS' },
        { code: 'CS-304', name: 'Computer Networks & Protocols', credits: 4, max: 100, pass: 40, obtained: 48, grade: 'D', status: 'PASS' }
      ],
      totalObtained: 189,
      totalMax: 400,
      totalPass: 160,
      percentage: 47.25,
      grade: 'F',
      overallResult: 'FAIL',
      rank: 4,
      published: true,
      publishedDate: '2026-10-20'
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. Data Persistence Layer (LocalStorage)
  // ---------------------------------------------------------------------------
  const STORAGE_KEYS = {
    USER: 'exampro_current_user',
    THEME: 'exampro_theme',
    STUDENTS: 'exampro_students',
    SUBJECTS: 'exampro_subjects',
    EXAMS: 'exampro_exams',
    QUESTIONS: 'exampro_questions',
    ANSWERS: 'exampro_answer_sheets',
    RESULTS: 'exampro_results'
  };

  function loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (err) {
      console.warn('LocalStorage read error for ' + key, err);
      return fallback;
    }
  }

  function saveStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('LocalStorage write error for ' + key, err);
    }
  }

  // Application State
  const State = {
    currentUser: loadStorage(STORAGE_KEYS.USER, DEFAULT_USERS.admin),
    theme: loadStorage(STORAGE_KEYS.THEME, 'light'),
    students: loadStorage(STORAGE_KEYS.STUDENTS, DEFAULT_STUDENTS),
    subjects: loadStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS),
    exams: loadStorage(STORAGE_KEYS.EXAMS, DEFAULT_EXAMS),
    questions: loadStorage(STORAGE_KEYS.QUESTIONS, ONLINE_QUESTIONS),
    answerSheets: loadStorage(STORAGE_KEYS.ANSWERS, DEFAULT_ANSWER_SHEETS),
    results: loadStorage(STORAGE_KEYS.RESULTS, DEFAULT_RESULTS),

    // Active View & Filters
    currentView: 'dashboard',
    charts: {
      examStatus: null,
      subjectPerf: null,
      reportVisual: null
    },

    // Simulated Exam Runtime
    simExam: {
      examId: null,
      studentId: null,
      timerInterval: null,
      remainingSeconds: 0,
      currentQuestionIndex: 0,
      userAnswers: {},
      reviewFlags: {}
    }
  };

  // Seed storage initially if empty
  if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) saveStorage(STORAGE_KEYS.SUBJECTS, State.subjects);
  if (!localStorage.getItem(STORAGE_KEYS.EXAMS)) saveStorage(STORAGE_KEYS.EXAMS, State.exams);
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) saveStorage(STORAGE_KEYS.STUDENTS, State.students);
  if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) saveStorage(STORAGE_KEYS.QUESTIONS, State.questions);
  if (!localStorage.getItem(STORAGE_KEYS.ANSWERS)) saveStorage(STORAGE_KEYS.ANSWERS, State.answerSheets);
  if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) saveStorage(STORAGE_KEYS.RESULTS, State.results);

  // ---------------------------------------------------------------------------
  // 3. UI Helpers: Toasts, Modals, Formatters
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${escapeHTML(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }

  function calculateGrade(percentage) {
    const p = parseFloat(percentage);
    if (p >= 90) return { grade: 'A+', label: 'Distinction' };
    if (p >= 80) return { grade: 'A', label: 'Excellent' };
    if (p >= 70) return { grade: 'B+', label: 'Very Good' };
    if (p >= 60) return { grade: 'B', label: 'Good' };
    if (p >= 50) return { grade: 'C', label: 'Average' };
    if (p >= 40) return { grade: 'D', label: 'Pass' };
    return { grade: 'F', label: 'Fail' };
  }

  // ---------------------------------------------------------------------------
  // 4. Role & Theme Management
  // ---------------------------------------------------------------------------
  function applyTheme(theme) {
    State.theme = theme;
    saveStorage(STORAGE_KEYS.THEME, theme);
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';

    const sun = document.getElementById('theme-sun-icon');
    const moon = document.getElementById('theme-moon-icon');
    if (sun && moon) {
      if (theme === 'dark') {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
      } else {
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
      }
    }

    // Refresh charts with updated palette
    renderDashboardCharts();
  }

  function toggleTheme() {
    applyTheme(State.theme === 'dark' ? 'light' : 'dark');
  }

  function switchRole(roleKey) {
    if (!DEFAULT_USERS[roleKey]) return;
    State.currentUser = DEFAULT_USERS[roleKey];
    saveStorage(STORAGE_KEYS.USER, State.currentUser);
    updateUserUI();
    showToast(`Switched active profile to ${State.currentUser.name} (${State.currentUser.role.toUpperCase()})`, 'info');

    // If current view is restricted for the new role, redirect to dashboard
    const activeViewEl = document.querySelector('.nav-item.active');
    if (activeViewEl) {
      const allowedRoles = activeViewEl.getAttribute('data-roles');
      if (allowedRoles && !allowedRoles.split(',').includes(State.currentUser.role)) {
        navigateTo('dashboard');
      }
    }

    renderActiveView();
  }

  function updateUserUI() {
    const u = State.currentUser;
    const roleText = document.getElementById('sidebar-role-text');
    const userDept = document.getElementById('sidebar-user-dept');
    const avatar = document.getElementById('topbar-avatar');
    const userName = document.getElementById('topbar-user-name');
    const userRole = document.getElementById('topbar-user-role');
    const dropName = document.getElementById('user-dropdown-name');
    const dropEmail = document.getElementById('user-dropdown-email');
    const quickRoleSelect = document.getElementById('quick-role-select');

    if (roleText) roleText.textContent = `${u.role.toUpperCase()} MODE`;
    if (userDept) userDept.textContent = u.dept || 'Academic Affairs';
    if (avatar) avatar.textContent = u.avatar || 'EP';
    if (userName) userName.textContent = u.name;
    if (userRole) userRole.textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    if (dropName) dropName.textContent = u.name;
    if (dropEmail) dropEmail.textContent = u.email;
    if (quickRoleSelect) quickRoleSelect.value = u.role;

    // Adjust navigation items visibility based on roles
    document.querySelectorAll('.nav-item').forEach(item => {
      const allowed = item.getAttribute('data-roles');
      if (!allowed) {
        item.style.display = 'flex';
      } else {
        const roles = allowed.split(',').map(r => r.trim());
        item.style.display = roles.includes(u.role) ? 'flex' : 'none';
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Navigation & View Routing
  // ---------------------------------------------------------------------------
  function navigateTo(viewId) {
    State.currentView = viewId;

    // Update active nav button
    document.querySelectorAll('.nav-item').forEach(btn => {
      if (btn.getAttribute('data-view') === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add('active');

    // Update breadcrumb title
    const titleMap = {
      dashboard: 'Dashboard',
      exams: 'Exam Scheduling',
      subjects: 'Subject Management',
      'hall-tickets': 'Hall Ticket Generation',
      'online-exam': 'Simulated Online Examination',
      'answer-sheets': 'Answer Sheet Evaluation',
      results: 'Result Processing',
      marksheets: 'Student Marksheets',
      reports: 'Reports & Analytics'
    };
    const breadcrumb = document.getElementById('current-view-title');
    if (breadcrumb) breadcrumb.textContent = titleMap[viewId] || 'Portal';

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Render data for view
    renderActiveView();
  }

  function renderActiveView() {
    switch (State.currentView) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'exams':
        renderExamsTable();
        break;
      case 'subjects':
        renderSubjectsTable();
        break;
      case 'hall-tickets':
        populateHallTicketSelectors();
        renderHallTicket();
        break;
      case 'online-exam':
        initOnlineExamLobby();
        break;
      case 'answer-sheets':
        renderAnswerSheetsTable();
        break;
      case 'results':
        renderResultsTable();
        break;
      case 'marksheets':
        populateMarksheetSelectors();
        renderMarksheet();
        break;
      case 'reports':
        initReportsView();
        break;
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    }
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }
  }

  // ---------------------------------------------------------------------------
  // 6. View: Dashboard
  // ---------------------------------------------------------------------------
  function renderDashboard() {
    // 1. Calculate actual stats
    const totalExams = State.exams.length;
    const upcomingExams = State.exams.filter(e => e.status === 'Scheduled').length;
    const completedExams = State.exams.filter(e => e.status === 'Completed').length;
    const totalStudents = State.students.length;
    const resultsPublished = State.results.filter(r => r.published).length;
    const resultsPending = State.results.filter(r => !r.published).length;

    // Pass percentage & avg score
    let passCount = 0;
    let totalScoreSum = 0;
    let evaluatedCount = 0;

    State.results.forEach(r => {
      if (r.overallResult === 'PASS') passCount++;
      if (r.percentage) {
        totalScoreSum += parseFloat(r.percentage);
        evaluatedCount++;
      }
    });

    const passRate = State.results.length ? ((passCount / State.results.length) * 100).toFixed(1) : '0.0';
    const avgScore = evaluatedCount ? (totalScoreSum / evaluatedCount).toFixed(1) : '0.0';

    // Populate stat cards
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText('stat-total-exams', totalExams);
    setText('stat-upcoming-exams', upcomingExams);
    setText('stat-completed-exams', completedExams);
    setText('stat-total-students', totalStudents);
    setText('stat-results-published', resultsPublished);
    setText('stat-results-pending', resultsPending);
    setText('kpi-pass-rate', `${passRate}%`);
    setText('kpi-avg-score', `${avgScore} / 100`);

    // 2. Upcoming Exams Table
    const upcomingTbody = document.getElementById('dashboard-upcoming-tbody');
    if (upcomingTbody) {
      const list = State.exams.filter(e => e.status === 'Scheduled' || e.status === 'In Progress').slice(0, 5);
      if (list.length === 0) {
        upcomingTbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted p-4">No upcoming exams scheduled.</td></tr>';
      } else {
        upcomingTbody.innerHTML = list.map(exam => {
          const sub = State.subjects.find(s => s.code === exam.subjectCode) || { name: exam.subjectCode };
          return `
            <tr>
              <td>
                <div class="font-bold">${escapeHTML(exam.name)}</div>
                <div class="text-xs text-muted">${escapeHTML(exam.subjectCode)} · ${escapeHTML(sub.name)}</div>
              </td>
              <td><span class="text-xs text-muted">${escapeHTML(exam.type)}</span></td>
              <td>
                <div class="font-bold">${escapeHTML(exam.date)}</div>
                <div class="text-xs text-muted">${escapeHTML(exam.startTime)} (${exam.duration}m)</div>
              </td>
              <td><span class="text-xs">${escapeHTML(exam.venue)}</span></td>
              <td><span class="badge badge-${exam.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHTML(exam.status)}</span></td>
            </tr>
          `;
        }).join('');
      }
    }

    // 3. Recent Results Table
    const recentResultsTbody = document.getElementById('dashboard-recent-results-tbody');
    if (recentResultsTbody) {
      const list = State.results.slice(0, 5);
      if (list.length === 0) {
        recentResultsTbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted p-4">No published results recorded.</td></tr>';
      } else {
        recentResultsTbody.innerHTML = list.map(res => {
          const stu = State.students.find(s => s.id === res.studentId) || { name: res.studentId };
          const ex = State.exams.find(e => e.id === res.examId) || { name: res.examId };
          return `
            <tr>
              <td>
                <div class="font-bold">${escapeHTML(stu.name)}</div>
                <div class="text-xs text-muted font-mono">${escapeHTML(res.studentId)}</div>
              </td>
              <td><span class="text-xs">${escapeHTML(ex.name)}</span></td>
              <td class="tabular-nums font-bold">${res.percentage}%</td>
              <td><span class="font-bold ${res.overallResult === 'PASS' ? 'text-green' : 'text-red'}">${res.grade}</span></td>
              <td><span class="badge ${res.published ? 'badge-published' : 'badge-results-pending'}">${res.published ? 'Published' : 'Pending'}</span></td>
            </tr>
          `;
        }).join('');
      }
    }

    // 4. Render Charts
    renderDashboardCharts();
  }

  function renderDashboardCharts() {
    // A. Exam Status Distribution
    const statusCounts = {
      Scheduled: 0,
      'In Progress': 0,
      Completed: 0,
      'Results Pending': 0,
      Cancelled: 0
    };
    State.exams.forEach(e => {
      if (statusCounts[e.status] !== undefined) statusCounts[e.status]++;
      else statusCounts[e.status] = 1;
    });

    const isDark = State.theme === 'dark';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';

    // Chart.js fallback support
    if (typeof Chart !== 'undefined') {
      const canvas1 = document.getElementById('chart-exam-status');
      if (canvas1) {
        if (State.charts.examStatus) State.charts.examStatus.destroy();
        State.charts.examStatus = new Chart(canvas1, {
          type: 'doughnut',
          data: {
            labels: Object.keys(statusCounts),
            datasets: [{
              data: Object.values(statusCounts),
              backgroundColor: ['#2563EB', '#F59E0B', '#16A34A', '#D97706', '#DC2626'],
              borderWidth: 2,
              borderColor: isDark ? '#1E293B' : '#FFFFFF'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
              }
            }
          }
        });
      }

      // B. Subject-wise Average Marks
      const subScoreMap = {};
      State.results.forEach(res => {
        if (res.subjectMarks && Array.isArray(res.subjectMarks)) {
          res.subjectMarks.forEach(sm => {
            if (!subScoreMap[sm.code]) subScoreMap[sm.code] = { total: 0, count: 0, name: sm.name };
            subScoreMap[sm.code].total += sm.obtained;
            subScoreMap[sm.code].count += 1;
          });
        }
      });

      const subLabels = Object.keys(subScoreMap).length ? Object.keys(subScoreMap) : ['CS-301', 'CS-302', 'CS-303', 'CS-304'];
      const subAverages = subLabels.map(code => {
        if (subScoreMap[code] && subScoreMap[code].count > 0) {
          return Math.round(subScoreMap[code].total / subScoreMap[code].count);
        }
        return 75; // Default reference if empty
      });

      const canvas2 = document.getElementById('chart-subject-perf');
      if (canvas2) {
        if (State.charts.subjectPerf) State.charts.subjectPerf.destroy();
        State.charts.subjectPerf = new Chart(canvas2, {
          type: 'bar',
          data: {
            labels: subLabels,
            datasets: [{
              label: 'Average Score',
              data: subAverages,
              backgroundColor: '#DC2626',
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } },
                grid: { color: isDark ? '#334155' : '#E2E8F0' }
              },
              x: {
                ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } },
                grid: { display: false }
              }
            },
            plugins: {
              legend: { display: false }
            }
          }
        });
      }
    } else {
      // Graceful fallback list
      const fb1 = document.getElementById('chart-exam-fallback');
      if (fb1) {
        fb1.classList.remove('hidden');
        fb1.innerHTML = Object.entries(statusCounts).map(([status, count]) => `
          <div class="fallback-bar-row">
            <span class="fallback-bar-label">${status}</span>
            <div class="fallback-bar-track">
              <div class="fallback-bar-fill" style="width: ${(count / Math.max(State.exams.length, 1)) * 100}%"></div>
            </div>
            <span class="fallback-bar-val">${count}</span>
          </div>
        `).join('');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 7. View: Exam Scheduling (CRUD)
  // ---------------------------------------------------------------------------
  function renderExamsTable() {
    const tbody = document.getElementById('exams-table-body');
    const emptyState = document.getElementById('exams-empty-state');
    const badge = document.getElementById('exam-count-badge');
    const filterSub = document.getElementById('exam-filter-subject');

    // Populate subject filter options if empty
    if (filterSub && filterSub.options.length <= 1) {
      filterSub.innerHTML = '<option value="">All Subjects</option>' +
        State.subjects.map(s => `<option value="${s.code}">${s.code} · ${s.name}</option>`).join('');
    }

    const search = (document.getElementById('exam-filter-search')?.value || '').toLowerCase();
    const typeFilter = document.getElementById('exam-filter-type')?.value || '';
    const subFilter = document.getElementById('exam-filter-subject')?.value || '';
    const statusFilter = document.getElementById('exam-filter-status')?.value || '';

    const filtered = State.exams.filter(exam => {
      const matchSearch = !search ||
        exam.name.toLowerCase().includes(search) ||
        exam.id.toLowerCase().includes(search) ||
        exam.subjectCode.toLowerCase().includes(search);
      const matchType = !typeFilter || exam.type === typeFilter;
      const matchSub = !subFilter || exam.subjectCode === subFilter;
      const matchStatus = !statusFilter || exam.status === statusFilter;
      return matchSearch && matchType && matchSub && matchStatus;
    });

    if (badge) badge.textContent = filtered.length;

    if (filtered.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (tbody) {
      tbody.innerHTML = filtered.map(exam => {
        const sub = State.subjects.find(s => s.code === exam.subjectCode) || { name: exam.subjectCode };
        return `
          <tr>
            <td class="font-mono font-bold">${escapeHTML(exam.id)}</td>
            <td>
              <div class="font-bold">${escapeHTML(exam.name)}</div>
              <div class="text-xs text-muted">Created for ${escapeHTML(exam.type)}</div>
            </td>
            <td>
              <span class="font-bold">${escapeHTML(exam.subjectCode)}</span>
              <div class="text-xs text-muted">${escapeHTML(sub.name)}</div>
            </td>
            <td><span class="text-xs">${escapeHTML(exam.type)}</span></td>
            <td class="font-bold">${escapeHTML(exam.date)}</td>
            <td>
              <div>${escapeHTML(exam.startTime)} – ${escapeHTML(exam.endTime)}</div>
              <div class="text-xs text-muted">${exam.duration} mins</div>
            </td>
            <td class="tabular-nums">
              <strong>${exam.maxMarks}</strong> / <span class="text-muted">${exam.passMarks}</span>
            </td>
            <td><span class="text-xs">${escapeHTML(exam.venue)}</span></td>
            <td><span class="badge badge-${exam.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHTML(exam.status)}</span></td>
            <td class="text-right">
              <div class="table-actions">
                <button class="btn-icon" title="View Details" onclick="window.ExamPro.viewExamDetails('${exam.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </button>
                <button class="btn-icon" title="Edit Exam" onclick="window.ExamPro.openScheduleModal('${exam.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </button>
                <button class="btn-icon danger" title="Delete Exam" onclick="window.ExamPro.confirmDeleteExam('${exam.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  function openScheduleModal(examId = null) {
    const modal = document.getElementById('modal-exam-form');
    const title = document.getElementById('exam-modal-title');
    const mode = document.getElementById('exam-form-mode');
    const subSelect = document.getElementById('exam-input-subject');

    // Populate subjects in dropdown
    if (subSelect) {
      subSelect.innerHTML = State.subjects.map(s => `<option value="${s.code}">${s.code} · ${s.name} (${s.dept})</option>`).join('');
    }

    if (examId) {
      const exam = State.exams.find(e => e.id === examId);
      if (!exam) return;
      if (title) title.textContent = 'Edit Scheduled Examination';
      if (mode) mode.value = 'edit';

      const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      setVal('exam-input-id', exam.id);
      document.getElementById('exam-input-id').setAttribute('readonly', 'true');
      setVal('exam-input-name', exam.name);
      setVal('exam-input-subject', exam.subjectCode);
      setVal('exam-input-type', exam.type);
      setVal('exam-input-date', exam.date);
      setVal('exam-input-start-time', exam.startTime);
      setVal('exam-input-end-time', exam.endTime);
      setVal('exam-input-duration', exam.duration);
      setVal('exam-input-max-marks', exam.maxMarks);
      setVal('exam-input-pass-marks', exam.passMarks);
      setVal('exam-input-venue', exam.venue);
      setVal('exam-input-status', exam.status);
    } else {
      if (title) title.textContent = 'Schedule New Examination';
      if (mode) mode.value = 'add';
      const idInput = document.getElementById('exam-input-id');
      if (idInput) {
        idInput.removeAttribute('readonly');
        const nextNum = String(State.exams.length + 1).padStart(3, '0');
        idInput.value = `EXM-2026-${nextNum}`;
      }
      document.getElementById('exam-input-name').value = '';
      document.getElementById('exam-input-date').value = new Date().toISOString().split('T')[0];
      document.getElementById('exam-input-start-time').value = '09:30';
      document.getElementById('exam-input-end-time').value = '12:30';
      document.getElementById('exam-input-duration').value = 180;
      document.getElementById('exam-input-max-marks').value = 100;
      document.getElementById('exam-input-pass-marks').value = 40;
      document.getElementById('exam-input-venue').value = 'Hall A-102';
      document.getElementById('exam-input-status').value = 'Scheduled';
    }

    openModal('modal-exam-form');
  }

  function saveExamForm(event) {
    event.preventDefault();
    const mode = document.getElementById('exam-form-mode').value;
    const id = document.getElementById('exam-input-id').value.trim();
    const name = document.getElementById('exam-input-name').value.trim();
    const subjectCode = document.getElementById('exam-input-subject').value;
    const type = document.getElementById('exam-input-type').value;
    const date = document.getElementById('exam-input-date').value;
    const startTime = document.getElementById('exam-input-start-time').value;
    const endTime = document.getElementById('exam-input-end-time').value;
    const duration = parseInt(document.getElementById('exam-input-duration').value, 10);
    const maxMarks = parseInt(document.getElementById('exam-input-max-marks').value, 10);
    const passMarks = parseInt(document.getElementById('exam-input-pass-marks').value, 10);
    const venue = document.getElementById('exam-input-venue').value.trim();
    const status = document.getElementById('exam-input-status').value;

    if (!id || !name || !date || !startTime || !endTime) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }

    if (passMarks > maxMarks) {
      showToast('Passing marks cannot exceed maximum marks.', 'warning');
      return;
    }

    if (mode === 'add') {
      if (State.exams.some(e => e.id.toLowerCase() === id.toLowerCase())) {
        showToast(`Exam ID "${id}" already exists. Please choose a unique ID.`, 'warning');
        return;
      }
      const newExam = { id, name, subjectCode, type, date, startTime, endTime, duration, maxMarks, passMarks, venue, status };
      State.exams.unshift(newExam);
      showToast(`Examination "${id}" scheduled successfully!`, 'success');
    } else {
      const idx = State.exams.findIndex(e => e.id === id);
      if (idx !== -1) {
        State.exams[idx] = { ...State.exams[idx], name, subjectCode, type, date, startTime, endTime, duration, maxMarks, passMarks, venue, status };
        showToast(`Examination "${id}" updated successfully.`, 'success');
      }
    }

    saveStorage(STORAGE_KEYS.EXAMS, State.exams);
    closeModal('modal-exam-form');
    renderExamsTable();
    renderDashboard();
  }

  function viewExamDetails(examId) {
    const exam = State.exams.find(e => e.id === examId);
    if (!exam) return;
    const sub = State.subjects.find(s => s.code === exam.subjectCode) || { name: 'Unknown', teacher: 'N/A' };
    const content = document.getElementById('modal-exam-view-content');
    if (!content) return;

    content.innerHTML = `
      <div class="lobby-meta-list">
        <div class="lobby-meta-row"><span class="text-muted">Exam ID:</span><strong class="font-mono">${escapeHTML(exam.id)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Title:</span><strong>${escapeHTML(exam.name)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Subject:</span><strong>${escapeHTML(exam.subjectCode)} · ${escapeHTML(sub.name)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Faculty Assigned:</span><strong>${escapeHTML(sub.teacher)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Exam Type:</span><strong>${escapeHTML(exam.type)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Date & Session:</span><strong>${escapeHTML(exam.date)} (${exam.startTime} – ${exam.endTime})</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Duration:</span><strong>${exam.duration} Minutes</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Max / Passing Marks:</span><strong>${exam.maxMarks} / ${exam.passMarks}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Allocated Venue:</span><strong class="text-red">${escapeHTML(exam.venue)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Status:</span><span class="badge badge-${exam.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHTML(exam.status)}</span></div>
      </div>
    `;

    openModal('modal-exam-view');
  }

  function confirmDeleteExam(examId) {
    const title = document.getElementById('confirm-modal-title');
    const msg = document.getElementById('confirm-modal-msg');
    const btn = document.getElementById('confirm-modal-ok-btn');

    if (title) title.textContent = 'Cancel & Delete Examination';
    if (msg) msg.textContent = `Are you sure you want to delete examination "${examId}"? All associated hall tickets will be invalidated.`;

    if (btn) {
      btn.onclick = () => {
        State.exams = State.exams.filter(e => e.id !== examId);
        saveStorage(STORAGE_KEYS.EXAMS, State.exams);
        closeModal('modal-confirm');
        showToast(`Examination "${examId}" deleted.`, 'info');
        renderExamsTable();
        renderDashboard();
      };
    }

    openModal('modal-confirm');
  }

  function resetExamFilters() {
    const search = document.getElementById('exam-filter-search');
    const type = document.getElementById('exam-filter-type');
    const sub = document.getElementById('exam-filter-subject');
    const status = document.getElementById('exam-filter-status');
    if (search) search.value = '';
    if (type) type.value = '';
    if (sub) sub.value = '';
    if (status) status.value = '';
    renderExamsTable();
  }

  // ---------------------------------------------------------------------------
  // 8. View: Subject Management (CRUD)
  // ---------------------------------------------------------------------------
  function renderSubjectsTable() {
    const tbody = document.getElementById('subjects-table-body');
    const emptyState = document.getElementById('subjects-empty-state');
    const badge = document.getElementById('subject-count-badge');

    const search = (document.getElementById('subject-filter-search')?.value || '').toLowerCase();
    const deptFilter = document.getElementById('subject-filter-dept')?.value || '';
    const semFilter = document.getElementById('subject-filter-sem')?.value || '';

    const filtered = State.subjects.filter(sub => {
      const matchSearch = !search ||
        sub.name.toLowerCase().includes(search) ||
        sub.code.toLowerCase().includes(search) ||
        sub.teacher.toLowerCase().includes(search);
      const matchDept = !deptFilter || sub.dept === deptFilter;
      const matchSem = !semFilter || sub.sem === semFilter;
      return matchSearch && matchDept && matchSem;
    });

    if (badge) badge.textContent = filtered.length;

    if (filtered.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (tbody) {
      tbody.innerHTML = filtered.map(sub => `
        <tr>
          <td class="font-mono font-bold text-red">${escapeHTML(sub.code)}</td>
          <td>
            <div class="font-bold">${escapeHTML(sub.name)}</div>
            <div class="text-xs text-muted" title="${escapeHTML(sub.syllabus)}">${escapeHTML(sub.syllabus.slice(0, 50))}...</div>
          </td>
          <td><span class="text-xs">${escapeHTML(sub.dept)}</span></td>
          <td>Semester ${escapeHTML(sub.sem)}</td>
          <td class="font-bold">${escapeHTML(sub.teacher)}</td>
          <td class="tabular-nums">${sub.credits}</td>
          <td class="tabular-nums"><strong>${sub.maxMarks}</strong> / <span class="text-muted">${sub.passMarks}</span></td>
          <td class="text-right">
            <div class="table-actions">
              <button class="btn-icon" title="View Subject Syllabus" onclick="window.ExamPro.viewSubjectDetails('${sub.code}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </button>
              <button class="btn-icon" title="Edit Subject" onclick="window.ExamPro.openSubjectModal('${sub.code}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </button>
              <button class="btn-icon danger" title="Delete Subject" onclick="window.ExamPro.confirmDeleteSubject('${sub.code}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  function openSubjectModal(subCode = null) {
    const title = document.getElementById('subject-modal-title');
    const mode = document.getElementById('subject-form-mode');
    const codeInput = document.getElementById('sub-input-code');

    if (subCode) {
      const sub = State.subjects.find(s => s.code === subCode);
      if (!sub) return;
      if (title) title.textContent = 'Edit Subject Course Details';
      if (mode) mode.value = 'edit';
      if (codeInput) {
        codeInput.value = sub.code;
        codeInput.setAttribute('readonly', 'true');
      }

      const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      setVal('sub-input-name', sub.name);
      setVal('sub-input-dept', sub.dept);
      setVal('sub-input-sem', sub.sem);
      setVal('sub-input-teacher', sub.teacher);
      setVal('sub-input-credits', sub.credits);
      setVal('sub-input-max-marks', sub.maxMarks);
      setVal('sub-input-pass-marks', sub.passMarks);
      setVal('sub-input-syllabus', sub.syllabus || '');
    } else {
      if (title) title.textContent = 'Add Curriculum Subject';
      if (mode) mode.value = 'add';
      if (codeInput) {
        codeInput.removeAttribute('readonly');
        codeInput.value = '';
      }
      document.getElementById('sub-input-name').value = '';
      document.getElementById('sub-input-dept').value = 'Computer Science';
      document.getElementById('sub-input-sem').value = '6';
      document.getElementById('sub-input-teacher').value = 'Prof. Marcus Thorne';
      document.getElementById('sub-input-credits').value = 4;
      document.getElementById('sub-input-max-marks').value = 100;
      document.getElementById('sub-input-pass-marks').value = 40;
      document.getElementById('sub-input-syllabus').value = '';
    }

    openModal('modal-subject-form');
  }

  function saveSubjectForm(event) {
    event.preventDefault();
    const mode = document.getElementById('subject-form-mode').value;
    const code = document.getElementById('sub-input-code').value.trim().toUpperCase();
    const name = document.getElementById('sub-input-name').value.trim();
    const dept = document.getElementById('sub-input-dept').value;
    const sem = document.getElementById('sub-input-sem').value;
    const teacher = document.getElementById('sub-input-teacher').value.trim();
    const credits = parseInt(document.getElementById('sub-input-credits').value, 10);
    const maxMarks = parseInt(document.getElementById('sub-input-max-marks').value, 10);
    const passMarks = parseInt(document.getElementById('sub-input-pass-marks').value, 10);
    const syllabus = document.getElementById('sub-input-syllabus').value.trim();

    if (!code || !name || !teacher) {
      showToast('Please provide subject code, title, and assigned faculty.', 'warning');
      return;
    }

    if (passMarks > maxMarks) {
      showToast('Passing marks cannot exceed maximum marks.', 'warning');
      return;
    }

    if (mode === 'add') {
      if (State.subjects.some(s => s.code.toLowerCase() === code.toLowerCase())) {
        showToast(`Subject Code "${code}" is already registered.`, 'warning');
        return;
      }
      State.subjects.unshift({ code, name, dept, sem, teacher, credits, maxMarks, passMarks, syllabus });
      showToast(`Subject "${code} · ${name}" added to curriculum.`, 'success');
    } else {
      const idx = State.subjects.findIndex(s => s.code === code);
      if (idx !== -1) {
        State.subjects[idx] = { code, name, dept, sem, teacher, credits, maxMarks, passMarks, syllabus };
        showToast(`Subject "${code}" course details updated.`, 'success');
      }
    }

    saveStorage(STORAGE_KEYS.SUBJECTS, State.subjects);
    closeModal('modal-subject-form');
    renderSubjectsTable();
    renderDashboard();
  }

  function viewSubjectDetails(subCode) {
    const sub = State.subjects.find(s => s.code === subCode);
    if (!sub) return;
    const content = document.getElementById('modal-subject-view-content');
    if (!content) return;

    const linkedExams = State.exams.filter(e => e.subjectCode === subCode);

    content.innerHTML = `
      <div class="lobby-meta-list">
        <div class="lobby-meta-row"><span class="text-muted">Subject Code:</span><strong class="font-mono text-red">${escapeHTML(sub.code)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Title:</span><strong>${escapeHTML(sub.name)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Department & Sem:</span><strong>${escapeHTML(sub.dept)} · Semester ${escapeHTML(sub.sem)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Course Faculty:</span><strong>${escapeHTML(sub.teacher)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Credits:</span><strong>${sub.credits} Credits</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Max / Pass Marks:</span><strong>${sub.maxMarks} / ${sub.passMarks}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Linked Examinations:</span><strong>${linkedExams.length} active exam session(s)</strong></div>
      </div>
      <div class="mt-4">
        <strong class="text-xs uppercase text-muted block mb-1">Course Syllabus & Modules:</strong>
        <p class="text-sm bg-surface-alt p-3 rounded border border-border">${escapeHTML(sub.syllabus || 'No syllabus breakdown registered.')}</p>
      </div>
    `;

    openModal('modal-subject-view');
  }

  function confirmDeleteSubject(subCode) {
    const linkedExams = State.exams.filter(e => e.subjectCode === subCode);
    const title = document.getElementById('confirm-modal-title');
    const msg = document.getElementById('confirm-modal-msg');
    const btn = document.getElementById('confirm-modal-ok-btn');

    if (title) title.textContent = 'Remove Curriculum Subject';
    if (msg) {
      if (linkedExams.length > 0) {
        msg.textContent = `Warning: Subject "${subCode}" is currently linked to ${linkedExams.length} scheduled examination(s). Deleting it will create orphaned examination records. Proceed anyway?`;
      } else {
        msg.textContent = `Are you sure you want to remove subject "${subCode}" from the institutional curriculum?`;
      }
    }

    if (btn) {
      btn.onclick = () => {
        State.subjects = State.subjects.filter(s => s.code !== subCode);
        saveStorage(STORAGE_KEYS.SUBJECTS, State.subjects);
        closeModal('modal-confirm');
        showToast(`Subject "${subCode}" removed.`, 'info');
        renderSubjectsTable();
        renderDashboard();
      };
    }

    openModal('modal-confirm');
  }

  function resetSubjectFilters() {
    const search = document.getElementById('subject-filter-search');
    const dept = document.getElementById('subject-filter-dept');
    const sem = document.getElementById('subject-filter-sem');
    if (search) search.value = '';
    if (dept) dept.value = '';
    if (sem) sem.value = '';
    renderSubjectsTable();
  }

  // ---------------------------------------------------------------------------
  // 9. View: Hall Ticket Generation
  // ---------------------------------------------------------------------------
  function populateHallTicketSelectors() {
    const stuSelect = document.getElementById('ht-student-select');
    const examSelect = document.getElementById('ht-exam-select');

    if (stuSelect) {
      stuSelect.innerHTML = State.students.map(s => `
        <option value="${s.id}" ${s.id === 'STU-2024-001' ? 'selected' : ''}>${s.name} (${s.id} · ${s.dept})</option>
      `).join('');
    }

    if (examSelect) {
      examSelect.innerHTML = State.exams.map(e => `
        <option value="${e.id}">${e.name} (${e.subjectCode} · ${e.date})</option>
      `).join('');
    }
  }

  function renderHallTicket() {
    const stuId = document.getElementById('ht-student-select')?.value || 'STU-2024-001';
    const examId = document.getElementById('ht-exam-select')?.value || State.exams[0]?.id;

    const student = State.students.find(s => s.id === stuId) || State.students[0];
    const exam = State.exams.find(e => e.id === examId) || State.exams[0];
    if (!student || !exam) return;

    const subject = State.subjects.find(s => s.code === exam.subjectCode) || { name: exam.subjectCode, teacher: 'Faculty Staff' };

    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    setText('ht-preview-number', `HT-2026-${student.id.replace('STU-', '')}${exam.id.replace('EXM-', '')}`);
    setText('ht-cand-name', student.name);
    setText('ht-cand-id', student.id);
    setText('ht-cand-dept', student.dept);
    setText('ht-cand-sem', `Semester ${student.sem}`);
    setText('ht-exam-name', exam.name);
    setText('ht-exam-type', exam.type);
    setText('ht-subject-name', `${exam.subjectCode} · ${subject.name}`);
    setText('ht-faculty-name', subject.teacher);
    setText('ht-exam-date', exam.date);
    setText('ht-exam-time', `${exam.startTime} – ${exam.endTime} (${exam.duration} mins)`);
    setText('ht-exam-venue', exam.venue);
    setText('ht-exam-marks', `${exam.maxMarks} / ${exam.passMarks}`);

    const photoImg = document.getElementById('ht-photo-img');
    if (photoImg) {
      photoImg.src = student.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=FEE2E2&color=DC2626&size=150`;
    }
  }

  function printHallTicket() {
    window.print();
  }

  function downloadHallTicketPDF() {
    if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      const stuName = document.getElementById('ht-cand-name')?.textContent || 'Candidate';
      const stuId = document.getElementById('ht-cand-id')?.textContent || 'STU-001';
      const examName = document.getElementById('ht-exam-name')?.textContent || 'Exam';
      const examDate = document.getElementById('ht-exam-date')?.textContent || 'Date';
      const examTime = document.getElementById('ht-exam-time')?.textContent || 'Time';
      const venue = document.getElementById('ht-exam-venue')?.textContent || 'Venue';
      const subject = document.getElementById('ht-subject-name')?.textContent || 'Subject';
      const htNum = document.getElementById('ht-preview-number')?.textContent || 'HT-2026';

      // Design PDF document
      doc.setDrawColor(220, 38, 38);
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('DATA ALCOTT INSTITUTE OF TECHNOLOGY & SCIENCE', 105, 22, { align: 'center' });

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Affiliated to National Board of Technical Education · Task WD-COL-003', 105, 27, { align: 'center' });

      doc.setFillColor(220, 38, 38);
      doc.rect(50, 31, 110, 7, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('OFFICIAL HALL TICKET / ADMISSION CARD', 105, 36, { align: 'center' });

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.text(`Hall Ticket Serial: ${htNum}`, 105, 43, { align: 'center' });

      doc.setDrawColor(200, 200, 200);
      doc.line(15, 47, 195, 47);

      // Student and Exam Details
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Candidate Name:', 20, 56);
      doc.setFont('helvetica', 'normal');
      doc.text(stuName, 65, 56);

      doc.setFont('helvetica', 'bold');
      doc.text('Roll / Student ID:', 20, 64);
      doc.setFont('helvetica', 'normal');
      doc.text(stuId, 65, 64);

      doc.setFont('helvetica', 'bold');
      doc.text('Examination Title:', 20, 72);
      doc.setFont('helvetica', 'normal');
      doc.text(examName, 65, 72);

      doc.setFont('helvetica', 'bold');
      doc.text('Subject Course:', 20, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(subject, 65, 80);

      doc.setFont('helvetica', 'bold');
      doc.text('Date of Exam:', 20, 88);
      doc.setFont('helvetica', 'normal');
      doc.text(examDate, 65, 88);

      doc.setFont('helvetica', 'bold');
      doc.text('Scheduled Time:', 20, 96);
      doc.setFont('helvetica', 'normal');
      doc.text(examTime, 65, 96);

      doc.setFont('helvetica', 'bold');
      doc.text('Allocated Venue:', 20, 104);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(220, 38, 38);
      doc.text(venue, 65, 104);

      // Instructions Box
      doc.setDrawColor(180, 180, 180);
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 116, 170, 50, 'FD');
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('IMPORTANT EXAMINATION INSTRUCTIONS:', 25, 123);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('1. Candidates must arrive at the examination hall at least 30 minutes prior to start time.', 25, 130);
      doc.text('2. Possession of mobile phones, smart watches, or programmable calculators is strictly forbidden.', 25, 137);
      doc.text('3. Present this hall ticket along with your institutional student photo ID card upon demand.', 25, 144);
      doc.text('4. Write Roll ID and Exam Code legibly on the official answer sheet cover page.', 25, 151);

      // Signatures
      doc.line(25, 210, 75, 210);
      doc.text('Candidate Signature', 35, 215);

      doc.line(135, 210, 185, 210);
      doc.text('Controller of Examinations', 140, 215);

      doc.save(`HallTicket_${stuId}_${examDate}.pdf`);
      showToast('Hall ticket PDF generated and downloaded.', 'success');
    } else {
      // Fallback
      window.print();
    }
  }

  // ---------------------------------------------------------------------------
  // 10. View: Online Simulated Exam
  // ---------------------------------------------------------------------------
  function initOnlineExamLobby() {
    resetOnlineExamLobby();

    const stuSelect = document.getElementById('sim-student-select');
    const examSelect = document.getElementById('sim-exam-select');

    if (stuSelect) {
      stuSelect.innerHTML = State.students.map(s => `
        <option value="${s.id}" ${s.id === State.currentUser.studentId ? 'selected' : ''}>${s.name} (${s.id})</option>
      `).join('');
    }

    if (examSelect) {
      const onlineExams = State.exams.filter(e => e.type === 'Online Examination' || e.type === 'Quiz/Test');
      const list = onlineExams.length ? onlineExams : State.exams;
      examSelect.innerHTML = list.map(e => `
        <option value="${e.id}">${e.name} (${e.subjectCode})</option>
      `).join('');
    }

    updateOnlineLobbyDetails();
  }

  function updateOnlineLobbyDetails() {
    const examId = document.getElementById('sim-exam-select')?.value;
    const exam = State.exams.find(e => e.id === examId) || State.exams[0];
    if (!exam) return;

    const sub = State.subjects.find(s => s.code === exam.subjectCode) || { name: exam.subjectCode };
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    setText('lobby-sub-title', `${exam.subjectCode} · ${sub.name}`);
    setText('lobby-q-count', `${State.questions.length} Questions`);
    setText('lobby-duration', `${exam.duration} Minutes (Demo Timer: 15 Mins)`);
  }

  function resetOnlineExamLobby() {
    if (State.simExam.timerInterval) clearInterval(State.simExam.timerInterval);
    State.simExam.timerInterval = null;

    document.getElementById('exam-lobby-state')?.classList.remove('hidden');
    document.getElementById('exam-active-state')?.classList.add('hidden');
    document.getElementById('exam-summary-state')?.classList.add('hidden');
    const agreeCb = document.getElementById('sim-terms-agree');
    if (agreeCb) agreeCb.checked = false;
  }

  function startOnlineExam() {
    const agree = document.getElementById('sim-terms-agree')?.checked;
    if (!agree) {
      showToast('Please accept the candidate guidelines and honor code to begin.', 'warning');
      return;
    }

    const examId = document.getElementById('sim-exam-select')?.value;
    const studentId = document.getElementById('sim-student-select')?.value;
    const exam = State.exams.find(e => e.id === examId) || State.exams[0];
    const student = State.students.find(s => s.id === studentId) || State.students[0];

    State.simExam.examId = exam.id;
    State.simExam.studentId = student.id;
    State.simExam.currentQuestionIndex = 0;
    State.simExam.userAnswers = {};
    State.simExam.reviewFlags = {};
    // Demo duration: 15 minutes = 900 seconds
    State.simExam.remainingSeconds = 15 * 60;

    // Set Header
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('active-exam-title', `${exam.name} (${exam.subjectCode})`);
    setText('active-cand-name', student.name);
    setText('active-cand-id', student.id);

    // Switch View state
    document.getElementById('exam-lobby-state')?.classList.add('hidden');
    document.getElementById('exam-active-state')?.classList.remove('hidden');
    document.getElementById('exam-summary-state')?.classList.add('hidden');

    // Start Countdown
    startExamTimer();
    renderQuestionPalette();
    renderActiveQuestion();
    showToast('Examination session started. Good luck!', 'info');
  }

  function startExamTimer() {
    if (State.simExam.timerInterval) clearInterval(State.simExam.timerInterval);

    const timerDisplay = document.getElementById('active-timer-display');
    const updateTimer = () => {
      const mins = Math.floor(State.simExam.remainingSeconds / 60);
      const secs = State.simExam.remainingSeconds % 60;
      const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (timerDisplay) {
        timerDisplay.textContent = str;
        if (State.simExam.remainingSeconds < 120) {
          timerDisplay.classList.add('danger');
        } else {
          timerDisplay.classList.remove('danger');
        }
      }

      if (State.simExam.remainingSeconds <= 0) {
        clearInterval(State.simExam.timerInterval);
        showToast('Time expired! Your examination is automatically submitting...', 'warning');
        submitOnlineExam(true);
      } else {
        State.simExam.remainingSeconds--;
      }
    };

    updateTimer();
    State.simExam.timerInterval = setInterval(updateTimer, 1000);
  }

  function renderActiveQuestion() {
    const qIndex = State.simExam.currentQuestionIndex;
    const question = State.questions[qIndex];
    if (!question) return;

    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('active-q-number', `Question ${qIndex + 1} of ${State.questions.length}`);
    setText('active-q-marks', `[${question.marks} Marks]`);
    setText('active-q-prompt', question.prompt);

    // Options Container
    const optContainer = document.getElementById('active-q-options');
    const currentAnswer = State.simExam.userAnswers[question.id];

    if (optContainer) {
      optContainer.innerHTML = question.options.map((optText, optIdx) => {
        const isSelected = currentAnswer === optIdx;
        return `
          <div class="option-choice-item ${isSelected ? 'selected' : ''}" onclick="window.ExamPro.selectOption(${optIdx})">
            <div class="option-radio"></div>
            <span class="option-text">${escapeHTML(optText)}</span>
          </div>
        `;
      }).join('');
    }

    // Update Flag button text
    const isFlagged = State.simExam.reviewFlags[question.id];
    const flagBtnText = document.getElementById('mark-review-text');
    if (flagBtnText) flagBtnText.textContent = isFlagged ? 'Unmark Review' : 'Mark for Review';

    // Previous / Next Button States
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');
    if (prevBtn) prevBtn.disabled = qIndex === 0;
    if (nextBtn) {
      if (qIndex === State.questions.length - 1) {
        nextBtn.innerHTML = '<span>Review & Finish</span>';
      } else {
        nextBtn.innerHTML = `<span>Next</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
      }
    }

    // Counts
    const answeredCount = Object.keys(State.simExam.userAnswers).length;
    setText('active-answered-count', answeredCount);
    setText('active-total-count', State.questions.length);

    renderQuestionPalette();
  }

  function selectOption(optIndex) {
    const qIndex = State.simExam.currentQuestionIndex;
    const question = State.questions[qIndex];
    if (!question) return;

    State.simExam.userAnswers[question.id] = optIndex;
    renderActiveQuestion();
  }

  function clearQuestionAnswer() {
    const qIndex = State.simExam.currentQuestionIndex;
    const question = State.questions[qIndex];
    if (!question) return;

    delete State.simExam.userAnswers[question.id];
    renderActiveQuestion();
  }

  function toggleReviewFlag() {
    const qIndex = State.simExam.currentQuestionIndex;
    const question = State.questions[qIndex];
    if (!question) return;

    if (State.simExam.reviewFlags[question.id]) {
      delete State.simExam.reviewFlags[question.id];
    } else {
      State.simExam.reviewFlags[question.id] = true;
    }
    renderActiveQuestion();
  }

  function prevQuestion() {
    if (State.simExam.currentQuestionIndex > 0) {
      State.simExam.currentQuestionIndex--;
      renderActiveQuestion();
    }
  }

  function nextQuestion() {
    if (State.simExam.currentQuestionIndex < State.questions.length - 1) {
      State.simExam.currentQuestionIndex++;
      renderActiveQuestion();
    } else {
      confirmSubmitExam();
    }
  }

  function jumpToQuestion(idx) {
    if (idx >= 0 && idx < State.questions.length) {
      State.simExam.currentQuestionIndex = idx;
      renderActiveQuestion();
    }
  }

  function renderQuestionPalette() {
    const grid = document.getElementById('question-palette-grid');
    if (!grid) return;

    grid.innerHTML = State.questions.map((q, idx) => {
      const isCurrent = idx === State.simExam.currentQuestionIndex;
      const isAnswered = State.simExam.userAnswers[q.id] !== undefined;
      const isFlagged = State.simExam.reviewFlags[q.id];

      let stateClass = '';
      if (isCurrent) stateClass += ' current';
      if (isAnswered) stateClass += ' answered';
      else if (isFlagged) stateClass += ' flagged';

      return `
        <button class="pal-q-btn ${stateClass}" onclick="window.ExamPro.jumpToQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    }).join('');

    const answeredCount = Object.keys(State.simExam.userAnswers).length;
    const flaggedCount = Object.keys(State.simExam.reviewFlags).length;
    const remaining = State.questions.length - answeredCount;

    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('pal-total', State.questions.length);
    setText('pal-attempted', answeredCount);
    setText('pal-flagged', flaggedCount);
    setText('pal-remaining', remaining);
  }

  function confirmSubmitExam() {
    const answered = Object.keys(State.simExam.userAnswers).length;
    const total = State.questions.length;
    const unanswered = total - answered;

    const title = document.getElementById('confirm-modal-title');
    const msg = document.getElementById('confirm-modal-msg');
    const btn = document.getElementById('confirm-modal-ok-btn');

    if (title) title.textContent = 'Submit Examination Attempt';
    if (msg) {
      msg.textContent = unanswered > 0
        ? `You have answered ${answered} of ${total} questions. ${unanswered} question(s) remain unanswered. Are you sure you wish to finalize and submit?`
        : `All ${total} questions answered! Are you ready to submit your exam for auto-evaluation?`;
    }

    if (btn) {
      btn.onclick = () => {
        closeModal('modal-confirm');
        submitOnlineExam(false);
      };
    }

    openModal('modal-confirm');
  }

  function submitOnlineExam(isAutoExpiry = false) {
    if (State.simExam.timerInterval) clearInterval(State.simExam.timerInterval);

    // Calculate score
    let score = 0;
    let maxMarks = 0;
    let correctCount = 0;
    let breakdownHTML = '';

    State.questions.forEach((q, idx) => {
      maxMarks += q.marks;
      const userAnsIdx = State.simExam.userAnswers[q.id];
      const isCorrect = userAnsIdx === q.correctIndex;
      if (isCorrect) {
        score += q.marks;
        correctCount++;
      }

      const userAnsText = userAnsIdx !== undefined ? q.options[userAnsIdx] : '<span class="text-muted">Unanswered</span>';
      const correctAnsText = q.options[q.correctIndex];

      breakdownHTML += `
        <tr>
          <td class="font-bold">${idx + 1}</td>
          <td>
            <div class="font-medium">${escapeHTML(q.prompt)}</div>
            <div class="text-xs text-muted mt-1">${escapeHTML(q.explanation)}</div>
          </td>
          <td class="${isCorrect ? 'text-green font-bold' : 'text-red font-bold'}">${userAnsText}</td>
          <td class="text-green font-medium">${escapeHTML(correctAnsText)}</td>
          <td class="font-mono tabular-nums font-bold">${isCorrect ? `+${q.marks}` : '0'}</td>
        </tr>
      `;
    });

    const percentage = ((score / maxMarks) * 100).toFixed(1);
    const gradeObj = calculateGrade(percentage);
    const passRequired = Math.round(maxMarks * 0.4);
    const isPass = score >= passRequired;

    // Create Answer Sheet Record
    const newSubmissionId = `AS-2026-${String(State.answerSheets.length + 1).padStart(3, '0')}`;
    const newAnswerSheet = {
      id: newSubmissionId,
      studentId: State.simExam.studentId,
      examId: State.simExam.examId,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      objectiveScore: score,
      objectiveMax: maxMarks,
      descriptiveScore: 0,
      descriptiveMax: 0,
      totalScore: score,
      totalMax: maxMarks,
      status: 'Evaluated',
      evaluatorRemarks: `Simulated auto-grading completed. Candidate scored ${percentage}%.`,
      studentAnswers: { ...State.simExam.userAnswers }
    };

    State.answerSheets.unshift(newAnswerSheet);
    saveStorage(STORAGE_KEYS.ANSWERS, State.answerSheets);

    // Update Result Record
    const examObj = State.exams.find(e => e.id === State.simExam.examId) || { subjectCode: 'CS-303', name: 'Exam' };
    const subObj = State.subjects.find(s => s.code === examObj.subjectCode) || { name: 'Subject', credits: 3 };

    const newResult = {
      id: `RES-2026-${String(State.results.length + 1).padStart(3, '0')}`,
      studentId: State.simExam.studentId,
      examId: State.simExam.examId,
      academicYear: '2025-2026',
      subjectMarks: [
        {
          code: examObj.subjectCode,
          name: subObj.name,
          credits: subObj.credits || 3,
          max: maxMarks,
          pass: passRequired,
          obtained: score,
          grade: gradeObj.grade,
          status: isPass ? 'PASS' : 'FAIL'
        }
      ],
      totalObtained: score,
      totalMax: maxMarks,
      totalPass: passRequired,
      percentage: parseFloat(percentage),
      grade: gradeObj.grade,
      overallResult: isPass ? 'PASS' : 'FAIL',
      rank: 1,
      published: true,
      publishedDate: new Date().toISOString().split('T')[0]
    };

    State.results.unshift(newResult);
    saveStorage(STORAGE_KEYS.RESULTS, State.results);

    // Show Summary Screen
    document.getElementById('exam-active-state')?.classList.add('hidden');
    document.getElementById('exam-summary-state')?.classList.remove('hidden');

    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('summary-score-display', `${score} / ${maxMarks}`);
    setText('summary-percent-display', `${percentage}% · Grade: ${gradeObj.grade} (${gradeObj.label})`);
    setText('summary-total-q', State.questions.length);
    setText('summary-correct-q', correctCount);
    setText('summary-incorrect-q', State.questions.length - correctCount);

    const passPill = document.getElementById('summary-pass-pill');
    if (passPill) {
      if (isPass) {
        passPill.className = 'score-status-pill success';
        passPill.textContent = `PASSED (Passing requirement: ${passRequired}/${maxMarks})`;
      } else {
        passPill.className = 'score-status-pill danger';
        passPill.textContent = `FAILED (Passing requirement: ${passRequired}/${maxMarks})`;
      }
    }

    const summaryTbody = document.getElementById('summary-questions-tbody');
    if (summaryTbody) summaryTbody.innerHTML = breakdownHTML;

    showToast(isAutoExpiry ? 'Time expired. Test auto-graded!' : 'Assessment submitted and graded successfully!', 'success');
  }

  // ---------------------------------------------------------------------------
  // 11. View: Answer Sheet Management (Evaluations)
  // ---------------------------------------------------------------------------
  function renderAnswerSheetsTable() {
    const tbody = document.getElementById('answer-sheets-tbody');
    const badge = document.getElementById('as-count-badge');
    const examFilter = document.getElementById('as-filter-exam');

    if (examFilter && examFilter.options.length <= 1) {
      examFilter.innerHTML = '<option value="">All Examinations</option>' +
        State.exams.map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('');
    }

    const search = (document.getElementById('as-filter-search')?.value || '').toLowerCase();
    const exFilter = document.getElementById('as-filter-exam')?.value || '';
    const stFilter = document.getElementById('as-filter-status')?.value || '';

    const filtered = State.answerSheets.filter(as => {
      const student = State.students.find(s => s.id === as.studentId) || { name: '' };
      const matchSearch = !search ||
        student.name.toLowerCase().includes(search) ||
        as.studentId.toLowerCase().includes(search) ||
        as.id.toLowerCase().includes(search);
      const matchExam = !exFilter || as.examId === exFilter;
      const matchStatus = !stFilter || as.status === stFilter;
      return matchSearch && matchExam && matchStatus;
    });

    if (badge) badge.textContent = filtered.length;

    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted p-4">No submitted answer sheets found.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(as => {
        const student = State.students.find(s => s.id === as.studentId) || { name: as.studentId };
        const exam = State.exams.find(e => e.id === as.examId) || { name: as.examId };

        return `
          <tr>
            <td class="font-mono font-bold">${escapeHTML(as.id)}</td>
            <td>
              <div class="font-bold">${escapeHTML(student.name)}</div>
              <div class="text-xs text-muted font-mono">${escapeHTML(as.studentId)}</div>
            </td>
            <td>
              <div class="font-bold">${escapeHTML(exam.name)}</div>
              <div class="text-xs text-muted">${escapeHTML(as.examId)}</div>
            </td>
            <td class="text-xs text-muted">${escapeHTML(as.submittedAt)}</td>
            <td class="tabular-nums">${as.objectiveScore} / ${as.objectiveMax}</td>
            <td class="tabular-nums">${as.descriptiveScore} / ${as.descriptiveMax}</td>
            <td class="font-bold tabular-nums text-red">${as.totalScore} / ${as.totalMax}</td>
            <td><span class="badge ${as.status === 'Evaluated' ? 'badge-evaluated' : 'badge-results-pending'}">${escapeHTML(as.status)}</span></td>
            <td class="text-right">
              <button class="btn btn-secondary btn-sm" onclick="window.ExamPro.openEvaluateModal('${as.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span>Evaluate</span>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  let activeEvaluationId = null;

  function openEvaluateModal(asId) {
    const as = State.answerSheets.find(item => item.id === asId);
    if (!as) return;
    activeEvaluationId = asId;

    const student = State.students.find(s => s.id === as.studentId) || { name: as.studentId };
    const exam = State.exams.find(e => e.id === as.examId) || { name: as.examId };
    const container = document.getElementById('modal-evaluate-as-content');
    if (!container) return;

    container.innerHTML = `
      <div class="lobby-meta-list mb-4">
        <div class="lobby-meta-row"><span class="text-muted">Submission ID:</span><strong class="font-mono">${escapeHTML(as.id)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Candidate:</span><strong>${escapeHTML(student.name)} (${as.studentId})</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Examination:</span><strong>${escapeHTML(exam.name)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Submission Timestamp:</span><strong>${escapeHTML(as.submittedAt)}</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Current Total:</span><strong class="text-red font-bold">${as.totalScore} / ${as.totalMax} Marks</strong></div>
      </div>

      <div class="card mb-4">
        <div class="card-header"><span class="card-title text-sm">Objective Score Summary</span></div>
        <div class="card-body">
          <p class="text-sm">Auto-Evaluated Score: <strong class="text-green">${as.objectiveScore}</strong> of ${as.objectiveMax} marks.</p>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header"><span class="card-title text-sm">Descriptive Section / Student Written Responses</span></div>
        <div class="card-body">
          <p class="text-xs text-muted mb-2">Review candidate response and award subjective marks:</p>
          <div class="p-3 bg-surface-alt rounded border border-border text-sm mb-4">
            ${escapeHTML(as.descriptiveAnswer || 'Student response submitted: Architectural design covers microkernel isolation, IPC channels, and asynchronous socket queues.')}
          </div>

          <div class="grid-2-col">
            <div class="form-group">
              <label class="form-label" for="eval-desc-score">Award Descriptive Marks (Max: 10)</label>
              <input type="number" id="eval-desc-score" class="form-input" min="0" max="10" value="${as.descriptiveScore || 8}">
            </div>
            <div class="form-group">
              <label class="form-label" for="eval-status">Evaluation Status</label>
              <select id="eval-status" class="form-select">
                <option value="Evaluated" ${as.status === 'Evaluated' ? 'selected' : ''}>Evaluated</option>
                <option value="Pending Evaluation" ${as.status === 'Pending Evaluation' ? 'selected' : ''}>Pending Evaluation</option>
              </select>
            </div>
          </div>

          <div class="form-group mb-0">
            <label class="form-label" for="eval-remarks">Faculty Evaluator Remarks</label>
            <textarea id="eval-remarks" class="form-input" rows="2">${escapeHTML(as.evaluatorRemarks || 'Thorough conceptual presentation.')}</textarea>
          </div>
        </div>
      </div>
    `;

    openModal('modal-evaluate-as');
  }

  function saveEvaluationMarks() {
    if (!activeEvaluationId) return;
    const as = State.answerSheets.find(item => item.id === activeEvaluationId);
    if (!as) return;

    const descScore = parseInt(document.getElementById('eval-desc-score')?.value || '0', 10);
    const status = document.getElementById('eval-status')?.value || 'Evaluated';
    const remarks = document.getElementById('eval-remarks')?.value.trim() || '';

    if (descScore > 10 || descScore < 0) {
      showToast('Descriptive marks must be between 0 and 10.', 'warning');
      return;
    }

    as.descriptiveScore = descScore;
    as.descriptiveMax = 10;
    as.totalScore = as.objectiveScore + descScore;
    as.totalMax = as.objectiveMax + as.descriptiveMax;
    as.status = status;
    as.evaluatorRemarks = remarks;

    saveStorage(STORAGE_KEYS.ANSWERS, State.answerSheets);

    // Sync with Results collection
    const res = State.results.find(r => r.studentId === as.studentId && r.examId === as.examId);
    if (res) {
      const percentage = ((as.totalScore / as.totalMax) * 100).toFixed(1);
      const gradeObj = calculateGrade(percentage);
      res.totalObtained = as.totalScore;
      res.totalMax = as.totalMax;
      res.percentage = parseFloat(percentage);
      res.grade = gradeObj.grade;
      res.overallResult = percentage >= 40 ? 'PASS' : 'FAIL';
      saveStorage(STORAGE_KEYS.RESULTS, State.results);
    }

    closeModal('modal-evaluate-as');
    showToast(`Answer Sheet ${as.id} evaluation saved successfully!`, 'success');
    renderAnswerSheetsTable();
    renderDashboard();
  }

  function resetAnswerSheetFilters() {
    const s = document.getElementById('as-filter-search');
    const e = document.getElementById('as-filter-exam');
    const st = document.getElementById('as-filter-status');
    if (s) s.value = '';
    if (e) e.value = '';
    if (st) st.value = '';
    renderAnswerSheetsTable();
  }

  // ---------------------------------------------------------------------------
  // 12. View: Result Processing
  // ---------------------------------------------------------------------------
  function renderResultsTable() {
    const tbody = document.getElementById('results-table-tbody');
    const badge = document.getElementById('results-count-badge');
    const examFilter = document.getElementById('res-filter-exam');

    if (examFilter && examFilter.options.length <= 1) {
      examFilter.innerHTML = '<option value="">All Examinations</option>' +
        State.exams.map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('');
    }

    const search = (document.getElementById('res-filter-search')?.value || '').toLowerCase();
    const exFilter = document.getElementById('res-filter-exam')?.value || '';
    const stFilter = document.getElementById('res-filter-status')?.value || '';

    // Recompute merit ranks for consistent display
    recomputeRanks();

    const filtered = State.results.filter(res => {
      const student = State.students.find(s => s.id === res.studentId) || { name: '' };
      const matchSearch = !search ||
        student.name.toLowerCase().includes(search) ||
        res.studentId.toLowerCase().includes(search);
      const matchExam = !exFilter || res.examId === exFilter;
      const matchStatus = !stFilter || (stFilter === 'Published' ? res.published : !res.published);
      return matchSearch && matchExam && matchStatus;
    });

    if (badge) badge.textContent = filtered.length;

    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted p-4">No examination results found.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(res => {
        const student = State.students.find(s => s.id === res.studentId) || { name: res.studentId };
        const exam = State.exams.find(e => e.id === res.examId) || { name: res.examId };

        return `
          <tr>
            <td class="font-mono font-bold">${escapeHTML(res.studentId)}</td>
            <td class="font-bold">${escapeHTML(student.name)}</td>
            <td>
              <div>${escapeHTML(exam.name)}</div>
              <div class="text-xs text-muted">${escapeHTML(res.examId)}</div>
            </td>
            <td class="tabular-nums font-bold"><strong>${res.totalObtained}</strong> / <span class="text-muted">${res.totalMax}</span></td>
            <td class="tabular-nums font-bold">${res.percentage}%</td>
            <td><span class="font-bold ${res.overallResult === 'PASS' ? 'text-green' : 'text-red'}">${res.grade}</span></td>
            <td><span class="badge ${res.overallResult === 'PASS' ? 'badge-completed' : 'badge-cancelled'}">${res.overallResult}</span></td>
            <td class="font-mono font-bold">#${res.rank || 1}</td>
            <td><span class="badge ${res.published ? 'badge-published' : 'badge-results-pending'}">${res.published ? 'Published' : 'Pending'}</span></td>
            <td class="text-right">
              <div class="table-actions">
                <button class="btn btn-secondary btn-xs" title="Edit Marks" onclick="window.ExamPro.openEditResultModal('${res.id}')">Edit Marks</button>
                <button class="btn ${res.published ? 'btn-secondary' : 'btn-primary'} btn-xs" onclick="window.ExamPro.togglePublishResult('${res.id}')">
                  ${res.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  function recomputeRanks() {
    // Group by examId
    const groups = {};
    State.results.forEach(r => {
      if (!groups[r.examId]) groups[r.examId] = [];
      groups[r.examId].push(r);
    });

    Object.values(groups).forEach(list => {
      // Sort by percentage descending
      list.sort((a, b) => b.percentage - a.percentage);
      let currentRank = 1;
      list.forEach((item, index) => {
        if (index > 0 && item.percentage < list[index - 1].percentage) {
          currentRank = index + 1;
        }
        item.rank = currentRank;
      });
    });
  }

  function togglePublishResult(resultId) {
    const res = State.results.find(r => r.id === resultId);
    if (!res) return;

    res.published = !res.published;
    res.publishedDate = res.published ? new Date().toISOString().split('T')[0] : null;

    saveStorage(STORAGE_KEYS.RESULTS, State.results);
    showToast(`Result for ${res.studentId} is now ${res.published ? 'PUBLISHED' : 'UNPUBLISHED'}.`, 'success');
    renderResultsTable();
    renderDashboard();
  }

  function publishAllFilteredResults() {
    let count = 0;
    State.results.forEach(r => {
      if (!r.published) {
        r.published = true;
        r.publishedDate = new Date().toISOString().split('T')[0];
        count++;
      }
    });

    saveStorage(STORAGE_KEYS.RESULTS, State.results);
    showToast(`Published ${count} pending result records.`, 'success');
    renderResultsTable();
    renderDashboard();
  }

  let activeResultEditId = null;

  function openEditResultModal(resId) {
    const res = State.results.find(r => r.id === resId);
    if (!res) return;
    activeResultEditId = resId;

    const student = State.students.find(s => s.id === res.studentId) || { name: res.studentId };
    const exam = State.exams.find(e => e.id === res.examId) || { name: res.examId };
    const container = document.getElementById('modal-result-edit-content');
    if (!container) return;

    let subRows = '';
    (res.subjectMarks || []).forEach((sm, idx) => {
      subRows += `
        <div class="card p-3 mb-3 border border-border">
          <div class="font-bold text-sm mb-2">${escapeHTML(sm.code)} · ${escapeHTML(sm.name)}</div>
          <div class="grid-3-col">
            <div class="form-group mb-0">
              <label class="form-label">Obtained Marks</label>
              <input type="number" id="sub-obt-${idx}" class="form-input" min="0" max="${sm.max}" value="${sm.obtained}">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Max Marks</label>
              <input type="number" id="sub-max-${idx}" class="form-input" readonly value="${sm.max}">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Passing Marks</label>
              <input type="number" id="sub-pass-${idx}" class="form-input" readonly value="${sm.pass}">
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="lobby-meta-list mb-4">
        <div class="lobby-meta-row"><span class="text-muted">Candidate:</span><strong>${escapeHTML(student.name)} (${res.studentId})</strong></div>
        <div class="lobby-meta-row"><span class="text-muted">Exam:</span><strong>${escapeHTML(exam.name)}</strong></div>
      </div>
      <div>${subRows}</div>
    `;

    openModal('modal-result-edit');
  }

  function saveResultMarks(event) {
    event.preventDefault();
    if (!activeResultEditId) return;

    const res = State.results.find(r => r.id === activeResultEditId);
    if (!res || !res.subjectMarks) return;

    let totalObtained = 0;
    let totalMax = 0;
    let allPassed = true;

    res.subjectMarks.forEach((sm, idx) => {
      const obtInput = document.getElementById(`sub-obt-${idx}`);
      if (obtInput) {
        const val = parseInt(obtInput.value, 10) || 0;
        sm.obtained = Math.min(val, sm.max);
        const subPercent = (sm.obtained / sm.max) * 100;
        sm.grade = calculateGrade(subPercent).grade;
        sm.status = sm.obtained >= sm.pass ? 'PASS' : 'FAIL';
        if (sm.status === 'FAIL') allPassed = false;
      }
      totalObtained += sm.obtained;
      totalMax += sm.max;
    });

    const percent = parseFloat(((totalObtained / totalMax) * 100).toFixed(1));
    const gradeObj = calculateGrade(percent);

    res.totalObtained = totalObtained;
    res.totalMax = totalMax;
    res.percentage = percent;
    res.grade = gradeObj.grade;
    res.overallResult = allPassed && percent >= 40 ? 'PASS' : 'FAIL';

    saveStorage(STORAGE_KEYS.RESULTS, State.results);
    closeModal('modal-result-edit');
    showToast(`Marks updated for ${res.studentId}.`, 'success');
    renderResultsTable();
    renderDashboard();
  }

  function openMeritListModal() {
    recomputeRanks();
    const tbody = document.getElementById('merit-list-tbody');
    if (tbody) {
      const sorted = [...State.results].filter(r => r.published).sort((a, b) => b.percentage - a.percentage);
      if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted p-4">No published results to display in merit list.</td></tr>';
      } else {
        tbody.innerHTML = sorted.map((r, i) => {
          const student = State.students.find(s => s.id === r.studentId) || { name: r.studentId };
          const exam = State.exams.find(e => e.id === r.examId) || { name: r.examId };

          return `
            <tr>
              <td class="font-mono font-bold text-red">#${i + 1}</td>
              <td class="font-bold">${escapeHTML(student.name)}</td>
              <td class="font-mono">${escapeHTML(r.studentId)}</td>
              <td>${escapeHTML(exam.name)}</td>
              <td class="tabular-nums">${r.totalObtained} / ${r.totalMax}</td>
              <td class="tabular-nums font-bold">${r.percentage}%</td>
              <td><span class="font-bold ${r.overallResult === 'PASS' ? 'text-green' : 'text-red'}">${r.grade}</span></td>
            </tr>
          `;
        }).join('');
      }
    }
    openModal('modal-merit-list');
  }

  function resetResultFilters() {
    const s = document.getElementById('res-filter-search');
    const e = document.getElementById('res-filter-exam');
    const st = document.getElementById('res-filter-status');
    if (s) s.value = '';
    if (e) e.value = '';
    if (st) st.value = '';
    renderResultsTable();
  }

  // ---------------------------------------------------------------------------
  // 13. View: Student Marksheet (Official Transcript)
  // ---------------------------------------------------------------------------
  function populateMarksheetSelectors() {
    const stuSelect = document.getElementById('ms-student-select');
    const examSelect = document.getElementById('ms-exam-select');

    if (stuSelect) {
      stuSelect.innerHTML = State.students.map(s => `
        <option value="${s.id}" ${s.id === 'STU-2024-001' ? 'selected' : ''}>${s.name} (${s.id} · ${s.dept})</option>
      `).join('');
    }

    if (examSelect) {
      examSelect.innerHTML = State.exams.map(e => `
        <option value="${e.id}">${e.name} (${e.subjectCode})</option>
      `).join('');
    }
  }

  function renderMarksheet() {
    const stuId = document.getElementById('ms-student-select')?.value || 'STU-2024-001';
    const examId = document.getElementById('ms-exam-select')?.value || State.exams[0]?.id;

    const student = State.students.find(s => s.id === stuId) || State.students[0];
    const exam = State.exams.find(e => e.id === examId) || State.exams[0];
    const unpubAlert = document.getElementById('ms-unpublished-alert');
    const sheet = document.getElementById('printable-marksheet');

    // Find result record
    let res = State.results.find(r => r.studentId === stuId && r.examId === examId);

    // If no existing result, create a standardized draft
    if (!res) {
      res = {
        id: `RES-DRAFT`,
        studentId: stuId,
        examId: examId,
        academicYear: '2025-2026',
        subjectMarks: [
          { code: exam.subjectCode, name: 'Curriculum Coursework', credits: 4, max: exam.maxMarks, pass: exam.passMarks, obtained: Math.round(exam.maxMarks * 0.8), grade: 'A', status: 'PASS' }
        ],
        totalObtained: Math.round(exam.maxMarks * 0.8),
        totalMax: exam.maxMarks,
        totalPass: exam.passMarks,
        percentage: 80.0,
        grade: 'A',
        overallResult: 'PASS',
        rank: 1,
        published: true,
        publishedDate: new Date().toISOString().split('T')[0]
      };
    }

    // Role check: if viewer is student and result is not published, block view
    if (State.currentUser.role === 'student' && !res.published) {
      if (unpubAlert) unpubAlert.classList.remove('hidden');
      if (sheet) sheet.classList.add('hidden');
      return;
    }

    if (unpubAlert) unpubAlert.classList.add('hidden');
    if (sheet) sheet.classList.remove('hidden');

    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    setText('ms-serial-num', `MS-2026-${student.id.replace('STU-', '')}${res.id.replace('RES-', '')}`);
    setText('ms-cand-name', student.name);
    setText('ms-cand-id', student.id);
    setText('ms-cand-dept', student.dept);
    setText('ms-cand-sem', `Semester ${student.sem}`);
    setText('ms-exam-name', exam.name);
    setText('ms-cand-status', res.overallResult);

    const statusEl = document.getElementById('ms-cand-status');
    if (statusEl) {
      statusEl.className = res.overallResult === 'PASS' ? 'ms-val font-bold text-green' : 'ms-val font-bold text-red';
    }

    // Subject table
    let totalCredits = 0;
    let totalMax = 0;
    let totalPass = 0;
    let totalObt = 0;

    const tbody = document.getElementById('ms-subjects-tbody');
    if (tbody) {
      tbody.innerHTML = (res.subjectMarks || []).map((sm, idx) => {
        totalCredits += sm.credits || 4;
        totalMax += sm.max;
        totalPass += sm.pass;
        totalObt += sm.obtained;

        return `
          <tr>
            <td class="text-center">${idx + 1}</td>
            <td class="font-mono font-bold">${escapeHTML(sm.code)}</td>
            <td>${escapeHTML(sm.name)}</td>
            <td class="text-center tabular-nums">${sm.credits || 4}</td>
            <td class="text-right tabular-nums">${sm.max}</td>
            <td class="text-right tabular-nums">${sm.pass}</td>
            <td class="text-right tabular-nums font-bold ${sm.status === 'PASS' ? 'text-green' : 'text-red'}">${sm.obtained}</td>
            <td class="text-center font-bold">${sm.grade}</td>
            <td class="text-center font-bold ${sm.status === 'PASS' ? 'text-green' : 'text-red'}">${sm.status}</td>
          </tr>
        `;
      }).join('');
    }

    setText('ms-total-credits', totalCredits);
    setText('ms-total-max', totalMax);
    setText('ms-total-pass', totalPass);
    setText('ms-total-obtained', totalObt);
    setText('ms-final-grade', res.grade);
    setText('ms-final-pass-label', res.overallResult);

    setText('ms-final-percent', `${res.percentage}%`);
    setText('ms-final-gpa', `${(res.percentage / 10).toFixed(2)} / 10`);
    setText('ms-final-rank', `Rank #${res.rank || 1}`);

    let classification = 'First Class with Distinction';
    if (res.overallResult === 'FAIL') classification = 'Semester Backlog / Failed';
    else if (res.percentage >= 75) classification = 'First Class with Distinction';
    else if (res.percentage >= 60) classification = 'First Class';
    else if (res.percentage >= 50) classification = 'Second Class';
    else classification = 'Pass Division';

    setText('ms-final-classification', classification);
    setText('ms-pub-date', res.publishedDate || 'Under Moderation');
  }

  function printMarksheet() {
    window.print();
  }

  function downloadMarksheetPDF() {
    if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      const stuName = document.getElementById('ms-cand-name')?.textContent || 'Candidate';
      const stuId = document.getElementById('ms-cand-id')?.textContent || 'STU-001';
      const dept = document.getElementById('ms-cand-dept')?.textContent || 'Department';
      const examName = document.getElementById('ms-exam-name')?.textContent || 'Exam';
      const percent = document.getElementById('ms-final-percent')?.textContent || '0%';
      const grade = document.getElementById('ms-final-grade')?.textContent || 'F';
      const rank = document.getElementById('ms-final-rank')?.textContent || 'Rank #1';
      const classification = document.getElementById('ms-final-classification')?.textContent || '';

      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 190, 277);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('DATA ALCOTT INSTITUTE OF TECHNOLOGY & SCIENCE', 105, 22, { align: 'center' });

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Autonomous Institution · Task WD-COL-003', 105, 27, { align: 'center' });

      doc.setTextColor(220, 38, 38);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('OFFICIAL STATEMENT OF MARKS & GRADES', 105, 34, { align: 'center' });

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('ACADEMIC YEAR 2025 – 2026', 105, 40, { align: 'center' });

      doc.line(15, 44, 195, 44);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Student Name:', 20, 52);
      doc.setFont('helvetica', 'normal');
      doc.text(stuName, 60, 52);

      doc.setFont('helvetica', 'bold');
      doc.text('Roll / Student ID:', 20, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(stuId, 60, 60);

      doc.setFont('helvetica', 'bold');
      doc.text('Department:', 20, 68);
      doc.setFont('helvetica', 'normal');
      doc.text(dept, 60, 68);

      doc.setFont('helvetica', 'bold');
      doc.text('Examination:', 20, 76);
      doc.setFont('helvetica', 'normal');
      doc.text(examName, 60, 76);

      // Summary
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 84, 170, 24, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`Cumulative Percentage: ${percent}`, 25, 93);
      doc.text(`Overall Grade: ${grade}`, 85, 93);
      doc.text(`Merit Position: ${rank}`, 140, 93);

      doc.setFont('helvetica', 'normal');
      doc.text(`Classification: ${classification}`, 25, 101);

      // Signatures
      doc.line(25, 230, 75, 230);
      doc.text('Dean of Academics', 35, 235);

      doc.line(135, 230, 185, 230);
      doc.text('Controller of Examinations', 140, 235);

      doc.save(`Marksheet_${stuId}.pdf`);
      showToast('Official mark sheet downloaded as PDF.', 'success');
    } else {
      window.print();
    }
  }

  // ---------------------------------------------------------------------------
  // 14. View: Reports & Analytics
  // ---------------------------------------------------------------------------
  function initReportsView() {
    const examSelect = document.getElementById('report-filter-exam');
    if (examSelect && examSelect.options.length <= 1) {
      examSelect.innerHTML = '<option value="">All Examinations</option>' +
        State.exams.map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('');
    }
    renderActiveReport();
  }

  function switchReportType() {
    renderActiveReport();
  }

  function renderActiveReport() {
    const repType = document.getElementById('report-type-select')?.value || 'schedule';
    const dept = document.getElementById('report-filter-dept')?.value || '';
    const examId = document.getElementById('report-filter-exam')?.value || '';

    const thead = document.getElementById('report-active-thead');
    const tbody = document.getElementById('report-active-tbody');
    const title = document.getElementById('report-table-title');
    const subtitle = document.getElementById('report-table-subtitle');
    const countBadge = document.getElementById('report-records-count');
    const emptyState = document.getElementById('report-empty-state');

    if (!thead || !tbody) return;

    let headers = '';
    let rows = '';
    let recordsCount = 0;

    switch (repType) {
      case 'schedule':
        if (title) title.textContent = 'Examination Timetable & Venue Report';
        if (subtitle) subtitle.textContent = 'Active institutional timetable schedule across departments';
        headers = `
          <tr>
            <th>Exam ID</th>
            <th>Title</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Date & Time</th>
            <th>Duration</th>
            <th>Venue</th>
            <th>Status</th>
          </tr>
        `;
        const exams = State.exams.filter(e => {
          const sub = State.subjects.find(s => s.code === e.subjectCode);
          const matchDept = !dept || (sub && sub.dept === dept);
          const matchExam = !examId || e.id === examId;
          return matchDept && matchExam;
        });
        recordsCount = exams.length;
        rows = exams.map(e => `
          <tr>
            <td class="font-mono font-bold">${e.id}</td>
            <td class="font-bold">${escapeHTML(e.name)}</td>
            <td>${escapeHTML(e.subjectCode)}</td>
            <td>${escapeHTML(e.type)}</td>
            <td>${escapeHTML(e.date)} (${e.startTime})</td>
            <td>${e.duration}m</td>
            <td>${escapeHTML(e.venue)}</td>
            <td><span class="badge badge-${e.status.toLowerCase().replace(/\s+/g, '-')}">${e.status}</span></td>
          </tr>
        `).join('');
        break;

      case 'results':
        if (title) title.textContent = 'Student Results & Grade Summary Report';
        if (subtitle) subtitle.textContent = 'Aggregated transcripts with final score calculations and pass indicators';
        headers = `
          <tr>
            <th>Roll ID</th>
            <th>Candidate Name</th>
            <th>Department</th>
            <th>Exam</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Result</th>
          </tr>
        `;
        const resList = State.results.filter(r => {
          const stu = State.students.find(s => s.id === r.studentId);
          const matchDept = !dept || (stu && stu.dept === dept);
          const matchExam = !examId || r.examId === examId;
          return matchDept && matchExam;
        });
        recordsCount = resList.length;
        rows = resList.map(r => {
          const stu = State.students.find(s => s.id === r.studentId) || { name: r.studentId, dept: 'N/A' };
          const ex = State.exams.find(e => e.id === r.examId) || { name: r.examId };
          return `
            <tr>
              <td class="font-mono font-bold">${r.studentId}</td>
              <td class="font-bold">${escapeHTML(stu.name)}</td>
              <td>${escapeHTML(stu.dept)}</td>
              <td>${escapeHTML(ex.name)}</td>
              <td class="tabular-nums">${r.totalObtained} / ${r.totalMax}</td>
              <td class="tabular-nums font-bold">${r.percentage}%</td>
              <td class="font-bold">${r.grade}</td>
              <td><span class="badge ${r.overallResult === 'PASS' ? 'badge-completed' : 'badge-cancelled'}">${r.overallResult}</span></td>
            </tr>
          `;
        }).join('');
        break;

      case 'subject-perf':
        if (title) title.textContent = 'Curriculum Subject Performance Report';
        if (subtitle) subtitle.textContent = 'Pass percentage, faculty workloads, and credit allocations';
        headers = `
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Department</th>
            <th>Faculty</th>
            <th>Credits</th>
            <th>Max Marks</th>
            <th>Passing Marks</th>
          </tr>
        `;
        const subs = State.subjects.filter(s => !dept || s.dept === dept);
        recordsCount = subs.length;
        rows = subs.map(s => `
          <tr>
            <td class="font-mono font-bold text-red">${s.code}</td>
            <td class="font-bold">${escapeHTML(s.name)}</td>
            <td>${escapeHTML(s.dept)}</td>
            <td>${escapeHTML(s.teacher)}</td>
            <td>${s.credits}</td>
            <td>${s.maxMarks}</td>
            <td>${s.passMarks}</td>
          </tr>
        `).join('');
        break;

      case 'pass-fail':
        if (title) title.textContent = 'Institutional Pass / Fail Analysis';
        if (subtitle) subtitle.textContent = 'Pass rate indicators and failure distribution metrics';
        headers = `
          <tr>
            <th>Examination</th>
            <th>Total Candidates</th>
            <th>Passed</th>
            <th>Failed</th>
            <th>Pass Percentage</th>
            <th>Status</th>
          </tr>
        `;
        recordsCount = State.exams.length;
        rows = State.exams.map(e => {
          const eResults = State.results.filter(r => r.examId === e.id);
          const passed = eResults.filter(r => r.overallResult === 'PASS').length;
          const failed = eResults.length - passed;
          const rate = eResults.length ? ((passed / eResults.length) * 100).toFixed(1) : '100.0';

          return `
            <tr>
              <td class="font-bold">${escapeHTML(e.name)} (${e.id})</td>
              <td class="tabular-nums">${eResults.length || 1}</td>
              <td class="tabular-nums text-green font-bold">${passed || 1}</td>
              <td class="tabular-nums text-red font-bold">${failed}</td>
              <td class="tabular-nums font-bold">${rate}%</td>
              <td><span class="badge ${parseFloat(rate) >= 50 ? 'badge-completed' : 'badge-cancelled'}">${parseFloat(rate) >= 50 ? 'Satisfactory' : 'Needs Review'}</span></td>
            </tr>
          `;
        }).join('');
        break;

      case 'merit':
        if (title) title.textContent = 'Institutional Merit List & Honors Roster';
        if (subtitle) subtitle.textContent = 'Top ranked academic candidates in order of percentage';
        headers = `
          <tr>
            <th>Rank</th>
            <th>Candidate Name</th>
            <th>Roll ID</th>
            <th>Examination</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Honors</th>
          </tr>
        `;
        recomputeRanks();
        const meritList = [...State.results].sort((a, b) => b.percentage - a.percentage);
        recordsCount = meritList.length;
        rows = meritList.map((r, i) => {
          const stu = State.students.find(s => s.id === r.studentId) || { name: r.studentId };
          const ex = State.exams.find(e => e.id === r.examId) || { name: r.examId };
          return `
            <tr>
              <td class="font-mono font-bold text-red">#${i + 1}</td>
              <td class="font-bold">${escapeHTML(stu.name)}</td>
              <td class="font-mono">${escapeHTML(r.studentId)}</td>
              <td>${escapeHTML(ex.name)}</td>
              <td class="tabular-nums font-bold">${r.percentage}%</td>
              <td class="font-bold">${r.grade}</td>
              <td>${r.percentage >= 85 ? '<span class="kpi-pill success">Dean’s Honor Roll</span>' : 'Standard'}</td>
            </tr>
          `;
        }).join('');
        break;

      case 'status':
        if (title) title.textContent = 'Examination Cycle Completion Status';
        if (subtitle) subtitle.textContent = 'Administrative tracking of pending evaluations and publications';
        headers = `
          <tr>
            <th>Exam ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Evaluation Status</th>
            <th>Result Publication</th>
          </tr>
        `;
        recordsCount = State.exams.length;
        rows = State.exams.map(e => {
          const eRes = State.results.filter(r => r.examId === e.id);
          const isPublished = eRes.some(r => r.published);
          return `
            <tr>
              <td class="font-mono font-bold">${e.id}</td>
              <td class="font-bold">${escapeHTML(e.name)}</td>
              <td>${escapeHTML(e.date)}</td>
              <td><span class="badge badge-${e.status.toLowerCase().replace(/\s+/g, '-')}">${e.status}</span></td>
              <td><span class="badge ${isPublished ? 'badge-published' : 'badge-results-pending'}">${isPublished ? 'Published' : 'Pending'}</span></td>
            </tr>
          `;
        }).join('');
        break;
    }

    thead.innerHTML = headers;
    tbody.innerHTML = rows;
    if (countBadge) countBadge.textContent = `${recordsCount} Records Found`;

    if (recordsCount === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    renderReportChart(repType);
  }

  function renderReportChart(repType) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById('chart-report-visual');
    if (!canvas) return;

    if (State.charts.reportVisual) State.charts.reportVisual.destroy();

    const isDark = State.theme === 'dark';
    const textColor = isDark ? '#F8FAFC' : '#0F172A';

    // Different chart based on report
    if (repType === 'pass-fail' || repType === 'merit' || repType === 'results') {
      // Grade distribution
      const gradeCounts = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
      State.results.forEach(r => {
        if (gradeCounts[r.grade] !== undefined) gradeCounts[r.grade]++;
        else gradeCounts[r.grade] = 1;
      });

      State.charts.reportVisual = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: Object.keys(gradeCounts),
          datasets: [{
            data: Object.values(gradeCounts),
            backgroundColor: ['#16A34A', '#2563EB', '#3B82F6', '#F59E0B', '#D97706', '#94A3B8', '#DC2626'],
            borderWidth: 2,
            borderColor: isDark ? '#1E293B' : '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: textColor } }
          }
        }
      });
    } else {
      // Subject credits or exam durations bar
      const labels = State.subjects.slice(0, 6).map(s => s.code);
      const data = State.subjects.slice(0, 6).map(s => s.credits * 25);

      State.charts.reportVisual = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Relative Weightage',
            data,
            backgroundColor: '#DC2626',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, ticks: { color: textColor } },
            x: { ticks: { color: textColor } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  function resetReportFilters() {
    const dept = document.getElementById('report-filter-dept');
    const exam = document.getElementById('report-filter-exam');
    if (dept) dept.value = '';
    if (exam) exam.value = '';
    renderActiveReport();
  }

  function printActiveReport() {
    window.print();
  }

  // ---------------------------------------------------------------------------
  // 15. CSV Export Engine (Native Vanilla JS)
  // ---------------------------------------------------------------------------
  function downloadCSV(filename, rows) {
    const processRow = row => row.map(val => {
      let text = (val === null || val === undefined) ? '' : String(val);
      text = text.replace(/"/g, '""');
      if (text.search(/("|,|\n)/g) >= 0) text = `"${text}"`;
      return text;
    }).join(',');

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(processRow).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`CSV file "${filename}" downloaded.`, 'success');
  }

  function exportExamsCSV() {
    const rows = [
      ['Exam ID', 'Exam Name', 'Subject Code', 'Type', 'Date', 'Start Time', 'End Time', 'Duration', 'Max Marks', 'Passing Marks', 'Venue', 'Status']
    ];
    State.exams.forEach(e => {
      rows.push([e.id, e.name, e.subjectCode, e.type, e.date, e.startTime, e.endTime, e.duration, e.maxMarks, e.passMarks, e.venue, e.status]);
    });
    downloadCSV('ExamPro_Examinations_Schedule.csv', rows);
  }

  function exportSubjectsCSV() {
    const rows = [
      ['Subject Code', 'Subject Name', 'Department', 'Semester', 'Faculty Teacher', 'Credits', 'Max Marks', 'Pass Marks']
    ];
    State.subjects.forEach(s => {
      rows.push([s.code, s.name, s.dept, s.sem, s.teacher, s.credits, s.maxMarks, s.passMarks]);
    });
    downloadCSV('ExamPro_Curriculum_Subjects.csv', rows);
  }

  function exportAnswerSheetsCSV() {
    const rows = [
      ['Submission ID', 'Student ID', 'Exam ID', 'Submitted At', 'Auto Score', 'Descriptive Score', 'Total Score', 'Evaluation Status']
    ];
    State.answerSheets.forEach(as => {
      rows.push([as.id, as.studentId, as.examId, as.submittedAt, as.objectiveScore, as.descriptiveScore, as.totalScore, as.status]);
    });
    downloadCSV('ExamPro_Submitted_AnswerSheets.csv', rows);
  }

  function exportResultsCSV() {
    const rows = [
      ['Result ID', 'Student ID', 'Exam ID', 'Total Obtained', 'Total Max', 'Percentage', 'Grade', 'Result', 'Rank', 'Published']
    ];
    State.results.forEach(r => {
      rows.push([r.id, r.studentId, r.examId, r.totalObtained, r.totalMax, r.percentage, r.grade, r.overallResult, r.rank, r.published ? 'Yes' : 'No']);
    });
    downloadCSV('ExamPro_Academic_Results.csv', rows);
  }

  function exportMeritListCSV() {
    const rows = [
      ['Rank', 'Candidate Name', 'Student ID', 'Exam ID', 'Percentage', 'Grade', 'Status']
    ];
    const sorted = [...State.results].sort((a, b) => b.percentage - a.percentage);
    sorted.forEach((r, idx) => {
      const stu = State.students.find(s => s.id === r.studentId) || { name: r.studentId };
      rows.push([idx + 1, stu.name, r.studentId, r.examId, r.percentage, r.grade, r.overallResult]);
    });
    downloadCSV('ExamPro_Merit_List.csv', rows);
  }

  function exportActiveReportCSV() {
    const repType = document.getElementById('report-type-select')?.value || 'schedule';
    if (repType === 'schedule') exportExamsCSV();
    else if (repType === 'subject-perf') exportSubjectsCSV();
    else if (repType === 'merit') exportMeritListCSV();
    else exportResultsCSV();
  }

  // ---------------------------------------------------------------------------
  // 16. Reset Demo Data & Initial Setup
  // ---------------------------------------------------------------------------
  function resetDemoData() {
    const title = document.getElementById('confirm-modal-title');
    const msg = document.getElementById('confirm-modal-msg');
    const btn = document.getElementById('confirm-modal-ok-btn');

    if (title) title.textContent = 'Reset All Demo Data';
    if (msg) msg.textContent = 'This will restore all default examinations, subjects, students, answer sheets, and grading results to clean demo state. Custom edits will be reset. Proceed?';

    if (btn) {
      btn.onclick = () => {
        localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
        localStorage.removeItem(STORAGE_KEYS.EXAMS);
        localStorage.removeItem(STORAGE_KEYS.STUDENTS);
        localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
        localStorage.removeItem(STORAGE_KEYS.ANSWERS);
        localStorage.removeItem(STORAGE_KEYS.RESULTS);

        State.subjects = [...DEFAULT_SUBJECTS];
        State.exams = [...DEFAULT_EXAMS];
        State.students = [...DEFAULT_STUDENTS];
        State.questions = [...ONLINE_QUESTIONS];
        State.answerSheets = [...DEFAULT_ANSWER_SHEETS];
        State.results = [...DEFAULT_RESULTS];

        saveStorage(STORAGE_KEYS.SUBJECTS, State.subjects);
        saveStorage(STORAGE_KEYS.EXAMS, State.exams);
        saveStorage(STORAGE_KEYS.STUDENTS, State.students);
        saveStorage(STORAGE_KEYS.QUESTIONS, State.questions);
        saveStorage(STORAGE_KEYS.ANSWERS, State.answerSheets);
        saveStorage(STORAGE_KEYS.RESULTS, State.results);

        closeModal('modal-confirm');
        showToast('All demo datasets have been successfully reset to defaults.', 'success');
        renderActiveView();
      };
    }

    openModal('modal-confirm');
  }

  // Auth & Login
  function switchAuthTab(tab) {
    const loginBtn = document.getElementById('tab-login-btn');
    const regBtn = document.getElementById('tab-register-btn');
    const loginPane = document.getElementById('auth-login-pane');
    const regPane = document.getElementById('auth-register-pane');

    if (tab === 'login') {
      loginBtn?.classList.add('active');
      regBtn?.classList.remove('active');
      loginPane?.classList.remove('hidden');
      regPane?.classList.add('hidden');
    } else {
      loginBtn?.classList.remove('active');
      regBtn?.classList.add('active');
      loginPane?.classList.add('hidden');
      regPane?.classList.remove('hidden');
    }
  }

  function quickLogin(role) {
    switchRole(role);
    closeModal('modal-login');
  }

  function handleLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email')?.value.trim();
    if (email.includes('teacher')) switchRole('teacher');
    else if (email.includes('student')) switchRole('student');
    else switchRole('admin');

    closeModal('modal-login');
  }

  function handleRegisterForm(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const role = document.getElementById('reg-role')?.value || 'student';

    State.currentUser = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      name: name || 'Demo User',
      email: email || 'user@demo.edu',
      role: role,
      dept: role === 'student' ? 'Computer Science' : 'Academic Affairs',
      avatar: (name || 'DU').slice(0, 2).toUpperCase()
    };

    saveStorage(STORAGE_KEYS.USER, State.currentUser);
    updateUserUI();
    closeModal('modal-login');
    showToast(`Account created! Welcome, ${name}.`, 'success');
    renderActiveView();
  }

  function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  // Global Search
  function handleGlobalSearch(query) {
    if (!query) return;
    const q = query.toLowerCase();

    // Check subjects
    const sub = State.subjects.find(s => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    if (sub) {
      navigateTo('subjects');
      const searchInput = document.getElementById('subject-filter-search');
      if (searchInput) {
        searchInput.value = query;
        renderSubjectsTable();
      }
      return;
    }

    // Check exams
    const exam = State.exams.find(e => e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q));
    if (exam) {
      navigateTo('exams');
      const searchInput = document.getElementById('exam-filter-search');
      if (searchInput) {
        searchInput.value = query;
        renderExamsTable();
      }
      return;
    }

    // Check students
    const stu = State.students.find(s => s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    if (stu) {
      navigateTo('hall-tickets');
      const stuSelect = document.getElementById('ht-student-select');
      if (stuSelect) {
        stuSelect.value = stu.id;
        renderHallTicket();
      }
      return;
    }

    showToast(`No matching records for "${query}".`, 'info');
  }

  function initNotifications() {
    const list = document.getElementById('notif-list');
    if (!list) return;

    const notifs = [
      { title: 'End-Semester Timetable Published', time: '10 mins ago', desc: 'Examinations commence on 05 Nov 2026.' },
      { title: 'Web Tech Online Assessment Ready', time: '2 hours ago', desc: '10 MCQ items available in simulated testing.' },
      { title: 'Digital Signal Processing Results Draft', time: '1 day ago', desc: 'Pending final COE signature and release.' }
    ];

    list.innerHTML = notifs.map(n => `
      <div class="notif-entry">
        <div class="notif-title">${escapeHTML(n.title)}</div>
        <div class="text-xs text-muted mb-1">${escapeHTML(n.desc)}</div>
        <div class="notif-time">${escapeHTML(n.time)}</div>
      </div>
    `).join('');
  }

  // ---------------------------------------------------------------------------
  // 17. Initialization & Event Listeners
  // ---------------------------------------------------------------------------
  function init() {
    // 1. Theme
    applyTheme(State.theme);

    // 2. User & RBAC
    updateUserUI();

    // 3. Navigation Click Handlers
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) navigateTo(view);
      });
    });

    // 4. Sidebar Toggles
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const overlay = document.getElementById('sidebar-overlay');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleMobileSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);

    // 5. Theme Toggle Button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // 6. Reset Demo Data Button
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetDemoData);

    // 7. Role Switcher Select
    const quickRoleSelect = document.getElementById('quick-role-select');
    if (quickRoleSelect) {
      quickRoleSelect.addEventListener('change', (e) => switchRole(e.target.value));
    }

    // 8. User Profile Dropdown Toggle
    const userBtn = document.getElementById('user-profile-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
      });
    }

    // 9. Notification Dropdown Toggle
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
      });
    }

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      if (userDropdown) userDropdown.classList.add('hidden');
      if (notifDropdown) notifDropdown.classList.add('hidden');
    });

    // Role switcher items inside dropdown
    document.querySelectorAll('.switch-role-item').forEach(item => {
      item.addEventListener('click', () => {
        const role = item.getAttribute('data-role');
        if (role) switchRole(role);
      });
    });

    const openLoginBtn = document.getElementById('btn-open-login');
    if (openLoginBtn) openLoginBtn.addEventListener('click', () => openModal('modal-login'));

    // 10. Global Search Input
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleGlobalSearch(searchInput.value.trim());
      });
    }

    // 11. Live Table Filters
    document.getElementById('exam-filter-search')?.addEventListener('input', renderExamsTable);
    document.getElementById('exam-filter-type')?.addEventListener('change', renderExamsTable);
    document.getElementById('exam-filter-subject')?.addEventListener('change', renderExamsTable);
    document.getElementById('exam-filter-status')?.addEventListener('change', renderExamsTable);

    document.getElementById('subject-filter-search')?.addEventListener('input', renderSubjectsTable);
    document.getElementById('subject-filter-dept')?.addEventListener('change', renderSubjectsTable);
    document.getElementById('subject-filter-sem')?.addEventListener('change', renderSubjectsTable);

    document.getElementById('as-filter-search')?.addEventListener('input', renderAnswerSheetsTable);
    document.getElementById('as-filter-exam')?.addEventListener('change', renderAnswerSheetsTable);
    document.getElementById('as-filter-status')?.addEventListener('change', renderAnswerSheetsTable);

    document.getElementById('res-filter-search')?.addEventListener('input', renderResultsTable);
    document.getElementById('res-filter-exam')?.addEventListener('change', renderResultsTable);
    document.getElementById('res-filter-status')?.addEventListener('change', renderResultsTable);

    // Initial Notifications
    initNotifications();

    // Initial Render
    navigateTo('dashboard');
  }

  // Expose public API for HTML inline event handlers
  window.ExamPro = {
    navigateTo,
    openModal,
    closeModal,
    showToast,
    switchRole,
    quickLogin,
    switchAuthTab,
    handleLoginForm,
    handleRegisterForm,
    togglePasswordVisibility,

    // Exam Scheduling
    openScheduleModal,
    saveExamForm,
    viewExamDetails,
    confirmDeleteExam,
    resetExamFilters,
    exportExamsCSV,

    // Subject Management
    openSubjectModal,
    saveSubjectForm,
    viewSubjectDetails,
    confirmDeleteSubject,
    resetSubjectFilters,
    exportSubjectsCSV,

    // Hall Ticket
    renderHallTicket,
    printHallTicket,
    downloadHallTicketPDF,

    // Online Exam Simulation
    updateOnlineLobbyDetails,
    resetOnlineExamLobby,
    startOnlineExam,
    selectOption,
    clearQuestionAnswer,
    toggleReviewFlag,
    prevQuestion,
    nextQuestion,
    jumpToQuestion,
    confirmSubmitExam,

    // Answer Sheet
    openEvaluateModal,
    saveEvaluationMarks,
    resetAnswerSheetFilters,
    exportAnswerSheetsCSV,

    // Result Processing
    togglePublishResult,
    publishAllFilteredResults,
    openEditResultModal,
    saveResultMarks,
    openMeritListModal,
    resetResultFilters,
    exportResultsCSV,
    exportMeritListCSV,

    // Marksheet
    renderMarksheet,
    printMarksheet,
    downloadMarksheetPDF,

    // Reports
    switchReportType,
    renderActiveReport,
    resetReportFilters,
    printActiveReport,
    exportActiveReportCSV,

    // System
    resetDemoData
  };

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
