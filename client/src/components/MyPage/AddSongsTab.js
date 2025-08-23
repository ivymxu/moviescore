import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Link
} from '@mui/material';

const AddSongsTab = ({ 
  songs, 
  setAddNewSongDialogOpen, 
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Song Library ({songs.length})
        </Typography>
        <Button
          variant="contained"
          onClick={() => setAddNewSongDialogOpen(true)}
        >
          Add New Song
        </Button>
      </Box>
      
      <Grid container spacing={2}>
        {songs.map((song) => (
          <Grid item xs={12} md={4} key={song.id}>
            <Card sx={{ backgroundColor: 'rgba(235, 223, 244, 0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {song.title}
                </Typography>
                
                <Typography variant="subtitle2" color="text.dark" gutterBottom>
                  by {song.artist} {song.album && `• ${song.album}`}
                </Typography>
                
                {song.movie_name && (
                  <Typography variant="body2" color="primary" gutterBottom>
                    From: {song.movie_name} ({song.movie_year})
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box>
                    {song.genre && <Chip label={song.genre} size="small" sx={{ mr: 1 }} />}
                    {song.year && <Chip label={song.year} size="small" />}
                  </Box>
                </Box>
                
                {(song.spotify_url || song.youtube_url) && (
                  <Box sx={{ mt: 2 }}>
                    {song.spotify_url && (
                      <Link href={song.spotify_url} target="_blank" sx={{ mr: 2 }}>
                        <Button size="small" variant="outlined">
                          Spotify
                        </Button>
                      </Link>
                    )}
                    {song.youtube_url && (
                      <Link href={song.youtube_url} target="_blank">
                        <Button size="small" variant="outlined">
                          YouTube
                        </Button>
                      </Link>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddSongsTab;
