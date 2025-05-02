const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const moviesData = [];

async function fetchMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=1&sort_by=popularity.desc",
      options
    );

    const data = await response.json();

    data.results.forEach((e) => {
      const movie = {
        id: e.id,
        title: e.original_title,
        overview: e.overview,
        vote: e.vote_average,
        poster: e.poster_path,
      };
      moviesData.push(movie);

      let poster_path = e.poster_path;

      const container = document.querySelector(".movie-card");

      const section = document.createElement("section");
      section.className = "section";
      section.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${poster_path})`;
      section.dataset.id = e.id;

      container.append(section);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchMovies();
