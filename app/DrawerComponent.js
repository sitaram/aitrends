// DrawerComponent.js
import React from 'react';
import { Drawer, useMediaQuery, Box, Typography, SwipeableDrawer } from '@mui/material';
import { theme } from './theme'; // Ensure to import the theme
import TopicBrowser from './TopicBrowser'; // Assuming you have this component

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle, topic, handleTopicChange }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} />
  );

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
      >
        {drawerContent}
      </SwipeableDrawer>
    );
  } else {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }
};

export default DrawerComponent;

