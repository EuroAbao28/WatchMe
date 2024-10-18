// ANIWATCH-API

export const URL_BASE = "https://my-aniwatch-api-sigma.vercel.app/anime";

export const URL_GET_HOME =
  "https://my-aniwatch-api-sigma.vercel.app/anime/home";

export const URL_GET_INFO =
  "https://my-aniwatch-api-sigma.vercel.app/anime/info";

export const URL_GET_EPISDOES =
  "https://my-aniwatch-api-sigma.vercel.app/anime/episodes";

export const URL_GET_STREAM_LINK =
  "https://my-aniwatch-api-sigma.vercel.app/anime/episode-srcs";

export const URL_GET_SERVER =
  "https://my-aniwatch-api-sigma.vercel.app/anime/servers";

export const URL_GET_GENRE =
  "https://my-aniwatch-api-sigma.vercel.app/anime/genre";

export const URL_GET_SEARCH_RESULT =
  "https://my-aniwatch-api-sigma.vercel.app/anime/search";

// MONGO DB SERVER

const local = "http://localhost:5000";
const live = "https://watchme-ia87.onrender.com";
// "https://watchme-ia87.onrender.com/api/activityStats";

export const URL_ACTIVITY_STATS = `${live}/api/activityStats`;

export const URL_USER_AUTH = `${live}/api/user`;

export const URL_USER_MSG = `${live}/api/message`;
