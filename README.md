# PDF Question Mapper

A full-stack MERN web app that analyzes uploaded exam PDFs and returns a structured summary of printed page numbers and question distribution.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Axios + Tailwind CSS |
| Backend | Node.js + Express |
| PDF Parsing | pdfjs-dist (latest LTS, ESM) |
| Logic & Analysis | Hybrid: Regex (question IDs) + Spatial zones (printed page numbers) |
| File Upload | Multer (memory storage) |

## Setup

### Server (runs on port 5000)

```bash
cd server
npm install
node app.js
```

### Client (runs on port 5173)

```bash
cd client
npm install
npm run dev
```

## API

### `POST /api/analyze-pdf`

Upload one or more PDFs using `multipart/form-data` with field name `files`.

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "fileName": "paper.pdf",
        "totalPages": 10,
        "printedPageSequence": [1, 2, 4, 5],
        "pageSummary": [
          { "printedPage": 1, "range": null, "questionStarts": [] },
          { "printedPage": 2, "range": "1-5", "questionStarts": [1,2,3,4,5] },
          { "printedPage": 4, "range": "8-10", "questionStarts": [8,9,10] },
          { "printedPage": 5, "range": "11-continue", "questionStarts": [11] }
        ]
      }
    ]
  }
}
```

## Project Structure

```
pdf-question-mapper/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   └── ResultSummary.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── server/                        # Node/Express backend
│   ├── routes/
│   │   └── analyze.js             # POST /api/analyze-pdf
│   ├── services/
│   │   ├── pdfExtractor.js        # Raw text + positional extraction via pdfjs-dist
│   │   ├── pageNumberDetector.js  # Printed page number detection (spatial + regex)
│   │   └── questionDetector.js    # Question pattern detection (regex)
│   ├── utils/
│   │   ├── positionHelper.js      # Spatial zone classification
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── app.js
│   └── package.json
│
├── Documentation/
│   └── FunctionalRequirements.md
└── README.md
```

