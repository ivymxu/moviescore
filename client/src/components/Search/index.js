import * as React from 'react';
import { useState } from 'react';
import {
  Typography,
  Container,
  Box
} from '@mui/material';
import MyAppbar from '../App/MyAppbar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useTheme } from '@mui/material/styles';

const Search = () => {
  const theme = useTheme();
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    actor: '',
    director: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Input changes
  const handleInputChange = (field) => (event) => {
    setSearchCriteria({
      ...searchCriteria, [field]: event.target.value
    });
  };

  // Search functionality - uses AND logic for multiple criteria
  const handleSearch = async () => {
    // Check if at least one search criteria is provided
    if (!searchCriteria.title && !searchCriteria.actor && !searchCriteria.director) {
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      // Parameters
      const searchParams = {
        title: searchCriteria.title.trim(),
        actor: searchCriteria.actor.trim(),
        director: searchCriteria.director.trim()
      };

      // Call API
      const response = await fetch('/api/movies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse = await response.json();

      if (apiResponse.success) {
        setSearchResults(apiResponse.data);
        console.log(`Search completed successfully. Found ${apiResponse.count} movies.`);
      } else {
        console.error('Search API returned error:', apiResponse.error);
        setSearchResults([]);
      }

    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const handleClear = () => {
    setSearchCriteria({
      title: '',
      actor: '',
      director: ''
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <Box
      style={{ 
        minHeight: '100vh',
        background: theme.custom.gradients.background,
        paddingBottom: '2rem'
      }}
    >
      <MyAppbar />
      <Container maxWidth="lg" sx={{ pt: 3, pb: 4 }}>
        <Typography variant="h1" component="h1" align="center" marginTop={4} marginBottom={2}
        gutterBottom >
          Search Movies
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          align="center"
          marginBottom={2}
          sx={{ color: 'text.secondary', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}
        >
          Enter your search criteria
        </Typography>
        
        {/* Search Bar Component */}
        <SearchBar 
          searchCriteria={searchCriteria}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          handleClear={handleClear}
          loading={loading}
        />
        
        {/* Search Results Component */}
        <SearchResults 
          searchResults={searchResults}
          hasSearched={hasSearched}
        />
      </Container>
    </Box>
  );
}

export default Search;
