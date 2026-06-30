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

```jsx
import React, { useState, useEffect } from 'react';

function InventoryList() {
  // 1. Set up state for your data, loading status, and errors
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to handle the side effect (API call)
  useEffect(() => {
    // We define an async function inside the effect
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/inventory');
    
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data');
        }
    
        const data = await response.json();
        setInventory(data); // Update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchInventory();
  }, []); // 3. Empty dependency array means this runs EXACTLY ONCE when the component mounts

  // 4. Render UI based on the current state
  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Current Inventory</h2>
      {inventory.length === 0 ? (
        <p>No items in stock.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.quantity} units (${item.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InventoryList;
```

---

Here is the complete, comprehensive guide for **Lesson 2**. It connects the initial workspace configuration, the path alias prerequisites, installing **shadcn/ui**, and wiring it up to a realistic React data-fetching component.

---

## Lesson 2: Styling and Modern UI with shadcn/ui

We will move away from manual CSS and utilize **shadcn/ui**, a collection of accessible, beautiful, and copy-pasteable components built with Tailwind CSS and Radix UI.

### Architectural Overview

Before initializing components, we must bridges Node's file resolution system with both our development server (Vite) and our text editor's auto-completion engine (VS Code).

```
[Browser / Vite] <---> [vite.config.js] <---> [ @/ alias ] <---> [ src/ directory ]
                                                    ^
                                                    |
                                             [jsconfig.json] <---> [VS Code Intel]
```

---

### Step-by-Step Implementation

1. **Install Node Types Development Dependency:** Step 1.
   Vite configuration runs in a Node.js environment. Install `@types/node` so that your project can safely import the native `path` module without compilation warnings.

```bash
npm install -D @types/node
```

2. **Configure Path Aliases in vite.config.js:** Step 2.
   Update your build configuration to resolve the custom `@/` path alias prefix, routing it directly to the local `src` folder.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url' // 1. Import the URL helper

