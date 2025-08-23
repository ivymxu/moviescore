import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NavigationButtons = ({ 
  navigateToSearch, 
  navigateToReview, 
  navigateToMyPage 
}) => {
  const theme = useTheme();

return (
    <Grid container justifyContent="center" spacing={2} sx={{ mt: 1 }}>
        <Grid item>
            <Button
                variant="contained"
                onClick={navigateToSearch}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    py: 1.5,
                    fontSize: '1.1rem'
                }}
            >
                Search Movies
            </Button>
        </Grid>
        <Grid item>
            <Button
                variant="contained"
                onClick={navigateToReview}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    py: 1.5,
                    fontSize: '1.1rem'
                }}
            >
                Write a Review
            </Button>
        </Grid>
        <Grid item>
            <Button
                variant="contained"
                onClick={navigateToMyPage}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    py: 1.5,
                    fontSize: '1.1rem'
                }}
            >
                Explore Music
            </Button>
        </Grid>
    </Grid>
);
};

export default NavigationButtons;
