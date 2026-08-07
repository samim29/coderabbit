# Interview AI

Interview AI is a full-stack interview-preparation app that turns a target job description and a candidate profile into a personalized interview report. Users can upload a PDF resume or provide a short self-description, then receive an AI-generated match score, question bank, skill-gap analysis, and day-by-day preparation plan.

## Features

- Account registration, login, logout, and protected routes
- Cookie-based JWT authentication with token blacklisting on logout
- PDF resume upload and text extraction
- AI-generated interview reports tailored to a job description and candidate profile
- Technical and behavioral practice questions, including answer guidance
- Match score, skill-gap severity, and a daily preparation plan
- Saved report history for each user

## Tech stack

- **Frontend:** React 19, Vite, React Router, Axios, Sass
- **Backend:** Node.js, Express, Mongoose, Multer, JWT, bcrypt
- **Database:** MongoDB
- **AI:** Google Gemini via `@google/genai`

## Project structure

```text
.
+-- Backend/                 # Express API, database models, and AI integration
|   +-- src/
|   |   +-- controllers/
|   |   +-- middlewares/
|   |   +-- models/
|   |   +-- routes/
|   |   `-- services/
|   `-- server.js
`-- Frontend/                # React + Vite client
    `-- src/
        +-- features/auth/
        `-- features/interview/
```

## Prerequisites

- Node.js 18 or later
- A MongoDB database (local or Atlas)
- A Google AI Studio API key with access to a Gemini model

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd interview-ai-yt
```

### 2. Configure the backend

Create `Backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=your-google-ai-studio-api-key

# Optional. Defaults to gemini-3.5-flash.
GEMINI_MODEL=gemini-3.5-flash
```

Install dependencies and start the API:

```bash
cd Backend
npm install
npm run dev
```

The backend runs at `http://localhost:3000`.

### 3. Start the frontend

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## How to use

1. Create an account or sign in.
2. Open the interview workspace.
3. Paste the job description you want to target.
4. Upload a PDF resume (up to 3 MB) and/or add a short self-description.
5. Generate the interview strategy and review the saved report.

## API overview

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Create an account |
| `POST` | `/api/auth/login` | No | Sign in and set the auth cookie |
| `GET` | `/api/auth/logout` | No | Clear the auth cookie and blacklist its token |
| `GET` | `/api/auth/get-me` | Yes | Get the current user |
| `POST` | `/api/interview/` | Yes | Create an interview report (`multipart/form-data`) |
| `GET` | `/api/interview/` | Yes | List the current user's reports |
| `GET` | `/api/interview/report/:interviewId` | Yes | Get one saved report |

The report-generation request accepts `jobDescription`, `selfDescription`, and a `resume` file. The current server parses the uploaded resume as a PDF and keeps uploads in memory only; it does not persist the original file.

## Available scripts

### Backend

```bash
npm run dev     # Start the Express server with nodemon
```

### Frontend

```bash
npm run dev     # Start the Vite development server
npm run build   # Create a production build
npm run lint    # Run ESLint
npm run preview # Preview the production build
```

## Notes

- The frontend is currently configured to call the API at `http://localhost:3000`, and the backend allows requests from `http://localhost:5173`.
- For production, set `VITE_API_URL` on the frontend to the public **HTTPS** backend URL, then rebuild and redeploy the frontend. Make sure this points to the API deployment, not the frontend site. Set `FRONTEND_URL` on the backend to the exact deployed frontend origin(s) such as `https://your-site.netlify.app` or `https://your-site.vercel.app`, then redeploy the backend. Multiple origins can be comma-separated.
- Check `https://your-backend-domain/health` after deploying. It must return `{ "status": "ok" }`. If it does not, the frontend will show a network error because the API is unavailable.
- To investigate production failures, open browser DevTools → Network, retry login, and inspect the failed `POST /api/auth/login` request. A missing status usually means DNS, HTTPS, or CORS; a `4xx`/`5xx` response means the API was reached. Backend logs now record the request path, origin, and error message without logging credentials.
- Keep `Backend/.env` private. Never commit API keys, database credentials, or JWT secrets.
- Gemini API availability and model access depend on the Google account and API key being used. You can override `GEMINI_MODEL` if your key uses a different supported model.

## License

This project does not currently include a license. Add one before distributing or using it as an open-source project.
