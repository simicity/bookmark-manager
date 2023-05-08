import { useState, useEffect } from 'react';
import BookmarkCard from './BookmarkCard';
import { getBookmarks } from '../utils/local-storage-handler';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
    <Grid container spacing={3}>
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={bookmark.id}>
            <BookmarkCard key={bookmark.id} bookmark={bookmark} submitForm={submitForm} />
          </Grid>
        ))
      ) : (
        <Typography component="div" variant="body1">
          No Bookmark
        </Typography>
      )}
    </Grid>
  );
}

export default AppContent;
