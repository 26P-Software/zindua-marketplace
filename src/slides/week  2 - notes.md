# Week 2: Intermediate React

This week, we transition from basic rendering to handling complex data flows, styling, and application architecture. You will move from single-component thinking to building interconnected application features.

---

## Lesson 1: Forms and Hooks

### Controlled Components

In React, "controlled" components are form elements where the state is the "single source of truth." You sync the input value with state via the `value` and `onChange` props.

```jsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  );
}

```

### useEffect

The `useEffect` hook allows you to perform side effects (data fetching, subscriptions, manual DOM manipulation) after a component renders.

---

## Lesson 2: Styling in React

### Styling Approaches

1. **CSS Modules:** Locally scoped CSS to prevent class name collisions.
2. **Styled Components:** Write CSS-in-JS.
```jsx
import styled from 'styled-components';
const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px;
`;

```


3. **UI Libraries:** Tools like TailwindCSS provide utility classes to build interfaces rapidly without writing custom CSS files.

---

## Lesson 3: State Management with Context API

### The Problem: Prop Drilling

Passing data through several layers of components just to get it to a deeply nested child is called "prop drilling." It makes components hard to maintain and reuse.

### The Solution: Context API

Context provides a way to share values like themes, user authentication, or language preferences globally without passing props at every level.

```jsx
const ThemeContext = React.createContext();

// Provider wraps the parent
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer accesses the value
const theme = useContext(ThemeContext);

```

---

## Lesson 4: Routing and Navigation

### React Router

To build a multi-page feel in an SPA, use `react-router-dom`. It maps URL paths to specific components.

* **Key Components:**
* `BrowserRouter`: The wrapper for your app.
* `Routes` & `Route`: Defines the mapping.
* `Link`: Used for navigation instead of `<a>` tags to prevent page reloads.



```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

```