import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Tabs, Tab, Box, Divider, useScrollTrigger, useTheme, useMediaQuery } from '@mui/material';
import { hexToRgba } from './utils';

const ElevationScroll = ({ children, window }) => {
  const theme = useTheme();
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

const DividerTab = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1 }}>
    <Divider orientation="vertical" flexItem />
  </Box>
);

const tabContainerStyle = (theme) => {
  return {
    position: 'relative',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      pointerEvents: 'none',
    },
    '&::before': {
      left: '35px',
      width: '30px',
      height: '45px',
      background: `linear-gradient(to right, ${hexToRgba(theme.palette.background.tabbar, 1)} 0%, ${hexToRgba(
        theme.palette.background.tabbar,
        0
      )} 100%)`,
    },
    '&::after': {
      right: '35px',
      width: '30px',
      height: '45px',
      background: `linear-gradient(to left, ${hexToRgba(theme.palette.background.tabbar, 1)} 0%, ${hexToRgba(
        theme.palette.background.tabbar,
        0
      )} 100%)`,
    },
    overflowX: 'auto', // Ensure this is scrollable
  };
};

const TabBar = ({ tabs, tabIndex, handleTabChange, window }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabsRef = useRef(null);

  useEffect(() => {
    const adjustScroll = () => {
      if (tabsRef.current) {
        const flexContainer = tabsRef.current.querySelector('.MuiTabs-flexContainer');
        if (flexContainer) {
          const activeTab = flexContainer.children[tabIndex]; // Assuming tabIndex is your active tab index
          if (activeTab) {
            // Scroll the selected tab into view
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }
    };
    // Delay the scroll adjustment slightly to allow other scroll adjustments to settle
    const timer = setTimeout(adjustScroll, 600); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [tabIndex]);

  return (
    <ElevationScroll window={window}>
      <AppBar
        position="static"
        color="default"
        sx={{
          '& .MuiTabs-root': {
            backgroundColor: 'red',
          },
          backgroundColor: theme.palette.background.paper,
          borderBottom: 1,
          borderColor: 'divider',
          ...(!isMobile && { boxShadow: 'none' }),
        }}
      >
        <Box sx={tabContainerStyle(theme)}>
          <Tabs
            value={tabIndex}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            ref={tabsRef} // Apply the ref to the Tabs component
            sx={{
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiTab-root': {
                backgroundColor: theme.palette.background.tabbar,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              },
              '& .MuiButtonBase-root': {
                backgroundColor: theme.palette.background.tabbar,
              },
              '& .MuiBox-root': {
                backgroundColor: theme.palette.background.tabbar,
              },
            }}
            centered={false}
            onChange={handleTabChange}
          >
            {tabs.map((item, index) =>
              item !== 'Divider' ? (
                <Tab key={index} label={item} />
              ) : (
                // Render a Tab styled as a divider
                <DividerTab key={`divider-${index}`} />
              )
            )}
          </Tabs>
        </Box>
      </AppBar>
    </ElevationScroll>
  );
};

export default TabBar;
