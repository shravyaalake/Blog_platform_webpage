AI Blog Generator – Developer Documentation
1. Overview
-----------------------------------------------------------------
The AI Blog Generator is a web application that accepts a text prompt and generates a formatted blog article using a Large Language Model (LLM).
It is built with:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- LLM Provider: Google Gemini API
- Deployment-ready: Simple folder-based static + API server
-----------------------------------------------------------------
The goal is to demonstrate integration of modern AI APIs with a clean UI/UX.
-----------------------------------------------------------------
2. Architecture Diagram

 ┌───────────────────┐         ┌─────────────────────────────┐
 │    Browser UI     │  --->   │  Express Backend (server.js) │
 │  (HTML/CSS/JS)    │         │     Routes: /api/generate    │
 └───────────────────┘         └─────────────────────────────┘
            ▲                               │
            │                               ▼
            │                     ┌──────────────────────────┐
            └────────────────────▶│ Google Gemini AI API     │
                                  │  (Text Generation)       │
                                  └──────────────────────────┘
-----------------------------------------------------------------
3. Frontend Implementation

3.1 index.html
- Contains full UI layout
- Two-panel grid structure
- Input fields: textarea, tone, length
- Blog display section with internal scrolling
- Copy-to-clipboard functionality

3.2 style.css
Key features:
- Modern glassmorphism cards
- Two-column responsive layout
- Smooth internal scrolling
- Buttons with loading animation
- Consistent dark theme

3.3 script.js
Handles:
- Sending POST request to backend
- Constructing enhanced prompt (tone + length)
- Rendering markdown-like headings
- Smooth scrolling to results
- Copy-to-clipboard feature
- Handling prompt chips (quick suggestions)
-----------------------------------------------------------------
4. Backend Implementation (server.js)
Responsibilities:
- Start Express server
- Accept /api/generate POST calls
- Forward the user’s prompt to Gemini
- Return generated blog text to the frontend
Flow: Client prompt → server.js → Gemini → server.js → Client rendering
-----------------------------------------------------------------
Why Express?
- Simple
- Lightweight
- Ideal for educational/demo projects
- Zero configuration needed
-----------------------------------------------------------------
5. Environment Variables
Stored in .env:
GEMINI_API_KEY=*******************
GEMINI_MODEL=gemini-2.5-flash
-----------------------------------------------------------------
6. Error Handling
The backend returns structured JSON errors: { "error": "Something went wrong. Try again." }
Frontend handles:
- Empty prompt
- Failed API call
- Network timeout
- Clipboard access failure
-----------------------------------------------------------------
7. UI/UX Principles Implemented
- Clean visual hierarchy
- Two-panel layout (like real AI tools)
- Scrollable reading area (not full-page scroll)
- Smooth animations
- Minimal cognitive load
-----------------------------------------------------------------
8. How to Extend the System
Possible upgrades:
- Add PDF export
- Add blog history
- Add login system
- Add theme switcher
- Integrate more LLMs (HuggingFace, OpenAI, Cohere)
-----------------------------------------------------------------
