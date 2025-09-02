// src/compo/ProductCard.jsx
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 w-full bg-blue-600 text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
