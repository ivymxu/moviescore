import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Typography, TextField} from '@mui/material';

const ReviewTitle = ({ enteredTitle, setEnteredTitle, error, clearError }) => {

  //states declarations
  //constants and functions declarations

  return (
    <Grid item>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
        Enter the title of your review
      </Typography>

      {/* TextField for entering the review title */}
      <TextField
        id="review-title"
        label="Review Title"
        fullWidth
        value={enteredTitle}
        onChange={(event) => {
          setEnteredTitle(event.target.value);
          if (clearError) clearError();
        }}
        sx={{ mb: 2 }}
      />

      {error && (
          <Typography color="red" variant="body2" sx={{ mt: 1, mb: 2 }}>
            {error}
          </Typography>
        )}
    </Grid>
  );
}

export default ReviewTitle;