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

Here is the complete code implementation for **Lesson 2**, illustrating how these three optimization techniques work together in a realistic component (a searchable product catalog with an item counter).

---

## Lesson 2: Performance Optimization

As applications grow, unnecessary re-renders can degrade the user experience. React provides tools to memoize (cache) results.

* **`React.memo`**: Prevents a component from re-rendering if its props have not changed.
* **`useMemo`**: Caches the *result* of an expensive calculation.
* **`useCallback`**: Caches the *function definition* itself, preventing child components from re-rendering due to prop reference changes.

---

### The Optimized Component Architecture

To see these in action, let's look at a component hierarchy where a parent tracking state updates (`Parent`) passes data and behaviors down to specialized child components.

#### 1. The Child Component (`React.memo`)

By wrapping `ProductItem` in `React.memo`, React will skip re-rendering this component entirely if the `product` and `onSelect` props remain exactly the same between renders.

```jsx
// src/components/ProductItem.jsx
// src/components/ProductItem.jsx
import React from 'react';
import { Button } from '@/components/ui/button';

// React.memo halts re-renders if primitive incoming props do not change
const ProductItem = React.memo(({ product, onSelect }) => {
  console.log(`[Render] ProductItem: ${product.name}`);
  
  return (
    <div className="flex justify-between items-center p-3 border-b text-sm">
      <div>
        <span className="font-medium">{product.name}</span>
        <span className="ml-2 text-muted-foreground">${product.price}</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => onSelect(product.name)}>
        Select
      </Button>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';
export default ProductItem;

```

#### 2. The Main Page (`useMemo` and `useCallback`)

The parent component tracks a search query, a counter, and a list of items. We use `useMemo` to filter products efficiently and `useCallback` to maintain a stable reference for the click-handling function.

```jsx
// src/components/ProductCatalog.jsx
// src/components/ProductCatalog.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductItem from './ProductItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data smoothly from the local products.json file asset
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json'); // Fetches from public directory root
        if (!response.ok) throw new Error('Failed to load JSON asset resource');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []); // Run precisely once on mounting

  // 2. useMemo: Keeps a cached result layout array.
  // Incrementing the 'clickCount' state will NOT trigger re-computation here.
  const filteredProducts = useMemo(() => {
    console.log('[Calculation] Filtering layout arrays...');
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]); // Runs only when products collection or query alterations land

  // 3. useCallback: Caches function identity across updates to maintain prop stability
  const handleSelectProduct = useCallback((name) => {
    console.log(`Selected item index identity: ${name}`);
  }, []);

  if (loading) return <div className="text-center p-6 text-sm text-muted-foreground">Reading inventory storage...</div>;

  return (
    <div className="container mx-auto p-6 max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Optimized Dynamic Catalog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <Input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center justify-between bg-muted p-3 rounded-md">
            <span className="text-sm font-medium">Analytic Click Metric: {clickCount}</span>
            <Button size="sm" onClick={() => setClickCount(c => c + 1)}>
              Click Trigger Hook
            </Button>
          </div>

          <div className="border rounded-md divide-y divide-border mt-4">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

```

---

### Verification Matrix

Open your browser's console tab to watch the lifecycle triggers happen interactively:

| User Interaction | `useMemo` Re-runs? | `ProductItem` Re-renders? | Reason |
| --- | --- | --- | --- |
| **Typing in Search Box** | **Yes** | **Yes** | The `search` dependency updated, changing the output array layout. |
| **Clicking "Log Click"** | **No** | **No** | Caches remain intact. `clickCount` state is isolated from child components. |
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