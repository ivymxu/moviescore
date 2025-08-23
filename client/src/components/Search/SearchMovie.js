import * as React from 'react';
import { TextField } from '@mui/material';

const SearchMovie = ({ value, onChange, disabled = false }) => {
  return (
    <TextField
      id="search-title"
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder="Movie Title"
      disabled={disabled}
      sx={{
        flex: 1,
        '& .MuiOutlinedInput-root': { borderRadius: 5 },
        minWidth: 120,
      }}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default SearchMovie;
