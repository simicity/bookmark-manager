import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (type === 'add') {
      await createBookmark(data).
      then(() => {
        submitForm();
        handleModalClose();  
      });
    } else if (type === 'update') {
      await updateBookmark(bookmark.id, data).
      then(() => {
        submitForm();
        handleModalClose();
      });
    }
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {type === 'add' ? 'Add' : 'Update'} Bookmark
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <FormHelperText sx={{ color: "black", ml: 1 }}>Name</FormHelperText>
            <InputBase 
              label="Name" 
              placeholder="Name" 
              size="small" 
              defaultValue={bookmark ? bookmark.name : ""} 
              sx={{ 
                border: "2px solid black", 
                borderRadius: "10px", 
                mb: 2, 
                p: 1, 
                pb: 0 
                }} 
              {...register("name", { required: true, maxLength: 100 })}
              />
            <FormHelperText sx={{ color: "black", ml: 1 }}>URL</FormHelperText>
            <InputBase 
              label="URL" 
              placeholder="URL" 
              size="small" 
              defaultValue={bookmark ? bookmark.url : ""} 
              sx={{ 
                border: "2px solid black", 
                borderRadius: "10px", mb: 2, p: 1, pb: 0 }} 
                {...register("url", { required: true, maxLength: 1000 })}
                />
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
