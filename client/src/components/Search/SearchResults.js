import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Divider
} from '@mui/material';

const SearchResults = ({ searchResults, hasSearched }) => {
  if (!hasSearched) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Search Results ({searchResults.length} found)
      </Typography>
      
      {searchResults.length === 0 ? (
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
          <CardContent>
            <Typography variant="body1" color="text.dark">
              No movies found matching your search criteria.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {searchResults.map((movie) => (
            <Grid item xs={12} sm={4} key={movie.id}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {movie.title}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.dark" gutterBottom>
                    Director(s): {movie.directors}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.dark" sx={{ mb: 1 }}>
                      Average Rating:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {movie.averageRating ? (
                        <>
                          <Rating value={movie.averageRating} readOnly precision={0.1} />
                          <Typography variant="body2">
                            ({movie.averageRating.toFixed(1)}/5)
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.dark">
                          N/A
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {movie.reviews && movie.reviews.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="text.dark" sx={{ mb: 1 }}>
                        User Reviews:
                      </Typography>
                      <Box sx={{ backgroundColor: 'white', borderRadius: 1, p: 2 }}>
                        {movie.reviews.map((reviewText, index) => (
                          <Typography 
                            key={index} 
                            variant="body2" 
                            sx={{ 
                              mb: index < movie.reviews.length - 1 ? 1 : 0,
                              fontStyle: 'italic',
                              lineHeight: 1.6
                            }}
                          >
                            "{reviewText}"
                          </Typography>
                        ))}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchResults;
