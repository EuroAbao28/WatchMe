import React from "react";
import { useGetCategory, useGetGenre } from "../hooks/useAnimeHook";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import TextHeader from "../components/TextHeader";
import Top10AnimeContainer from "../components/Top10AnimeContainer";
import GenresContainer from "../components/GenresContainer";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";

function Genre() {
  const { genre } = useParams();

  const payload = {
    genre: genre,
    page: 1,
  };

  const { genreData, isGenreLoading, isGenreError } = useGetGenre(payload);

  if (isGenreLoading) return <LoadingScreen errorHook={isGenreError} />;

  return (
    <div className="mt-6 md:mx-6">
      <div className="flex items-start gap-12 max-xl:flex-col">
        <div className="p-6 xl:w-[55rem] rounded-md  md:bg-gray-500/5 md:outline outline-gray-500/20 outline-1">
          <TextHeader text={genre.replace(/-/g, " ") + " Anime"} />

          <div className="grid grid-cols-3 mt-4 sm:grid-cols-4 md:grid-cols-5">
            {genreData.animes.map((item, index) => (
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
          <div className="p-4 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20">
            <TextHeader text={"Top Airing Animes"} />

            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 xl:grid-cols-1">
              {genreData.topAiringAnimes.map((item, index) => (
                <Link
                  to={`/watch/${item.id}`}
                  key={index}
                  className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-500/10">
                  <div className="w-14 aspect-[3/4] overflow-hidden rounded-sm">
                    <img
                      src={item.poster}
                      alt={item.id}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-2">
                    <p className="text-sm font-semibold line-clamp-2">
                      {item.name}
                    </p>

                    <ul className="flex gap-1">
                      <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                        <BsCcSquareFill />
                        <p>{item.episodes.sub}</p>
                      </li>
                      <li className="flex items-center gap-1 px-1 text-xs font-semibold bg-gray-300 rounded-sm text-gray-950">
                        <FaMicrophone />
                        <p>{item.episodes.dub}</p>
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <GenresContainer data={genreData.genres} />
        </div>
      </div>
    </div>
  );
}

export default Genre;
