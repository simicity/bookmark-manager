import { useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitForm = () => setFormSubmitted(true);
  const resetForm = () => setFormSubmitted(false);

  return (
    <div className="App">
      <AppHeader submitForm={submitForm} />
      <AppContent formSubmitted={formSubmitted} submitForm={submitForm} resetForm={resetForm} />
    </div>
  )
}

export default App;
