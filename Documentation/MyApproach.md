### **Developer Tag Assessment: My Approach**

**Project Summary**

* **Total Time to Complete:** 10 hours and 50 minutes
* **AI Contribution:** 70% (Heavily steered and directed by me)
* **Manual Contribution:** 30% (Correcting AI-generated code and writing complex logic manually)

---

### **Activity Log**

| Date & Time | Activity Description | Duration |
| --- | --- | --- |
| **11 March** |  |  |
| 4:27 PM | **Start Time.** I will first give it to Claude Sonnet AI to give me a complete overview of which technologies can be used, which options I have available, and other details. | — |
| 4:27 PM – 4:46 PM | **Prompting & Analysis:** Asked AI to analyze the PDF and provide a tech stack, folder structure, and workflow. Decided to prepare 70-80% of the backend first, complete paperwork (FRs), and skip the ERD as no database is required. | 19 mins |
| 4:46 PM – 5:21 PM | **Break** | — |
| 5:21 PM – 6:05 PM | Created repo; added FRs and project details. Analyzed tech stack with AI. Clarified questions for Claude and requested a prompt for the Claude Copilot agent. Delegated initial creation to the agent since the project is simple. | 44 mins |
| 6:05 PM – 10:20 PM | **Break** | — |
| 10:20 PM – 10:30 PM | Resumed work. Provided an existing repo to the coding agent so it could adopt my existing code practices for the new project. | 10 mins |
| 10:30 PM – 11:03 PM | Agent started working. I explored the `pdfjs-dist` library for better understanding and steered the coding agent while it worked. | 33 mins |
| 11:03 PM – 11:29 PM | Agent finished; checked the code. Switched to the Copilot branch, installed dependencies via `npm i`, and started the project in development mode. | 26 mins |
| 11:29 PM – 12:16 AM | **Testing & Debugging:** Tested with sample PDFs. Found 70% accuracy; code missed questions on some samples. Handled 19MB file (returned wrong page numbers). Identified that numbering (1, 2, 3) vs (Q1) caused issues. | 47 mins |
| **12 March** |  |  |
| 12:16 AM – 9:58 PM | **Break** | — |
| 9:58 PM – 1:50 AM | **Refinement:** Analyzed code and handled edge cases (last page range logic). Added "Q" before question numbers for UX. Created logic for parentheses for multiple questions. All done manually without AI. | 3 hrs 52 mins |
| **13 March** |  |  |
| 1:50 AM – 10:18 PM | **Break** | — |
| 10:18 PM – 1:40 AM | **Optimization:** Made regex for page and question detectors robust. Refactored code for modularity and Single Responsibility Principle. Reduced file lengths to under 100 lines to meet industry standards. Merged PR to main. | 3 hrs 22 mins |
| **14 March** |  |  |
| 1:40 AM – 5:43 AM | **Break** | — |
| 5:43 AM – 6:20 AM | **Deployment:** Configured env variables. Switched to Netlify as Vercel was slow. Fixed frontend env vars, CORS issues, and missing routes. Successfully tested multiple file uploads. | 37 mins |
| **6:20 AM** | **Work Finished.** | **Total: 10h 50m** |

---

### **Final Deployment Links**

* **Backend (Render):** [https://pdf-question-mapper-phpk.onrender.com](https://pdf-question-mapper-phpk.onrender.com)
* **Frontend (Vercel):** [https://pdf-question-mapper-xi.vercel.app](https://pdf-question-mapper-xi.vercel.app)