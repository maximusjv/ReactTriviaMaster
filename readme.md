# React Trivia Master

## Introduction

React Trivia Master is an interactive single-page trivia game application designed to test users' knowledge across various categories and difficulty levels. Users can configure their trivia session, answer multiple-choice questions within an optional time limit, and receive a score upon completion. This project was developed as a portfolio piece to demonstrate proficiency in modern front-end technologies and development best practices.

## Features

* **Customizable Trivia:** Users can select:
    * Trivia category (e.g., General Knowledge, Sports, History).
    * Question difficulty (Easy, Medium, Hard, or Any).
    * Number of questions (10, 20, or 30).
    * Optional timer per question (10, 20, 30 seconds, or Infinite).
* **Interactive Gameplay:**
    * One question displayed at a time.
    * Multiple-choice answer options.
* **Timer:** Optional countdown timer for each question to add a layer of challenge. If the timer runs out, the question is marked as unanswered.
* **Scoring:** Tracks the user's score based on correct answers.
* **Results Screen:** Displays the final score and a detailed review of each question, including:
    * The question text.
    * The user's answer.
    * The correct answer.
    * Indication of whether the user's answer was correct or incorrect.
* **Play Again:** Option to easily restart the game with new settings or the same settings.
* **Responsive Design:** User interface adapts to different screen sizes for a seamless experience on desktop and mobile devices.
* **Error Handling:** Graceful handling of API errors and loading states to inform the user.

## Technologies Used

* **Frontend:**
    * **React (19):** Core library for building the user interface with a component-based architecture.
    * **TypeScript:** For static typing, improved code quality, and maintainability.
    * **Vite:** Next-generation front-end tooling for fast development server and optimized builds.
    * **Tailwind CSS:** A utility-first CSS framework for rapid UI development and responsive design.
    * **React Router (v7):** For client-side routing and navigation between different views (Start, Game).
* **API:**
    * **Open Trivia Database (OpenTDB):** Used to fetch trivia questions, categories, and manage session tokens.
* **Development Tools:**
    * ESLint 
    * Git & GitHub for version control.

  
## Key Technical Highlights & Learning Outcomes

This project demonstrates several key front-end development concepts and patterns:

* **React Hooks:** Extensive use of `useState` for component state, `useEffect` for side effects (API calls, timers), `useOutletContext` for passing data from layout routes, and `useCallback` for memoizing functions.
* **TypeScript Integration:** Comprehensive use of TypeScript for defining clear data structures (interfaces for API responses, `Question`, `Trivia`, `Category`), component prop types, and ensuring type safety throughout the application.
* **Asynchronous Operations & API Client:**
    * A dedicated `OpenTDB.ts` class encapsulates all interactions with the Open Trivia Database API.
    * Robust error handling with custom error classes (`APIError`, `APIRequestRejected`, `APIFetchError`).
    * Implementation of a `@Retry` decorator for API requests to handle transient network issues or rate limits with exponential backoff.
    * Management of API session tokens to prevent duplicate questions.
* **State Management:**
    * Primarily uses local component state (`useState`).
    * `TriviaManager` (a singleton class) is initialized in `App.tsx` and passed down using React Router's `OutletContext` to avoid excessive prop drilling for this shared resource.
    * Derived state is used in the `Game` page to determine the current `gameState` (Build, Play, Results).
* **Component-Based Architecture:**
    * The UI is broken down into reusable and manageable components (e.g., `QuestionCard`, `Timer`, `Results`, `ActionButton`).
    * Clear separation of concerns between presentational components and container logic (e.g., `Game` page orchestrating `TriviaBuilder`, `QuestionCard`, and `Results`).
* **Routing:** Client-side routing implemented with `React Router v6`, including nested routes and the `Outlet` component for layout management.
* **Utility Functions & Decorators:**
    * `shuffle` utility function for randomizing answer options.
    * `@Retry` TypeScript decorator for enhancing method reliability.
* **Dynamic Content Rendering:** Conditional rendering based on game state, loading status, and API responses.
* **Form Handling:** Controlled form in `TriviaBuilder` for configuring trivia options.
* **Styling with Tailwind CSS:** Efficiently styled the application with a utility-first approach, ensuring responsiveness.

## Setup and Installation

To get a local copy up and running, follow these simple steps:

**Prerequisites:**

* Node.js (v18.x or later recommended)
* npm or yarn

**Installation:**

1.  **Clone the repository and navigate to the RTM folder.**
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

4.  **Build for production:**
    ```bash
    npm run build
    ```
    or
    ```bash
    yarn build
    ```
    This will create an optimized static build in the `dist` folder.


## Author

* **Maksim Vinokur**
* GitHub: [@maxiusjv](https://github.com/maximusjv)
* LinkedIn: [Maksim Vinokur](https://www.linkedin.com/in/maksim-vinokur-35918a303/)

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.