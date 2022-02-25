import './App.css';
import Locations from './views/Locations/Locations';
import Measurements from './views/Measurements/Measurements';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#607D8B"
    },
    secondary: blue
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Locations/>} />
          <Route path="/measurements" element={<Measurements/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
