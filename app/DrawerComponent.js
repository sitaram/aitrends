import React from 'react';
import { Drawer, useMediaQuery, Button, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from './theme';
import TopicBrowser from './TopicBrowser';

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle, topic, handleTopicChange }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} />
  );

  return (
    <>
      {isMobile ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: '0 20px 20px 0', // Rounded edges on the right side
              minWidth: 'auto', // Minimize width to fit content
              padding: '6px 12px', // Adjust padding
              fontSize: '0.875rem', // Font size similar to typical Material-UI button text
              textTransform: 'none', // Avoid uppercase to make it look more like a tab
              position: 'fixed', // Keep the button visible and in a consistent position
              top: '90vh', // Position at 90% of the viewport height
              left: 0, // Stick to the left side of the viewport
              zIndex: 1201, // Ensure it's above other components
              backgroundColor: '#3a506b !important', // Example blue color, adjust as needed
              color: '#fff', // Text color
              opacity: 1, // Ensure the button is fully opaque
              '&:hover': {
                backgroundColor: '#1976d2', // Lighter shade on hover
                opacity: 1, // Ensure the button remains opaque on hover
              },
              ...(mobileOpen && { display: 'none' }), // Hide when drawer is open
            }}
          >
            Topics
          </Button>
          <SwipeableDrawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
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

