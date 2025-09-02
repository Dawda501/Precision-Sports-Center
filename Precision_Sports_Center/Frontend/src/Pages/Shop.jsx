// src/pages/Shop.jsx
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../Pages/ProductDetails";

export default function Shop() {
  const { products } = useContext(ShopContext);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductDetails key={p.id} product={p} />
      ))}
    </div>
  );
}
