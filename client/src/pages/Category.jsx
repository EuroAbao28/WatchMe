import React, { useState } from "react";
import { useGetCategory } from "../hooks/useAnimeHook";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import TextHeader from "../components/TextHeader";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import classNames from "classnames";

function Category() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  const [page, setPage] = useState(Number(currentPage));

  const { categoryData, isCategoryLoading, isCategoryError } = useGetCategory({
    category,
    page,
  });

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setSearchParams({ page: page - 1 });

      setTimeout(() => {
        handleScrollUp();
      }, 100);
    }
  };

  const handleNextPage = () => {
    if (categoryData.hasNextPage) {
      setPage((prev) => prev + 1);
      setSearchParams({ page: page + 1 });

      setTimeout(() => {
        handleScrollUp();
      }, 100);
    }
  };

  if ((!categoryData.animes && isCategoryLoading) || isCategoryError)
    return <LoadingScreen errorHook={isCategoryError} />;

  return (
    <div className="mt-6 md:mx-6">
      <div className="flex items-start gap-12 max-xl:flex-col">
        <div className="p-6 xl:w-[55rem] rounded-md  md:bg-gray-500/5 md:outline outline-gray-500/20 outline-1">
          <TextHeader text={category.replace(/-/g, " ")} />

          <div className="grid grid-cols-3 mt-4 sm:grid-cols-4 md:grid-cols-5">
            {categoryData.animes.map((item, index) => (
              <Link
                to={`/watch/${item.id}`}
                key={index}
                className="relative px-2 py-2 rounded-md sm:px-3 group hover:bg-gray-500/10">
                {!isCategoryLoading &&
                  item.rating &&
                  item.rating.includes("18+") && (
                    <p className="absolute z-10 px-1 text-sm font-semibold bg-orange-600 rounded right-4 top-3">
                      18+
                    </p>
                  )}

                <div className="aspect-[3/4] overflow-hidden rounded-md">
                  {!isCategoryLoading ? (
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
                    "opacity-100": !isCategoryLoading,
                    "opacity-0": isCategoryLoading,
                  })}>
                  {item.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-12 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={isCategoryLoading}
              className={classNames(
                "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                {
                  "text-rose-500": !isCategoryLoading,
                  "text-gray-500/20 cursor-wait": isCategoryLoading,
                }
              )}>
              <LuChevronLeft />
            </button>

            <p className="font-semibold">{page}</p>

            <button
              onClick={handleNextPage}
              disabled={isCategoryLoading}
              className={classNames(
                "px-4 py-1.5 text-xl transition-all rounded  hover:bg-gray-500/10 bg-gray-500/5  outline outline-1 outline-gray-500/20 active:scale-95",
                {
                  "text-rose-500": !isCategoryLoading,
                  "text-gray-500/20 cursor-wait": isCategoryLoading,
                }
              )}>
              <LuChevronRight />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-12 lg:w-full max-md:mx-6">
          <Top10AnimeContainer data={categoryData.top10Animes} />

          <GenresContainer data={categoryData.genres} />
        </div>
      </div>
    </div>
  );
}

export default Category;
