import React from "react";
import TextHeader from "../TextHeader";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAnimeContext } from "../../contexts/AnimeContext";

function EpisodesContainer({ header, data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const episodeId = location.pathname.split("/watch/")[1] + location.search;

  const { currentVideoData, setCurrentServerCategory } = useAnimeContext();

  const handleChangeEpisode = (episodeId, e) => {
    e.preventDefault();

    if (!currentVideoData.anilistID)
      setCurrentServerCategory({
        server: "hd-1",
        category: "sub",
      });

    navigate(`/watch/${episodeId}`);
  };

  return (
    <div className="p-6 md:bg-gray-500/5 flex flex-col xl:h-[20rem] max-h-[20rem] rounded-md w-full xl:w-[20rem] md:outline outline-1 outline-gray-500/20">
      <TextHeader text={header} />

      <div className="mt-4 overflow-y-auto ">
        {data.episodes.length > 0 ? (
          <div
            className={classNames(
              "grid grid-cols-5 gap-2 p-1 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))] xl:grid-cols-5"
            )}>
            {data.episodes.map((item, index) => (
              <Link
                to={`/watch/${item.episodeId}`}
                onClick={(e) => {
                  handleChangeEpisode(item.episodeId, e);
                }}
                key={item.episodeId}
                className={classNames(
                  "flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-sm hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20",
                  {
                    "text-rose-500 bg-rose-500/10 outline-rose-500/20 hover:bg-gray-500/20":
                      episodeId === item.episodeId,
                  }
                )}>
                {item.number}
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-4 py-2 rounded-md bg-gray-500/5 outline outline-1 outline-gray-500/20 w-fit">
            No Episode Available
          </div>
        )}
      </div>
    </div>
  );
}

export default EpisodesContainer;
