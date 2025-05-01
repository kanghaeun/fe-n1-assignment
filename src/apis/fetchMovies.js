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
  .then((res) =>
    res.results.forEach((e) => {
      console.log(e);
      let poster_path = e.poster_path;

      const container = document.querySelector(".movie-card");

      const section = document.createElement("section");
      section.className = "section";
      section.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${poster_path})`;

      container.append(section);
    })
  )
  .catch((err) => console.error(err));
