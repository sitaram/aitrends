'use client';

import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  Paper,
  Box,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import TabBar from './TabBar';
import ContentComponent from './ContentComponent';
import TopicButton from './TopicButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { fetchContent } from './api';
import { calculateTTL, flattenTopics } from './utils';
import { topics } from './topics';
import { tabs } from './tabs';
import { theme } from './theme';
import axios from 'axios';
import * as Constants from './constants';

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State hooks for managing the app's state
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(true);
  const [topic, setTopic] = useState(Constants.ALLTOPICS);
  const [openClusterIndex, setOpenClusterIndex] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [displayedTopic, setDisplayedTopic] = useState(Constants.APPNAME);
  const allTopics = [Constants.ALLTOPICS, ...flattenTopics(topics.clusters)];
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Handles switching between topics
  const handleSwitchTopic = (direction) => {
    let newIndex =
      direction === 'Previous'
        ? (currentTopicIndex - 1 + allTopics.length) % allTopics.length
        : (currentTopicIndex + 1) % allTopics.length;

    setCurrentTopicIndex(newIndex);
    setOpenClusterIndex(topics.clusters.findIndex((cluster) => cluster.topics.includes(allTopics[newIndex])));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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

  // Fetches content when tab or topic changes
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const prompt = tabs[tabIndex].prompt.replace('${topic}', topic);
        const ttl = tabs[tabIndex].ttl || 90 * 86400;
        console.log(topic, prompt, ttl);
        await fetchContent(prompt, ttl, setContent, setIsLoading, abortController.signal);
      } catch (error) {
        console.error('Error fetching content:', error);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [topic, tabIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent handleTopicsDrawerToggle={handleTopicsDrawerToggle} displayedTopic={displayedTopic} />
        <DrawerComponent
          topicsDrawerOpen={topicsDrawerOpen}
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          topic={topic}
          openClusterIndex={openClusterIndex}
          handleTopicChange={handleTopicChange}
        />
        <div style={{ width: '100%', overflowX: 'hidden' }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Toolbar />
            <Paper elevation={1} sx={{ padding: '1rem', marginBottom: '.2rem', backgroundColor: '#bed3e7' }}>
              <Typography
                variant="h1"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '2rem',
                }}
                className="title"
              >
                <IconButton onClick={() => handleSwitchTopic('Previous')}>
                  <NavigateBeforeIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <span>{topic}</span> {/* Ensure the topic is centered by using it within a span if needed */}
                <IconButton onClick={() => handleSwitchTopic('Next')}>
                  <NavigateNextIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Typography>
            </Paper>

            <TabBar tabs={tabs} tabIndex={tabIndex} handleTabChange={handleTabChange} />

            <ContentComponent
              theme={theme}
              topic={topic}
              isLoading={isLoading}
              content={content}
              currentTopicIndex={currentTopicIndex}
              handleSwitchTopic={handleSwitchTopic}
            />

            <TopicButton handleTopicsDrawerToggle={handleTopicsDrawerToggle} />
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
