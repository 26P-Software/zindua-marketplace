# Week 1: React Fundamentals

Welcome to your journey into React. This week, we will strip away the complexity and focus on the core building blocks that make React a powerful library for building modern user interfaces.

---

## Lesson 1: Introduction to React

### What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Instead of manually manipulating the DOM (Document Object Model) with imperative code, you describe **what** you want the UI to look like based on data, and React handles the updates.

* **Key Features:**
* **Component-Based:** Break your UI into small, reusable, independent pieces.
* **Virtual DOM:** React keeps a lightweight representation of the real DOM in memory, calculating the most efficient way to update the browser.
* **Declarative:** Makes code more predictable and easier to debug.



### Single Page Applications (SPAs)

In an SPA, the browser loads a single HTML page and dynamically updates content via JavaScript as the user interacts with the app, without requiring a full page reload.

### Setting Up

To start, ensure you have [Node.js](https://nodejs.org/) installed. We use **Vite** because it provides a blazing-fast development environment.

**Commands:**

```bash
# Create project
npm create vite@latest my-react-app -- --template react

# Navigate and install
cd my-react-app
npm install

# Run the development server
npm run dev

```

---

## Lesson 2: JSX and Components

### Understanding JSX

JSX (JavaScript XML) is a syntax extension that looks like HTML but lives inside JavaScript. It allows us to structure our component trees in a readable way.

### Functional Components

Functional components are JavaScript functions that return JSX. They are the standard for modern React.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
function App() {
  return <Welcome name="Developer" />;
}

```

* **Props:** Short for "properties," these are read-only inputs passed from a parent component to a child to make components dynamic.

---

## Lesson 3: State and Events

### State (`useState`)

State allows components to "remember" information between renders. When state changes, React automatically re-renders the component.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

```

### Handling Events

React event handlers are named using `camelCase` (e.g., `onClick`, `onChange`) and are passed as functions.

---

## Lesson 4: Rendering and Lists

### Conditional Rendering

Use standard JavaScript operators like ternary operators or `&&` to show/hide content.

```jsx
function Status({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <button>Logout</button> : <button>Login</button>}
    </div>
  );
}

```

### Rendering Lists

When rendering multiple items, use the `.map()` method. Always provide a unique `key` prop to help React identify which items have changed.

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

```