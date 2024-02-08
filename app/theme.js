import { createTheme } from '@mui/material/styles';

// Function to create a theme with dynamic mode
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode, // "light" or "dark"
      ...(mode === 'light'
        ? {
            // Palette values for light mode
            primary: {
              main: '#5E81AC',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#EBCB8B',
              contrastText: '#000',
            },
            background: {
              default: '#E5E9F0',
              paper: '#ffffff',
            },
            text: {
              primary: '#2E3440',
              secondary: '#4C566A',
            },
          }
        : {
            // Palette values for dark mode
            primary: {
              main: '#5E81AC',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#EBCB8B',
              contrastText: '#ffffff', // Adjusted for better visibility in dark mode
            },
            background: {
              default: '#2E3440', // Darker shade for the main background
              paper: '#3B4252', // Slightly lighter shade for components backgrounds like Card, Paper
            },
            text: {
              primary: '#ECEFF4', // Lighter text for better readability in dark mode
              secondary: '#D8DEE9', // Softer version of primary text color
            },
          }),
    },
    // Add other theme customizations that are independent of mode here
  });
