import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { getAllLabels } from '../utils/local-storage-handler';
import Modal from '@mui/material/Modal';
import { AddLabelModal, DeleteLabelModal } from './LabelModal';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '../slices/form';
import { addSelectedLabel, removeSelectedLabel } from '../slices/selectedLabels';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function LabelFilter() {
  const formSubmitted = useSelector(state => state.formSubmitted.flag);
  const selectedLabels = useSelector(state => state.selectedLabels.labels);
  const dispatch = useDispatch();

  const [labels, setLabels] = useState([]);
  const handleClick = (label) => () => {
    if(selectedLabels.includes(label)) {
      dispatch(removeSelectedLabel(label));
    } else {
      dispatch(addSelectedLabel(label));
    }
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddModalOpen = () => setOpenAddModal(true);
  const handleAddModalClose = () => setOpenAddModal(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModalOpen = () => setOpenDeleteModal(true);
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

  useEffect(() => {
    async function loadLabels() {
      await getAllLabels()
      .then((labels) => {
        if(labels) setLabels(Array.from(labels));  
      });
    }

    loadLabels();
    dispatch(resetForm());
  }, [dispatch, formSubmitted]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          mb: 3,
        }}
        component="ul"
      >
        {labels && labels.map((label) => {
          return (
            <ListItem key={label}>
              <Chip
                size="small" 
                label={label}
                color ={ selectedLabels.includes(label) ? "secondary" : "default"}
                onClick={handleClick(label)}
                onDelete={handleDeleteModalOpen}
              />
              <Modal
                  open={openDeleteModal}
                  onClose={handleDeleteModalClose} 
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                <div>
                  <DeleteLabelModal label={label} handleModalClose={handleDeleteModalClose}/>
                </div>
              </Modal>
            </ListItem>
          );
        })}
        <ListItem key="add-label">
          <Chip
            size="small" 
            variant="outlined" 
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddIcon sx={{ fontSize: "small", color: "black" }} />
                Add Label
              </Box>
            }
            onClick={handleAddModalOpen}
          />
        </ListItem>
        <Modal
            open={openAddModal}
            onClose={handleAddModalClose} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <div>
            <AddLabelModal handleModalClose={handleAddModalClose}/>
          </div>
        </Modal>
      </Box>
    </>
  );
}