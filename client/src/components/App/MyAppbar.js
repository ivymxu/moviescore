import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const MyAppbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ background: theme.custom.gradients.background, }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button color="inherit" id="nav-landing" onClick={() => navigate('/')}>
          Home
        </Button>
        <div>
          <Button color="inherit" id="nav-search" onClick={() => navigate('/Search')}>
            Search
          </Button>
          <Button color="inherit" id="nav-review" onClick={() => navigate('/Review')}>
            Review
          </Button>
          <Button color="inherit" id="nav-myPage" onClick={() => navigate('/MyPage')}>
            Explore Music
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppbar;
