import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Typography, Select, MenuItem } from '@mui/material';

const MovieSelection = ({ movies, selectedMovie, setSelectedMovie, error, clearError }) => {

  //states declarations
  //constants and functions declarations

  return (
    <Grid item>
        <Select
          id="movie-select"
          value={selectedMovie}
          fullWidth
          onChange={(event) => {
            setSelectedMovie(event.target.value);
            if (clearError) clearError();
            }}
            displayEmpty
            >
            <MenuItem value="" disabled sx={{ color: '#9c7cc4ff' }}>
              Select a movie
            </MenuItem>
            
            {/* Map through the movies array to create MenuItem components */}
        {movies.map((movie) => (
          <MenuItem key={movie} value={movie}>
            {movie}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography color="red" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
  </Grid>

  );
};

export default MovieSelection;