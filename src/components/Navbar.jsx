import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// Add these two imports:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-[#fe3448] font-bold text-2xl tracking-tight">ZinduaMarket</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[#757575] font-medium">
          <Link to="/" className="hover:text-[#fe3448] transition-colors">Store</Link>
          <Link to="/admin" className="hover:text-[#fe3448] transition-colors">Admin</Link>
          <div className="h-4 w-px bg-gray-200"></div>
          <Link to="/login" className="hover:text-[#fe3448]">Login</Link>
          <Link to="/register" className="bg-[#fe3448] text-white px-5 py-2 rounded-full hover:bg-red-700 transition-all">Get Started</Link>
          
          <Link to="/cart" className="relative flex items-center gap-2 hover:text-[#fe3448] transition-all">
            <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#fe3448] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;