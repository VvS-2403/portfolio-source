# Vismay VS - AI Portfolio

A modern, interactive personal portfolio website featuring a built-in AI Copilot. The project is designed to showcase skills, experience, and projects while providing an engaging conversational interface for visitors to learn more.

## How it Works

The project is built as a single-page application using Next.js App Router. It uses React components to structure different sections of the portfolio:
- **Sections:** Hero, About, Skills, Featured Projects, Experience, Extracurriculars, and Contact.
- **AI Copilot Modal:** A globally accessible chat interface where visitors can interact with an AI trained on the developer's background.
- **Backend API:** The chat is powered by a Next.js API route that connects to OpenRouter, using a fallback chain of models (Gemini, Llama, GPT) to ensure reliable responses.

## Tools & Technologies Used

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Styling:** [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth scrolling and interactive element transitions
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Integration:** 
  - [OpenRouter API](https://openrouter.ai/) (Primary provider for the AI Copilot)
  - SDKs: `@google/generative-ai`, `groq-sdk`, and `@xenova/transformers`
- **Database / Backend:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for robust type safety
- **Content Parsing:** `gray-matter` for parsing markdown data

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm, pnpm, or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables. Create a `.env.local` file with your keys (e.g., OpenRouter API key):
   ```env
   OPENROUTER_API_KEY=your_openrouter_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

## Repository Management

This repository includes a script to automate GitHub repository creation and pushing changes.

**Automated setup (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File .\setup-github.ps1 -repoName "ai-portfolio-manager" -visibility public
```
