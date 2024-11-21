# DP-Frontend
This repository contains the frontend for my personal website, built with React and Sass. Its primary purpose is to showcase my portfolio, manage users and tasks, and provide an intuitive and modern interface.

# Features
- User Management: CRUD for users with roles.
- Task Management: CRUD for tasks with filtering and search options.
- Internationalization (i18n): Support for multiple languages (ES, EN, DE).
- Responsive Design: Compatible with mobile and desktop devices.

# Technology Stack
- React: JavaScript framework for building user interfaces.
- Sass: CSS preprocessor for modular and maintainable styling.
- Redux: Centralized state management.
- i18next: Internationalization handling.
- Axios: HTTP client for backend communication.

# Installation and Setup
Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or later)
- npm (v6 or later)

# Steps to Get Started
1. Clone the Repository.
2. Install Dependencies.
3. Configure Environment Variables.
4. Run the Application.

# File Structure
📂 rest-menu
┣ 📂 public
┃ ┣ 📄 favicon.ico              // Website icon
┃ ┗ 📄 index.html               // Main HTML file
┣ 📂 src
┃ ┣ 📂 assets
┃ ┃ ┗ 📂 img                    // Project images
┃ ┣ 📂 components
┃ ┃ ┣ 📄 __components.scss      // Component styles
┃ ┃ ┣ 📄 Common.jsx             // Common functions and components
┃ ┃ ┣ 📄 Footer.jsx             // Footer component
┃ ┃ ┗ 📄 Header.jsx             // Application header
┃ ┣ 📂 features
┃ ┃ ┣ 📂 tasks                  // Task-related features
┃ ┃ ┃ ┣ 📂 components           // Reusable task components
┃ ┃ ┃ ┃ ┣ 📄 CreateTaskForm.jsx // Task creation form
┃ ┃ ┃ ┃ ┗ 📄 DateManager.jsx    // Date manager
┃ ┃ ┃ ┣ 📂 pages                // Task-related pages
┃ ┃ ┃ ┃ ┗ 📄 Tasks.jsx          // Task listing page
┃ ┃ ┃ ┗ 📄 taskService.js       // API logic for tasks
┃ ┃ ┣ 📂 users                  // User-related features
┃ ┃ ┃ ┣ 📂 components           // Reusable user components
┃ ┃ ┃ ┃ ┣ 📄 SignUpForm.jsx     // Registration form
┃ ┃ ┃ ┣ 📂 pages                // User-related pages
┃ ┃ ┃ ┃ ┗ 📄 Users.jsx          // User listing page
┃ ┃ ┃ ┗ 📄 userService.js       // API logic for users
┃ ┣ 📂 i18n                     // Language configuration
┃ ┃ ┣ 📂 locales                // Translation files
┃ ┃ ┃ ┣ 📂 es                   // Spanish translations
┃ ┃ ┃ ┃ ┗ 📄 translation.json
┃ ┃ ┗ 📄 i18n.json              // i18next configuration
┃ ┣ 📂 styles
┃ ┃ ┣ 📄 _colors.scss           // Color variables
┃ ┃ ┣ 📄 _general.scss          // Global styles
┃ ┃ ┗ 📄 _pages.scss            // Specific page styles
┃ ┗ 📄 App.jsx                  // Main application component
┣ 📄 .gitignore                 // Files and folders ignored by Git
┣ 📄 package.json               // Project configuration and dependencies
┗ 📄 README.md                  // Project documentation


# Contributing
If you'd like to contribute or use this code as a base for your own project:
- Clone the repository.
- Make your changes in a new branch.
- Submit a pull request with a description of your changes.
- Feel free to use this project as a starting point or inspiration for your own backend implementation.

# Contact
For questions, suggestions, or collaboration inquiries, please reach out to me:
- GitHub.
- Personal website: diegoperez.es