import React from "react";

function CenteredContainer({ children }) {
  return <div className="max-w-[1280px] w-full flex-1">{children}</div>;

  // flex-1 is the latest added
}

export default CenteredContainer;
