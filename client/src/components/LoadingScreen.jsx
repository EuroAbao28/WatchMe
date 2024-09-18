import React from "react";

function LoadingScreen({ errorHook }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="flex items-center gap-2 ">
          <p className="text-2xl italic font-black text-rose-500">WM</p>
          <h1 className="text-xl font-semibold">WatchMe</h1>
        </div>
        {errorHook ? (
          <div className="flex h-10 mx-6 text-center opacity-30 ">
            <p>Something went wrong. Please try again later.</p>
          </div>
        ) : (
          <span className="h-10 loading loading-dots loading-lg text-rose-500"></span>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
