import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import Landing from '../Landing';
import MyPage from '../MyPage';
import Review from '../Review';
import Search from '../Search';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Routes>
            {/* Render child components */}
            <Route path="/" element={<Landing />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  ); 
};

export default App;
