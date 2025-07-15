import React,{useState} from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home=()=>{
    const[query,setquery]=useState("");
    const navigate = useNavigate();


    const handleSearch=()=>{
        if(query.trim()!==""){
            navigate(`/compare/${query}`);
    }
};

return (
  <div className="home">
    <h1>Compare Product Prices</h1>
     {/* <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-4 rounded-lg">
       <h2 className="text-xl font-semibold">Dark Mode Enabled Card</h2>
      </div> */}

    <input
      type="text"
      placeholder="Enter the product price.."
      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
             bg-white text-black placeholder-gray-500 
             dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      value={query}
      onChange={(e) => setquery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(); // 👈 search function call
        }
      }}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
);
};
export default Home;