let bookmarks = JSON.parse(localStorage.getItem("movieBookmarks")) || [];

export function isBookmarked(movieId) {
  return bookmarks.some((item) => item.id === Number(movieId));
}

function saveBookmarks() {
  localStorage.setItem("movieBookmarks", JSON.stringify(bookmarks));
}

export function switchBookmark(movieId, movieData) {
  movieId = Number(movieId);

  const index = bookmarks.findIndex((item) => item.id === movieId);

  if (index === -1 && movieData) {
    bookmarks.push({
      id: movieId,
      title: movieData.title,
      poster: movieData.poster,
      vote: movieData.vote,
      overview: movieData.overview,
    });
  } else {
    bookmarks.splice(index, 1);
  }

  saveBookmarks();

  updateBookmarkUI();
}

function updateBookmarkUI() {
  const bookmarkContainer = document.querySelector(".bookmark-container");
  bookmarkContainer.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarkContainer.innerHTML =
      '<p class="no-bookmarks">북마크한 영화가 없습니다.</p>';
  }

  bookmarks.forEach((movie) => {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.className = "bookmark-item";
    bookmarkItem.dataset.id = movie.id;

    bookmarkItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster}" alt="${movie.title}">
      <button class="remove-bookmark" data-id="${movie.id}">
        <i class="fas fa-times"></i>
      </button>
    `;

    bookmarkContainer.append(bookmarkItem);
  });

  const removeButtons = bookmarkContainer.querySelectorAll(".remove-bookmark");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const movieId = btn.dataset.id;
      const movieData = bookmarks.find((item) => item.id === Number(movieId));
      switchBookmark(movieId, movieData);
    });
  });

  const bookmarkItems = bookmarkContainer.querySelectorAll(".bookmark-item");
  bookmarkItems.forEach((item) => {
    item.addEventListener("click", () => {
      const event = new CustomEvent("openBookmarkedMovie", {
        detail: { movieId: item.dataset.id },
      });
      document.dispatchEvent(event);
    });
  });
}
export function getBookmarks() {
  return bookmarks;
}
export function fetchBookmark() {
  updateBookmarkUI();
  document.addEventListener("openBookmarkedMovie", (e) => {
    const movieId = e.detail.movieId;
    const movieSection = document.querySelector(
      `.section[data-id="${movieId}"]`
    );

    if (movieSection) {
      movieSection.click();
    } else {
      document.dispatchEvent(
        new CustomEvent("openMovieModal", {
          detail: { movieId },
        })
      );
    }
  });
}
