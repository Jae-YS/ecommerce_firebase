import { createTheme } from '@mui/material/styles';

const ecommerceTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#F9F9F9',  
    },
    primary: {
      main: '#FF6B3D',    
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1E1E1E',    
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1E1E1E', 
      secondary: '#6F6F6F',
    },
    grey: {
      100: '#F0F0F0',
      200: '#D9D9D9',
    },
    error: {
      main: '#E53935',
    },
    success: {
      main: '#43A047',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.2rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.95rem',
          padding: '10px 20px',
        },
      },
    },
  },
});

export default ecommerceTheme;
