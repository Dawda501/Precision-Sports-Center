
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Always show Home at "/" */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
