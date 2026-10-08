import React, { useRef } from "react";
import gsap from "gsap";

const SearchBar = ({ query, setQuery, onSearch }) => {
  const wrapperRef = useRef(null);

  const handleFocus = () => {
    gsap.to(wrapperRef.current, {
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleBlur = () => {
    gsap.to(wrapperRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <div
        ref={wrapperRef}
        className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-full max-w-xl border"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search product eg. iPhone 14"
          className="flex-1 outline-none px-3 text-gray-700"
        />

        <button
          onClick={onSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
