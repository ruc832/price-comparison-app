import React,{useState,useEffect} from "react";
import axios from "axios";
import {useParams ,useNavigate} from "react-router-dom";
import ProductCard from "../components/ProductCard";


const ComparePage=()=>{
    const{product}=useParams();   //get product from the url
    const[data,setData]=useState([]);     // store the data in state
    const[loading,setLoading]=useState(true); 
    const [error, setError] = useState(null); //show product is loading 
    const navigate=useNavigate();
    
    

    //fetch data using useeffect
    useEffect(()=>{
        const FetchPrices=async()=>{
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:4000/compare?product=${product}`);  //hit backend api
                setData(res.data); //now dta come in frontend state  store in react
            } catch (err) {
                console.error("Error in Fetching data" ,err);
                setError("Failed to load data");
            }finally{
                setLoading(false);
            }
        };
        FetchPrices();
    },[product]);

    if(loading) return <p className="text-center mt-4"> Loading ...</p>
    if (error) {
      return <div className="text-center mt-10 text-red-600">❌ {error}</div>;
    }

    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center ">
          Results for :<span className="text-blue-600">{product}</span>
        </h2>
        {/* Clear button */}
        <button
          onClick={() => navigate("/compare")}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition">
          Clear
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.filter(item => item.title !== "Not Found" && item.price !== "Not Found").length === 0 && (
         <p className="text-center text-gray-500">No matching products found.</p>)}
         {data.filter((item) => item.title !== "Not Found" && item.price !== "Not Found")
         .map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2">{item.source}</h3>
            <p className="text-gray-700 font-medium mb-1">
              {item.title !== "Not Found" ? item.title : "No product found"}
            </p>
            <p className="text-green-600 font-bold">
              {item.price !== "Not Found" ? item.price : "N/A"}
            </p>
            {item.link && item.link.startsWith("http") ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Product
              </a>
            ) : (
              <span className="text-sm text-gray-500">No link available</span>
            )}
          </div>
          ))}
        </div>
      </div>
    );
};

export default ComparePage;