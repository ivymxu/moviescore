import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// MySQL connection
const db = mysql.createConnection(config);

// Database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes
// TODO: Implement the following endpoints:

// GET /api/movies - retrieve all movies from database
app.get('/api/movies', (req, res) => {
  // Log the request for debugging
  console.log('Received request for /api/movies');
  
  // SQL query to fetch all movies
  const query = 'SELECT id, name, year, quality, poster_url FROM movies';

  // Run the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch movies',
        message: err.message 
      });
    }
    
    console.log(`Successfully fetched ${results.length} movies from database`);
    
    // Sending movie records as a JSON object
    res.status(200).json({
      success: true,
      data: results,
      count: results.length
    });
  });
});

// POST /api/reviews - create a new movie review
app.post('/api/reviews', (req, res) => {
  console.log('Received request for POST /api/reviews');
  console.log('Request body:', req.body);

  // Destructure the request body
  const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;

  // Validate required fields
  if (!movieID || !userID || !reviewTitle || !reviewContent || !reviewScore) {
    console.log('Missing required fields:', { movieID, userID, reviewTitle, reviewContent, reviewScore });
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'All fields are required'
    });
  }
  
  const score = parseInt(reviewScore);

  // SQL query for insertion
  const query = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?, ?, ?, ?, ?)';
  const values = [reviewTitle, reviewContent, reviewScore, userID, movieID];

  console.log('Executing query:', query);
  console.log('With values:', values);

  // Run query, raise error if review fails
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting review:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to create review',
        message: err.message
      });
    }
  
    console.log('Review created successfully:', results.insertId);

  // Return success response when review is created
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: {
        reviewID: results.insertId,
        movieID,
        userID,
        reviewTitle,
        reviewContent,
        reviewScore: score
      }
    });
  });
});

// POST /api/movies/search - search for movies by title, actor, and director
app.post('/api/movies/search', (req, res) => {
  console.log('Received request for POST /api/movies/search');
  console.log('Request body:', req.body);

  const { title, actor, director } = req.body;

  // Build the SQL query dynamically based on provided criteria
  let query = `
    SELECT DISTINCT 
      m.id,
      m.name as title,
      GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') as directors,
      AVG(rv.reviewScore) as averageRating,
      GROUP_CONCAT(DISTINCT rv.reviewContent SEPARATOR '|||') as reviews
    FROM movies m
  `;

  let joins = [];
  let whereConditions = [];  
  let havingConditions = [];
  let queryParams = [];

  // add director
  if (director) {
  joins.push('LEFT JOIN movies_directors md ON m.id = md.movie_id');
  joins.push('LEFT JOIN directors d ON md.director_id = d.id');
  whereConditions.push(`
    EXISTS (
      SELECT 1 FROM movies_directors md2
      JOIN directors d2 ON md2.director_id = d2.id
      WHERE md2.movie_id = m.id AND CONCAT(d2.first_name, " ", d2.last_name) = ?
    )
  `);
  queryParams.push(`${director.trim()}`);
} else {
  joins.push('LEFT JOIN movies_directors md ON m.id = md.movie_id');
  joins.push('LEFT JOIN directors d ON md.director_id = d.id');
}

  // add actor
  if (actor) {
    joins.push('LEFT JOIN roles r ON m.id = r.movie_id');
    joins.push('LEFT JOIN actors a ON r.actor_id = a.id');
    whereConditions.push('CONCAT(a.first_name, " ", a.last_name) = ?');
    queryParams.push(`${actor.trim()}`);
  }

  // reviews join
  joins.push('LEFT JOIN Review rv ON m.id = rv.movieID');

  // add title
  if (title) {
    whereConditions.push('m.name = ?');
    queryParams.push(title.trim());
  }

  // combine all queries
  query += joins.join(' ');
  
  if (whereConditions.length > 0) {
    query += ' WHERE ' + whereConditions.join(' AND ');
  }
  
  query += ' GROUP BY m.id, m.name';

  console.log('Executing search query:', query);
  console.log('With parameters:', queryParams);

  // Execute the query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing search query:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to search movies',
        message: err.message
      });
    }

    console.log(`Search completed. Found ${results.length} movies`);

    // Process results to format the data properly
    const formattedResults = results.map(movie => {
      // Split reviews by the separator and filter out empty strings
      const reviewsArray = movie.reviews 
        ? movie.reviews.split('|||').filter(review => review && review.trim())
        : [];

      return {
        id: movie.id,
        title: movie.title,
        directors: movie.directors || 'N/A',
        averageRating: movie.averageRating ? parseFloat(movie.averageRating.toFixed(1)) : null,
        reviews: reviewsArray
      };
    });

    // Return success response with search results
    res.status(200).json({
      success: true,
      message: 'Search completed successfully',
      data: formattedResults,
      count: formattedResults.length,
      searchCriteria: { title, actor, director }
    });
  });
});

