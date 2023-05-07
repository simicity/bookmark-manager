import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import { deleteBookmark } from '../utils/local-storage-handler';
import "./../App.css";

const card = ((bookmark, handleModalOpen, deleteThisBookmark) => {
  return(
      <React.Fragment>
        <Link href={bookmark.url} underline="none">
          <Typography variant="body1" component="div">
            {bookmark.name}
          </Typography>
        </Link>
        <div>
          <Button size="small" onClick={handleModalOpen}>Edit</Button>
          <Button size="small" onClick={deleteThisBookmark}>Delete</Button>
        </div>
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
      <Paper elevation={6}>
        {card(bookmark, handleModalOpen, deleteThisBookmark)}
      </Paper>
      
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