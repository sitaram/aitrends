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
              main: '#fBE0CB',
              contrastText: '#000',
            },
            tertiary: {
              main: '#bed3e7',
              contrastText: '#000',
            },
            background: {
              default: '#E5E9F0',
              paper: '#ffffff',
              tabbar: '#f5f5f5',
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
              main: '#aB7B4B',
              contrastText: '#ffffff', // Adjusted for better visibility in dark mode
            },
            tertiary: {
              main: '#416191',
              contrastText: '#ffffff', // Adjusted for better visibility in dark mode
            },
            background: {
              default: '#2E3440', // Darker shade for the main background
              paper: '#3B4252', // Slightly lighter shade for components backgrounds like Card, Paper
              tabbar: '#3B4252',
            },
            text: {
              primary: '#ECEFF4', // Lighter text for better readability in dark mode
              secondary: '#D8DEE9', // Softer version of primary text color
            },
          }),
    },
    // Add other theme customizations that are independent of mode here
  });

// nice green
// main: '#81a161',
