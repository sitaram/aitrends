import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { hexToRgba } from './utils';

const TopicButton = ({ handleTopicsDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isMobile && (
        <Fab
          aria-label="add"
          onClick={handleTopicsDrawerToggle}
          sx={{
            backgroundColor: theme.palette.primary.main + '!important',
            color: 'white',
            fontWeight: 'bold',
            position: 'fixed',
            right: '30px',
            bottom: '30px',
            height: '70px',
            width: '70px',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: `4px 4px 8px ${hexToRgba(theme.palette.primary.main, 0.7)}`,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark + '!important', // Darker shade on hover
              boxShadow: `0px 5px 15px ${hexToRgba(theme.palette.primary.main, 0.7)}`, // More pronounced shadow on hover
            },
            '&:active': {
              backgroundColor: theme.palette.primary.light + '!important', // Lighter shade when button is clicked (active)
              boxShadow: `0px 2px 5px ${hexToRgba(theme.palette.primary.main, 0.5)}`, // Less pronounced shadow when button is clicked
            },
            '&:focus': {
              outline: `2px solid ${theme.palette.secondary.main}`, // Outline color when button is focused
              outlineOffset: '2px',
            }
          }}
        >
          Topics
        </Fab>
      )}
    </>
  );
};

export default TopicButton;
