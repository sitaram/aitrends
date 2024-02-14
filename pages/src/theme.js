import { createTheme } from '@mui/material/styles';

// Enhanced theme creation with dynamic mode and custom components
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#5E81AC' : '#6181b1',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#fBE0CB' : '#aB7B4B',
        contrastText: '#000',
      },
      tertiary: {
        main: mode === 'light' ? '#bed3e7' : '#6181b1',
        contrastText: '#ffffff',
      },
      markdown: {
        strong: '#81a161', // Nice green for strong emphasis
        h1: 'red', // Red for h1 headings
        h2: 'green', // Green for h2 headings
        h3: 'tomato', // Tomato for h3 headings
        h4: 'undefined',
      },
      background: {
        default: mode === 'light' ? '#E5E9F0' : '#2E3440',
        paper: mode === 'light' ? '#ffffff' : '#0B1222',
        tabbar: mode === 'light' ? '#f5f5f5' : '#0B1222',
      },
      text: {
        primary: mode === 'light' ? '#2E3440' : '#ECEFF4',
        secondary: mode === 'light' ? '#4C566A' : '#D8DEE9',
      },
    },
    // Other customizations
  });
