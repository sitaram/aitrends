'use client'

// Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from './theme';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import ContentComponent from './ContentComponent';
import { fetchContent } from './api';
import TimeframeSlider from './TimeframeSlider'; // Assuming this is your component
// You may need to adjust imports based on your actual component file names

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState('All AI Topics');
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cache_salt = '1'; // Adjust this as necessary

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  const initFetch = useCallback(() => {
    const queryPrompt = `What are recent advances in the ${timeframe} in ${topic}? Research as necessary to get this list.
    In your reply, be explicit about the time window you're talking about.`;
    fetchContent(queryPrompt, cache_salt, setIsLoading, setContent);
  }, [timeframe, topic]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent handleDrawerToggle={handleDrawerToggle} />
        <DrawerComponent
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          topic={topic}
          handleTopicChange={handleTopicChange}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar />
          <TimeframeSlider value={timeframe} onChange={handleTimeframeChange} />
          <ContentComponent isLoading={isLoading} content={content} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

