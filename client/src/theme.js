import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2', 
      light: '#B266F0',
      dark: '#5C1A94',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF00FF', 
      light: '#FF66FF',
      dark: '#CC00CC',
      contrastText: '#ffffff',
        },
    background: {
      default: 'linear-gradient(135deg, #000000 0%, #1a0d2e 100%)', 
      paper: '#1a0d2e', 
    },
    text: {
      primary: '#ffffff', 
      secondary: '#9d7ad2ff', 
      light: '#898989ff', 
      dark: '#51108eff',
    },
    success: {
      main: '#00ff9f', 
      light: '#66ffbf',
      dark: '#00cc7f',
    },
    warning: {
      main: '#ffff00', 
      light: '#ffff66',
      dark: '#cccc00',
    },
    error: {
      main: '#ff0080', 
      light: '#ff66b3',
      dark: '#cc0066',
    },
    info: {
      main: '#00ffff', 
      light: '#66ffff',
      dark: '#00cccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
      textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 30px #8A2BE2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#ffffff',
      textShadow: '0 0 8px #8A2BE2, 0 0 16px #8A2BE2',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#5b0ab3ff',
      textShadow: '0 0 6px #8A2BE2, 0 0 12px #8A2BE2',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
      textShadow: '0 0 4px #8A2BE2',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#ffffff',
      textShadow: '0 0 3px #8A2BE2',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: '#5a0068ff',
      textShadow: '0 0 2px #c8c8c864',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 700,
      color: '#2d004fff',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 500,
      color: '#46286eff',
    },
    body3: {
      fontSize: '1.2rem',
      lineHeight: 1.4,
      fontWeight: 400,
      color: '#f0e0ffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0015',
          background: 'linear-gradient(45deg, #0a0015 30%, #1a0d2e 90%)',
          boxShadow: '0 0 20px rgba(138, 43, 226, 0.5), 0 4px 8px rgba(0,0,0,0.3)',
          borderBottom: '2px solid #8A2BE2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600, 
          padding: '10px 20px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(45deg, #8A2BE2 30%, #FF00FF 90%)',
          boxShadow: '0 0 15px rgba(138, 43, 226, 0.6), 0 3px 6px rgba(0,0,0,0.2)',
          '&:hover': {
            background: 'linear-gradient(45deg, #B266F0 30%, #FF66FF 90%)',
            boxShadow: '0 0 25px rgba(138, 43, 226, 0.8), 0 5px 10px rgba(0,0,0,0.3)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#551a8cff',
          color: '#71459bff',
          boxShadow: '0 0 10px #8a2be24d',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#613484ff',
            color: '#694386ff',
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a0d2e',
          border: '1px solid rgba(138, 43, 226, 0.3)',
          boxShadow: '0 0 15px rgba(138, 43, 226, 0.2), 0 4px 8px rgba(0,0,0,0.3)',
          borderRadius: 16,
          '&:hover': {
            borderColor: '#8a2be299',
            boxShadow: '0 0 10px rgba(138, 43, 226, 0.4), 0 8px 16px rgba(0,0,0,0.4)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        '& fieldset': {
          borderColor: 'rgba(222, 186, 255, 0.5)',
          borderWidth: '1px',
        },
        '&:hover fieldset': {
          borderColor: '#8A2BE2',
          boxShadow: '0 0 10px rgba(138, 43, 226, 0.3)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#8A2BE2',
          boxShadow: '0 0 10px rgba(138, 43, 226, 0.3)',
        },
        '& input': {
          color: '#2d004fff',
        },
        },
        '& .MuiInputLabel-root': {
        color: '#c0a7e0',
        '&.Mui-focused': {
          color: '#FF00FF',
          textShadow: '0 0 5px #FF00FF',
        },
        },
      },
      outlined: {
        '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        backgroundColor: 'rgba(26, 13, 46, 0.9)',
        '& fieldset': {
          borderColor: 'rgba(31, 0, 60, 0.5)',
          borderWidth: '1px',
        },
        '&:hover fieldset': {
          borderColor: '#8A2BE2',
          boxShadow: '0 0 10px rgba(138, 43, 226, 0.3)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#FF00FF',
          boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
        },
        '& input': {
          color: '#3a3a3aff',
        },
        },
        '& .MuiInputLabel-root': {
        color: '#c0a7e0',
        '&.Mui-focused': {
          color: '#FF00FF',
          textShadow: '0 0 5px #FF00FF',
        },
        },
      },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#ffff00', 
          filter: 'drop-shadow(0 0 3px #606060ff)',
        },
        iconEmpty: {
          color: 'rgba(122, 122, 122, 0.79)',
        },
        iconHover: {
          color: '#ffff00',
          filter: 'drop-shadow(0 0 8px #ffff00)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: 'rgba(138, 43, 226, 0.8)',
          color: '#ffffff',
          boxShadow: '0 0 8px rgba(138, 43, 226, 0.4)',
        },
        outlined: {
          borderColor: '#8A2BE2',
          color: '#ffffffff',
          boxShadow: '0 0 5px rgba(138, 43, 226, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
            borderColor: '#FF00FF',
            color: '#FF00FF',
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.4)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(150deg, #d4a7ffff 30%, #ffe6fdff 90%)',
          border: '2px solid rgba(138, 43, 226, 0.5)',
          boxShadow: '0 0 30px rgba(138, 43, 226, 0.6)',
          borderRadius: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#c0a7e0',
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#FF00FF',
            textShadow: '0 0 5px #FF00FF',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#FF00FF',
          height: '3px',
          boxShadow: '0 0 10px #FF00FF',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
      select: {
        minWidth: 220,
        backgroundColor: 'white',
        color: '#795a9eff',
        borderColor: '#DEBAFF',
        borderWidth: '1px',
        '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(222, 186, 255, 0.5)',
        },
        '& .MuiSelect-select': {
        color: 'var(--selected-movie-color, #795a9eff)', // Use CSS variable for dynamic color
        backgroundColor: 'white',
        },
      },
      icon: {
        color: '#8A2BE2',
      },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
      root: {
        backgroundColor: '#1a0d2e',
        color: 'rgba(211, 189, 239, 1)',
        borderColor: '#DEBAFF', 
        borderWidth: '1px',
        '&:hover': {
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        color: '#FF00FF',
        borderColor: '#DEBAFF', 
        },
        '&.Mui-selected': {
        backgroundColor: 'rgba(138, 43, 226, 0.3)',
        color: '#FF00FF',
        borderColor: '#DEBAFF', 
        '&:hover': {
          backgroundColor: 'rgba(138, 43, 226, 0.4)',
          borderColor: '#DEBAFF',
        },
        },
      },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
          },
        },
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12, 
  },
  custom: {
    neonGlow: {
      primary: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 30px #8A2BE2',
      secondary: '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF',
      success: '0 0 10px #00ff9f, 0 0 20px #00ff9f',
      warning: '0 0 10px #ffff00, 0 0 20px #ffff00',
      error: '0 0 10px #ff0080, 0 0 20px #ff0080',
    },
    gradients: {
      primary: 'linear-gradient(45deg, #8A2BE2 30%, #FF00FF 90%)',
      secondary: 'linear-gradient(45deg, #FF00FF 30%, #00ffff 90%)',
      background: 'linear-gradient(135deg, #0a0015 0%, #1a0d2e 50%, #2d1b69 100%)',
      background1: 'linear-gradient(180deg, #2d1b69 0%, #1a0d2e 30%, #0a0015 100%)',
    },
  },
});

export default theme;

