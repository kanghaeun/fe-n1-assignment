export function fetchSearchMovies() {
  const searchIcon = document.querySelector(".search-icon");
  const searchInput = document.querySelector(".searchInput");
  const movieCardContainer = document.querySelector(".movie-card");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const searchMovies = async (query) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=ko&page=1`;

      const response = await fetch(url, options);
      const data = await response.json();

      movieCardContainer.innerHTML = "";
      data.results.forEach((movie) => {
        const div = document.createElement("div");
        div.className = "section";
        div.dataset.id = movie.id;
        div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
        movieCardContainer.append(div);
      });
    } catch (error) {
      console.error(error);
    }
  };

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) searchMovies(query);
    }
  });

  searchIcon.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) searchMovies(query);
  });
}
