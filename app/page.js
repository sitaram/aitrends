'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Toolbar, CssBaseline, ThemeProvider, Snackbar } from '@mui/material';
import axios from 'axios';

import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import ContentComponent from './ContentComponent';
import TimeframeSlider from './TimeframeSlider';

import { fetchContent } from './api';
import { calculateTTL, flattenTopics } from './utils';
import { topics } from './topics';
import generateQueryPrompt from './prompt';
import { theme } from './theme';
import * as Constants from './constants';

const Home = () => {
  // State hooks for managing the app's state
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(true);
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState(Constants.ALLTOPICS);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTopic, setDisplayedTopic] = useState(Constants.APPNAME);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [openClusterIndex, setOpenClusterIndex] = useState(null);
  const allTopics = [Constants.ALLTOPICS, ...flattenTopics(topics.clusters)];

  // Toggles the visibility of the drawer
  const handleTopicsDrawerToggle = () => {
    setTopicsDrawerOpen(!topicsDrawerOpen);
  };

  // Handles topic changes
  const handleTopicChange = (newTopic) => {
    setTopicsDrawerOpen(false);
    setTopic(newTopic);
    const newIndex = allTopics.findIndex((t) => t === newTopic);
    if (newIndex !== -1) {
      setCurrentTopicIndex(newIndex);
    }
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  // Handles switching between topics
  const handleSwitchTopic = (direction) => {
    let newIndex =
      direction === 'Previous'
        ? (currentTopicIndex - 1 + allTopics.length) % allTopics.length
        : (currentTopicIndex + 1) % allTopics.length;

    setCurrentTopicIndex(newIndex);
    setOpenClusterIndex(topics.clusters.findIndex((cluster) => cluster.topics.includes(allTopics[newIndex])));
  };

  // Fetches content when timeframe or topic changes
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const queryPrompt = generateQueryPrompt(timeframe, topic);
        await fetchContent(queryPrompt, calculateTTL(timeframe), setContent, setIsLoading, abortController.signal);
      } catch (error) {
        console.error('Error fetching content:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [timeframe, topic]);

  // Updates the displayed topic based on the scroll position
  useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.querySelector('.title');
      const titleRect = titleElement.getBoundingClientRect();
      setDisplayedTopic(titleRect.bottom < 64 ? topic : Constants.APPNAME);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [topic]);

  // Updates the topic when currentTopicIndex changes
  useEffect(() => {
    setTopic(allTopics[currentTopicIndex]);
  }, [currentTopicIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent handleTopicsDrawerToggle={handleTopicsDrawerToggle} displayedTopic={displayedTopic} />
        <DrawerComponent
          topicsDrawerOpen={topicsDrawerOpen}
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          timeframe={timeframe}
          topic={topic}
          openClusterIndex={openClusterIndex}
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
          <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '.8rem', backgroundColor: '#bed3e7' }}>
            <Typography variant="h1" sx={{ fontSize: '2rem' }} className="title">
              {topic}
            </Typography>
          </Paper>
          <ContentComponent
            theme={theme}
            isLoading={isLoading}
            content={content}
            currentTopicIndex={currentTopicIndex}
            handleSwitchTopic={handleSwitchTopic}
          />
        </Box>
      </Box>
      <TimeframeSlider
        theme={theme}
        value={timeframe}
        onChange={handleTimeframeChange}
        handleTopicsDrawerToggle={handleTopicsDrawerToggle}
        handleSwitchTopic={handleSwitchTopic}
      />
    </ThemeProvider>
  );
};

export default Home;
