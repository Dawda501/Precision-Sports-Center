import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Shop from "./Pages/Shop.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart.jsx";
import NavBar from "@/components/NavBar.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
