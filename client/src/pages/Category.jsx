import React, { useState } from "react";
import { useGetCategory } from "../hooks/useAnimeHook";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import TextHeader from "../components/TextHeader";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

function Category() {
  const { category } = useParams();
  const [page, setPage] = useState(1);

  const { categoryData, isCategoryLoading, isCategoryError } = useGetCategory({
    category,
    page,
  });

  const handlePrevPage = () => {
    if (page === categoryData.currentPage) {
      if (page > 1) setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page === categoryData.currentPage) {
      if (categoryData.hasNextPage) setPage((prev) => prev + 1);
    }
  };

  if (isCategoryLoading || isCategoryError)
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
                {item.rating && item.rating.includes("18+") && (
                  <p className="absolute z-10 px-1 text-sm font-semibold bg-orange-600 rounded right-4 top-3">
                    18+
                  </p>
                )}

                <div className="aspect-[3/4] overflow-hidden rounded-md">
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="w-full h-full transition-all group-hover:scale-105"
                  />
                </div>
                <p className="line-clamp-2">{item.name}</p>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-12 mt-6">
            <button
              onClick={handlePrevPage}
              className="px-4 py-1.5 text-xl transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
              <LuChevronLeft />
            </button>

            <p className="font-semibold">{page}</p>

            <button
              onClick={handleNextPage}
              className="px-4 py-1.5 text-xl transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
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
