import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import { deleteBookmark } from '../utils/local-storage-handler';

const card = ((bookmark, handleModalOpen, deleteThisBookmark) => {
  return(
      <React.Fragment>
        <Link href={bookmark.url} underline="none">
          <CardContent>
            <Typography variant="h5" component="div">
                {bookmark.name}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Button size="small" onClick={handleModalOpen}>Edit</Button>
          <Button size="small" onClick={deleteThisBookmark}>Delete</Button>
        </CardActions>
      </React.Fragment>
  );
});

function BookmarkCard({ bookmark, submitForm }) {
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const deleteThisBookmark = async() => {
    await deleteBookmark(bookmark.id);
    submitForm();
  };

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card(bookmark, handleModalOpen, deleteThisBookmark)}</Card>
      </Box>
      <Modal
        open={open}
        onClose={handleModalClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <BookmarkModal type="update" bookmark={bookmark} handleModalClose={handleModalClose} submitForm={submitForm} />
        </div>
      </Modal>
    </>
  );
}

export default BookmarkCard;