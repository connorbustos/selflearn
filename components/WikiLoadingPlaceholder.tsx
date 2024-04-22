import React from "react";

const placeholderCount = 12;

const WikiLoadingPlaceholder = () => {
  return (
    <div className="overflow-y-auto px-32 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: placeholderCount }, (_, index) => (
          <div
            key={index}
            className="w-full min-w-[250px] rounded-2xl shadow-md bg-gray-200 animate-pulse flex flex-col justify-between min-h-[200px] max-h-[200px]"
          >
            <div className="p-4">
              <div className="text-xl font-normal truncate bg-gray-300 rounded h-6 w-3/4 mb-4"></div>
              <div className="truncate bg-gray-300 rounded h-4 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WikiLoadingPlaceholder;
