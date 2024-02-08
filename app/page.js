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
import Tooltip from './Tooltip';
import { fetchContent } from './api';
import { calculateTTL, flattenTopics, parseHashParams } from './utils';
import { topics } from './topics';
import { tabs } from './tabs';
import { getTheme } from './theme';
import axios from 'axios';
import * as Constants from './constants';

const Home = () => {
  const theme = getTheme(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State hooks for managing the app's state
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(true);
  const [topic, setTopic] = useState(Constants.ALLTOPICS);
  const [openClusterIndex, setOpenClusterIndex] = useState(null);
  const [topicIndex, setTopicIndex] = useState(0);
  const [displayedTopic, setDisplayedTopic] = useState(Constants.APPNAME);
  const allTopics = [Constants.ALLTOPICS, ...flattenTopics(topics.clusters)];
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to update the URL hash for topic and tab
  function updateUrlHash(topic, tab) {
    const newHash = `#topic=${encodeURIComponent(topic)}&tab=${encodeURIComponent(tab)}`;
    window.location.hash = newHash;
  }

  // Toggles the visibility of the drawer
  const handleTopicsDrawerToggle = () => {
    setTopicsDrawerOpen(!topicsDrawerOpen);
  };

  // Handles topic changes
  const handleTopicChange = (newTopic) => {
    setTopicsDrawerOpen(false);
    const newIndex = allTopics.findIndex((t) => t === newTopic);
    if (newIndex !== -1) setTopicIndex(newIndex);
    setOpenClusterIndex(topics.clusters.findIndex((cluster) => cluster.topics.includes(allTopics[newIndex])));
    updateUrlHash(newTopic, tabs[tabIndex].name);
  };

  // Handles switching between topics
  const handleSwitchTopic = (direction) => {
    let newIndex =
      direction === 'Previous'
        ? (topicIndex - 1 + allTopics.length) % allTopics.length
        : (topicIndex + 1) % allTopics.length;

    setTopicIndex(newIndex);
    setOpenClusterIndex(topics.clusters.findIndex((cluster) => cluster.topics.includes(allTopics[newIndex])));
    updateUrlHash(allTopics[newIndex], tabs[tabIndex].name);
  };

  // Handle tab change
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    updateUrlHash(topic, tabs[newTabIndex].name);
  };

  const handleSwitchTab = (direction) => {
    let oldIndex = tabIndex;
    let newIndex = oldIndex; // Initialize newIndex with oldIndex to start the comparison.

    do {
      if (direction === 'Previous') {
        // Move to the previous tab if not at the beginning; otherwise switch topic.
        if (newIndex > 0) {
          newIndex--;
        } else {
          // handleSwitchTopic(direction); // Switch topic when reaching the start.
          newIndex = tabs.length - 1; // Move to the last tab after switching topic.
        }
      } else if (direction === 'Next') {
        // Move to the next tab if not at the end; otherwise switch topic.
        if (newIndex < tabs.length - 1) {
          newIndex++;
        } else {
          // handleSwitchTopic(direction); // Switch topic when reaching the end.
          newIndex = 0; // Move to the first tab after switching topic.
        }
      }

      // Check if the new tab is a 'Divider', if so, continue looping to find a valid tab.
    } while (tabs[newIndex].name === 'Divider' && tabs.length > 1); // Ensure there's more than one tab to prevent infinite loop.

    // Once a valid tab is found or if 'Divider' is the only option, update the tabIndex state.
    if (tabIndex !== newIndex) setTabIndex(newIndex);
    updateUrlHash(topic, tabs[newIndex].name);
  };

  // Parse the initial hash parameters
  useEffect(() => {
    const { topic, tab } = parseHashParams(window.location.hash);

    const newTopicIndex = allTopics.findIndex((t) => t === topic);
    if (newTopicIndex !== -1) setTopicIndex(newTopicIndex);

    const newTabIndex = tabs.findIndex((t) => t.name === tab);
    if (newTabIndex !== -1) setTabIndex(newTabIndex);
  }, []);

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

  // Updates the topic when topicIndex changes
  useEffect(() => {
    setTopic(allTopics[topicIndex]);
  }, [topicIndex]);

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

  useEffect(() => {
    setShowTooltip(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          displayedTopic={displayedTopic}
          setShowTooltip={setShowTooltip}
        />
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
            <Paper
              elevation={1}
              sx={{ padding: '1rem', marginBottom: '.2rem', backgroundColor: theme.palette.tertiary.main }}
            >
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
            <ContentComponent topic={topic} isLoading={isLoading} content={content} handleSwitchTab={handleSwitchTab} />
            <TopicButton handleTopicsDrawerToggle={handleTopicsDrawerToggle} />
            {showTooltip && <Tooltip setShowTooltip={setShowTooltip} />}
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
