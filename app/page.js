'use client'

// Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from './theme';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import ContentComponent from './ContentComponent';
import axios from 'axios';
import { fetchContent } from './api';
import TimeframeSlider from './TimeframeSlider';

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState('All AI Topics');
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cache_salt = '1';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
	const queryPrompt = `What are recent advances in the ${timeframe} in ${topic}? Research as necessary to get this list.
	In your reply, be explicit about the time window you're talking about.`;

        await fetchContent(queryPrompt, cache_salt, setContent, setIsLoading, abortController.signal);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request was cancelled');
        } else {
          console.error('An error occurred:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel the request if the component unmounts or dependencies change
    return () => {
      abortController.abort();
    };
  }, [timeframe, topic]); // Removed setIsLoading and setContent from dependencies


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

