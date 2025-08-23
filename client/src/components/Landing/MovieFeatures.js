import * as React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';

const MovieFeatures = () => {
  const [moviePosters, setMoviePosters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch movie poster links
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Filter movies that have poster URLs and format for carousel
          const moviesWithPosters = data.data
            .filter(movie => movie.poster_url && movie.poster_url.trim() !== '')
            .map(movie => ({
              id: movie.id,
              title: movie.name,
              image: movie.poster_url,
              year: movie.year
            }));
          
          setMoviePosters(moviesWithPosters);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // seamless infinite scroll
  const duplicatedPosters = moviePosters.length > 0 ? [...moviePosters, ...moviePosters] : [];

  if (loading || moviePosters.length === 0) {
    return (
      <Box sx={{ 
        position: 'relative', 
        overflow: 'hidden', 
        height: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {loading ? 'Loading movies...' : 'No movie posters available'}
        </Typography>
      </Box>
    );
  }

  const posterWidth = 170; 
  const scrollWidth = moviePosters.length * posterWidth;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          height: 350,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2.5,
            width: 'max-content',
            animation: `${moviePosters.length > 1 ? 'marquee 30s linear infinite' : 'none'}`,
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: `translateX(-${scrollWidth}px)` }
            }
          }}
        >
          {duplicatedPosters.map((movie, index) => (
            <Card
              key={`${movie.id}-${index}`}
              sx={{
                minWidth: 150,
                height: 250,
                flexShrink: 0,
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={movie.image}
                alt={movie.title}
                sx={{
                  objectFit: 'cover',
                  transition: 'filter 0.3s ease'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  color: 'white',
                  p: 2,
                  textAlign: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {movie.title}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {movie.year}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Gradient overlays */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 100,
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.18), transparent)',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 100,
            background: 'linear-gradient(to left, rgba(0, 0, 0, 0.18), transparent)',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
      </Box>
    </Box>
  );
};

export default MovieFeatures;
