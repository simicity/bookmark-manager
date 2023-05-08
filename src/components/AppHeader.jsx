import React from 'react';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function AppHeader({ submitForm }) {
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <Box className="AppTitle" sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Bookmarks
        </Typography>
        <Fab size="small" color="primary" aria-label="add" onClick={handleModalOpen}>
          <AddIcon />
        </Fab>
      </Box>
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
