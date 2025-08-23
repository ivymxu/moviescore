import * as React from 'react';
import { TextField } from '@mui/material';

const SearchDirector = ({ value, onChange, disabled = false }) => {
  return (
    <TextField
      id="search-director"
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder="Director Name"
      disabled={disabled}
      sx={{
        flex: 1,
        '& .MuiOutlinedInput-root': { borderRadius: 5 },
        minWidth: 120
      }}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default SearchDirector;
