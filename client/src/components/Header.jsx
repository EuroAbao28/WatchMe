import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuChevronLeft } from "react-icons/lu";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const episode = searchParams.get("ep");

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearchInput("");
    setIsSearchExpanded(false);

    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
  };

  // Function to handle the scroll event
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, []);

  // auto focus to input field
  useEffect(() => {
    if (isSearchExpanded) inputRef.current.focus();
  }, [isSearchExpanded]);

  return (
    <header
      className={classNames(
        "z-50  flex justify-between w-full px-6 py-4 transition-all shadow-sm ",
        {
          "sticky top-0 bg-gray-950": !id || episode,
          "fixed sm:sticky top-0 sm:bg-gray-950": id,
          "max-sm:bg-gray-950": scrollPosition > 0 && !episode,
        }
      )}>
      <Link
        to={"/"}
        className={classNames(
          "flex cursor-pointer items-center gap-2 focus:outline-none",
          {
            "max-md:hidden": isSearchExpanded,
          }
        )}>
        <p className="text-2xl italic font-black text-rose-500">WM</p>
        <h1 className="text-xl font-semibold">WatchMe</h1>
      </Link>

      {/* for small screen */}
      <>
        {!isSearchExpanded && (
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="p-4 rounded-full cursor-pointer md:hidden outline outline-1 hover:bg-gray-500/10 hover:text-rose-500 outline-gray-500/20 sm:bg-gray-500/5 text-gray-300/50">
            <FiSearch />
          </div>
        )}

        {isSearchExpanded && (
          <section className="flex items-center w-full gap-2 md:hidden">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="flex items-center justify-center h-full p-2 rounded-l-full text-rose-500 bg-gray-500/5 outline outline-1 outline-gray-500/20 aspect-square">
              <LuChevronLeft className="text-xl" />
            </button>

            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center flex-1 rounded-r-full focus-within:outline-gray-500/40 outline outline-1 outline-gray-500/20 bg-gray-500/5">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search anime"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-4 pr-2 bg-transparent placeholder-gray-300/50 focus:outline-none"
              />

              <button
                type="submit"
                className="p-4 rounded-full cursor-pointer hover:text-rose-500 text-gray-300/50 hover:bg-gray-500/10">
                <FiSearch />
              </button>
            </form>
          </section>
        )}
      </>

      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center rounded-full md:w-[40%] lg:w-[30%] xl:w-[25%] max-md:hidden outline outline-1 focus-within:outline-2 outline-gray-500/20 bg-gray-500/5">
        <input
          type="text"
          placeholder="Search anime"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-4 pr-2 bg-transparent focus:outline-none placeholder-gray-300/50"
        />

        <button
          type="submit"
          className="p-4 rounded-full cursor-pointer hover:text-rose-500 hover:bg-gray-500/10 text-gray-300/50">
          <FiSearch />
        </button>
      </form>
    </header>
  );
}

export default Header;
