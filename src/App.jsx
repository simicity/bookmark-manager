import { useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(","),
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitForm = () => setFormSubmitted(true);
  const resetForm = () => setFormSubmitted(false);
  const [selectedLabels, setselectedLabels] = useState([]);
  const addSelectedLabel = (label) => setselectedLabels([...selectedLabels, label]);
  const removeSelectedLabel = (label) => setselectedLabels(selectedLabels.filter(e => e !== label));

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <AppHeader submitForm={submitForm} selectedLabels={selectedLabels} addSelectedLabel={addSelectedLabel} removeSelectedLabel={removeSelectedLabel} />
      <AppContent formSubmitted={formSubmitted} submitForm={submitForm} resetForm={resetForm} selectedLabels={selectedLabels} />
    </div>
    </ThemeProvider>
  )
}

export default App;
