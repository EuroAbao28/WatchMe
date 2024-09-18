import classNames from "classnames";
import React, { useState } from "react";

function DetailsTagTruncate({ tag, desc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex gap-2">
      <p className="font-semibold min-w-24 sm:min-w-28">{`${tag}:`}</p>
      <p
        className={classNames(" font-light ", {
          truncate: !isExpanded,
        })}>
        {desc}
        {isExpanded && (
          <span
            onClick={() => setIsExpanded(false)}
            className="ml-4 font-semibold cursor-pointer whitespace-nowrap">
            See less
          </span>
        )}
      </p>
      {!isExpanded && (
        <span
          onClick={() => setIsExpanded(true)}
          className="font-semibold cursor-pointer whitespace-nowrap">
          See more
        </span>
      )}
    </div>
  );
}

export default DetailsTagTruncate;
