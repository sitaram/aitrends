import React from 'react';
import { AppBar, Tabs, Tab, Box, Divider, useScrollTrigger, useTheme, useMediaQuery } from '@mui/material';
import { theme } from './theme';

const ElevationScroll = ({ children, window }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 93,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      position: trigger ? 'fixed' : 'sticky',
      top: trigger ? (isMobile ? '56px' : '64px') : '0px',
      zIndex: theme.zIndex.appBar - 1,
      width: trigger ? (isMobile ? 'calc(100% - 0)' : 'calc(100% - 240px)') : '100%',
      marginLeft: 'auto', // Center the AppBar
      marginRight: 'auto', // Center the AppBar
      boxShadow: trigger
        ? '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
        : 'none', // Box shadow when elevated
      marginBottom: trigger ? 2 : 0, // Adjust space below the AppBar based on trigger
      transition: 'top 0.2s', // Smooth transition for the top property
      // Ensure the container inside which AppBar is placed has a width that matches this max-width for consistency
    },
  });
};

const TabBar = ({ tabs, tabIndex, handleTabChange, window }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ElevationScroll window={window}>
      <AppBar
        position="static"
        color="default"
        sx={{
          bgcolor: theme.palette.background.paper,
          borderBottom: 1,
          borderColor: 'divider',
          ...(!isMobile && { boxShadow: 'none' }), // Remove box shadow for non-mobile views if desired
        }}
      >
        <Tabs
          value={tabIndex}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.875rem',
            },
          }}
          centered={false}
          onChange={handleTabChange}
        >
          {tabs.map((item, index) => (
            <React.Fragment key={index}>
              {item.name !== 'Divider' ? (
                <Tab label={item.name} />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                  <Divider orientation="vertical" flexItem />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Tabs>
      </AppBar>
    </ElevationScroll>
  );
};

export default TabBar;
