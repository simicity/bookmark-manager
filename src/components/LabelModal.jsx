import { useForm } from "react-hook-form";
import { addLabel, deleteLabel } from '../utils/local-storage-handler';
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

function DeleteLabelModal({ label, submitForm, handleModalClose }) {
  const handleClick = async () => {
    await deleteLabel(label);
    submitForm();
    handleModalClose();
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Delete Label
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          Are you sure to delete the label?
        </Typography>
        <Stack spacing={1} direction="row" sx={{display: "flex", justifyContent: "right"}}>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleClick} variant="contained" sx={{ border: "2px solid black" }}>Delete</Button>
        </Stack>
      </Box>
    </>
  );
}

function AddLabelModal({ submitForm, handleModalClose }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await addLabel(data.label);
    submitForm();
    handleModalClose();
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Add Label
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <FormHelperText sx={{ color: "black", ml: 1 }}>Name</FormHelperText>
            <InputBase 
              label="Label" 
              placeholder="Label" 
              size="small" 
              sx={{ 
                border: "2px solid black", 
                borderRadius: "10px", 
                mb: 2, 
                p: 1, 
                pb: 0 
                }} 
              {...register("label", { required: true, maxLength: 30 })}
              />
          </Stack>
          <Stack spacing={1} direction="row" sx={{display: "flex", justifyContent: "right"}}>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ border: "2px solid black" }}>Add</Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export { AddLabelModal, DeleteLabelModal };