// 2. Recreate __dirname safely in an ES Module environment
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 3. This will now work perfectly!
    },
  },
})
```

3. **Establish Text Editor Intellisense via jsconfig.json:** Step 3.
   Create a `jsconfig.json` file in the root of your project directory. This tells VS Code exactly where to look when you write auto-imports using the alias format.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

4. **Initialize shadcn/ui CLI Workspace:** Step 4.
   Execute the initialization script to generate your workspace configuration map.

```bash
npx shadcn@latest init
```

Select these specific configuration parameters to accommodate a standard Vite + JavaScript environment:

* **Would you like to use TypeScript?** `No`
* **Which style would you like to use?** `Default`
* **Which color would you like to use as base color?** `Slate`
* **Where is your global CSS file?** `src/index.css`
* **Do you want to use CSS variables for colors?** `Yes`
* **Configure the import alias for components:** `@/components`
* **Configure the import alias for utils:** `@/lib/utils`

5. **Download Core Theme Components:** Step 5.
   Pull the raw functional components into your local project workspace directory (`src/components/ui/`).

```bash
npx shadcn@latest add card input button
```

6. **Construct the Live Inventory Dashboard:** Step 6.
   Create a new file at `src/components/InventoryManager.jsx`. This component wires together the modern layout mechanics of **shadcn/ui** with your dynamic data fetching logic.

```jsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InventoryManager() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/inventory');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setInventory([...inventory, { id: Date.now(), name: newItemName, quantity: 0 }]);
    setNewItemName('');
  };

  if (loading) return <div className="text-center p-8 text-muted-foreground">Loading...</div>;
  if (error) return <div className="text-center p-8 text-destructive">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Control</CardTitle>
          <CardDescription>Add new products to the tracking system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="flex gap-4">
            <Input 
              type="text" 
              placeholder="Enter item name..." 
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Add Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          {inventory.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Empty repository.</p>
          ) : (
            <div className="divide-y divide-border">
              {inventory.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {item.quantity} units
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

7. **Mount the Application Root:** Step 7.
   Replace the layout content inside your `src/App.jsx` file to inject the global style layer and display the manager component.

```jsx
import React from 'react';
import InventoryManager from '@/components/InventoryManager';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <nav className="border-b px-6 py-4 mb-4">
        <h1 className="text-lg font-bold tracking-tight">Warehouse System</h1>
      </nav>
      <main>
        <InventoryManager />
      </main>
    </div>
  );
}

export default App;
```

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

Here is how to expand **Lesson 3** to include a `ThemeContext` along with the `CartContext`.

When managing multiple contexts globally, we can scale our application neatly by creating a unified context architecture.

---

## Lesson 3: State Management with Context API

### The Problem: Prop Drilling

Passing data through several layers of components just to get it to a deep child is "prop drilling." It makes components fragile, harder to maintain, and forces intermediate components to know about data they don't use.

### The Solution: Context API

Context provides a way to share values (like `cart` or `theme`) globally without passing props at every level.

```
[ThemeContext.Provider] -> [CartContext.Provider] -> [App Component Tree]
         |                          |                       |
   (Global Theme)             (Global Cart)         (Consumes both)
```

---

### Step 1: Create the Context Files

Instead of bundling everything into one massive file, create individual context modules for better separation of concerns.

#### A. The Cart Context

```jsx
// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

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

#### B. The Theme Context

This manages the styling mode (`light` or `dark`) across your application.

```jsx
// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Optional: Sync with Tailwind dark mode or HTML classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

### Step 2: Wire Providers Together in `src/main.jsx`

To make both the `cart` state and the `theme` status accessible everywhere, wrap your root component inside **both** providers.

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
```

---

### Step 3: Consuming Multiple Contexts (Usage Example)

Now, any nested component deep inside your tree can import React's `useContext` hook to tap into either state simultaneously without passing a single prop down from `App.jsx`.

```jsx
// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  // Pull values from both contexts smoothly
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-background text-foreground">
      <h1 className="text-xl font-bold">Zindua Market</h1>
  
      <div className="flex items-center gap-4">
        {/* Theme Controller */}
        <Button variant="ghost" onClick={toggleTheme}>
          Current Mode: <span className="capitalize ml-1 font-bold">{theme}</span>
        </Button>

        {/* Cart Counter */}
        <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium">
          Cart: <strong>{cart.length}</strong> items
        </div>
      </div>
    </nav>
  );
}
```

---

Here is the updated **Lesson 4** with programmatic navigation included using the `useNavigate` hook.

While `<Link>` is perfect for standard text links, `useNavigate` is essential when you need to redirect users programmatically after an action occurs (like clicking a button, successfully submitting a form, or completing a checkout).

---

## Lesson 4: Routing and Navigation

To create a multi-page feel in the Zindua-Marketplace, use `react-router-dom`.

### Defining the Routes

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutSuccess from './components/CheckoutSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 border-b">
        <Link to="/" className="hover:underline">Catalog</Link>
        <Link to="/cart" className="hover:underline">My Cart</Link>
      </nav>
  
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<CheckoutSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Programmatic Navigation with `useNavigate`

To navigate dynamically after an action finishes, import and invoke the `useNavigate` hook inside your components.

#### Example 1: Redirecting from the Cart after Checkout

Here is how you use `useNavigate` to send a user to a `/success` page immediately after they click a "Place Order" button.

```jsx
// src/components/CartPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleCheckout = () => {
    // Perform checkout logic (e.g., API call to save order)
    console.log("Processing order for items:", cart);
  
    // Clear the cart globally
    setCart([]);
  
    // 3. Trigger programmatic redirect to the success screen
    navigate('/success');
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Your cart is currently empty.</p>
      ) : (
        <>
          <p>You have {cart.length} items ready for purchase.</p>
          <Button onClick={handleCheckout} className="w-full">
            Place Order
          </Button>
        </>
      )}
    </div>
  );
}
```

#### Example 2: Going Back a Page Dynamically

You can also pass integers to `Maps()` to move backwards or forwards through the user's browser history. Passing `-1` acts exactly like pressing the browser's native **Back** button.

```jsx
// src/components/CheckoutSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-600">🎉 Order Confirmed!</h2>
      <p className="text-muted-foreground">Thank you for your purchase at Zindua Marketplace.</p>
  
      <div className="flex justify-center gap-4">
        {/* Navigate to explicit route path string */}
        <Button onClick={() => navigate('/')}>
          Return to Catalog
        </Button>
    
        {/* Navigate relative to history stack integer */}
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
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