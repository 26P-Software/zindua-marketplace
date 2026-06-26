# Week 1: Zindua-Marketplace Fundamentals

This week, we lay the foundation for the **Zindua-Marketplace**. We transition from basic JavaScript to building a functional, modular e-commerce dashboard using React.

---

## Lesson 1: Introduction to React

### What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces.

* **Declarative vs. Imperative:** In standard JavaScript (imperative), you tell the browser *how* to change the DOM step-by-step. In React (declarative), you describe *what* you want the UI to look like based on your current state, and React handles the DOM updates for you.
* **Component-Based:** We build our marketplace by breaking the interface into independent, reusable pieces (e.g., `ProductCard`, `CartButton`, `Navbar`). This encapsulation makes code easier to test, debug, and maintain.
* **Virtual DOM:** React maintains a lightweight copy of the DOM in memory. When your data changes, React performs a "diffing" process to determine the most efficient way to update the real browser DOM, which ensures high performance even in complex applications.

### The SPA Architecture

Single Page Applications (SPAs) provide a fluid user experience. Instead of the browser requesting a new HTML file from the server every time a user clicks a link (which causes a full page reload), the browser loads one initial shell (`index.html`) and uses JavaScript to dynamically swap components in and out of the DOM.

### Setting Up the Environment

To start your journey, ensure you have [Node.js](https://nodejs.org/) installed. We use **Vite** because it is significantly faster and provides a modern development environment.

**Commands:**

```bash
# Create project
npm create vite@latest zindua-marketplace -- --template react

# Navigate to the project directory
cd zindua-marketplace

# Install necessary dependencies
npm install

# Run the development server
npm run dev

```

---

## Lesson 2: Components and Modules

In an e-commerce site, we decompose the UI into atomic components. We distinguish between **Default Exports** (usually your main component) and **Named Exports** (helper components or utilities).

### 1. Default Export: The Product List

The `ProductList` acts as a container that maps over our data to render individual product items.

```jsx
// src/components/ProductList.jsx
import { ProductItem } from './ProductItem';

export default function ProductList({ products, onAddToCart }) {
  return (
    <section>
      <h2>Marketplace Catalog</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}

```

### 2. Named Exports: Product Item

Named exports allow us to group related, smaller functional parts together.

```jsx
// src/components/ProductItem.jsx
export const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h3>{product.name}</h3>
      <p>Price: KES {product.price}</p>
      
      {product.inStock ? (
        <button onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <button disabled style={{ backgroundColor: 'grey' }}>
          Out of Stock
        </button>
      )}
    </div>
  );
};

```

---

## Lesson 3: State and Events

State is the "memory" of your component. We use the `useState` hook to keep track of items added to the cart.

```jsx
// src/components/Cart.jsx
import { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // We create a new array to maintain immutability
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <h3>Your Cart ({cartItems.length} items)</h3>
    </div>
  );
}

```

---

## Lesson 4: Rendering and Lists

### Data Integration & The Orchestrator

We import our data and handle logic in the `App.jsx` file.

```javascript
// src/data.js
export const products = [
  { id: 1, name: "Zindua Hoodie", price: 3500, inStock: true },
  { id: 2, name: "Developer Mug", price: 800, inStock: true },
  { id: 3, name: "React Sticker Pack", price: 200, inStock: false },
  { id: 4, name: "Mechanical Keyboard", price: 7500, inStock: true }
];

```

```jsx
// src/App.jsx
import { useState } from 'react';
import ProductList from './components/ProductList';
import { products } from './data';

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Zindua Marketplace</h1>
      <p>Items in Cart: {cart.length}</p>
      
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </main>
  );
}

```

---

## Week 1 Project: Zindua-Marketplace Dashboard

* **Goal:** Build a modular, interactive product catalog.
* **Requirements:**
1. **File Structure:** Organize your project with `src/components/` for `ProductItem.jsx`, `ProductList.jsx`, and `Cart.jsx`.
2. **Data Flow:** Import the `products` array from a `data.js` file and pass it as props to your list components.
3. **Interaction:** Implement "Add to Cart" in `ProductItem` which calls the `onAddToCart` function passed down from `App.jsx`.
4. **Immutability:** Always use the state setter function (`setCart`) with the spread operator (`[...]`) to update your state, ensuring React detects the change.