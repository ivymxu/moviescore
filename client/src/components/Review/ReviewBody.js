import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Typography, TextField} from '@mui/material';

const ReviewBody = ({ enteredReview, setEnteredReview, error, clearError }) => {

  //states declarations
  //constants and functions declarations

  return (
    <Grid item>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
        Enter your review (max 200 characters)
      </Typography>

      {/* TextField for entering the review body */}
      <TextField
        id="review-body"
        label="Review Body"
        fullWidth
        multiline
        rows={6}
        inputProps={{ maxLength: 200 }}
        value={enteredReview}
        onChange={(event) => {
          setEnteredReview(event.target.value);
          if (clearError) clearError();
        }}
        sx={{ mb: 2, 
          '& .MuiInputBase-input': { color: 'black' } 
        }} 
      />
      {error && (
          <Typography color="red" variant="body2" sx={{ mt: 1, mb: 2 }}>
            {error}
          </Typography>
        )}
    </Grid>
  );
}

export default ReviewBody;