# Week 2: Intermediate React - Building for Scale

This week, we bridge the gap between simple components and professional-grade application architecture. We move into managing complex data, styling effectively, and architecting scalable navigation within the **Zindua-Marketplace**.

---

## Lesson 1: Forms and Hooks

### Controlled Components

In React, "controlled" components are form elements where the state is the "single source of truth." You sync the input value with state via `value` and `onChange`.

```jsx
// src/components/ProductSearch.jsx
import { useState } from 'react';

export default function ProductSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search products..."
        className="border p-2"
      />
      <button type="submit" className="ml-2 bg-black text-white p-2">Search</button>
    </form>
  );
}

```

### The `useEffect` Hook

Use `useEffect` to synchronize your component with external systems (e.g., fetching initial inventory data from an API).

---

## Lesson 2: Styling and Modern UI with shadcn/ui

We will move away from manual CSS and utilize **shadcn/ui**, a collection of accessible, beautiful, and copy-pasteable components built with Tailwind CSS and Radix UI.

### The Workflow

1. **Initialize:** `npx shadcn@latest init`
2. **Add Components:** `npx shadcn@latest add card input button`
3. **Usage:**

```jsx
// src/components/ui/card-demo.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Price: KES {product.price}</p>
        <Button variant="default">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}

```

---

## Lesson 3: State Management with Context API

### The Problem: Prop Drilling

Passing data through several layers of components just to get it to a deep child is "prop drilling." It makes components fragile.

### The Solution: Context API

Context provides a way to share values (like `cart` or `theme`) globally without passing props at every level.

```jsx
// src/context/CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

```

---

## Lesson 4: Routing and Navigation

To create a multi-page feel in the Zindua-Marketplace, use `react-router-dom`.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4">
        <Link to="/">Catalog</Link>
        <Link to="/cart">My Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

```

---

## Week 2 Project: Multi-Page Zindua-Marketplace

* **Goal:** Upgrade your Marketplace to a full-featured application.
* **Requirements:**
* **shadcn/ui:** Replace basic HTML buttons/cards with shadcn `Card` and `Button` components.
* **Global State:** Implement the `CartContext` so the cart count updates correctly across both the "Catalog" page and the "Cart" page.
* **Routing:** Enable navigation between the Product Catalog and a dedicated Cart page.
* **Theme:** Use Context API to implement a "Dark Mode" toggle that affects the entire application background.



How does the transition to global state (Context) feel compared to passing props down manually?