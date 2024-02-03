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
            backgroundColor: '#3a506b !important',
            color: '#fff',
            position: 'fixed',
            right: '30px',
            bottom: '30px',
            textTransform: 'none',
          }}
        >
          Topics
        </Fab>
      )}
    </>
  );
};

export default TopicButton;
