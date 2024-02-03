import React from 'react';
import { Drawer, useMediaQuery, Button, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from './theme';
import TopicBrowser from './TopicBrowser';
import SwipeTooltip from './SwipeTooltip';

const drawerWidth = 240;

const DrawerComponent = ({
  topicsDrawerOpen,
  handleTopicsDrawerToggle,
  topic,
  openClusterIndex,
  handleTopicChange,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} openClusterIndex={openClusterIndex} />
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
          <SwipeTooltip topicsDrawerOpen={topicsDrawerOpen} />
        </>
      ) : (
        <Drawer
          variant="permanent"
          className="desktopdrawer"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            overflowY: 'scroll',
            overflowX: 'hidden',
            '& .MuiDrawer-paper': {
              marginTop: '64px',
              height: `calc(100% - 64px)`,
              width: drawerWidth,
              boxSizing: 'border-box',
              zIndex: 1000,
              overflowX: 'hidden',
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
