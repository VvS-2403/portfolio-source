---
type: project
slug: ai-portfolio-manager
title: AI Portfolio Manager
---

# Overview
The AI Career Copilot is an integrated feature of my personal portfolio that allows visitors to explore my background, experience, projects, and skills through a conversational interface.
Rather than relying on visitors to manually read through multiple pages of static text, they can ask direct questions and receive instant, grounded answers. The system is designed to simulate a real conversation with me, speaking in the first person and referencing documented portfolio content.

# Architecture
The system uses a highly streamlined, documentation-first approach. It abandons overcomplicated semantic vector search (like pgvector) in favor of a fast, LLM-powered context planner.

1. **Frontend Modal (`AICopilotModal.tsx`)**: A globally accessible UI component providing a chat interface, complete with markdown rendering and suggested queries.
2. **Context Builder (`builder.ts`)**: Scans local markdown and JSON files (`content/`, `portfolio-data/`) at runtime to build a lightweight registry of sections.
3. **API Route (`chat/route.ts`)**: Handles incoming chat messages and coordinates the retrieval and response logic.
4. **LLM Provider (`provider.ts`)**: Integrates with OpenRouter, providing automatic failover between multiple models (e.g., Gemini, Llama, GPT) to ensure high reliability.

# Request Lifecycle
1. **Classification**: The incoming question is classified into a specific "mode" (fact, explanation, comparison, career, or out_of_scope).
2. **Section Planning**: An LLM reads a registry of available portfolio documentation and selects only the necessary section keys required to answer the question.
3. **Context Assembly**: The chosen markdown files are read from the filesystem and combined into the system prompt.
4. **Generation**: The primary LLM stream generates the response in real-time, speaking directly as "Vismay" and strictly adhering to the provided context.
5. **Navigation Resources**: A secondary prompt determines which quick links (GitHub, LinkedIn, Email, or internal sections) are most relevant to the answer and surfaces them in the UI.

# Key Design Decisions
- **No Vector Database**: By utilizing long-context models and a smart section-planning LLM, the architecture avoids the complexity and overhead of managing embeddings and a vector database.
- **Provider Fallback**: Relying on OpenRouter allows the system to cascade through models if one provider faces downtime, maximizing uptime.
- **Strict Grounding**: The system is prompted heavily to avoid hallucination. If a topic isn't documented in the markdown files, the Copilot will openly state that it doesn't have the information and point the user to external resources (like GitHub).
- **Session-Awareness**: The chat history is passed along with each request, allowing visitors to ask follow-up questions naturally.

# Status
Currently ongoing. Frontend complete. AI backend implemented and actively refined.

# Technologies Used
- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **AI Integration**: OpenRouter API
- **Styling**: Tailwind CSS & Framer Motion
- **Content Storage**: Local Markdown and JSON files
