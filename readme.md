# FinanceFlow - Dynamic Dashboard with Authentication and API Integration

## Overview
FinanceFlow is a fully functional, dynamic dashboard designed to provide a seamless experience for managing financial data. It includes authentication, API data fetching, filtering, and a responsive UI built with Next.js and Tailwind CSS.

## Features
### 1. Authentication
- Users can log in using their email and password.
- Implements form validation:
  - Email format verification.
  - Password must be at least 6 characters.
- Stores a mock JWT token in **localStorage** upon successful login.
- Logout clears the token and redirects the user to the login page.
- Protects the dashboard route by redirecting unauthorized users to the login page.

### 2. Dashboard Page
- **Layout:**
  - Header displaying user info and logout button.
  - Sidebar navigation with links to Dashboard, Settings, and Profile.
  - Main content area displaying API data in a table format.
- **API Data Handling:**
  - Fetches posts from **JSONPlaceholder API** (`https://jsonplaceholder.typicode.com/posts`).
  - Implements search and filtering functionality (by title or ID).
  - Supports pagination (5 posts per page).
- **Error Handling:**
  - Displays an error message when the API call fails.

### 3. API Integration
- Uses `getServerSideProps` or `getStaticProps` for initial server-side data fetching.
- Uses `useEffect` and `useState` hooks for client-side data updates, filtering, and pagination.
- Default data is preloaded to ensure a functional UI from the start.

### 4. Styling
- Built with **Tailwind CSS** for a clean and responsive design.
- Works smoothly on all screen sizes.
- Includes hover effects and transitions for a polished UI.
- **Optional Enhancements:**
  - Dark mode toggle.
  - Uses **Shadcn/ui** components (tables, buttons, inputs).
  - Loading spinners while fetching API data.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Mock JWT Token
- **API:** JSONPlaceholder

## Deployment
FinanceFlow is deployed on Vercel. You can access the live version here:
[Live Demo](https://finance-flow-beta.vercel.app/)


## Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/sanketrathod07/FinanceFlow.git
cd FinanceFlow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm run dev
```
Application will be available at `http://localhost:3000/`

## GitHub Repository
Find the source code and contribute here:  
[FinanceFlow on GitHub](https://github.com/sanketrathod07/FinanceFlow)

---
Feel free to contribute, report issues, or suggest improvements! 🚀

