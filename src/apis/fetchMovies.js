const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=1&sort_by=popularity.desc",
  options
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
