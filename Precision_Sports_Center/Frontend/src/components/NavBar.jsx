// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Sports Kits Store</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
