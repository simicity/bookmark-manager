import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import Typography from '@mui/material/Typography';
import './../App.css';

function AppHeader({ submitForm }) {
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <div className="AppTitle">
        <Typography variant="h4" component="h1">
          Bookmarks
        </Typography>
        <Button onClick={handleModalOpen}>Add Bookmark</Button>
      </div>
      <Modal
          open={open}
          onClose={handleModalClose} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <div>
          <BookmarkModal type="add" handleModalClose={handleModalClose} submitForm={submitForm} />
        </div>
      </Modal>
    </>
  );
}

export default AppHeader;
