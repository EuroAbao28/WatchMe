import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { LuChevronUp, LuMessageSquare } from "react-icons/lu";
import { useUtilityContext } from "../contexts/UtilityContext";

function ScrollUpButton() {
  const {
    isMessageTabOpen,
    setIsMessageTabOpen,
    unreadMessages,
    setUnreadMessages,
  } = useUtilityContext();

  const [isButtonShow, setIsButtonShow] = useState(false);
  let scrollTimeout;

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenChatTab = () => {
    setIsMessageTabOpen(true);
    setUnreadMessages(false);
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
      {!isMessageTabOpen && (
        <div
          className={classNames(
            "fixed z-40 bottom-6 transition-all ease-in-out duration-500  right-6 sm:right-8 "
          )}>
          <button
            onClick={handleScrollUp}
            className={classNames(
              "flex justify-center items-center h-12 aspect-square max-sm:p-3  max-sm:px-3  text-2xl overflow-hidden transition-all duration-300 rounded-full bg-rose-500  text-gray-950 hover:scale-110 active:scale-95 outline-rose-500 outline-offset-2 hover:outline absolute ",
              {
                "-top-16 ": isButtonShow,
                "top-0 ": !isButtonShow,
              }
            )}>
            <LuChevronUp />
          </button>

          <button
            onClick={handleOpenChatTab}
            className="relative flex items-center justify-center h-12 text-2xl transition-all transform rounded-full aspect-square bg-rose-500 max-sm:p-3 text-gray-950 hover:scale-110 active:scale-95 outline-rose-500 outline-offset-2 hover:outline">
            <LuMessageSquare />

            {unreadMessages && (
              <div className="absolute top-0 right-0 w-3 bg-green-500 rounded-full outline outline-3 outline-gray-950 aspect-square"></div>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default ScrollUpButton;
