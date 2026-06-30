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