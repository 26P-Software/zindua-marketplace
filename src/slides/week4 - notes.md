# Week 4: Building and Deploying a Real-World Application

This final week is about orchestration. You will move from isolated features to a cohesive, professional application by managing complex state and preparing your work for the public.

---

## Lesson 1: State Management with Redux

While Context API is great for low-frequency updates (like theme changes), **Redux** provides a robust, predictable state container for large-scale applications with frequent state updates.

* **Redux Toolkit (RTK):** The modern, recommended way to write Redux logic. It drastically reduces boilerplate code.
* **Key Concepts:**
* **Store:** The single source of truth.
* **Slice:** A collection of state and reducers for a specific feature.
* **Dispatch:** The method used to trigger state changes.



```javascript
// A simple counter slice with Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;

```

---

## Lesson 2: Implementing Features (CRUD)

CRUD stands for **Create, Read, Update, Delete**. This is the backbone of most web applications.

* **Create:** Sending a POST request to add data.
* **Read:** Fetching data via GET.
* **Update:** Sending a PUT or PATCH request to modify existing data.
* **Delete:** Sending a DELETE request to remove data.

When implementing this, ensure your UI provides immediate feedback (e.g., loading spinners or success messages) to the user after an operation.

---

## Lesson 3: Deployment and Best Practices

### Preparing for Production

Before deploying, you must build your application for performance.

* **Command:** `npm run build`
* This creates a `dist/` folder containing minified, optimized static assets ready for a web server.

### Best Practices

* **Environment Variables:** Never hardcode API keys. Use a `.env` file (e.g., `VITE_API_KEY`) and keep it out of version control.
* **Folder Structure:** Organize by feature (e.g., `components/`, `hooks/`, `store/`, `services/`) rather than by file type.
* **Deployment:** Platforms like **Vercel** or **Netlify** are optimized for React. They allow for "Continuous Deployment"—whenever you push to your GitHub `main` branch, your site automatically updates.

---

## Week 4 Project: Full-Stack To-Do App

* **Goal:** Build a robust Task Manager.
* **Core Requirements:**
* **Global State:** Use Redux Toolkit to manage the list of tasks.
* **Remote API:** Fetch initial tasks from a mock API (like [JSONPlaceholder](https://jsonplaceholder.typicode.com/)) or a backend of your choice.
* **Persistence:** Implement full CRUD functionality (Add new tasks, toggle completion, delete tasks).
* **Deployment:** Deploy your application to Vercel or Netlify and document the link in your project repository.
