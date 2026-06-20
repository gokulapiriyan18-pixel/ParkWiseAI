# ParkWise AI

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-cyan?logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)

## Overview

ParkWise AI is a front-end parking recommendation app designed for urban users.
It uses a local dataset and AI-style scoring logic to recommend the best parking options based on distance, vehicle compatibility, availability, and parking type.

## Key Features

- AI-style parking ranking with distance, availability, vehicle compatibility, and free/paid bonus logic
- Smart vehicle support for two-wheeler, hatchback, sedan, SUV, minivan, and commercial vehicles
- Community-style updates with `I Parked Here` and `Mark Full`
- Interactive Leaflet map with route markers, selected destination view, and no-parking zones
- Search experience with results list and Parkey recommendation panel
- Responsive layout for desktop and mobile screens

## How It Works

- Users search from the landing page and enter destination details on the search page
- The app computes parking recommendations from `src/data/parkingLocations.json`
- `Parkey` uses `src/utils/aiRecommendation.js` to pick the top match based on the current destination and vehicle type
- Users can review parking cards, open the map, and use quick community actions

## Project Structure

```
ParkWiseAI/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── DashboardStats.jsx
│   │   ├── landing/
│   │   │   ├── EnvironmentalImpact.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── FutureScope.jsx
│   │   │   └── Hero.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── map/
│   │   │   └── ParkingMap.jsx
│   │   ├── parkey/
│   │   │   ├── FloatingParkeyButton.jsx
│   │   │   ├── ParkeyPromptDialog.jsx
│   │   │   ├── ParkeyPromptTimer.jsx
│   │   │   └── ParkeyRecommendationPanel.jsx
│   │   ├── results/
│   │   │   ├── AIRecommendation.jsx
│   │   │   ├── ParkingCard.jsx
│   │   │   └── ParkingResults.jsx
│   │   ├── search/
│   │   │   └── SearchForm.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Notification.jsx
│   │       └── StatCard.jsx
│   ├── context/
│   │   └── ParkingContext.jsx
│   ├── data/
│   │   ├── constants.js
│   │   ├── models.js
│   │   ├── noParkingZones.json
│   │   └── parkingLocations.json
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   └── SearchPage.jsx
│   ├── utils/
│   │   └── aiRecommendation.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## Installation

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

```bash
cd ParkWiseAI
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## Deployment

The project includes `vercel.json` for SPA routing.

### Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Deploy with GitHub

1. Push the repo to GitHub
2. Import it into Vercel
3. Confirm Framework Preset: Vite
4. Confirm Build Command: `npm run build`
5. Confirm Output Directory: `dist`

## Data and Sample Content

- 15 parking locations in Chennai
- 3 no-parking zones in map data
- Local JSON-based mock dataset with area, slot count, vehicle support, and status

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM
- Leaflet + react-leaflet
- Lucide React icons
- Local JSON data store

## Notes

- The app is front-end only and does not require a backend API
- `ParkingContext` manages search state, notifications, and Parkey recommendation behavior
- The recommendation logic is implemented in `src/utils/aiRecommendation.js`

## Author

Gokula Piriyan M A
CSE Student | Frontend and AI Enthusiast


## License

MIT