import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { createBookmark, updateBookmark } from '../utils/local-storage-handler';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { getAllLabels } from '../utils/local-storage-handler';
import { useDispatch } from 'react-redux';
import { submitForm } from '../slices/form';

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

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function BookmarkModal({ type, bookmark, handleModalClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState(type == 'add' ? [] : bookmark.labels);
  const addSelectedLabel = (label) => setSelectedLabels([...selectedLabels, label]);
  const removeSelectedLabel = (label) => setSelectedLabels(selectedLabels.filter(e => e !== label));

  const handleClick = (label) => () => {
    if (selectedLabels.includes(label)) {
      removeSelectedLabel(label);
    } else {
      addSelectedLabel(label);
    }
  };

  const onSubmit = async (data) => {
    Object.assign(data, {"labels": selectedLabels});
    if (type === 'add') {
      await createBookmark(data).
      then(() => {
        dispatch(submitForm());
        handleModalClose();  
      });
    } else if (type === 'update') {
      await updateBookmark(bookmark.id, data).
      then(() => {
        dispatch(submitForm());
        handleModalClose();
      });
    }
  };

  useEffect(() => {
    async function loadLabels() {
      await getAllLabels()
      .then((labels) => setLabels(Array.from(labels)));
    }

    loadLabels(); 
  }, []);

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
          <FormHelperText sx={{ color: "black", ml: 1 }}>Labels</FormHelperText>
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
            {labels.map((label) => {
              return (
                <ListItem key={label}>
                  <Chip
                    size="small"
                    label={label}
                    color ={ selectedLabels.includes(label) ? "secondary" : "default"}
                    onClick={handleClick(label)}
                  />
                </ListItem>
              );
            })}
          </Box>
          <Stack spacing={1} direction="row" sx={{display: "flex", justifyContent: "right"}}>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ border: "2px solid black" }}>{type === 'add' ? 'Add' : 'Update'}</Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default BookmarkModal;
