import React from "react";
import { useGetCategory } from "../hooks/useAnimeHook";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import TextHeader from "../components/TextHeader";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";

function Category() {
  const { category } = useParams();

  const payload = {
    category: category,
    page: 1,
  };

  const { categoryData, isCategoryLoading, isCategoryError } =
    useGetCategory(payload);

  if (isCategoryLoading) return <LoadingScreen errorHook={isCategoryError} />;

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
                className="px-2 py-2 rounded-md sm:px-3 group hover:bg-gray-500/10">
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
