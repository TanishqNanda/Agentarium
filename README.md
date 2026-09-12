```markdown
# Agentarium

Agentarium is an open-source agentic orchestration platform with a visual office where AI agents work, collaborate, and execute tasks. Create your own AI workforce, assign jobs, watch agents move through the office, and orchestrate everything from one place.

---

## Why Agentarium

Using multiple AI agents at the same time can help enormously — especially for young startup founders who need a researcher, a coder, a marketer, and a lead finder all running in parallel. But setting that up today is a headache. Existing tools are either too technical, invisible (just terminal output), or built for engineers who already know what they are doing.

Agentarium fixes that. It gives you a visual office workspace where AI agents are your employees. You are the boss. You define their roles, assign them goals, and watch them work — without touching a config file or reading a framework doc.

---

## What It Looks Like

> Demo GIF coming soon

---

## How It Works

**The Office** is the runtime visualizer. It is a 2D animated workspace where you can see every agent, their current status, and what they are doing in real time. Agents move between zones — the dev pod, the marketing room, the research desk — based on what task they are executing.

**Agents** are autonomous AI workers. Each agent has a defined role (Programmer, Researcher, Marketing, Lead Finder, Manager, and more), a set of tools it can use, and its own memory. You can create agents, edit their role and tools, and assign them goals — not step-by-step instructions, just the end goal.

**Tools** are what agents use to actually do work. A Programmer agent has tools like write file, run code, search docs. A Marketing agent has tools like draft copy, search web, analyse competitor. You can give any agent any tool.

**The Orchestrator** is the backend engine. It runs the agent loop — the agent reasons, picks a tool, executes it, observes the result, and decides the next step. This repeats until the task is done or the agent needs your input.

**Memory** means agents remember. Short-term memory keeps context within a session. Long-term memory lets an agent recall what it did last time. Semantic memory (RAG) lets an agent search through documents, codebases, or notes by meaning — not just keywords.

---

## Architecture

```

Browser (React + Vite + TypeScript)
│
│  WebSocket — live agent status, task stream
│
Express Backend (TypeScript)
│
├── Agent Runner — ReAct loop per agent
│ └── Gemini API — reasoning + tool selection
│
├── Tool Registry — pluggable tools per agent role
│
└── Supabase
├── Agent memory + task logs
├── User config (agent definitions)
└── pgvector — semantic memory (RAG)

```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, TypeScript |
| Backend | Node.js, Express, TypeScript |
| AI / Reasoning | Google Gemini API (function calling) |
| Database + Memory | Supabase (Postgres + pgvector) |
| Real-time | WebSockets (ws) |
| Auth | Supabase Auth (Stage 3+) |

---

## Roadmap

**Stage 1 — It works**
Single Programmer agent, one task, visible on screen. Status updates live. TypeScript throughout.

**Stage 2 — It moves**
Agents animate across the office. Multiple agent types. Click an agent to see its live task stream. Task history in Supabase.

**Stage 3 — It orchestrates**
Manager agent breaks goals into sub-tasks and delegates. Agents pass results to each other. Meeting room mechanic — agents visually gather when collaborating.

**Stage 4 — It is a platform**
Custom agent creation via UI. Tool registry open to contributors. Docker support. Public open-source release.

**Stage 5 — It is infrastructure**
Distributed agents. Agent marketplace. Production-grade observability, evals, and cost control.

---

## Getting Started

Coming soon. Stage 1 in active development.

---

## Contributing

Agentarium is in early development. If you want to contribute, have ideas, or want to follow the build — star the repo and watch for updates.

Want to get involved directly? Email me at nanda.tanishqq@gmail.com
```