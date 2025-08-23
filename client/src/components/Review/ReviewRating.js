import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const ReviewRating = ({ selectedRating, setSelectedRating, error, clearError }) => {

  //states declarations
  //constants and functions declarations

  return (
    <Grid item>
      <Typography variant="subtitle1" sx={{ mt: 4, mb: 1, ml: 1, fontWeight: 700, }}> 
        Rate the movie on a scale from 1 to 5
      </Typography>

      {/* RadioGroup for selecting the movie rating */}
      <RadioGroup 
        row
        name="rating"
        id="review-rating"
        value={selectedRating}
        onChange={(event) => {
          setSelectedRating(event.target.value);
          if (clearError) clearError();
        }}
        sx={{ ml: 1 }}
      >
        {/* Map through the values 1 to 5 to create FormControlLabel components */}
        {[1, 2, 3, 4, 5].map((value) => (
          <FormControlLabel
            key={value}
            value={value.toString()}
            control={<Radio />}
            label={value.toString()}
          />
        ))}
      </RadioGroup>
      
      {error && (
          <Typography color="red" variant="body2" sx={{ mt: 1, ml: 1 }}>
            {error}
          </Typography>
        )}
    </Grid>
  );
}

export default ReviewRating;