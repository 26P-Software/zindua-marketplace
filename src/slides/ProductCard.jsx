const ProductCard = ({ image, title, price, description }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Product Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      
      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2" style={{ color: '#fe3448' }}>
          {title}
        </h2>
        
        <p className="text-sm mb-4" style={{ color: '#757575' }}>
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          
          <button 
            className="px-4 py-2 rounded-md text-white font-medium"
            style={{ backgroundColor: '#fe3448' }}
            onClick={() => alert(`Added ${title} to cart!`)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import { useContext, memo } from 'react';
// import { CartContext } from '../context/CartContext';
// import { addItem } from '../store/cartSlice';
// import { useDispatch } from 'react-redux';

// // const ProductCard = ({ product }) => {
// //   const { addToCart } = useContext(CartContext);

// const ProductCard = memo(({ product }) => {
//   const { addToCart } = useContext(CartContext);
//   const dispatch = useDispatch();

//   return (
//     <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
//       <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
//       <h3 className="font-bold text-gray-900">{product.title}</h3>
//       <span className="text-xl font-semibold">${product.price}</span>
      
//       {/* <button 
//         onClick={() => addToCart(product)}
//         className="bg-[#fe3448] text-white py-2 rounded-md hover:bg-red-600"
//       >
//         Add to Cart
//       </button> */}

//       <button 
//       onClick={() => dispatch(addItem(product))}
//       className="bg-[#fe3448] text-white py-2 rounded-md hover:bg-red-600"
//     >
//       Add to Cart
//     </button>
//     </div>
//   );
  
// });

// export default ProductCard;