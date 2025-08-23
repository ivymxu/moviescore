import mysql from 'mysql';
import config from './config.js';

const db = mysql.createConnection(config);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Drop existing tables if they exist (for fresh start)
  const dropTables = [
    'DROP TABLE IF EXISTS playlist_songs',
    'DROP TABLE IF EXISTS playlist_ratings',
    'DROP TABLE IF EXISTS playlist_collaborators', 
    'DROP TABLE IF EXISTS playlists',
    'DROP TABLE IF EXISTS songs'
  ];
  
  // Create songs table
  const createSongsTable = `
    CREATE TABLE songs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      album VARCHAR(255),
      duration INT, -- in seconds
      spotify_url VARCHAR(500),
      youtube_url VARCHAR(500),
      genre VARCHAR(100),
      year INT,
      is_official_soundtrack BOOLEAN DEFAULT FALSE,
      movie_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL
    )
  `;
  
  // Create playlists table
  const createPlaylistsTable = `
    CREATE TABLE playlists (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      movie_id INT NOT NULL,
      creator_name VARCHAR(100) NOT NULL,
      is_public BOOLEAN DEFAULT TRUE,
      playlist_type ENUM('official', 'remix', 'alternative', 'themed') DEFAULT 'remix',
      mood_tags VARCHAR(500), -- comma-separated tags like 'dark,epic,romantic'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
    )
  `;
  
  // Create playlist_songs junction table (many-to-many)
  const createPlaylistSongsTable = `
    CREATE TABLE playlist_songs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      playlist_id INT NOT NULL,
      song_id INT NOT NULL,
      position_order INT NOT NULL,
      added_by VARCHAR(100),
      reason_note TEXT, -- why this song fits the movie
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
      FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
      UNIQUE KEY unique_playlist_song (playlist_id, song_id)
    )
  `;
  
  // Create playlist ratings table
  const createPlaylistRatingsTable = `
    CREATE TABLE playlist_ratings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      playlist_id INT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_playlist_rating (playlist_id, user_name)
    )
  `;
  
  // Create playlist collaborators table
  const createCollaboratorsTable = `
    CREATE TABLE playlist_collaborators (
      id INT AUTO_INCREMENT PRIMARY KEY,
      playlist_id INT NOT NULL,
      collaborator_name VARCHAR(100) NOT NULL,
      permission_level ENUM('view', 'edit', 'admin') DEFAULT 'edit',
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
      UNIQUE KEY unique_playlist_collaborator (playlist_id, collaborator_name)
    )
  `;
  
  let tablesCreated = 0;
  const totalTables = 5;
  
  function executeNextStep() {
    tablesCreated++;
    if (tablesCreated === totalTables) {
      insertSampleData();
    }
  }
  
  // Drop existing tables first
  let tablesDropped = 0;
  dropTables.forEach(dropQuery => {
    db.query(dropQuery, (err) => {
      if (err) console.log('Drop table (expected):', err.message);
      tablesDropped++;
      if (tablesDropped === dropTables.length) {
        createTables();
      }
    });
  });
  
  function createTables() {
    // Execute table creation
    db.query(createSongsTable, (err, result) => {
      if (err) {
        console.error('Error creating songs table:', err);
      } else {
        console.log('Songs table created');
      }
      executeNextStep();
    });
    
    db.query(createPlaylistsTable, (err, result) => {
      if (err) {
        console.error('Error creating playlists table:', err);
      } else {
        console.log('Playlists table created');
      }
      executeNextStep();
    });
    
    db.query(createPlaylistSongsTable, (err, result) => {
      if (err) {
        console.error('Error creating playlist_songs table:', err);
      } else {
        console.log('Playlist_songs table created');
      }
      executeNextStep();
    });
    
    db.query(createPlaylistRatingsTable, (err, result) => {
      if (err) {
        console.error('Error creating playlist_ratings table:', err);
      } else {
        console.log('Playlist_ratings table created');
      }
      executeNextStep();
    });
    
    db.query(createCollaboratorsTable, (err, result) => {
      if (err) {
        console.error('Error creating collaborators table:', err);
      } else {
        console.log('Collaborators table created');
      }
      executeNextStep();
    });
  }
  
  function insertSampleData() {
    // Insert sample songs (using actual movie IDs from database)
    const insertSongs = `
      INSERT INTO songs (title, artist, album, duration, spotify_url, youtube_url, genre, year, is_official_soundtrack, movie_id) VALUES
      ('Breakfast Machine', 'Danny Elfman', 'Pee-wee\\'s Big Adventure OST', 180, NULL, 'https://www.youtube.com/watch?v=gyCDLW7n53A', 'Film Score', 1985, TRUE, 969),
      ('Also sprach Zarathustra', 'Richard Strauss', '2001: A Space Odyssey OST', 240, NULL, 'https://www.youtube.com/watch?v=dfe8tCcHnKY', 'Classical', 1968, TRUE, 1711),
      ('Main Title', 'Jerry Goldsmith', 'Alien OST', 195, NULL, 'https://www.youtube.com/watch?v=DGAHtWV7Ua8', 'Film Score', 1979, TRUE, 10830),
      ('Hurt', 'Johnny Cash', 'American IV: The Man Comes Around', 218, 'https://open.spotify.com/track/hurt', 'https://www.youtube.com/watch?v=8AHCfZTRGiI', 'Alternative Country', 2002, FALSE, NULL),
      ('Mad World', 'Gary Jules', 'Donnie Darko OST', 192, 'https://open.spotify.com/track/madworld', 'https://www.youtube.com/watch?v=4N3N1MlvVc4', 'Alternative', 2001, FALSE, NULL),
      ('The Sound of Silence', 'Disturbed', 'Immortalized', 248, 'https://open.spotify.com/track/silence', 'https://www.youtube.com/watch?v=u9Dg-g7t2l4', 'Metal', 2015, FALSE, NULL),
      ('Immigrant Song', 'Led Zeppelin', 'Led Zeppelin III', 146, 'https://open.spotify.com/track/immigrant', 'https://www.youtube.com/watch?v=y8OtzJtp-EM', 'Rock', 1970, FALSE, NULL),
      ('Space Oddity', 'David Bowie', 'David Bowie', 318, 'https://open.spotify.com/track/spaceodditty', 'https://www.youtube.com/watch?v=iYYRH4apXDo', 'Rock', 1969, FALSE, NULL)
    `;
    
    db.query(insertSongs, (err, result) => {
      if (err) {
        console.error('Error inserting sample songs:', err);
      } else {
        console.log('Sample songs inserted');
      }
      
      // Insert sample playlists (using actual movie IDs)
      const insertPlaylists = `
        INSERT INTO playlists (title, description, movie_id, creator_name, playlist_type, mood_tags) VALUES
        ('12 Angry Men Alternative Soundtrack', 'What if 12 Angry Men had a modern psychological thriller soundtrack?', 969, 'MusicLover92', 'alternative', 'tense,psychological,dramatic'),
        ('2001 Space Odyssey Enhanced', 'Enhanced orchestral version with additional space-ambient tracks', 1711, 'FilmScoreFan', 'remix', 'epic,cosmic,mysterious'),
        ('Alien Horror Metal Edition', 'Alien with a heavy metal twist - amplify the terror with metal', 10830, 'MetalHead88', 'alternative', 'dark,horror,intense')
      `;
      
      db.query(insertPlaylists, (err, result) => {
        if (err) {
          console.error('Error inserting sample playlists:', err);
        } else {
          console.log('Sample playlists inserted');
        }
        
        // Insert playlist-song relationships
        const insertPlaylistSongs = `
          INSERT INTO playlist_songs (playlist_id, song_id, position_order, added_by, reason_note) VALUES
          (1, 1, 1, 'MusicLover92', 'Original tense courthouse drama score'),
          (1, 4, 2, 'MusicLover92', 'Johnny Cash adds psychological depth to jury deliberation'),
          (1, 5, 3, 'MusicLover92', 'Haunting cover perfect for tension-building scenes'),
          (2, 2, 1, 'FilmScoreFan', 'Classic 2001 theme - essential space odyssey music'),
          (2, 8, 2, 'FilmScoreFan', 'Bowie space theme complements HAL sequences perfectly'),
          (3, 3, 1, 'MetalHead88', 'Goldsmith original - but imagine this with metal guitars'),
          (3, 6, 2, 'MetalHead88', 'Disturbed version perfect for alien encounter scenes'),
          (3, 7, 3, 'MetalHead88', 'Led Zeppelin for action sequences - pure alien-fighting energy')
        `;
        
        db.query(insertPlaylistSongs, (err, result) => {
          if (err) {
            console.error('Error inserting playlist songs:', err);
          } else {
            console.log('Sample playlist songs inserted');
          }
          
          // Insert sample ratings
          const insertRatings = `
            INSERT INTO playlist_ratings (playlist_id, user_name, rating, comment) VALUES
            (1, 'CinemaFan23', 5, 'Brilliant concept! Johnny Cash really fits the prison theme.'),
            (1, 'MusicCritic', 4, 'Creative choices, though I prefer the original score.'),
            (2, 'OrchestralLover', 5, 'Beautiful enhancement of Nino Rota masterpiece.'),
            (3, 'BatmanFan99', 3, 'Interesting idea but metal might overpower the psychological elements.')
          `;
          
          db.query(insertRatings, (err, result) => {
            if (err) {
              console.error('Error inserting sample ratings:', err);
            } else {
              console.log('Sample ratings inserted');
            }
            
            console.log('Database setup complete for Movie Soundtrack Playlists!');
            db.end();
          });
        });
      });
    });
  }
});
