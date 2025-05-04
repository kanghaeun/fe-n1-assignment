let bookmarks = JSON.parse(localStorage.getItem("movieBookmarks")) || [];

export function isBookmarked(movieId) {
  return bookmarks.some((item) => item.id === movieId);
}

function saveBookmarks() {
  localStorage.setItem("movieBookmarks", JSON.stringify(bookmarks));
}
