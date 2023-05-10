import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

/* local storage schema */
/* ------------------------
  Bookmark (
    id, // primary key
    labels (
      label,
    ),
    name,
    url,
  )
------------------------ */

// localforage.clear();
// setBookmarks([
//   {
//     id: 0,
//     name: "TNW",
//     url: "https://thenextweb.com/",
//     labels: ['news']
//   },
//   {
//     id: 1,
//     name: "Tech Crunch",
//     url: "https://techcrunch.com/",
//     labels: ['tech', 'news']

//   },
//   {
//     id: 2,
//     name: "The Verge",
//     url: "https://www.theverge.com/",
//     labels: ['blog', 'tech']
//   },
// ]);

// setLabels(new Set(['news', 'blog', 'tech']));

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

export async function getAllLabels() {
  let labels = await localforage.getItem("labels");
  return labels;
}

export async function addLabel(label) {
  const labels = await getAllLabels();
  labels.add(label);
  await setLabels(labels);
  return labels;
}

export async function deleteLabel(label) {
  const labels = await getAllLabels();
  labels.delete(label);
  await setLabels(labels);
  return labels;
}

export async function getBookmarks(labels) {
  await fakeNetwork(`getBookmarks:${labels}`);
  let bookmarks = await localforage.getItem("bookmarks");
  let matchedBookmarks = [];
  if (labels && labels.length > 0) {
    for (let label of labels) {
      matchSorter(bookmarks, label, { keys: [bookmark => bookmark.labels.map(label => label)] })
      .map((bookmark) => {
        if (!matchedBookmarks.includes(bookmark)) matchedBookmarks.push(bookmark);
      });
    }
  } else {
    matchedBookmarks = bookmarks;
  }
  return matchedBookmarks.sort(sortBy("name"));
}

export async function createBookmark(data) {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let bookmark = { id };
  let bookmarks = await getBookmarks();
  Object.assign(bookmark, data);
  bookmarks.push(bookmark);
  await setBookmarks(bookmarks);
  return bookmark;
}

export async function getBookmark(id) {
  await fakeNetwork(`bookmark:${id}`);
  let bookmarks = await localforage.getItem("bookmarks");
  let bookmark = bookmarks.find(bookmark => bookmark.id === id);
  return bookmark ?? null;
}

export async function updateBookmark(id, updates) {
  await fakeNetwork();
  let bookmarks = await localforage.getItem("bookmarks");
  let bookmark = bookmarks.find(bookmark => bookmark.id === id);
  if (!bookmark) throw new Error("No bookmark found for", id);
  Object.assign(bookmark, updates);
  await setBookmarks(bookmarks);
  return bookmark;
}

export async function deleteBookmark(id) {
  let bookmarks = await localforage.getItem("bookmarks");
  let index = bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index > -1) {
    bookmarks.splice(index, 1);
    await setBookmarks(bookmarks);
    return true;
  }
  return false;
}

function setLabels(labels) {
  return localforage.setItem("labels", labels);
}

function setBookmarks(bookmarks) {
  return localforage.setItem("bookmarks", bookmarks);
}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}