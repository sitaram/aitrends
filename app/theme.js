import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5E81AC', // A cooler, uplifting blue that maintains professional vibes
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EBCB8B', // A warm, inviting amber for a touch of fun and energy
      contrastText: '#000',
    },
    background: {
      default: '#E5E9F0', // A lighter, more engaging backdrop that keeps the site airy and open
      paper: '#ffffff',
    },
    text: {
      primary: '#2E3440', // A deep, dark blue-grey that enhances readability and sophistication
      secondary: '#4C566A', // A softer, complementary grey for secondary texts
    },
  },
});