// GET /api/playlists - retrieve all playlists with movie info 
app.get('/api/playlists', (req, res) => {
  console.log('Received request for /api/playlists');
  
  const query = `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.movie_id,
      p.creator_name,
      p.playlist_type,
      p.mood_tags,
      p.created_at,
      p.updated_at,
      m.name as movie_name,
      m.year as movie_year,
      AVG(pr.rating) as average_rating,
      COUNT(pr.id) as rating_count,
      COUNT(ps.id) as song_count
    FROM playlists p
    LEFT JOIN movies m ON p.movie_id = m.id
    LEFT JOIN playlist_ratings pr ON p.id = pr.playlist_id
    LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
    WHERE p.is_public = TRUE
    GROUP BY p.id, p.title, p.description, p.movie_id, p.creator_name, p.playlist_type, p.mood_tags, p.created_at, p.updated_at, m.name, m.year
    ORDER BY p.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching playlists:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch playlists',
        message: err.message 
      });
    }
    
    console.log(`Successfully fetched ${results.length} playlists from database`);
    
    res.status(200).json({
      success: true,
      data: results,
      count: results.length
    });
  });
});

// GET /api/playlists/:id - get detailed playlist with songs
app.get('/api/playlists/:id', (req, res) => {
  const playlistId = req.params.id;
  console.log(`Received request for playlist ${playlistId} details`);
  
  // First get playlist info
  const playlistQuery = `
    SELECT 
      p.*,
      m.name as movie_name,
      m.year as movie_year,
      AVG(pr.rating) as average_rating,
      COUNT(pr.id) as rating_count
    FROM playlists p
    LEFT JOIN movies m ON p.movie_id = m.id
    LEFT JOIN playlist_ratings pr ON p.id = pr.playlist_id
    WHERE p.id = ?
    GROUP BY p.id
  `;
  
  db.query(playlistQuery, [playlistId], (err, playlistResults) => {
    if (err) {
      console.error('Error fetching playlist:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch playlist',
        message: err.message 
      });
    }
    
    if (playlistResults.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Playlist not found'
      });
    }
    
    // Then get songs in playlist
    const songsQuery = `
      SELECT 
        s.*,
        ps.position_order,
        ps.added_by,
        ps.reason_note
      FROM playlist_songs ps
      JOIN songs s ON ps.song_id = s.id
      WHERE ps.playlist_id = ?
      ORDER BY ps.position_order ASC
    `;
    
    db.query(songsQuery, [playlistId], (err, songsResults) => {
      if (err) {
        console.error('Error fetching playlist songs:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Failed to fetch playlist songs',
          message: err.message 
        });
      }
      
      const playlist = playlistResults[0];
      playlist.songs = songsResults;
      
      res.status(200).json({
        success: true,
        data: playlist
      });
    });
  });
});

// POST /api/playlists - create a new playlist
app.post('/api/playlists', (req, res) => {
  console.log('Received request for POST /api/playlists');
  const { title, description, movie_id, creator_name, playlist_type, mood_tags } = req.body;

  // Validate required fields
  if (!title || !movie_id || !creator_name) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'Title, movie_id, and creator_name are required'
    });
  }
  
  const query = `
    INSERT INTO playlists (title, description, movie_id, creator_name, playlist_type, mood_tags) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    title.trim(), 
    description ? description.trim() : null, 
    movie_id, 
    creator_name.trim(),
    playlist_type || 'remix',
    mood_tags || null
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating playlist:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to create playlist',
        message: err.message
      });
    }
  
    console.log('Playlist created successfully:', results.insertId);

    res.status(201).json({
      success: true,
      message: 'Playlist created successfully',
      data: {
        id: results.insertId,
        title,
        description,
        movie_id,
        creator_name,
        playlist_type: playlist_type || 'remix',
        mood_tags
      }
    });
  });
});

// POST /api/playlists/:id/songs - add a song to playlist
app.post('/api/playlists/:id/songs', (req, res) => {
  const playlistId = req.params.id;
  const { song_id, position_order, added_by, reason_note } = req.body;

  console.log(`Adding song to playlist ${playlistId}:`, { song_id, position_order, added_by, reason_note });

  if (!song_id || !position_order || !added_by) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'song_id, position_order, and added_by are required'
    });
  }

  const query = `
    INSERT INTO playlist_songs (playlist_id, song_id, position_order, added_by, reason_note) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    position_order = VALUES(position_order),
    reason_note = VALUES(reason_note)
  `;

  const values = [playlistId, song_id, position_order, added_by.trim(), reason_note || null];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding song to playlist:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to add song to playlist',
        message: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Song added to playlist successfully',
      data: {
        playlist_id: playlistId,
        song_id,
        position_order,
        added_by,
        reason_note
      }
    });
  });
});

// GET /api/songs - get all songs for adding to playlists
app.get('/api/songs', (req, res) => {
  console.log('Received request for /api/songs');
  
  const query = `
    SELECT 
      s.*,
      m.name as movie_name,
      m.year as movie_year
    FROM songs s
    LEFT JOIN movies m ON s.movie_id = m.id
    ORDER BY s.is_official_soundtrack DESC, s.year DESC, s.artist ASC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching songs:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch songs',
        message: err.message 
      });
    }
    
    console.log(`Successfully fetched ${results.length} songs from database`);
    
    res.status(200).json({
      success: true,
      data: results,
      count: results.length
    });
  });
});

// POST /api/songs - add a new song
app.post('/api/songs', (req, res) => {
  console.log('Received request for POST /api/songs');
  const { 
    title, artist, album, duration, spotify_url, youtube_url, 
    genre, year, is_official_soundtrack, movie_id 
  } = req.body;

  if (!title || !artist) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'Title and artist are required'
    });
  }

  const query = `
    INSERT INTO songs (title, artist, album, duration, spotify_url, youtube_url, genre, year, is_official_soundtrack, movie_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title.trim(),
    artist.trim(),
    album ? album.trim() : null,
    duration || null,
    spotify_url ? spotify_url.trim() : null,
    youtube_url ? youtube_url.trim() : null,
    genre ? genre.trim() : null,
    year || null,
    is_official_soundtrack || false,
    movie_id || null
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating song:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to create song',
        message: err.message
      });
    }

    console.log('Song created successfully:', results.insertId);

    res.status(201).json({
      success: true,
      message: 'Song created successfully',
      data: {
        id: results.insertId,
        title,
        artist,
        album,
        duration,
        spotify_url,
        youtube_url,
        genre,
        year,
        is_official_soundtrack,
        movie_id
      }
    });
  });
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version