import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
} from '@mui/material';

const PlaylistDetailsDialog = ({
  open,
  onClose,
  selectedPlaylist,
  playlistDetails,
  setAddSongDialogOpen,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {selectedPlaylist && (
          <>
            {selectedPlaylist.title}
            <Typography variant="body2" color="text.dark">
              {selectedPlaylist.movie_name} ({selectedPlaylist.movie_year}) • by {selectedPlaylist.creator_name}
            </Typography>
          </>
        )}
      </DialogTitle>
      
      <DialogContent>
        {playlistDetails && (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {playlistDetails.description}
            </Typography>
            
            {/* Songs in Playlist */}
            <Typography variant="h6" gutterBottom>
              Songs ({playlistDetails.songs.length})
            </Typography>
            
            <List>
              {playlistDetails.songs.map((song, index) => (
                <ListItem key={`${song.id}-${index}`} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {index + 1}. {song.title} - {song.artist}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.dark">
                          Added by {song.added_by}
                        </Typography>
                        {song.reason_note && (
                          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                            "{song.reason_note}"
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Add Song Section */}
            <Typography variant="h6" gutterBottom>
              Add a Song
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setAddSongDialogOpen(true)}
              sx={{ mb: 3 }}
            >
              Add Song to Playlist
            </Button>
            
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDetailsDialog;
