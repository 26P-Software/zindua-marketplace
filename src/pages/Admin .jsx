import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [product, setProduct] = useState({ title: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://fakestoreapi.com/products', product);
    alert('Product added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 max-w-md">
      <h2 className="text-2xl font-bold">Add Product</h2>
      <input 
        placeholder="Title" 
        className="border p-2"
        onChange={(e) => setProduct({...product, title: e.target.value})} 
      />
      <input 
        placeholder="Price" 
        className="border p-2"
        onChange={(e) => setProduct({...product, price: e.target.value})} 
      />
      <button className="bg-[#fe3448] text-white p-2">Submit</button>
    </form>
  );
};

export default Admin;
