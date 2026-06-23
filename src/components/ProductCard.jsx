// import React from 'react';

// // Reusable Product Card Component
// const ProductCard = ({ image, title, price, description }) => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
//       {/* Product Image */}
//       <img 
//         src={image} 
//         alt={title} 
//         className="w-full h-48 object-cover rounded-md" 
//       />
      
//       {/* Product Info */}
//       <div className="flex flex-col gap-1">
//         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
//         <p className="text-[#757575] text-sm line-clamp-2">{description}</p>
//         <span className="text-xl font-semibold text-gray-950 mt-2">${price}</span>
//       </div>

//       {/* Zindua Red Action Button */}
//       <button className="bg-[#fe3448] text-white py-2 px-4 rounded-md font-medium hover:bg-red-600 transition-colors mt-auto">
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;

import { useContext, memo } from 'react';
import { CartContext } from '../context/CartContext';
import { addItem } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

// const ProductCard = ({ product }) => {
//   const { addToCart } = useContext(CartContext);

const ProductCard = memo(({ product }) => {
  const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="font-bold text-gray-900">{product.title}</h3>
      <span className="text-xl font-semibold">${product.price}</span>
      
      {/* <button 
        onClick={() => addToCart(product)}
        className="bg-[#fe3448] text-white py-2 rounded-md hover:bg-red-600"
      >
        Add to Cart
      </button> */}

      <button 
      onClick={() => dispatch(addItem(product))}
      className="bg-[#fe3448] text-white py-2 rounded-md hover:bg-red-600"
    >
      Add to Cart
    </button>
    </div>
  );
  
});

export default ProductCard;