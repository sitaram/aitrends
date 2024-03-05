import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#416D19' : '#416D19', // Deep forest green, consistent in both modes
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#FFF67E' : '#FFDD95', // Sunny yellow for light mode, a warmer yellow for dark mode
        contrastText: mode === 'light' ? '#000000' : '#000000',
      },
      tertiary: {
        main: mode === 'light' ? '#9BCF53' : '#BFEA7C', // Vivid green for light mode, soft green for dark mode
        contrastText: '#ffffff',
      },
      markdown: {
        strong: '#416D19',
        h1: '#8B4F33',
        h2: '#fB53b0',
        h3: 'tomato',
        h4: 'purple',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#303030', // White for light mode, dark grey for dark mode
        paper: mode === 'light' ? '#f8f8f8' : '#0B1212', // Light grey and darker grey for paper elements
        tabbar: mode === 'light' ? '#f8ffd8' : '#37474f', // Slightly darker grey for the tabbar in both modes
      },
      text: {
        primary: mode === 'light' ? '#212121' : '#fafafa', // Deep black for light mode, off-white for dark mode
        secondary: mode === 'light' ? '#757575' : '#b0bec5', // Medium grey for both modes
      },
    },
    // Other customizations
  });
