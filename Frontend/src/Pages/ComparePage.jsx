import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const ComparePage = () => {
  const { product } = useParams(); // get product from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace YOUR_API_URL_HERE with your real API endpoint
        // const res = await fetch(`YOUR_API_URL_HERE?query=${product}`);
        const res = await fetch(
          `https://price-comparison-app-g8bc.onrender.com/compare?product=${encodeURIComponent(product)}`,
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Results for: <span className="text-blue-600">{product}</span>
      </h2>

      {/* Clear button */}
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/compare")}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        >
          Clear
        </button>
      </div>

      {/* Grid of products / skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : data.filter(
            (item) => item.title !== "Not Found" && item.price !== "Not Found",
          ).length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No matching products found.
          </p>
        ) : (
          data
            .filter(
              (item) =>
                item.title !== "Not Found" && item.price !== "Not Found",
            )
            .map((item, index) => <ProductCard key={index} item={item} />)
        )}
      </div>
    </div>
  );
};

export default ComparePage;
