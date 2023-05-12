import { useState, useEffect } from 'react';
import BookmarkCard from './BookmarkCard';
import { getBookmarks } from '../utils/local-storage-handler';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '../slices/form';

function AppContent() {
  const [bookmarks, setBookmarks] = useState([]);
  const formSubmitted = useSelector(state => state.formSubmitted.flag);
  const selectedLabels = useSelector(state => state.selectedLabels.labels);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadBookmarks() {
      await getBookmarks(selectedLabels)
      .then((bookmarks) => setBookmarks(bookmarks));
    }

    loadBookmarks();
    dispatch(resetForm());  
  }, [dispatch, formSubmitted, selectedLabels]);

  return (
    <Grid container spacing={3}>
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={bookmark.id}>
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
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
