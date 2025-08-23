import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const CreatePlaylistTab = ({ 
  newPlaylist, 
  setNewPlaylist, 
  movies, 
  handleCreatePlaylist 
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Create New Playlist
      </Typography>
      
      <Grid container spacing={2} sx={{ width: '100%', mb: 2, ml: 1 }} 
        direction="row" padding={3} paddingRight={4} marginTop={3} marginBottom={5}
        style={{ background: 'rgba(247, 239, 255, 0.79)', 
          border: '1px solid rgba(138, 43, 226, 0.3)',
          boxShadow: '0 0 15px rgba(196, 134, 255, 0.39), 0 4px 8px rgba(255, 255, 255, 0.3)',
          borderRadius: 16 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Playlist Title *"
            fullWidth
            value={newPlaylist.title}
            onChange={(e) => setNewPlaylist({...newPlaylist, title: e.target.value})}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Your Name *"
            fullWidth
            value={newPlaylist.creator_name}
            onChange={(e) => setNewPlaylist({...newPlaylist, creator_name: e.target.value})}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#9c7cc4ff' }}>Movie *</InputLabel>
            <Select
              value={newPlaylist.movie_id}
              onChange={(e) => setNewPlaylist({...newPlaylist, movie_id: e.target.value})}
            >
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.name} ({movie.year})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#9c7cc4ff' }}>Playlist Type</InputLabel>
            <Select
              onChange={(e) => setNewPlaylist({...newPlaylist, playlist_type: e.target.value})}
              displayEmpty
            >
              <MenuItem value="official">Official Enhanced</MenuItem>
              <MenuItem value="remix">Remix/Reimagined</MenuItem>
              <MenuItem value="alternative">Alternative Genre</MenuItem>
              <MenuItem value="themed">Themed Collection</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newPlaylist.description}
            onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
            sx={{ '& .MuiInputBase-input': { color: 'black' } 
        }} 
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Mood Tags"
            fullWidth
            value={newPlaylist.mood_tags}
            onChange={(e) => setNewPlaylist({...newPlaylist, mood_tags: e.target.value})}
            placeholder="e.g., dark, epic, romantic, tense"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCreatePlaylist}
            disabled={!newPlaylist.title || !newPlaylist.movie_id || !newPlaylist.creator_name}
          >
            Create Playlist
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePlaylistTab;
