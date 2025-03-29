# Movie Explorer

A modern, performant, and fully responsive movie listing web app built with React, TypeScript, and the TMDB (via RapidAPI). Users can search, filter, and explore movie details with a clean UI and smooth UX.

---

## Features

- Search & Filter: Filter by genre, rating, and sorting with URL persistence via `URLSearchParams`.
- Debounced Search: Prevents unnecessary API calls and handles race conditions by cancelling previous requests.
- Routing with Wouter: Lightweight routing (~1.5KB) with support for URL-based filters and routes.
- Tailwind CSS: Utility-first styling for responsive and clean design.
- Redux Toolkit (RTK): Scalable global state management.
- Axios: For all HTTP requests with a clean API layer.
- ESLint + Prettier: For consistent and clean code formatting and linting.
- Code Splitting: Improves load time by lazy loading routes and components.
- Loaders and Spinners: Shows feedback while data is loading.
- URL-Persistent Filters: All filters persist in the URL — shareable and reload-safe.
- TypeScript Supported: Type-safe and maintainable.
- No Data Handling: Displays a "No Movies Found" component when needed.
- Responsive Design: Works beautifully across mobile, tablet, and desktop.
- Lazy Loading Images: Improves performance by loading only visible images.

---

## Installation

### Using Yarn (recommended)

```bash
yarn install     # Install dependencies
yarn dev         # Start development server
```

### API Used

Data is fetched from the Movie Database API via RapidAPI.

### Tech Stack
	•	React + Vite
	•	TypeScript
	•	Redux Toolkit
	•	Wouter
	•	Tailwind CSS
	•	Axios
	•	ESLint + Prettier
