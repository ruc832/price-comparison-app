import React,{useState} from "react";
import "./Home.css";
import SearchBar from "../components/searchbar";
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
    <h1 className="text-4xl font-bold text-center mt-20">
      Compare Product Prices
    </h1>
    <p className="text-center text-gray-500 mt-2">
      Find the best deals across platforms
    </p>

    <SearchBar query={query} setQuery={setquery} onSearch={handleSearch} />
  </div>
);
};
export default Home;