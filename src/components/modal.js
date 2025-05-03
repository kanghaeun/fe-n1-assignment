import { moviesData } from "/src/apis/fetchMovies.js";

export function modal() {
  const movieCardContainer = document.querySelector(".movie-card");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-btn")) {
      closeModal();
    }
  });

  overlay.addEventListener("click", closeModal);

  movieCardContainer.addEventListener("click", (event) => {
    const section = event.target.closest(".section");
    if (section) {
      const movieId = section.dataset.id;
      openModal(movieId);
    }
  });

  function openModal(movieId) {
    const movie = moviesData.find((movie) => movie.id == movieId);

    if (movie) {
      const roundedVote = Math.round(movie.vote * 10) / 10;

      modal.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster}" class="modal-img">
        <div class="modal-content">
          <button class="close-btn">✕</button>
          <h2 class="modal-title">${movie.title}</h2>
          <p class="modal-vote">평점 ${roundedVote}</p>
          <hr>
          <p class='modal-summary'> 줄거리 </p>
          <p class="modal-overview">${movie.overview}</p>
        </div>
      `;

      modal.style.display = "flex";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }
}
