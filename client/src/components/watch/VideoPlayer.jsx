import React from "react";
import { useLocation } from "react-router-dom";
import { useGetStreamLink } from "../../hooks/useAnimeHook";
import ReactPlayer from "react-player";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { BsCcSquareFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";

function VideoPlayer({ data }) {
  const location = useLocation();
  const episodeId = location.pathname.split("/watch/")[1] + location.search;

  const { streamData, isStreamLoading, isStreamError } =
    useGetStreamLink(episodeId);

  const subtitleTracks = (streamData?.tracks || [])
    .filter((track) => track.kind === "captions")
    .map((track) => ({
      kind: "subtitles",
      src: track.file,
      srcLang: track.label,
      label: track.label,
      ...(track.default && { default: true }), // Conditionally add default
    }));

  console.log(streamData);

  return (
    <div>
      <div className="flex h-[20rem] lg:h-[30rem]  items-center  justify-center bg-black md:mx-6 rounded-b-md">
        <div className="w-full h-full aspect-video focus:outline-none active:outline-none active:border-none focus:border-none ">
          {!isStreamLoading ? (
            <ReactPlayer
              url={streamData.sources[0].url}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                  tracks: subtitleTracks,
                },
              }}
              onFocus={(e) => (e.target.style.outline = "none")}
              onBlur={(e) => (e.target.style.outline = "none")}
            />
          ) : (
            <div className="flex items-center justify-center h-full ">
              <span className="loading loading-spinner bg-rose-500 loading-lg"></span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-12 p-6 rounded-md sm:mx-6 sm:mt-6 bg-gray-500/5 md:outline outline-1 outline-gray-500/20 ">
        <div className="">
          <div className="flex lg:items-center gap-x-6 max-sm:flex-col-reverse ">
            <h1 className="flex-1 text-lg font-semibold">
              {data.anime.info.name}
            </h1>

            <div className="hidden mt-6 mb-4 border-b border-gray-500/10 max-sm:block"></div>

            <div className="flex items-center justify-between gap-6">
              <button className="px-4 py-1.5 text-xl transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
                <LuChevronLeft />
              </button>

              <p className="font-semibold">
                {`Ep. ${
                  data.episodesData.episodes.filter(
                    (item) => item.episodeId === episodeId
                  )[0].number
                }`}
              </p>

              <button className="px-4 py-1.5 text-xl transition-all rounded text-rose-500 hover:bg-gray-500/10 bg-gray-500/5 outline outline-1 outline-gray-500/20 active:scale-95">
                <LuChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* {streamData.episodeServer && (
          <div className="p-6 mx-6 rounded-md outline outline-1 outline-gray-500/20 bg-gray-500/5">
            <div className="flex gap-4 justify-evenly">
              {streamData.episodeServer.sub &&
                streamData.episodeServer.sub.length > 0 && (
                  <div className="flex items-center ">
                    <div className="flex items-center w-20 gap-2 text-sm font-bold">
                      <BsCcSquareFill />
                      <p>SUB:</p>
                    </div>
                    <div className="flex gap-4">
                      {streamData.episodeServer.sub.map((item, index) => (
                        <p
                          key={index}
                          className="px-2 py-1 text-sm font-semibold uppercase rounded-sm outline outline-1 outline-gray-500/20 bg-gray-500/5">
                          {item.serverName}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              <div className="border-l border-gray-500/50"></div>

              {streamData.episodeServer.dub &&
                streamData.episodeServer.dub.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex items-center w-20 gap-2 text-sm font-bold">
                      <FaMicrophone />
                      <p>DUB:</p>
                    </div>
                    <div className="flex gap-4">
                      {streamData.episodeServer.dub.map((item, index) => (
                        <p
                          key={index}
                          className="px-2 py-1 text-sm font-semibold uppercase rounded-sm outline outline-1 outline-gray-500/20 bg-gray-500/5">
                          {item.serverName}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default VideoPlayer;
