import React, { useEffect, useState } from "react";
import { useGetHome, useGetSearchResult } from "../hooks/useAnimeHook";
import LoadingScreen from "../components/LoadingScreen";
import { Link, useSearchParams } from "react-router-dom";
import TextHeader from "../components/TextHeader";
import { useAnimeContext } from "../contexts/AnimeContext";
import { FaFilter } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import classNames from "classnames";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { FiSearch, FiRotateCcw } from "react-icons/fi";

function Search() {
  const { homeData } = useAnimeContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  // console.log("PARAMS: ", params);

  const {
    getSearchResult,
    searchResultData,
    isSearchResultLoading,
    isSearchResultError,
  } = useGetSearchResult();

  const [isExpanded, setIsExpanded] = useState(false);
  const [filterParams, setFilterParams] = useState({
    page: Number(params.page),
    type: params.type || "",
    status: params.status || "",
    rated: params.rated || "",
    season: params.season || "",
    sort: params.sort || "",
    genres: params.genres ? params.genres.split(",") : [],
  });

  // console.log("FILTER: ", filterParams);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genre) => {
    setFilterParams((prev) => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const handleResetFilter = () => {
    setFilterParams({
      q: params.q,
      page: 1,
      type: "",
      status: "",
      rated: "",
      season: "",
      sort: "",
      genres: [],
    });

    setSearchParams({ q: params.q, page: 1 });
  };

  const handleApplyFilter = () => {
    const pageResetFilterParams = { ...filterParams, page: 1 };
    const hasValue = {};

    Object.keys(pageResetFilterParams).forEach((key) => {
      const value = pageResetFilterParams[key];

      if (Array.isArray(value)) {
        if (value.length > 0) hasValue[key] = value.join(",");
      } else if (value) hasValue[key] = value;
    });

    setFilterParams(pageResetFilterParams);
    setSearchParams({ ...hasValue, q: params.q });

    // console.log("HAS VALUE: ", hasValue);
  };

  const handleCloseFilter = () => {
    setIsExpanded(false);

    setFilterParams({
      q: params.q,
      page: params.page || 0,
      type: params.type || "",
      status: params.status || "",
      rated: params.rated || "",
      season: params.season || "",
      sort: params.sort || "",
      genres: params.genres ? params.genres.split(",") : [],
    });
  };

  const handleScrollUp = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleNextPage = () => {
    if (searchResultData.hasNextPage) {
      const nextPage = (Number(filterParams.page) || 1) + 1;

      setFilterParams({ ...filterParams, page: nextPage });
      setSearchParams({ ...params, q: params.q, page: nextPage });

      handleScrollUp();
    }
  };

  const handlePrevPage = () => {
    if (filterParams.page > 1) {
      const prevPage = Number(filterParams.page) - 1;

      setFilterParams({ ...filterParams, page: prevPage });
      setSearchParams({ ...params, q: params.q, page: prevPage });

      handleScrollUp();
    }
  };

  // CALL API
  useEffect(() => {
    getSearchResult({
      q: params.q,
      page: filterParams.page,
      type: filterParams.type,
      status: filterParams.status,
      rated: filterParams.rated,
      season: filterParams.season,
      sort: filterParams.sort,
      genres: filterParams.genres.join(","),
    });
  }, [searchParams]);

  if (isSearchResultError)
    return <LoadingScreen errorHook={isSearchResultError} />;

  return (
    <div className="mt-6 md:mx-6">
      {isExpanded ? (
        <div className="relative flex flex-col gap-6 p-6 rounded-md max-md:mx-6 bg-gray-500/5 outline outline-1 outline-gray-500/20">
          <div
            onClick={handleCloseFilter}
            className="absolute p-4 text-xl rounded-full cursor-pointer hover:text-rose-500 text-gray-300/50 right-2 top-2 hover:bg-gray-500/5">
            <RiCollapseDiagonalLine />
          </div>

          <div>
            <h1 className="font-semibold"> Filters</h1>

            <form className="flex flex-wrap gap-4 mt-4">
              <label className="flex items-center gap-4 pl-4 overflow-hidden text-sm font-semibold rounded outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="">Type</p>
                <select
                  name="type"
                  value={filterParams.type}
                  onChange={handleFilterChange}
                  className="p-2 bg-transparent active:bg-gray-900 focus:bg-gray-900 text-rose-500 focus:outline-none active:text-gray-300 focus:text-gray-300">
                  <option value="">All</option>
                  <option value="movie">Movie</option>
                  <option value="tv">TV</option>
                  <option value="ova">OVA</option>
                  <option value="ona">ONA</option>
                  <option value="special">Special</option>
                  <option value="music">Music</option>
                </select>
              </label>

              <label className="flex items-center gap-4 pl-4 overflow-hidden text-sm font-semibold rounded outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="">Status</p>
                <select
                  name="status"
                  value={filterParams.status}
                  onChange={handleFilterChange}
                  className="p-2 bg-transparent active:bg-gray-900 focus:bg-gray-900 text-rose-500 focus:outline-none active:text-gray-300 focus:text-gray-300">
                  <option value="">All</option>
                  <option value="finished-airing">Finished Airing</option>
                  <option value="currently-airing">Currently Airing</option>
                </select>
              </label>

              <label className="flex items-center gap-4 pl-4 overflow-hidden text-sm font-semibold rounded outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="">Rated</p>
                <select
                  name="rated"
                  value={filterParams.rated}
                  onChange={handleFilterChange}
                  className="p-2 bg-transparent active:bg-gray-900 focus:bg-gray-900 text-rose-500 focus:outline-none active:text-gray-300 focus:text-gray-300">
                  <option value="">All</option>
                  <option value="g">G</option>
                  <option value="pg">PG</option>
                  <option value="pg-13">PG-13</option>
                  <option value="r">R</option>
                  <option value="r+">R+</option>
                  <option value="rx">Rx</option>
                </select>
              </label>

              <label className="flex items-center gap-4 pl-4 overflow-hidden text-sm font-semibold rounded outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="">Season</p>
                <select
                  name="season"
                  value={filterParams.season}
                  onChange={handleFilterChange}
                  className="p-2 bg-transparent active:bg-gray-900 focus:bg-gray-900 text-rose-500 focus:outline-none active:text-gray-300 focus:text-gray-300">
                  <option value="">All</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </label>

              <label className="flex items-center gap-4 pl-4 overflow-hidden text-sm font-semibold rounded outline outline-1 outline-gray-500/20 bg-gray-500/5">
                <p className="">Sort</p>
                <select
                  name="sort"
                  value={filterParams.sort}
                  onChange={handleFilterChange}
                  className="p-2 bg-transparent active:bg-gray-900 focus:bg-gray-900 text-rose-500 focus:outline-none active:text-gray-300 focus:text-gray-300">
                  <option value="">Default</option>
                  <option value="recently-added">Recently Added</option>
                  <option value="recently-updated">Recently Updated</option>
                  <option value="score">Score</option>
                  <option value="name-az">Name A-Z</option>
                  <option value="most-watched">Most Watched</option>
                </select>
              </label>
            </form>
          </div>

          <div>
            <h1 className="font-semibold">Genres</h1>

            <div className="flex flex-wrap gap-2 mt-4 max-sm:max-h-[7rem] max-sm:overflow-y-auto">
              {homeData.genres.map((item, index) => (
                <p
                  key={index}
                  onClick={() =>
                    handleGenreChange(item.split(" ").join("-").toLowerCase())
                  }
                  className={classNames(
                    "px-2 py-1 text-sm rounded-sm cursor-pointer hover:bg-gray-500/20 bg-gray-500/5 outline-1 outline outline-gray-500/20",
                    {
                      "text-rose-500 outline-rose-500/20":
                        filterParams.genres.includes(
                          item.split(" ").join("-").toLowerCase()
                        ),
                    }
                  )}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-gray-500/5 outline outline-1 outline-gray-500/20 hover:bg-gray-500/10 w-fit">
              <FiRotateCcw className="text-rose-500" />
              <p className="font-semibold">Reset</p>
            </div>

            <div
              onClick={handleApplyFilter}
              className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-gray-500/5 outline outline-1 outline-gray-500/20 hover:bg-gray-500/10 w-fit">
              <FiSearch className="text-rose-500" />
              <p className="font-semibold">Apply</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer max-md:mx-6 bg-gray-500/5 outline outline-1 outline-gray-500/20 hover:bg-gray-500/10 w-fit">
          <FaFilter className="text-rose-500" />
          <p className="font-semibold">Advance Search</p>
        </div>
      )}

      <div
        className={`${
          isExpanded ? "mt-12" : "mt-6"
        }  p-6 rounded-md md:bg-gray-500/5 md:outline outline-1 outline-gray-500/20`}>
        <TextHeader text={`Search result: ${params.q}`} />

        <div className="grid grid-cols-3 mt-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ">
          {isSearchResultLoading && !searchResultData.searchQuery ? (
            <div className="h-[16rem] col-span-full flex justify-center items-center">
              <span className="loading loading-dots loading-md text-rose-500"></span>
            </div>
          ) : (
            <>
              {searchResultData.animes?.length > 0 ? (
                <>
                  {searchResultData.animes?.map((item, index) => (
                    <Link
                      to={`/watch/${item.id}`}
                      key={index}
                      className="relative px-2 py-2 rounded-md sm:px-3 group hover:bg-gray-500/10">
                      {!isSearchResultLoading &&
                        item.rating &&
                        item.rating.includes("18+") && (
                          <p className="absolute z-10 px-1 text-sm font-semibold bg-orange-600 rounded right-4 top-3">
                            18+
                          </p>
                        )}

                      <div className="aspect-[3/4] overflow-hidden rounded-md">
                        {!isSearchResultLoading ? (
                          <img
                            src={item.poster}
                            alt={item.name}
                            className="w-full h-full transition-all group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="loading loading-spinner loading-sm text-gray-300/50"></span>
                          </div>
                        )}
                      </div>
                      <p
                        className={classNames("line-clamp-2", {
                          "opacity-100": !isSearchResultLoading,
                          "opacity-0": isSearchResultLoading,
                        })}>
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="h-[16rem] col-span-full flex justify-center items-center">
                  <p className="text-center text-gray-300/50">
                    No anime found . Try different filters or keywords.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {(searchResultData.hasNextPage || filterParams.page > 1) && (
          <div className="flex items-center justify-center gap-12 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={isSearchResultLoading}
              className={classNames(
                "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                {
                  "text-rose-500": !isSearchResultLoading,
                  "text-gray-500/20 cursor-wait": isSearchResultLoading,
                }
              )}>
              <LuChevronLeft />
            </button>

            <p className="font-semibold">{filterParams.page || 1}</p>

            <button
              onClick={handleNextPage}
              disabled={isSearchResultLoading}
              className={classNames(
                "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                {
                  "text-rose-500": !isSearchResultLoading,
                  "text-gray-500/20 cursor-wait": isSearchResultLoading,
                }
              )}>
              <LuChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
