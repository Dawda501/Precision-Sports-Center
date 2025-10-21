// src/pages/Admin.jsx
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Admin() {
  const { addProduct } = useContext(ShopContext);
  const [form, setForm] = useState({ name: "", price: "", img: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...form, id: Date.now(), price: Number(form.price) });
    setForm({ name: "", price: "", img: "" });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin - Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.img}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
