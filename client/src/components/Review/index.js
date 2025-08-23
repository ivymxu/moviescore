import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import MyAppbar from '../App/MyAppbar';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Review = () => {
  const theme = useTheme();

  // states declarations
  // constants and functions declarations

  // State to hold movies fetched from the API
  const [movies, setMovies] = React.useState([]);
  // Storing full movie objects
  const [movieData, setMovieData] = React.useState([]);

  // State to hold the movie rating details, errors, and submission status
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userID, setUserID] = React.useState(1); // Declare userID as stateful variable, set to 1

  // State to hold the submitted review details
  const [submittedReview, setSubmittedReview] = React.useState(null);

  // Fetching movies from API 
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const responseData = await response.json();
        
        // New API response format
        if (responseData.success && responseData.data) {
          // Store full movie data
          setMovieData(responseData.data);
          // Getting movie names from imdb 
          const movieNames = responseData.data.map(movie => movie.name);
          // Stateful list for movies
          setMovies(movieNames);
          console.log(`Fetched ${responseData.count} movies from database`);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Set to default movies if API fails
        setMovies([
          'The Social Network',
          'Oppenheimer',
          'Dune',
          'La La Land',
          'Inception'
        ]);
        setMovieData([
          { id: 1, name: 'The Social Network', year: 2010, quality: 'HD' },
          { id: 2, name: 'Oppenheimer', year: 2023, quality: 'HD' },
          { id: 3, name: 'Dune', year: 2021, quality: 'HD' },
          { id: 4, name: 'La La Land', year: 2016, quality: 'HD' },
          { id: 5, name: 'Inception', year: 2010, quality: 'HD' }
        ]);
      }
    };

    fetchMovies();
  }, []);

  /* Handle form submission and validation */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form field validation
    let newErrors = {};
    if (!selectedMovie) newErrors.movie = "Select your movie";
    if (!enteredTitle.trim()) newErrors.title = "Enter your review title";
    if (!enteredReview.trim()) newErrors.body = "Enter your review";
    if (!selectedRating) newErrors.rating = "Select the rating";
    setErrors(newErrors);

  // If there are errors, stop
    if (Object.keys(newErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Begin submission
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // Find movieID
      const selectedMovieData = movieData.find(movie => movie.name === selectedMovie);
      const movieID = selectedMovieData ? selectedMovieData.id : null;

      // Error if movie is not found
      if (!movieID) {
        setErrors({ submit: "Selected movie not found" });
        return;
      }

      const reviewData = {
        movieID: movieID,
        userID: userID,
        reviewTitle: enteredTitle.trim(),
        reviewContent: enteredReview.trim(),
        reviewScore: parseInt(selectedRating)
      };

      console.log('Submitting review:', reviewData);
      console.log('Selected rating type:', typeof selectedRating, 'value:', selectedRating);
      console.log('Parsed rating:', parseInt(selectedRating));

      // Send review with the POST API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      // Check response status
      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Review submitted successfully:', result);
        setSubmitted(true);
        setSubmittedReview({
          movie: selectedMovie,
          title: enteredTitle.trim(),
          body: enteredReview.trim(),
          rating: selectedRating,
          reviewID: result.data.reviewID
        });
        // Reset form fields
        setSelectedMovie('');
        setEnteredTitle('');
        setEnteredReview('');
        setSelectedRating('');
      } else {
        console.error('Failed to submit review:', result);
        setErrors({ submit: result.error || 'Failed to submit review' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'An error occurred while submitting your review' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /*  User interface elements */
  return (
    <Box
      style={{ 
        minHeight: '100vh',
        background: theme.custom.gradients.background,
        paddingBottom: '2rem'
      }}
    >
    <form 
      onSubmit={handleSubmit} 
      style={{ width: '100%' }}
    >
      <MyAppbar />
      <Container maxWidth="lg" sx={{ pt: 3, pb: 4 }}>
        {/* Main container for the review form */}
        <Typography
          variant="h1"
          component="h1"
          align="left"
          marginTop={4}
          marginBottom={3}
          gutterBottom
        >
          Review a Movie
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          align="left"
          marginBottom={3}
          sx={{ color: 'text.secondary', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}
        >
          Select a movie, enter your review title, body, and rating
        </Typography>
          <Grid container spacing={2} sx={{ width: '100%', mb: 2 }} 
          direction="row" padding={2} marginTop={3} marginBottom={5}
          style={{ background: 'rgba(247, 239, 255, 0.79)', 
            border: '1px solid rgba(138, 43, 226, 0.3)',
            boxShadow: '0 0 15px rgba(196, 134, 255, 0.39), 0 4px 8px rgba(255, 255, 255, 0.3)',
            borderRadius: 16 }}>
            {/* Movie selection dropdown */}
          <Grid item xs={12} md={4} paddingRight={3}>
            <MovieSelection
              movies={movies}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              error={errors.movie}
              clearError={() => setErrors((prev) => ({ ...prev, movie: undefined }))}
            />
            <ReviewRating
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              error={errors.rating}
              clearError={() => setErrors((prev) => ({ ...prev, rating: undefined }))}
            />
          </Grid>
          {/* Review title input */}
          <Grid item xs={12} md={8} paddingRight={4}>
            <ReviewTitle
              enteredTitle={enteredTitle}
              setEnteredTitle={setEnteredTitle}
              error={errors.title}
              clearError={() => setErrors((prev) => ({ ...prev, title: undefined }))}
            />
            <ReviewBody
              enteredReview={enteredReview}
              setEnteredReview={setEnteredReview}
              error={errors.body}
              clearError={() => setErrors((prev) => ({ ...prev, body: undefined }))}
            />
          </Grid>
        </Grid>

          { /* Submit button */}
          <Grid display="flex" justifyContent="flex-end" mt={2} 
          marginRight={2} marginTop={4}>
            <Button
              id="submit-button"
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={isSubmitting}
              sx={{ px: 5, py: 1.5, borderRadius: 2 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>

          { /* Display error message */ }
          {errors.submit && (
            <Grid item sx={{ width: '100%' }}>
              <Typography
                color="red"
                variant="body1"
                align="center"
              >
                {errors.submit}
              </Typography>
            </Grid>
          )}

          { /* Submitted review confirmation message */}
          {submitted && submittedReview && (
            <Grid item sx={{ width: '100%' }}>
              <Typography 
                id="confirmation-message"
                color="success.main" 
                variant="h5" 
                align="center" 
                sx={{ mt: 2 }}
              >
                Your review has been received
                {submittedReview.reviewID && ` (Review ID: ${submittedReview.reviewID})`}
              </Typography>
              <Grid container direction="column" spacing={1} sx={{ mt: 1 }}>
                <Grid item>
                  <Typography variant="body3">
                    <b>Movie:</b> {submittedReview.movie}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body3">
                    <b>Review Title:</b> {submittedReview.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body3">
                    <b>Review Body:</b> {submittedReview.body}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body3">
                    <b>Rating:</b> {submittedReview.rating}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
      </Container>
    </form>
    </Box>
  );
};

export default Review;