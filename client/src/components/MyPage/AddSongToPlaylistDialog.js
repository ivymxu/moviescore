import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';

const AddSongToPlaylistDialog = ({
  open,
  onClose,
  songs,
  selectedSong,
  setSelectedSong,
  addedBy,
  setAddedBy,
  songReason,
  setSongReason,
  handleAddSongToPlaylist
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Song to Playlist</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
          <InputLabel>Select Song</InputLabel>
          <Select
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
          >
            {songs.map((song) => (
              <MenuItem key={song.id} value={song.id}>
                {song.title} - {song.artist}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Your Name"
          fullWidth
          value={addedBy}
          onChange={(e) => setAddedBy(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Why does this song fit? (optional)"
          fullWidth
          multiline
          rows={3}
          value={songReason}
          onChange={(e) => setSongReason(e.target.value)}
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleAddSongToPlaylist}
          variant="contained"
          disabled={!selectedSong || !addedBy}
        >
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSongToPlaylistDialog;
