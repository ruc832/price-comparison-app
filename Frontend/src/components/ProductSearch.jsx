import React,{useState} from "react";
import axios from "axios";

function ProductSearch(){
    const[product,setProduct]=useState("");
    const[results,setResults]=useState([]);
    const[loading,setLoading]=useState(false);

    const handleSearch = async () => {
        if (!product) return;
    
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/compare?product=${product}`);
          setResults(response.data);
        }catch(error){
          console.error("Error fetching data" , error);
          setResults([]);
        }finally{
            setLoading(false);
        }
};


 return (
   <div className="p-4 max-w-md mx-auto text-center">
     <h1 className="text-xl font-semibold mb-4">Price Comparison</h1>
     <input
       type="text"
       value={product}
       onChange={(e) => {
         e.target.value;
       }}
       placeholder="enter product value..."
       className="border p-2 rounded w-full mb-2"
     />
     <button
       onClick={handleSearch}
       className="bg-blue-500 text-white px-4 py-2 rounded"
     >
       Search
     </button>
     {loading ? (
       <p className="mt-4">Loading...</p>
     ) : (
       <div className="mt-4 space-y-4">
         {results.map((item, index) => (
           <div key={index} className="border p-4 rounded shadow">
             <h2 className="font-bold">{item.source}</h2>
             <p className="text-lg">{item.title}</p>
             <p className="text-green-600 font-semibold">{item.price}</p>
             <a
               href={item.link}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-600 underline"
             >
               View on {item.source}
             </a>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}

export default ProductSearch;