import React from "react";
import { Link } from "react-router-dom";

function LoadingScreen({ errorHook }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="flex items-center gap-2 ">
          <p className="text-2xl italic font-black text-rose-500">WM</p>
          <h1 className="text-xl font-semibold mt-0.5">WatchMe</h1>
        </div>
        {errorHook ? (
          <div className="flex flex-col items-center justify-center mx-6 ">
            <p className="opacity-50">
              Something went wrong. Please try again later.
            </p>

            <Link
              to={"/"}
              className="px-4 py-1 mt-6 rounded hover:bg-gray-500/10 text-gray-300/50 bg-gray-500/5 outline outline-1 outline-gray-500/20 ">
              Go to Home
            </Link>
          </div>
        ) : (
          <span className="h-10 loading loading-dots loading-lg text-rose-500"></span>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
