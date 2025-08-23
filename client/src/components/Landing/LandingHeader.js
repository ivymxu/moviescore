import * as React from 'react';
import { Typography } from '@mui/material';

const LandingHeader = () => {
return (
    <div style={{ textAlign: 'center' }}>
        <Typography
            gutterBottom
            sx={{ mt: 3, fontSize: '4rem', fontWeight: 700, color: 'white', textShadow: '2px 2px 8px rgba(231, 186, 253, 0.7)' }}
        >
            Welcome to MovieScore
        </Typography>
        <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'text.secondary', 
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
                marginBottom: '1.5rem' }}
        >
            Discover, Review, Explore Movies & Soundtracks
        </Typography>
    </div>
);
};

export default LandingHeader;
