import { useEffect,useRef } from "react";
import React from "react";
import gsap from "gsap";
import "./productcard.css";

const ProductCard=({item})=>{
  const cardRef = useRef(null);

  // 🔹 Entry animation
  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  // 🔹 Hover animations
  const handleEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="product-card bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
    >
      <h3 className="text-lg font-bold mb-2 text-indigo-700">{item.source}</h3>

      <p className="text-gray-800 font-medium mb-1 truncate">
        {item.title !== "Not Found" ? item.title : "No product found"}
      </p>

      <p className="text-green-600 font-bold text-xl mb-3">
        {item.price !== "Not Found" ? item.price : "N/A"}
      </p>

      {item.link && item.link.startsWith("http") ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          View Product 🔗
        </a>
      ) : (
        <span className="text-sm text-gray-500 italic">No link available</span>
      )}
    </div>
  );
};

export default ProductCard;
    