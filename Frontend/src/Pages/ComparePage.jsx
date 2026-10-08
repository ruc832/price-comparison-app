// import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const ComparePage = () => {
  const { product } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData([]);

      try {
        const res = await fetch(
          `https://price-comparison-app-g8bc.onrender.com/compare?product=${encodeURIComponent(product || "")}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();

        if (!Array.isArray(result)) {
          throw new Error("Unexpected response from server");
        }

        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [product]);

  const validProducts = data.filter(
    (item) =>
      item &&
      item.title &&
      item.price &&
      !["Not Found", "Error"].includes(item.title) &&
      !["Not Found", "Error"].includes(item.price),
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Results for: <span className="text-blue-600">{product}</span>
      </h2>

      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/compare")}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : error ? (
          <p className="text-center text-red-600 col-span-full" role="alert">
            {error}
          </p>
        ) : validProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No prices available right now. Please try another product.
          </p>
        ) : (
          validProducts.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default ComparePage;
