import React from "react";

function TextHeader({ text }) {
  return (
    <h3 className="font-bold text-xl underline underline-offset-[.25rem] decoration-rose-500">
      {text}
    </h3>
  );
}

export default TextHeader;
