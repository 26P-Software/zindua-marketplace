# Week 3: Advanced React

This week, we elevate your skills by focusing on how applications interact with the outside world, how to ensure they remain performant under load, and how to verify their reliability through testing.

---

## Lesson 1: Backend Integration

### Data Fetching

In modern React, we use the browser's native `fetch` API or libraries like `axios` to retrieve data from external REST APIs. Data fetching is always treated as a "side effect" and must be wrapped in `useEffect`.

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{data.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

```

---

## Lesson 2: Performance Optimization

As applications grow, unnecessary re-renders can degrade the user experience. React provides tools to memoize (cache) results.

* **`React.memo`**: Prevents a component from re-rendering if its props have not changed.
* **`useMemo`**: Caches the *result* of an expensive calculation.
* **`useCallback`**: Caches the *function definition* itself, preventing child components from re-rendering due to prop reference changes.

---

## Lesson 3 & 4: Testing React Applications

Testing ensures your code behaves as expected and prevents regressions when you make updates. We use **Jest** (test runner) and **React Testing Library** (utility for testing components).

### Philosophy: Test the UI as the user sees it.

Instead of testing the internal implementation details of a component (like checking if a specific state variable is true), we test if the screen shows the correct output after an action.

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter on button click', () => {
  render(<Counter />);
  const button = screen.getByText(/increment/i);
  fireEvent.click(button);
  const counterValue = screen.getByText(/count: 1/i);
  expect(counterValue).toBeInTheDocument();
});

```