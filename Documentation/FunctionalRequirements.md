Functional Requirements (FRs)
FR1 — User can upload one or multiple PDF files via the UI. 
FR2 — System extracts the total number of pages in each PDF. 
FR3 — System detects the printed page number from each page using positional/text analysis (top/bottom/corners), preserving exact order without sorting or filling gaps. 
FR4 — System detects question starts using patterns: Q1, Q.1, Q 1, Q(1), Question 1, etc. 
FR5 — System maps which questions start on which printed page. 
FR6 — System computes min-max range of question numbers per page; returns null if none. 
FR7 — API returns structured JSON per file (as specified). 
FR8 — Frontend displays a clean, readable summary per file. 
FR9 — System must NOT normalize, sort, or infer missing pages/questions. 