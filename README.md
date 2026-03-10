# AnbuDevs

A professional placement and developer skills platform built with React, TypeScript, Vite, and Tailwind CSS. Practice 3000+ coding problems, aptitude, English communication, and explore 10 trending career roadmaps.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (SWC)
- **Styling**: Tailwind CSS + shadcn/ui
- **Code Editor**: Monaco Editor
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack Query + PapaParse

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```sh
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd Developer-Skills

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm run test`    | Run tests                |

## Features

- 3000+ coding problems from LeetCode, HackerRank, Codeforces, CodeChef
- Real-time search, filter by difficulty/source/topic, pagination
- Monaco-based code editor with syntax highlighting
- Aptitude MCQ quiz system (200+ questions)
- English & communication skills modules
- 10 trending career roadmaps with progress tracking
- Coding activity heatmap & leaderboard
- Dark theme with glassmorphism UI
- Responsive layout with collapsible sidebar

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── CodingHeatmap.tsx
├── pages/            # Page-level components
├── data/             # Static data (aptitude, tutorials, leaderboard)
├── hooks/            # Custom React hooks (useProblems, etc.)
├── types/            # TypeScript interfaces
└── lib/              # Utility functions
public/
└── data/             # CSV datasets (3000 problems)
```
