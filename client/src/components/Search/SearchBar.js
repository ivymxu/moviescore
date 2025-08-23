import * as React from 'react';
import {
  TextField,
  Button,
  Box,
  Divider,
  CircularProgress,
  CardContent
} from '@mui/material';

const SearchBar = ({ 
  searchCriteria, 
  handleInputChange, 
  handleSearch, 
  handleClear, 
  loading 
}) => {
  return (
    <CardContent sx={{ marginBottom: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          borderRadius: 5,
          background: 'white',
          boxShadow: '0 0 25px rgba(255, 24, 220, 0.72)',
          p: { xs: 1, sm: 2 }
        }}
      >
        <TextField
          id="search-title"
          variant="outlined"
          value={searchCriteria.title}
          onChange={handleInputChange('title')}
          placeholder="Movie Title"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': { borderRadius: 5 },
            minWidth: 120,
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />
        <TextField
          id="search-actor"
          variant="outlined"
          value={searchCriteria.actor}
          onChange={handleInputChange('actor')}
          placeholder="Actor Name"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': { borderRadius: 5 },
            minWidth: 120
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />
        <TextField
          id="search-director"
          variant="outlined"
          value={searchCriteria.director}
          onChange={handleInputChange('director')}
          placeholder="Director Name"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': { borderRadius: 5 },
            minWidth: 120
          }}
          InputLabelProps={{ shrink: true }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />
        <Button
          id="search-button"
          variant="contained"
          onClick={handleSearch}
          disabled={loading || (!searchCriteria.title && !searchCriteria.actor && !searchCriteria.director)}
          sx={{ minWidth: 120, borderRadius: 5, height: '56px', ml: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Find Movies'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleClear}
          disabled={loading}
          sx={{ minWidth: 80, borderRadius: 5, height: '56px', ml: 1 }}
        >
          Clear
        </Button>
      </Box>
    </CardContent>
  );
};

export default SearchBar;
