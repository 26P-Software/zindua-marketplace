# Week 4: Building and Deploying a Real-World Application 

This final week focuses on managing complex state at scale and orchestrating your application for production.

---

## Lesson 1: State Management with Redux Toolkit

Redux is a predictable state container. Using **Redux Toolkit (RTK)** is the industry standard because it abstracts away the complex boilerplate of traditional Redux.

### 1. The Store (`store.js`)

The Store is the single source of truth. It holds your entire application's state tree.

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

```

### 2. Async Logic with `createAsyncThunk`

For API calls, Redux uses **Thunks**. This allows you to write "side effects" (like API requests) and dispatch actions based on the lifecycle of the request (pending, fulfilled, rejected).

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The Thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

```

---

## Lesson 2: Implementing Features (CRUD)

CRUD operations are handled by dispatching actions to your Slices. When integrating with an API:

1. **Read:** Use `useEffect` + `dispatch(fetchTasks())` on component mount.
2. **Create:** Dispatch an action that triggers a POST request, then updates the local state.
3. **Update/Delete:** Update your local store *after* the server confirms the change (Optimistic UI updates are an advanced alternative where you update the UI before the server responds).

---

## Lesson 3: Deployment and Best Practices

### Preparing for Production

* **Environment Variables:** Use `.env` files to store API endpoints.
* **Production Build:** Run `npm run build` to generate your optimized static files.
* **Deployment:** Connect your GitHub repository to **Vercel** or **Netlify**. They detect the `dist/` folder automatically and provide a live URL for your application.


To deploy your React application to Vercel via the Command Line Interface (CLI), follow these steps. This process assumes you have your project ready to go and pushed to a Git provider (like GitHub, GitLab, or Bitbucket).

### 1. Install the Vercel CLI

You can install the Vercel CLI globally on your machine using npm:

```bash
npm install -g vercel

```

### 2. Login to Vercel

Authenticate your terminal with your Vercel account:

```bash
vercel login

```

*A browser window will open, or a code will be provided, to complete the authentication process.*

### 3. Deploy the Project

Navigate to the root directory of your project and run:

```bash
vercel

```

### 4. Configure Deployment Settings

The CLI will ask you a series of questions to configure your deployment. For a standard Vite-based React project, use these settings:

1. **Set up and deploy?** [Y/n] → **Y**
2. **Which scope?** (Select your account)
3. **Link to existing project?** [Y/n] → **n**
4. **What's your project's name?** (Enter a name, e.g., `zindua-marketplace`)
5. **In which directory is your code located?** → `./`
6. **Want to modify these settings?** [y/N] → **n** (Vite settings are usually auto-detected correctly as `dist` build output).

### 5. Finalizing

Once the deployment finishes, the CLI will provide you with a **Preview URL**. This is a live, functional version of your app.

### 6. Deploying to Production

When you are ready to ship your final version to the main production domain, use the `--prod` flag:

```bash
vercel --prod

```

---

### Pro-Tip: Continuous Deployment (Best Practice)

While the CLI is great for manual deployments or quick previews, the **best practice** is to link your repository to your Vercel account via the Vercel Dashboard (on the web).

Once linked, Vercel will automatically trigger a new deployment every time you `git push` to your `main` branch. This ensures your production environment always reflects your latest codebase without needing to run the CLI command manually.

---

## Week 4 Project: Full-Stack To-Do App

* **Goal:** Build a robust Task Manager.
* **Core Requirements:**
* **Store:** Setup a global Redux store using `configureStore`.
* **Async:** Use `createAsyncThunk` to fetch tasks from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
* **Features:**
* Create: Add a task input form.
* Read: Display the fetched list.
* Update: Toggle a "completed" status.
* Delete: Remove a task by ID.


* **Deployment:** Deploy to Vercel/Netlify and include the link in your `README.md`.