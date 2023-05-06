import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

/* local storage schema
  Bookmark (
    id, // primary key
    labels (
      label,
    ),
    name,
    url,
  )
*/

// set([
//   {
//     id: 0,
//     name: "TNW",
//     url: "https://thenextweb.com/",
//   },
//   {
//     id: 1,
//     name: "Tech Crunch",
//     url: "https://techcrunch.com/",

//   },
//   {
//     id: 2,
//     name: "The Verge",
//     url: "https://www.theverge.com/",
//   },
// ]);

let uniqueLabels = new Set();
// updateUniqueLabels();

function updateUniqueLabels() {
  // getBookmarks().forEach(bookmark => addUniqueLabels(bookmark.labels));
}

function addUniqueLabels(/*labels*/) {
  // for (let label of labels) {
  //   uniqueLabels.add(label.lower());
  // }
}

export function getUniqueLabels() {
  return uniqueLabels;
}

export async function getBookmarks(label) {
  await fakeNetwork(`getBookmarks:${label}`);
  let bookmarks = await localforage.getItem("bookmarks");
  if (!bookmarks) bookmarks = [];
  if (label) {
    bookmarks = matchSorter(bookmarks, label, { keys: [item => item.labels.map(i => i.label)] });
  }
  return bookmarks.sort(sortBy("name"));
}

export async function createBookmark(data) {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let bookmark = { id };
  let bookmarks = await getBookmarks();
  Object.assign(bookmark, data);
  console.log(bookmark);
  bookmarks.push(bookmark);
  await set(bookmarks);
  addUniqueLabels(bookmark.labels);
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
  await set(bookmarks);
  addUniqueLabels(bookmark.labels);
  return bookmark;
}

export async function deleteBookmark(id) {
  let bookmarks = await localforage.getItem("bookmarks");
  let index = bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index > -1) {
    bookmarks.splice(index, 1);
    await set(bookmarks);
    updateUniqueLabels();
    return true;
  }
  return false;
}

function set(bookmarks) {
  return localforage.setItem("bookmarks", bookmarks);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

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