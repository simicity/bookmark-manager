import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { getUniqueLabels } from '../utils/local-storage-handler';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function LabelFilter({ selectedLabels, addSelectedLabel, removeSelectedLabel }) {
  const labels = getUniqueLabels();
  const handleClick = (label) => () => {
    addSelectedLabel(label);
  };
  const handleDelete = (label) => () => {
    removeSelectedLabel(label);
  };

  return (
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
      {labels.map((label) => {
        return (
          <ListItem key={label}>
            <Chip
              size="small" 
              variant="outlined" 
              label={label}
              onClick={handleClick(label)}
              onDelete={handleDelete(label)}
            />
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
          // onClick={}
        />
      </ListItem>
    </Box>
  );
}