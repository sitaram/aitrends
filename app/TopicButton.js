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
            lineHeight: '1rem',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: `4px 4px 8px ${hexToRgba(theme.palette.primary.main, 0.7)}`,
          }}
        >
          AI Topics
        </Fab>
      )}
    </>
  );
};

export default TopicButton;
