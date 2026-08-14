# Team Signals

Team Signals is a prototype workspace for making invisible work easier to see, discuss, and improve. It combines six lightweight workplace product concepts into one navigable web app. Each concept is intentionally separated into its own route so it can be tested, critiqued, and developed independently.

## Prototypes

### 1. Attendance Monitor

For IT Apps Manila teams currently logging attendance in rotating Excel spreadsheets with difficult 35-column formats.

- Guided attendance and shift logging
- Night differential and comments captured as first-class details
- Pending / approved / draft states
- HR-ready Excel export concept that preserves the expected output
- Designed to reduce time spent writing logs and lower human error

Route: `/attendance`

### 2. Repetitive Process Detector / Automation Finder

A simple intake for repetitive work that helps teams decide where automation or process improvement is worth investing in.

- Submit a repetitive task in plain language
- Estimate monthly time spent
- Score automation potential and ROI
- View a pipeline of opportunities by team and status

Route: `/automation-finder`

### 3. Queue Health Monitor

A personal backlog dashboard that makes overload visible before prioritization becomes a source of stress.

- Add work items with effort and priority
- Calculate a workload score
- Show Healthy, At risk, or Overloaded states
- Surface priority mix and a lightweight planning suggestion

Route: `/queue-health`

### 4. Personal Interruptions Counter

A quick logging tool for understanding what consumes focus time throughout the day.

- One-tap logging for meetings, chat, email, and ad-hoc requests
- Timeline of daily interruptions
- Estimated focus time lost
- Seven-day interruption pattern view and planning insight

Route: `/interruptions`

### 5. Retrospective+ / Retrospective Intelligence

A retrospective tool focused on remembering what teams forgot, detecting recurring problems, surfacing unresolved actions, and showing improvement over time.

- Retro Board with What went well, Problems, and Actions columns
- Smart action logging with Open, Completed, and Archived states
- Problem tagging and recurring problem detection concept
- Action Hub across sprints
- Insights Dashboard for recurring, emerging, and declining problems
- Retro History with searchable past sessions
- AI concepts for summary generation, trend interpretation, and problem categorization
- Team, role, sprint, and contributor context in the experience

Routes: `/retrospective` (board entry), `/retrospective/board`, `/retrospective/actions`, `/retrospective/insights`, `/retrospective/history`

### 6. The Watcher

An AI-assisted employee contribution and performance review support tool inspired by the idea of a watcher that keeps a long-term view.

- Daily contribution and accomplishment logging
- Categories such as delivery, bug fixes, learning, process improvement, and collaboration
- Business impact, blockers, and learning context
- Employee contribution history
- Manager-facing summary concept with PDF export
- AI-generated themes and summaries as decision support only; final assessments remain with the manager

Route: `/watcher`

## Stack

- React + TypeScript
- Vite
- TanStack Router (code-based route tree)
- Tailwind CSS
- shadcn-style UI primitives with Radix Tabs, class-variance-authority, clsx, and tailwind-merge
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

To validate a production build:

```bash
npm run build
```

## Project structure

```text
team-signals/
├── src/
│   ├── components/ui/   # shadcn-style reusable primitives
│   ├── lib/             # utility helpers
│   ├── App.tsx          # app shell, routes, and prototype screens
│   ├── index.css        # Tailwind layers and visual tokens
│   └── main.tsx         # React entry point
├── components.json      # shadcn configuration
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Prototype notes

The current screens use realistic local sample data and local component state so the important flows can be clicked through without a backend. Export buttons, AI actions, and account controls are intentionally represented as product affordances for the next validation round.
