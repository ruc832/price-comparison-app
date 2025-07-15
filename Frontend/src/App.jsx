import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ComparePage from "./Pages/ComparePage";
import Navbar from "./components/Navbar";
import ProductSearch from "./components/ProductSearch";


function App(){
    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
         <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/compare/:product" element={<ComparePage />}></Route>
            </Routes>
        </Router>
      </div>
    );
}

export default App;