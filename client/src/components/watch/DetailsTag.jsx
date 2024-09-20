import React from "react";

function DetailsTag({ tag, desc }) {
  return (
    <div className="flex gap-2">
      <p className="font-semibold min-w-24 sm:min-w-28">{`${tag}:`}</p>
      <p className="flex-1 font-light truncate">{desc || "?"}</p>
    </div>
  );
}

export default DetailsTag;
