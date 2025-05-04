let bookmarks = JSON.parse(localStorage.getItem("movieBookmarks")) || [];

export function isBookmarked(movieId) {
  return bookmarks.some((item) => item.id === movieId);
}

function saveBookmarks() {
  localStorage.setItem("movieBookmarks", JSON.stringify(bookmarks));
}

export function switchBookmark(movieId, movieData) {
  const index = bookmarks.findIndex((item) => item.id === movieId);

  if (index === -1) {
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
}
