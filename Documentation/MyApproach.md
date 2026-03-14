### **Developer Tag Assessment: My Approach**

**Project Overview**

* **Total Time Spent:** 10 hours and 50 minutes
* **AI Contribution:** 70% (Heavily steered and directed by me)
* **Manual Contribution:** 30% (Correcting AI-generated code and writing manual logic)

---

### **Detailed Activity Log**

| Timeframe | Activity Details (Verbatim Logs) | Duration |
| --- | --- | --- |
| **11 March** |  |  |
| 4:27 PM | **Start Time.** I will first give it to Claude Sonnet AI to give me a complete overview of which technologies can be used, which options I have available, and other details. | — |
| 4:27 PM – 4:46 PM | **My prompt:** "Can you take this PDF file and analyze it completely and then tell me the complete overview of how this can be achieved. Don't return any code, just tell which technologies can be used, which options I have available, what should be folder structure, what should be recommended tech stack, what should be my workflow, I think we should prepare 70-80% of backend first and then move on to frontend. Moreover, even before that, I think we should complete paperwork like listing out FRs and I also think that we don't need ERD as it does not require database at all. You can ask me questions if you need clarification regarding anything." Converting PDF to TXT as AI chat does not take PDF input. | 19 mins |
| 4:46 PM – 5:21 PM | Taking break. | — |
| 5:21 PM – 6:05 PM | Starting work. Create repo for project. Added FRs and other project details to repo. Analyzing approaches and tech stack with AI. Clarifying questions of Claude and asking him to return prompt which can be passed to Claude agent. **Prompt:** "also give me prompt which I can give to Claude Copilot agent and he can implement whole thing for me." Delegating initial creation of the project to an AI agent because the project is simple and no architectural decisions are to be made. If it would have been some big project, I would have preferred to lay the foundation like making project folder structure, making ERDs, deciding on tech stack etc. myself. | 44 mins |
| 6:05 PM – 10:20 PM | Taking break. | — |
| 10:20 PM – 10:30 PM | Resuming work. I will also be giving one of my existing repos to the coding agent so he can pick my existing code practices and implement whatever can be used in the new project. | 10 mins |
| 10:30 PM – 11:03 PM | Agent has started working and I can even work on any other thing while it works. While the agent works I have started exploring `pdfjs-dist` library for better understanding. Steering coding agent while it works. | 33 mins |
| 11:03 PM – 11:29 PM | Coding agent finished working and now checking the code the agent created. Switched to branch created by Copilot and now installing dependencies using `npm i`. Dependencies are installed and now trying to run project in development mode. | 26 mins |
| 11:29 PM – 12:16 AM | Asked AI to give links to sample PDFs, downloaded a sample Cambridge paper and as expected it's only 70% accurate and 30% wrong. Code is not picking questions at all. 2nd sample PDF doesn't have page numbers so no data is returned because questions are mapped to page numbers and if page numbers don't exist then questions should not be mapped to anything. Trying to give large file 19MB and let's see if our system can handle it or not? Well, it did return page numbers but they are wrong and incomplete. Moreover, still no questions. The questions are not coming because there are simple numbering of questions like 1, 2, 3 not Q1 or Question 1. We can use AI API to pass on the extracted PDF for better results but I don't think that is in the scope of this project. Page number extraction is also wrong and we will have to look into it. Page number extraction worked perfectly for one of the PDFs. The app doesn't work with PDFs of images which isn't the requirement either. Worked 99% fine for the PDF that is according to the requirements. | 47 mins |
| **12 March** |  |  |
| 12:16 AM – 9:58 PM | Taking break. | — |
| 9:58 PM – 1:50 AM | Resuming work. Now we should analyze the code carefully and analyze handling of edge cases. Last page's range was having "continue" so deleted that logic. Returned single item in range when there is only one question on the page. Added Q before every question number for better UX. Was able to do all these without AI which demonstrates my problem-solving skills in real-world projects. Planning to create own PDF of sample exam papers for better testing. Planning to create logic that does not show all questions in parentheses if there is only one or two questions. Created this logic within two minutes because it was easy. Now only shows question number in parentheses if there are more than two questions on the page. Planning to add more variations of questions. Making the regex more robust by adding more extensive variations. | 3 hrs 52 mins |
| **13 March** |  |  |
| 1:50 AM – 10:18 PM | Taking break. | — |
| 10:18 PM – 1:40 AM | Resuming work. Made the regex of page detector and question detector extensive and robust. Working fine for most of the PDF. Not working for PDFs that have question numbers just as 1, 2, 3 which is fine. Now reading each line of code so that no bad code is pushed to the prod. Making the code modular so easier to understand. Reduced the files length from 100+ lines to less than 100 to meet industry standards. Used Single Responsibility Design Principle where each file is doing a single task. Merging dev branch PR to main. | 3 hrs 22 mins |
| **14 March** |  |  |
| 1:40 AM – 5:43 AM | Taking break. | — |
| 5:43 AM – 6:20 AM | Resuming work. Moving to deployment part, development part is finished. Configuring env variables. Taking so much time due to slow internet. Thinking of switching to Netlify because Vercel is getting very slow. Deployed on Vercel now testing. Fixed frontend env var name issue. Fixed CORS issue. Fixed missing route issue. Working successfully and allows multiple file uploads. Backend is deployed on Render and frontend on Vercel. Finished working. | 37 mins |
|  | **Total Active Work Time** | **10 hrs 50 mins** |

---

### **Live Links**

* **Backend:** [https://pdf-question-mapper-phpk.onrender.com](https://pdf-question-mapper-phpk.onrender.com)
* **Frontend:** [https://pdf-question-mapper-xi.vercel.app](https://pdf-question-mapper-xi.vercel.app)