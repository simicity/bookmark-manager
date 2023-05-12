import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import BookmarkModal from './BookmarkModal';
import { deleteBookmark } from '../utils/local-storage-handler';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';
import { submitForm } from '../slices/form';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const getFavicon = ((url) => {
  return 'http://www.google.com/s2/favicons?domain=' + url;
});

const BookmarkMenu = ((handleModalOpen, deleteThisBookmark) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <Box sx={{ display: 'flex', alignItems: 'top' }}>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "black" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '10ch',
          },
        }}
      >
        <MenuItem key="bookmark-edit" onClick={handleModalOpen}>
          Edit
        </MenuItem>
        <MenuItem key="bookmark-delete" onClick={deleteThisBookmark}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
});

const card = ((bookmark, handleModalOpen, deleteThisBookmark) => {
  return(
    <Card
      variant="outlined"
      sx={{ border: "2px solid black", borderRadius: '12px', minWidth: '200px', boxShadow: "6px 6px" }}
    >
      <Grid container>
        <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href={bookmark.url} underline="none" sx={{ color: 'inherit', display: 'block', width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'start', maxHeight: "70px", textOverflow: "ellipsis" }}>
              <CardMedia
                component="img"
                sx={{ width: 20, height: 20, m: 1, borderRadius: '4px' }}
                image={getFavicon(bookmark.url)}
                alt={bookmark.name.charAt(0)}
              />
              <Typography component="div" variant="body1" sx={{ 
                mt: 1, 
                textOverflow: "ellipsis", 
                overflow: 'hidden', 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                }}>
                {bookmark.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0
              }}
              component="ul"
            >
              {bookmark.labels.map((label) => {
                return (
                  <ListItem key={label}>
                    <Chip
                      size="small"
                      label={label}
                    />
                  </ListItem>
                );
              })}
            </Box>
          </Link>
        </Grid>
        <Grid item xs={2}>
          {BookmarkMenu(handleModalOpen, deleteThisBookmark)}
        </Grid>
      </Grid>
    </Card>
  );
});

function BookmarkCard({ bookmark }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const deleteThisBookmark = async() => {
    await deleteBookmark(bookmark.id);
    dispatch(submitForm());
  };

  return (
    <>
      {card(bookmark, handleModalOpen, deleteThisBookmark)}
      
      <Modal
        open={open}
        onClose={handleModalClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <BookmarkModal type="update" bookmark={bookmark} handleModalClose={handleModalClose} />
        </div>
      </Modal>
    </>
  );
}

export default BookmarkCard;