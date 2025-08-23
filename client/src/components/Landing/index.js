import * as React from 'react';
import { 
  Box, 
  CardContent,
  Container 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MyAppbar from '../App/MyAppbar';
import LandingHeader from './LandingHeader';
import NavigationButtons from './NavigationButtons';
import MovieFeatures from './MovieFeatures';

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navigateToSearch = () => {
    navigate('/Search');
  };

  const navigateToReview = () => {
    navigate('/Review');
  };

  const navigateToMyPage = () => {
    navigate('/MyPage');
  };

  return (
    <Box
      style={{ 
        minHeight: '100vh',
        background: theme.custom.gradients.background1,
        paddingBottom: '2rem'
      }}
    >
      <MyAppbar />
        {/* Welcome and navigation section */}
        <Container container spacing={3} >
          <CardContent sx={{ textAlign: 'center', color: 'white', p: 2, flexGrow: 1 }}>
            <LandingHeader />
            <NavigationButtons
              navigateToSearch={navigateToSearch}
              navigateToReview={navigateToReview}
                navigateToMyPage={navigateToMyPage}
              />
            </CardContent>
        </Container>
        <Container >
          <CardContent sx={{ flexGrow: 1 }}>
            <MovieFeatures />
          </CardContent>
        </Container>
    </Box>
  );
};

export default Landing;
