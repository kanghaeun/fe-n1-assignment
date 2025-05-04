let bookmarks = JSON.parse(localStorage.getItem("movieBookmarks")) || [];

function saveBookmarks() {
  localStorage.setItem("movieBookmarks", JSON.stringify(bookmarks));
}
