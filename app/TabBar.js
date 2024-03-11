import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Divider,
  Popper,
  Paper,
  Typography,
  IconButton,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { hexToRgba } from './utils';
import TabMenu from './TabMenu';

const ElevationScroll = ({ children, window, setIsTabBarSticky }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 93,
    target: window ? window() : undefined,
  });

  useEffect(() => {
    setIsTabBarSticky(trigger);
  }, [trigger, setIsTabBarSticky]);

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      position: trigger ? 'fixed' : 'sticky',
      top: trigger ? (isMobile ? '56px' : '64px') : '0px',
      zIndex: theme.zIndex.appBar - 1,
      width: trigger ? (isMobile ? '100%' : 'calc(100% - 250px)') : '100%',
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
    backgroundColor: theme.palette.background.tabbar, // Match the tab bar background
    position: 'relative',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1,
      pointerEvents: 'none',
      width: '30px',
      height: '45px',
    },
    '&::before': {
      left: '55px',
      background: `linear-gradient(to right, ${hexToRgba(theme.palette.background.tabbar, 1)} 0%, ${hexToRgba(
        theme.palette.background.tabbar,
        0
      )} 100%)`,
    },
    '&::after': {
      right: '25px',
      background: `linear-gradient(to left, ${hexToRgba(theme.palette.background.tabbar, 1)} 0%, ${hexToRgba(
        theme.palette.background.tabbar,
        0
      )} 100%)`,
    },
    overflowX: 'auto', // Ensure this is scrollable
  };
};

const TabBar = ({ tabs, tabIndex, handleTabChange, window, setIsTabBarSticky, topicsDrawerOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showTabMenu, setShowTabMenu] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const tooltipRef = useRef(null); // Ref for the drawer button

  const handleToolbarClick = () => {
    setShowTabMenu(!showTabMenu);
  };

  useEffect(() => {
    if (!topicsDrawerOpen && firstTime) {
      setShowTooltip(true);
      setFirstTime(false);
      const timer2 = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
  }, [topicsDrawerOpen, firstTime]);

  const TabTooltip = () => (
    <Popper open={showTooltip} anchorEl={tooltipRef.current} style={{ zIndex: 2000 }} arrow="true">
      <Paper
        elevation={3}
        sx={{
          padding: '10px 20px',
          backgroundColor: 'secondary.main',
          width: 260,
          marginLeft: 0,
          marginTop: 0,
          borderRadius: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          Then, see lots of tabs here
          <br />
          See them all in this dropdown
        </Typography>
      </Paper>
    </Popper>
  );

  return (
    <ElevationScroll window={window} setIsTabBarSticky={setIsTabBarSticky}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {tooltipRef.current && <TabTooltip />}
        <AppBar
          position="static"
          color="default"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderBottom: 1,
            borderColor: 'divider',
            ...(!isMobile && { boxShadow: 'none' }),
            width: '100%', // Ensure AppBar takes full width
            display: 'flex', // Added to ensure flex behavior
            justifyContent: 'space-between', // Adjusted for spacing between tabs and tooltip
          }}
        >
          <Box sx={{ ...tabContainerStyle(theme), flexGrow: 1, textAlign: 'end', padding: '0 5px' }}>
            <TabMenu
              open={showTabMenu}
              ref={tooltipRef}
              onClose={() => setShowTabMenu(false)}
              onClick={handleToolbarClick}
              handleTabChange={handleTabChange}
            />
            <Box sx={{ display: 'inline-block', width: 'calc(100% - 35px)' }}>
              <Tabs
                value={tabIndex}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  '& .Mui-selected': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  },
                  '& .MuiTabs-scrollButtons': {
                    color: theme.palette.primary.main,
                    width: '20px !important',
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
          </Box>
        </AppBar>
      </Box>
    </ElevationScroll>
  );
};

export default TabBar;
