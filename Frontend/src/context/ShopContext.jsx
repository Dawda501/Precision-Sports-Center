// src/context/ShopContext.jsx
import { createContext, useState } from "react";

export const ShopContext = createContext();

export default function ShopProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Football Kit", price: 50, img: "/img/football.jpg" },
    { id: 2, name: "Basketball Jersey", price: 40, img: "/img/basketball.jpg" },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) =>
    setCart(cart.filter((item, index) => index !== id));

  const addProduct = (newProduct) => setProducts([...products, newProduct]);

  return (
    <ShopContext.Provider value={{ products, cart, addToCart, removeFromCart, addProduct }}>
      {children}
    </ShopContext.Provider>
  );
}
