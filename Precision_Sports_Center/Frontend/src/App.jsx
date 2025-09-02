
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Cart from "./Pages/Cart.jsx";


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
