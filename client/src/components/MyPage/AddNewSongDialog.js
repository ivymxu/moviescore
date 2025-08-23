import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material';

const AddNewSongDialog = ({
  open,
  onClose,
  newSong,
  setNewSong,
  handleAddNewSong
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New Song to Library</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Song Title *"
              fullWidth
              value={newSong.title}
              onChange={(e) => setNewSong({...newSong, title: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Artist *"
              fullWidth
              value={newSong.artist}
              onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Album"
              fullWidth
              value={newSong.album}
              onChange={(e) => setNewSong({...newSong, album: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Genre"
              fullWidth
              value={newSong.genre}
              onChange={(e) => setNewSong({...newSong, genre: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Year"
              type="number"
              fullWidth
              value={newSong.year}
              onChange={(e) => setNewSong({...newSong, year: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Spotify URL"
              fullWidth
              value={newSong.spotify_url}
              onChange={(e) => setNewSong({...newSong, spotify_url: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="YouTube URL"
              fullWidth
              value={newSong.youtube_url}
              onChange={(e) => setNewSong({...newSong, youtube_url: e.target.value})}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleAddNewSong}
          variant="contained"
          disabled={!newSong.title || !newSong.artist}
        >
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewSongDialog;
