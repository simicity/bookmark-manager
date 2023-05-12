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

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <AppHeader />
      <AppContent />
    </div>
    </ThemeProvider>
  )
}

export default App;
