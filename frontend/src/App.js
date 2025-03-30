import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GiftForm from "./pages/GiftForm";
import Recommendations from "./pages/Recommendations";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B6B",
    },
    secondary: {
      main: "#4ECDC4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-gift" element={<GiftForm />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
