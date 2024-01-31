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
import generateQueryPrompt from './prompt';
import fetchAll from './fetch-all';

const appName = 'AI Trends';

const Home = () => {
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState('All AI Topics');
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTopic, setDisplayedTopic] = useState(appName);

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
	const queryPrompt = generateQueryPrompt(timeframe, topic);
        await fetchContent(queryPrompt, calculateTTL(timeframe), setContent, setIsLoading, abortController.signal);
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
    document.title = appName + ': ' + topic;

    // Add a scroll event listener to detect when the title scrolls off the page
    const handleScroll = () => {
      const titleElement = document.querySelector('.title'); // Adjust the selector as needed
      const titleRect = titleElement.getBoundingClientRect();
      if (titleRect.bottom < 64) {
        // Title is no longer visible, update the displayed topic
        setDisplayedTopic(topic);
      } else {
        // Title is still visible, display the default topic
        setDisplayedTopic(appName);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, [topic]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent handleTopicsDrawerToggle={handleTopicsDrawerToggle} displayedTopic={displayedTopic} />
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
            <Typography variant="h1" sx={{ fontSize: '2rem' }} className="title">{topic}</Typography>
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

