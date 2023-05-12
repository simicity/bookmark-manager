import { useState } from 'react';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LabelFilter from './LabelFilter';

function AppHeader() {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Bookmarks
        </Typography>
        <Fab size="small" color="primary" sx={{ boxShadow: "none", border: "2px solid black" }} aria-label="add" onClick={handleModalOpen}>
          <AddIcon sx={{ color: "black" }} />
        </Fab>
      </Box>

      <LabelFilter />

      <Modal
          open={open}
          onClose={handleModalClose} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <div>
          <BookmarkModal type="add" handleModalClose={handleModalClose} />
        </div>
      </Modal>
    </>
  );
}

export default AppHeader;
