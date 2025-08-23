import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';

const BrowsePlaylistsTab = ({ 
  playlists, 
  loading, 
  formatDate, 
  getMoodColor, 
  handleOpenPlaylist 
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Community Playlists ({playlists.length})
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid item xs={12} md={6} lg={4} key={playlist.id}>
              <Card sx={{ background: 'linear-gradient(150deg, #ddbff9bb 40%, #ffddfdba 90%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {playlist.title}
                    </Typography>
                    <Chip 
                      label={playlist.playlist_type} 
                      size="small" 
                      color={getMoodColor(playlist.playlist_type)}
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="subtitle2" color="text.dark" gutterBottom fontWeight="700">
                    {playlist.movie_name} ({playlist.movie_year})
                  </Typography>
                  
                  <Typography variant="body2" color="text.dark" sx={{ mb: 2 }}>
                    {playlist.description}
                  </Typography>
                  
                  {playlist.mood_tags && (
                    <Box sx={{ mb: 2 }}>
                      {playlist.mood_tags.split(',').map((tag, index) => (
                        <Chip 
                          key={index}
                          label={tag.trim()} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="caption" color="text.dark">
                      by {playlist.creator_name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="caption" color="text.dark" display="block" sx={{ mb: 2 }}>
                    {playlist.song_count} songs • Created {formatDate(playlist.created_at)}
                  </Typography>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleOpenPlaylist(playlist)}
                  >
                    View Playlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BrowsePlaylistsTab;
