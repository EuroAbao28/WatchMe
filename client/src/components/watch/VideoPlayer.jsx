import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetStreamLink } from "../../hooks/useAnimeHook";
import ReactPlayer from "react-player";
import { useAnimeContext } from "../../contexts/AnimeContext";

function VideoPlayer({ isGetStreamLoading }) {
  const location = useLocation();
  const episodeId = location.pathname.split("/watch/")[1] + location.search;

  const { currentServerCategory } = useAnimeContext();

  const { streamData, isStreamLoading, isStreamError } = useGetStreamLink({
    episodeId,
    server: currentServerCategory.server,
    category: currentServerCategory.category,
  });

  const sendState = () => {
    isGetStreamLoading(isStreamLoading);
  };

  useEffect(() => {
    sendState();
  }, [isStreamLoading]);

  const subtitleTracks = (streamData?.tracks || [])
    .filter((track) => track.kind === "captions")
    .map((track) => ({
      kind: "subtitles",
      src: track.file,
      srcLang: track.label,
      label: track.label,
      ...(track.default && { default: true }), // Conditionally add default
    }));

  return (
    <div className="flex h-[20rem] md:h-[25rem] lg:h-[30rem]  items-center  justify-center bg-black md:mx-6 rounded-b-md">
      <div className="w-full h-full aspect-video focus:outline-none active:outline-none active:border-none focus:border-none ">
        {!isStreamLoading && !isStreamError ? (
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
          <>
            {isStreamError ? (
              <div className="flex items-center justify-center h-full text-gray-300/50">
                Something went wrong. Please try again later.
              </div>
            ) : (
              <div className="flex items-center justify-center h-full ">
                <span className="loading loading-spinner bg-rose-500 loading-lg"></span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
