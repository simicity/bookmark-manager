import { useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitForm = () => setFormSubmitted(true);
  const resetForm = () => setFormSubmitted(false);
  const [selectedLabels, setselectedLabels] = useState([]);
  const addSelectedLabel = (label) => setselectedLabels([...selectedLabels, label]);
  const removeSelectedLabel = (label) => setselectedLabels(selectedLabels.filter(e => e !== label));

  return (
    <div className="App">
      <AppHeader submitForm={submitForm} selectedLabels={selectedLabels} addSelectedLabel={addSelectedLabel} removeSelectedLabel={removeSelectedLabel} />
      <AppContent formSubmitted={formSubmitted} submitForm={submitForm} resetForm={resetForm} selectedLabels={selectedLabels} />
    </div>
  )
}

export default App;
