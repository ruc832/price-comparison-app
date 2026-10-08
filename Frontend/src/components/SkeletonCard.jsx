import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse">
      <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>

      <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>

      <div className="h-6 w-20 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
