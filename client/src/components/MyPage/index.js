import * as React from 'react';
import {
  Typography,
  Container,
  Box,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import MyAppbar from '../App/MyAppbar';
import BrowsePlaylistsTab from './BrowsePlaylistsTab';
import CreatePlaylistTab from './CreatePlaylistTab';
import AddSongsTab from './AddSongsTab';
import PlaylistDetailsDialog from './PlaylistDetailsDialog';
import AddSongToPlaylistDialog from './AddSongToPlaylistDialog';
import AddNewSongDialog from './AddNewSongDialog';
import { useTheme } from '@mui/material/styles';

const MyPage = () => {
  const theme = useTheme();
  // Tab state
  const [activeTab, setActiveTab] = React.useState(0);
  
  // Browse playlists state
  const [playlists, setPlaylists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  
  // Create playlist state
  const [movies, setMovies] = React.useState([]);
  const [newPlaylist, setNewPlaylist] = React.useState({
    title: '',
    description: '',
    movie_id: '',
    creator_name: '',
    playlist_type: 'remix',
    mood_tags: ''
  });
  
  // Song management state
  const [songs, setSongs] = React.useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);
  const [playlistDetails, setPlaylistDetails] = React.useState(null);
  const [playlistDialogOpen, setPlaylistDialogOpen] = React.useState(false);
  
  // Add song dialog state
  const [addSongDialogOpen, setAddSongDialogOpen] = React.useState(false);
  const [selectedSong, setSelectedSong] = React.useState('');
  const [songReason, setSongReason] = React.useState('');
  const [addedBy, setAddedBy] = React.useState('');
  
  // Add new song state
  const [newSong, setNewSong] = React.useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    spotify_url: '',
    youtube_url: ''
  });
  const [addNewSongDialogOpen, setAddNewSongDialogOpen] = React.useState(false);

  // Fetch playlists on component mount
  React.useEffect(() => {
    fetchPlaylists();
    fetchMovies();
    fetchSongs();
  }, []);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/playlists');
      
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPlaylists(data.data);
      } else {
        setError('Failed to load playlists');
      }
    } catch (err) {
      console.error('Error fetching playlists:', err);
      setError('Error loading playlists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMovies(data.data);
        }
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSongs(data.data);
        }
      }
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  };

  // Handle playlist creation
  const handleCreatePlaylist = async () => {
    if (!newPlaylist.title || !newPlaylist.movie_id || !newPlaylist.creator_name) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist)
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setNewPlaylist({
          title: '',
          description: '',
          movie_id: '',
          creator_name: '',
          playlist_type: 'remix',
          mood_tags: ''
        });
        
        // Refresh playlists
        fetchPlaylists();
        
        // Switch to browse tab
        setActiveTab(0);
        
      } else {
        setError('Failed to create playlist');
      }
    } catch (err) {
      console.error('Error creating playlist:', err);
      setError('Failed to create playlist. Please try again.');
    }
  };

  // Open playlist details dialog
  const handleOpenPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist);
    setPlaylistDialogOpen(true);
    
    try {
      const response = await fetch(`/api/playlists/${playlist.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPlaylistDetails(data.data);
        }
      }
    } catch (err) {
      console.error('Error fetching playlist details:', err);
    }
  };

  // Handle adding song to playlist
  const handleAddSongToPlaylist = async () => {
    if (!selectedSong || !addedBy) {
      setError('Please select a song and enter your name');
      return;
    }

    try {
      const nextPosition = playlistDetails.songs.length + 1;
      
      const response = await fetch(`/api/playlists/${selectedPlaylist.id}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          song_id: selectedSong,
          position_order: nextPosition,
          added_by: addedBy,
          reason_note: songReason
        })
      });

      if (response.ok) {
        // Refresh playlist details
        const detailsResponse = await fetch(`/api/playlists/${selectedPlaylist.id}`);
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          if (detailsData.success) {
            setPlaylistDetails(detailsData.data);
          }
        }
        
        // Reset form
        setSelectedSong('');
        setSongReason('');
        setAddSongDialogOpen(false);
        
      }
    } catch (err) {
      console.error('Error adding song:', err);
      setError('Failed to add song to playlist');
    }
  };

  // Handle adding new song
  const handleAddNewSong = async () => {
    if (!newSong.title || !newSong.artist) {
      setError('Song title and artist are required');
      return;
    }

    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newSong,
          year: newSong.year ? parseInt(newSong.year) : null
        })
      });

      if (response.ok) {
        // Refresh songs list
        fetchSongs();
        
        // Reset form
        setNewSong({
          title: '',
          artist: '',
          album: '',
          genre: '',
          year: '',
          spotify_url: '',
          youtube_url: ''
        });
        
        setAddNewSongDialogOpen(false);
      }
    } catch (err) {
      console.error('Error adding song:', err);
      setError('Failed to add song');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get mood color
  const getMoodColor = (type) => {
    switch (type) {
      case 'official': return 'primary';
      case 'remix': return 'secondary';
      case 'alternative': return 'success';
      case 'themed': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ background: theme.custom.gradients.background, minHeight: '100vh', paddingBottom: '2rem' }}>
      <MyAppbar />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        {/* Header */}
        <Typography variant="h1" component="h1" gutterBottom>
          Movie Soundtrack Playlists
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', mb: 4 }}>
          Create and explore alternative soundtracks for your favorite movies
        </Typography>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Browse Playlists" />
            <Tab label="Create Playlist" />
            <Tab label="Add Songs" />
          </Tabs>
        </Box>

        {/* Browse Playlists Tab */}
        {activeTab === 0 && (
          <BrowsePlaylistsTab 
            playlists={playlists}
            loading={loading}
            formatDate={formatDate}
            getMoodColor={getMoodColor}
            handleOpenPlaylist={handleOpenPlaylist}
          />
        )}

        {/* Create Playlist Tab */}
        {activeTab === 1 && (
          <CreatePlaylistTab 
            newPlaylist={newPlaylist}
            setNewPlaylist={setNewPlaylist}
            movies={movies}
            handleCreatePlaylist={handleCreatePlaylist}
          />
        )}

        {/* Add Songs Tab */}
        {activeTab === 2 && (
          <AddSongsTab 
            songs={songs}
            setAddNewSongDialogOpen={setAddNewSongDialogOpen}
          />
        )}
      </Container>

      {/* Playlist Details Dialog */}
      <PlaylistDetailsDialog 
        open={playlistDialogOpen}
        onClose={() => {
          setPlaylistDialogOpen(false);
        }}
        selectedPlaylist={selectedPlaylist}
        playlistDetails={playlistDetails}
        setAddSongDialogOpen={setAddSongDialogOpen}
      />

      {/* Add Song to Playlist Dialog */}
      <AddSongToPlaylistDialog 
        open={addSongDialogOpen}
        onClose={() => setAddSongDialogOpen(false)}
        songs={songs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        addedBy={addedBy}
        setAddedBy={setAddedBy}
        songReason={songReason}
        setSongReason={setSongReason}
        handleAddSongToPlaylist={handleAddSongToPlaylist}
      />

      {/* Add New Song Dialog */}
      <AddNewSongDialog 
        open={addNewSongDialogOpen}
        onClose={() => setAddNewSongDialogOpen(false)}
        newSong={newSong}
        setNewSong={setNewSong}
        handleAddNewSong={handleAddNewSong}
      />
    </Box>
  );
}

export default MyPage;