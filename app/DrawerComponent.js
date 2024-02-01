import React from 'react';
import { Drawer, useMediaQuery, Button, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from './theme';
import TopicBrowser from './TopicBrowser';

const drawerWidth = 240;

const DrawerComponent = ({ topicsDrawerOpen, handleTopicsDrawerToggle, topic, handleTopicChange }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} />
  );

  return (
    <>
      {isMobile ? (
        <>
          <SwipeableDrawer
            anchor="right"
            open={topicsDrawerOpen}
            onClose={handleTopicsDrawerToggle}
            onOpen={handleTopicsDrawerToggle}
	    sx={{
	      '.MuiDrawer-paper': {
		marginTop: '60px', // Add this margin to create space for the title bar
		height: `calc(100% - 60px)`,
	      },
	    }}
          >
            {drawerContent}
          </SwipeableDrawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
	  className="desktopdrawer"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              marginTop: '64px',
              height: `calc(100% - 64px)`,
              width: drawerWidth,
              boxSizing: 'border-box',
	      zIndex: 1000,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default DrawerComponent;

