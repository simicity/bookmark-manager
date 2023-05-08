import { useEffect, useState } from 'react';
import { createBookmark, updateBookmark } from '../utils/local-storage-handler';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import FormHelperText from '@mui/material/FormHelperText';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

function BookmarkModal({ type, bookmark, handleModalClose, submitForm }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (type === 'update' && bookmark) {
      setName(bookmark.name);
      setUrl(bookmark.url);
    } else {
      setName('');
      setUrl('');
    }
  }, [type, bookmark]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === '') {
        // toast.error('Please enter a name');
        return;
    }
    const bookmarkFromForm = {name, url};
    if (type === 'add') {
      await createBookmark(bookmarkFromForm).
      then(() => {
        submitForm();
        handleModalClose();  
      });
      // toast.success('Task added successfully');
    } else if (type === 'update') {
      if (bookmark.name !== name || bookmark.url !== url) {
        await updateBookmark(bookmark.id, bookmarkFromForm).
        then(() => {
          submitForm();
          handleModalClose();
        });
        // toast.success('Task Updated successfully');
      } else {
        handleModalClose();
        // toast.error('No changes made');
        return;
      }
    }
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {type === 'add' ? 'Add' : 'Update'} Bookmark
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction="column">
            <FormHelperText sx={{ color: "black", ml: 1 }}>Name</FormHelperText>
            <InputBase label="Name" placeholder="Name" size="small" sx={{ border: "2px solid black", borderRadius: "10px", mb: 2, p: 1, pb: 0 }} value={name} onChange={(event) => setName(event.target.value)} />
            <FormHelperText sx={{ color: "black", ml: 1 }}>URL</FormHelperText>
            <InputBase label="URL" placeholder="URL" size="small" sx={{ border: "2px solid black", borderRadius: "10px", mb: 2, p: 1, pb: 0 }} value={url} onChange={(event) => setUrl(event.target.value)} />
          </Stack>
          <Stack spacing={1} direction="row" sx={{display: "flex", justifyContent: "right"}}>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="contained">{type === 'add' ? 'Add' : 'Update'}</Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default BookmarkModal;
