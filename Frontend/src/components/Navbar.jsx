import React from "react";
import "./Navbar.css";
import DarkModeToggle from "../components/DarkModeToggle";


const Navbar=()=>{
    return (
      <nav className="navbar">
        <h2>PriceCompare 🔍</h2>
        <DarkModeToggle/>
      </nav>
    );
};

export default Navbar;