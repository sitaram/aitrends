import React from 'react';
import { Drawer, useMediaQuery, useTheme, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} openClusterIndex={openClusterIndex} />
  );

  return (
    <>
      {isMobile ? (
        <>
          <Drawer
            anchor="right"
            open={topicsDrawerOpen}
            onClose={handleTopicsDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '.MuiDrawer-paper': {
                marginTop: '60px', // Add this margin to create space for the title bar
                height: `calc(100% - 60px)`,
              },
            }}
          >
            {drawerContent}
          </Drawer>
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
