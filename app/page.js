'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Paper, Box, Toolbar, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from './theme';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import ContentComponent from './ContentComponent';
import axios from 'axios';
import { fetchContent } from './api';
import { calculateTTL } from './utils';
import { Helmet } from 'react-helmet-async';
import TimeframeSlider from './TimeframeSlider';

const Home = () => {
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState('All AI Topics');
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cache_salt = '1';

  const handleTopicsDrawerToggle = () => {
    setTopicsDrawerOpen(!topicsDrawerOpen);
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
        const queryPrompt = `What are recent advances in the ${timeframe} in ${topic}? Research as necessary to get this list. In your reply, be explicit about the time window you're talking about.`;

        await fetchContent(queryPrompt, calculateTTL(timeframe), cache_salt, setContent, setIsLoading, abortController.signal);
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

    return () => {
      abortController.abort();
    };
  }, [timeframe, topic]);

  useEffect(() => {
    document.title = topic;
  }, [topic]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent handleTopicsDrawerToggle={handleTopicsDrawerToggle} />
        <DrawerComponent
          topicsDrawerOpen={topicsDrawerOpen}
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          topic={topic}
          timeframe={timeframe}
          handleTopicChange={handleTopicChange}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            padding: '12px',
            width: '100%',
          }}
        >
          <Toolbar />
          <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '.8rem' }}>
            <Typography variant="h1" sx={{ fontSize: '2rem' }}>{topic}</Typography>
          </Paper>
          <ContentComponent isLoading={isLoading} content={content} />
        </Box>
      </Box>
      <TimeframeSlider
	theme={theme}
	value={timeframe}
	onChange={handleTimeframeChange}
	handleTopicsDrawerToggle={handleTopicsDrawerToggle} />
    </ThemeProvider>
  );
};

export default Home;

