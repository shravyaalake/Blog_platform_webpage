***********************************
5. Technical Explanation for Students (Why + How)
***********************************
Technical Explanation & Learning Summary
1. Why we used HTML, CSS, JS?
Because:
- Easiest frontend stack
- No build system required
- Pure browser environment
- Ideal for student demonstration
----------------------------------
2. Why Node.js + Express?
- Minimal setup
- Handle API routes
- Send POST request to LLM
- Lightweight and fast
Express simplifies backend routing and JSON handling.
----------------------------------
3. Why Google Gemini API?
Because:
- Free tier
- Very strong text generation
- Easy REST API
- No complex tokens required
- Perfect for education & demo projects
----------------------------------
4. Prompt Engineering
The final prompt includes:
- User topic
- Desired tone
- Desired length
This improves output quality.
Example constructed prompt: Impact of AI on education.
Please write a 1000 word blog in a neutral informative tone.
----------------------------------
5. Handling AI Output
The output often contains markdown-like headings:
- # for title
- ## for sections
- ### for subsections
We convert these into <h1>, <h2>, <h3> for proper UI rendering.
----------------------------------
6. Why Scrollable Blog Container?
Benefits:
- Keeps the page layout stable
- Prevents footer from shifting
- Mimics real SaaS writing tools
- Cleaner reading experience
----------------------------------
7. UI/UX Principles Learned
- Spacing & typography
- Layout hierarchy
- Hover states
- Internal scrolling
- Two-column design
- Dark theme consistency
----------------------------------
8. Security Lesson
Never hardcode API keys.
Always keep in .env.
----------------------------------