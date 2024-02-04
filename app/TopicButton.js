import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import { theme } from './theme';
import Fab from '@mui/material/Fab'; // Corrected import statement for MUI version 5 or later
import AddIcon from '@mui/icons-material/Add'; // Import an icon that suits your use case

const TopicButton = ({ handleTopicsDrawerToggle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isMobile && (
        <Fab
          aria-label="add"
          onClick={handleTopicsDrawerToggle}
          sx={{
            backgroundColor: '#5E81AC !important',
            color: '#fff',
            position: 'fixed',
            right: '30px',
            bottom: '30px',
            height: '70px',
            width: '70px',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 8px 12px rgba(100,100,100,0.7)',
          }}
        >
          Topics
        </Fab>
      )}
    </>
  );
};

export default TopicButton;
