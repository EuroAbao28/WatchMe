import React from "react";
import { useAnimeContext } from "../contexts/AnimeContext";

function ErrorScreen() {
  const { isHomeError } = useAnimeContext();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      ErrorScreen
    </div>
  );
}

export default ErrorScreen;
