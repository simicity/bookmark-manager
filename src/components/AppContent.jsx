import { useState, useEffect } from 'react';
import BookmarkCard from './BookmarkCard';
import { getBookmarks } from '../utils/local-storage-handler';

function AppContent({ formSubmitted, submitForm, resetForm }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function loadBookmarks() {
      await getBookmarks()
      .then((bookmarks) => setBookmarks(bookmarks));
    }

    loadBookmarks();
    resetForm();  
  }, [formSubmitted, resetForm]);

  console.log(bookmarks);
  return (
    <>
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id.toString()} bookmark={bookmark} submitForm={submitForm} />
        ))
      ) : (
        <p>No Bookmarks</p>
      )}
    </>
  );
}

export default AppContent;
