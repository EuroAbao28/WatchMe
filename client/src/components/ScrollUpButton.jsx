import React, { useEffect, useState } from "react";
import { LuChevronUp } from "react-icons/lu";

function ScrollUpButton() {
  const [isScrollUpButtonShown, setIsScrollUpButtonShown] = useState(false);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 240px
      setIsScrollUpButtonShown(window.scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isScrollUpButtonShown && (
        <button
          onClick={handleScrollUp}
          className="fixed z-50 p-4 text-2xl transition-all rounded-full bg-rose-500 bottom-8 right-8 text-gray-950 active:scale-95 outline-rose-500 outline-offset-2 focus:outline">
          <LuChevronUp />
        </button>
      )}
    </>
  );
}

export default ScrollUpButton;
