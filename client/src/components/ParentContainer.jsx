import React from "react";

function ParentContainer({ children }) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen text-gray-300 bg-gray-950 ">
      {children}
    </div>
  );
}

export default ParentContainer;
