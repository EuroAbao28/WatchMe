import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { LuChevronUp } from "react-icons/lu";

function ScrollUpButton() {
  const [isButtonShow, setIsButtonShow] = useState(false);
  let scrollTimeout;

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Clear any previously set timeout to avoid hiding the button too early
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Show button when scrolled more than 240px
      if (window.scrollY > 240) {
        setIsButtonShow(true);

        // Set a timeout to hide the button after 2 seconds of inactivity
        scrollTimeout = setTimeout(() => {
          setIsButtonShow(false);
        }, 2000); // 2 seconds delay
      } else {
        setIsButtonShow(false); // Hide button if scrolled to the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener and timeout on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <button
        onClick={handleScrollUp}
        className={classNames(
          "fixed z-50 p-4 text-2xl transition-all transform rounded-full bg-rose-500 right-8 text-gray-950 hover:scale-110 active:scale-95 outline-rose-500 outline-offset-2 hover:outline",
          {
            "bottom-6": isButtonShow,
            "-bottom-20": !isButtonShow,
          }
        )}>
        <LuChevronUp />
      </button>
    </>
  );
}

export default ScrollUpButton;
