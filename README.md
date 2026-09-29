# i-Edge — AI Intelligence Platform
> Intelligent video analytics and surveillance interface powered by AI.

i-Edge is a modern web-based intelligence platform designed to transform video surveillance into actionable information.

The frontend provides a unified interface for:

- AI-powered vehicle intelligence
- Number plate recognition
- Home and facility surveillance
- Fire detection
- Crowd detection
- Violence detection
- Incident history
- Processed video review
- Real-time alert status
- User authentication
- Google and GitHub authentication
- Protected customer-specific surveillance workflows

The application is built as a modern React + TypeScript frontend and communicates with the i-Edge backend through REST APIs.

---

# Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [Authentication](#authentication)
- [Surveillance Workflow](#surveillance-workflow)
- [API Communication](#api-communication)
- [Frontend Structure](#frontend-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Security](#security)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Production Checklist](#production-checklist)
- [License](#license)

---

# Overview

i-Edge provides a browser-based interface for interacting with AI-powered computer-vision services.

Instead of treating surveillance footage as passive recordings, the platform exposes an intelligence workflow where users can:

1. Authenticate securely.
2. Upload surveillance footage.
3. Submit footage for AI analysis.
4. Track processing status.
5. Review detected incidents.
6. Inspect processed video.
7. Review historical incidents.
8. Receive alert information associated with their account.

The frontend is responsible for the user experience, authentication state, API communication, visualization, processing states and result presentation.

AI inference and video processing are handled by the backend.

---

# Core Capabilities

## 1. Vehicle Intelligence

The platform provides an interface for vehicle-related computer-vision workflows.

Typical capabilities include:

- Vehicle detection
- Vehicle classification
- Number plate detection
- OCR-based plate recognition
- Detection result visualization
- Vehicle analytics

---

## 2. Smart Surveillance

The surveillance interface supports AI analysis of uploaded video.

Current surveillance modules include:

### Crowd Detection

Identifies crowd-density events and records relevant surveillance incidents.

### Violence Detection

Detects potential violent or aggressive activity from video.

### Fire Detection

Detects visual fire events from analyzed footage.

The frontend presents the results as structured events rather than forcing users to manually inspect the entire video.

---

# Surveillance Workflow

The surveillance experience follows a controlled processing pipeline.

```text
User
 │
 ▼
Select Video
 │
 ▼
Upload
 │
 ▼
Create Surveillance Job
 │
 ▼
Start AI Detection
 │
 ▼
Backend Processing
 │
 ├── Fire Detection
 ├── Crowd Detection
 └── Violence Detection
 │
 ▼
Status Polling
 │
 ▼
Processing Complete
 │
 ├── Detection Results
 ├── Incident Analytics
 ├── Alert Information
 └── Processed Video
 │
 ▼
User Review

The frontend uploads the selected file using FormData, receives a job ID and then triggers the detection endpoint.

Processing status is subsequently polled until the backend reports completion or failure.

User Authentication

i-Edge supports multiple authentication methods.

Password Authentication

Users can authenticate using:

Email + password
Phone number + password

Registration supports either email or phone as the user's account identifier.

Social Authentication

The frontend also provides:

Google authentication
GitHub authentication

OAuth authentication is handled through the backend authentication flow.

After successful authentication, the frontend receives an authentication token and stores it for subsequent API requests.

Authentication Token

The frontend uses a JWT-based authentication mechanism.

The access token is stored in browser local storage under:

iedge_token

Authenticated API requests include:

Authorization: Bearer <token>

The surveillance frontend retrieves the token before protected API requests and attaches it to the request headers.

Protected API Communication

Authenticated requests follow the pattern:

const token = localStorage.getItem("iedge_token");

const headers = token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : {};

Example:

fetch("/api/surveillance/incidents", {
  headers: getAuthHeaders(),
});

This ensures that surveillance resources are accessed within the authenticated user session.

API Architecture

The frontend communicates with the backend through REST endpoints.

The surveillance interface currently interacts with endpoints conceptually structured as:

POST   /api/surveillance/upload
POST   /api/surveillance/detect/{job_id}

GET    /api/surveillance/status/{job_id}
GET    /api/surveillance/results/{job_id}
GET    /api/surveillance/video/{job_id}

GET    /api/surveillance/incidents

The exact backend host is determined by the frontend API configuration.

API Base URL

During local development, the surveillance frontend currently resolves the API host to:

http://127.0.0.1:3000

for localhost development.

For production deployment, the frontend should be configured to communicate with the deployed backend URL.

Example:

https://your-backend.onrender.com

Keep the production backend URL configurable rather than hardcoding development URLs into production builds.

Frontend Architecture

A simplified architecture looks like this:

                    ┌─────────────────────┐
                    │      Browser        │
                    │                     │
                    │  React Application  │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Authentication    Dashboard/UI      Surveillance
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                       REST API Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │    i-Edge Backend   │
                    │      FastAPI        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
              Database       AI Models    Alert System

The frontend does not perform the primary AI inference itself.

It acts as the presentation and interaction layer for the backend AI services.

Technology Stack
Core
React
TypeScript
Vite
React Router
UI / Animation
Tailwind CSS
Framer Motion
GSAP
GSAP ScrollTrigger
Anime.js
Icons
Lucide React
Build System
Vite
TypeScript Compiler
Authentication
JWT-based backend authentication
Google OAuth
GitHub OAuth
UI & Interaction System

The application uses several animation and interaction systems.

Framer Motion

Used for:

Component transitions
Entrance animations
Interactive elements
Motion-based UI states
GSAP

Used for:

Scroll-based animations
Timeline animations
ScrollTrigger effects
Advanced UI transitions
Anime.js

Used for selected interface animations and visual effects.

The surveillance interface combines these systems to create an interactive monitoring experience.

Surveillance Interface

The Home Surveillance interface provides:

Upload

Users can:

Select a video
Drag and drop a video
Preview the selected media
Start analysis

The frontend uses browser object URLs for local media previews.

Processing

During processing the UI communicates the current processing state to the user.

The interface progresses through:

Upload
   ↓
Analyze
   ↓
Result

The backend performs the actual video processing while the frontend monitors job status.

Status Polling

The frontend periodically requests the job status.

Conceptually:

Frontend
   │
   │ GET /status/{job_id}
   ▼
Backend
   │
   ├── processing
   ├── completed
   └── failed

Polling continues until processing completes or fails.

Detection Results

When processing is complete, the frontend presents detected events.

Current event categories include:

Fire
Crowd
Violence

The interface converts backend event information into a structured threat log for user review.

Incident History

Users can access previous surveillance incidents through the history interface.

Historical records include information such as:

Event type
Confidence
Timestamp
Severity
Incident identifier

The frontend retrieves these records through the authenticated incidents endpoint.

Processed Video

After successful processing, the frontend provides access to the processed output video.

The processed video represents the backend's analyzed result and allows the user to visually review the detection output.

Because the video endpoint is protected, the frontend retrieves the authenticated video response and creates a browser Blob URL for playback.

Project Structure

A recommended frontend structure is:

i-edge/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── assets/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── package-lock.json
│
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
│
├── vite.config.ts
├── tailwind.config.*
│
├── .gitignore
└── README.md

Actual project structure may contain additional folders depending on the current implementation.

Getting Started
Prerequisites

Install:

Node.js
npm
Git

Verify installation:

node --version
npm --version
git --version
Installation

Clone the repository:

git clone <YOUR_REPOSITORY_URL>

Enter the project:

cd i-edge

Install dependencies:

npm install
Local Development

Start the development server:

npm run dev

Vite will provide a local development URL, typically:

http://localhost:5173

Open the displayed URL in your browser.

TypeScript Configuration

The project uses TypeScript for static type checking.

The application compiler configuration includes:

{
  "target": "ES2023",
  "module": "ESNext",
  "moduleResolution": "bundler",
  "jsx": "react-jsx"
}

Node type definitions are included for dependencies that expose Node.js types:

{
  "types": ["vite/client", "node"]
}
Path Aliases

The frontend supports the @ alias for the src directory.

Example:

import Component from "@/components/Component";

Configuration:

{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
Production Build

Before deployment, always run:

npm run build

The build process runs:

TypeScript
    ↓
Vite
    ↓
Production Bundle

A successful build produces the production output directory:

dist/

The generated dist directory should not be committed to Git.

Preview Production Build

After building:

npm run preview

This allows the production bundle to be tested locally before deployment.

Environment Configuration

Production API configuration should be separated from local development configuration.

Recommended environment variable:

VITE_API_BASE_URL

Example local:

VITE_API_BASE_URL=http://127.0.0.1:3000

Example production:

VITE_API_BASE_URL=https://your-backend.onrender.com

Never place database credentials, JWT secrets, OAuth client secrets, API private keys or other backend secrets inside frontend environment variables.

Any variable exposed to Vite frontend code should be treated as public.

Deployment

The recommended deployment architecture is:

                    INTERNET
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
       Vercel                    Render
      Frontend                  Backend
         │                         │
         │                         ├── FastAPI
         │                         ├── AI Processing
         │                         ├── Authentication
         │                         └── REST API
         │
         └───────────────┬─────────┘
                         │
                         ▼
                    PostgreSQL
                      / Neon
Vercel Deployment
1. Push the frontend repository
git add .
git commit -m "Prepare frontend for production"
git push
2. Create Vercel project

Import the Git repository into Vercel.

Typical configuration:

Framework:
Vite

Build Command:
npm run build

Output Directory:
dist
Production Environment Variable

Add:

VITE_API_BASE_URL

Value:

https://YOUR-BACKEND-URL

Example:

VITE_API_BASE_URL=https://iedge-backend.onrender.com

After changing environment variables, redeploy the frontend.

Backend Integration

The frontend requires the backend to be accessible from the deployed domain.

The production flow becomes:

Browser
   │
   ▼
Vercel
i-Edge Frontend
   │
   │ HTTPS API
   ▼
Render
i-Edge Backend
   │
   ├── PostgreSQL
   ├── AI Models
   ├── Video Processing
   └── Email Alerts
CORS

The backend must allow requests from the deployed frontend domain.

Development:

http://localhost:5173

Production:

https://your-frontend.vercel.app

If the frontend loads correctly but API requests fail with CORS errors, verify the backend CORS configuration.

OAuth Configuration

Google and GitHub OAuth require production callback URLs to point to the deployed backend.

Development callbacks should not be used in production.

Example production pattern:

https://YOUR-BACKEND-URL/api/v1/auth/google/callback
https://YOUR-BACKEND-URL/api/v1/auth/github/callback

The OAuth providers must be configured with the exact production callback URLs expected by the backend.

Security
Authentication

Protected API requests use:

Authorization: Bearer <JWT>
Customer Isolation

Authenticated surveillance operations should remain associated with the currently authenticated customer.

The frontend always sends the user's authentication token when performing protected surveillance operations.

Sensitive Information

Never commit:

.env
.env.*
API keys
OAuth secrets
Database credentials
JWT secrets
Private keys

Use environment variables and deployment-platform secret configuration instead.

Git Ignore

The frontend repository should ignore generated and sensitive files.

Important entries include:

node_modules/
dist/
.env
.env.*
!.env.example
*.log
.DS_Store
.vscode/
.idea/
Performance Considerations

Video applications can involve large files.

The frontend therefore uses browser-side media handling for previews rather than unnecessarily uploading the same file merely to display it.

For example:

const url = URL.createObjectURL(file);

The generated object URL should be released when it is no longer needed:

URL.revokeObjectURL(url);

This prevents unnecessary browser memory retention.

Error Handling

The frontend handles failures at multiple stages.

Upload Failure

Example:

Upload failed

The backend error response is parsed when possible so the user receives the actual backend error message.

Detection Failure

If detection cannot be started, the frontend moves the workflow into a failed state and displays the returned error.

Processing Failure

If the backend reports:

status = failed

the frontend stops polling and displays the backend's error message.

Network Failure

Temporary polling/network failures do not immediately terminate the processing workflow.

The frontend can continue polling for the next status response.

Development Workflow

Recommended development cycle:

1. Create feature
       ↓
2. Run development server
       ↓
3. Test UI
       ↓
4. Test API integration
       ↓
5. Run TypeScript build
       ↓
6. Fix build errors
       ↓
7. Test production preview
       ↓
8. Commit changes
       ↓
9. Push repository
       ↓
10. Deploy
Useful Commands
Install dependencies
npm install
Start development server
npm run dev
Build production bundle
npm run build
Preview production build
npm run preview
Check dependency vulnerabilities
npm audit
Update dependencies
npm update

Dependency updates should be reviewed before production deployment because major version changes can affect the application.

Troubleshooting
TypeScript Cannot Find NodeJS

If a dependency requires Node.js type definitions:

npm install -D @types/node

Then ensure tsconfig.app.json contains:

{
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
baseUrl TypeScript 6 Deprecation

If TypeScript reports:

Option 'baseUrl' is deprecated

the current project configuration can silence the TypeScript 6 migration warning using:

{
  "ignoreDeprecations": "6.0"
}

Long-term, the alias configuration should be migrated according to the project's future TypeScript/Vite configuration.

API Requests Fail Locally

Check that the backend is running.

Example:

Frontend
http://localhost:5173

Backend
http://127.0.0.1:3000

Then verify the browser's Network tab.

API Requests Fail in Production

Check:

Backend URL
VITE_API_BASE_URL
Backend availability
CORS configuration
JWT token
Browser Network tab
Backend logs
Authentication Fails

Check:

localStorage
    ↓
iedge_token

If no token exists, protected API requests will not contain the authentication header.

Production Checklist

Before production deployment:

Frontend
 npm install
 npm run build
 Production build succeeds
 No TypeScript errors
 No hardcoded secrets
 Production API URL configured
 OAuth URLs configured
 .env excluded from Git
 dist/ excluded from Git
 Authentication tested
 Logout tested
 Surveillance upload tested
 Detection tested
 Processing status tested
 Processed video tested
 Incident history tested
 Mobile responsiveness tested
Backend
 Production API available
 CORS configured
 PostgreSQL connected
 JWT secret configured
 OAuth credentials configured
 AI model dependencies installed
 Email configuration tested
 Production logging enabled
 File storage strategy verified
End-to-End Production Test

After both services are deployed:

1. Open production frontend
        ↓
2. Register account
        ↓
3. Login
        ↓
4. Verify JWT authentication
        ↓
5. Open surveillance
        ↓
6. Upload video
        ↓
7. Start detection
        ↓
8. Wait for processing
        ↓
9. Verify incidents
        ↓
10. Verify processed video
        ↓
11. Verify alert behavior
        ↓
12. Logout
        ↓
13. Login again
        ↓
14. Verify protected resources
Design Philosophy

The i-Edge frontend follows a few important principles:

Intelligence over Raw Footage

The interface focuses on meaningful events and detected information rather than simply presenting video.

Clear Processing States

Users should always understand whether the system is:

Idle
Uploading
Processing
Completed
Failed
Secure API Access

Protected resources are accessed using authenticated API requests.

Modular UI

Major product capabilities are represented as independent pages and interface modules.

Scalable Product Experience

The frontend is designed to support expansion from individual surveillance workflows to broader enterprise intelligence workflows.

Future Extensions

Potential future improvements include:

Live camera streaming
WebSocket-based processing updates
Push notifications
Advanced incident filtering
Multi-camera dashboards
Role-based frontend permissions
Advanced analytics dashboards
Search across historical incidents
Cloud video storage
Organization/workspace management
Real-time event feeds
Camera health monitoring

These are product-extension areas and are not required for the current frontend deployment.

License

Proprietary software.

All rights reserved.

The source code, models, UI, business logic and associated assets are intended for authorized use only.

i-Edge

AI-powered visual intelligence for modern surveillance.

From camera feeds to actionable intelligence.


### Ek important cheez

README mein maine **fake performance claims intentionally nahi daale**. Tumhare existing UI mein kuch marketing numbers hain, lekin README mein unhe verified technical benchmarks ki tarah document karna sahi nahi hoga.

Aur tumhara frontend ab build stage cross kar raha hai: `@types/node` + `types: ["vite/client", "node"]` wala
