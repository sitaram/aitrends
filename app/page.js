'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import About from './About';
import { fetchContent } from './api';
import { flattenTopics, parseHashParams } from './utils';
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

  const defaultOpenCluster = 'Industry Applications';
  const [openClusters, setOpenClusters] = useState([defaultOpenCluster]);

  const [displayedTopic, setDisplayedTopic] = useState(Constants.APPNAME);
  const allTopics = [Constants.ALLTOPICS, ...flattenTopics(topics.clusters)];
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [isTabBarSticky, setIsTabBarSticky] = useState(false);
  const updateScheduled = useRef(false);

  // Function to update the URL hash for topic and tab
  function updateUrlHash(topic, tab) {
    const newHash = `#topic=${encodeURIComponent(topic)}&tab=${encodeURIComponent(tab)}`;
    window.location.hash = newHash;
  }

  // Toggles the visibility of the drawer
  const handleTopicsDrawerToggle = () => {
    setTopicsDrawerOpen(!topicsDrawerOpen);
  };

  // Adjusting topic change handling to work with cluster names
  const handleTopicChange = (newTopic) => {
    setTopicsDrawerOpen(false);
    setTopic(newTopic);
    updateUrlHash(newTopic, tabs[tabIndex]);
  };

  // Handles switching between topics
  const handleSwitchTopic = (direction) => {
    const oldIndex = allTopics.findIndex((t) => t === topic);
    if (oldIndex == -1) return;
    let newIndex =
      direction === 'Previous'
        ? (oldIndex - 1 + allTopics.length) % allTopics.length
        : (oldIndex + 1) % allTopics.length;
    const newTopic = allTopics[newIndex];
    setTopic(newTopic);
    const newOpenCluster = topics.clusters.find((cluster) => cluster.topics.includes(newTopic)).name;
    setOpenClusters([newOpenCluster]);
    updateUrlHash(newTopic, tabs[tabIndex]);
  };

  // Handle tab change
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    updateUrlHash(topic, tabs[newTabIndex]);
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
    } while (tabs[newIndex] === 'Divider' && tabs.length > 1); // Ensure there's more than one tab to prevent infinite loop.

    // Once a valid tab is found or if 'Divider' is the only option, update the tabIndex state.
    if (tabIndex !== newIndex) setTabIndex(newIndex);
    updateUrlHash(topic, tabs[newIndex]);
  };

  const handleDynamicTopicChange = (newTopic) => {
    // Check if newTopic is a dynamic topic
    if (!allTopics.includes(newTopic)) {
      // Handle dynamic topic
      setTopic(newTopic);
      // Optionally, manage dynamic topics separately from static topics
    } else {
      // Handle as before
      handleTopicChange(newTopic);
    }
    // Update URL hash or other necessary state
    updateUrlHash(newTopic, tabs[tabIndex]);
  };

  // Parse the initial hash parameters
  useEffect(() => {
    const { topic, tab } = parseHashParams(window.location.hash);
    setTopic(topic);

    if (allTopics.includes(topic)) {
      const newOpenCluster = topics.clusters.find((cluster) => cluster.topics.includes(topic)).name;
      setOpenClusters([newOpenCluster]);
    }

    const newTabIndex = tabs.findIndex((t) => t === tab);
    if (newTabIndex !== -1) setTabIndex(newTabIndex);
  }, []);

  // Parse hash parameters on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const { topic, tab } = parseHashParams(window.location.hash);
      setTopic(topic);
      const newTabIndex = tabs.findIndex((t) => t === tab);
      if (newTabIndex !== -1) setTabIndex(newTabIndex);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [tabs]);

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

  // Fetches content when tab or topic changes
  useEffect(() => {
    if (updateScheduled.current) return;

    updateScheduled.current = true;
    const abortController = new AbortController();
    setLoadingCount((prevCount) => prevCount + 1);

    // Define the fetchData function directly inside useEffect
    const fetchData = async () => {
      try {
        await fetchContent(
          topic,
          tabs[tabIndex],
          null, // payload
          tabIndex === 0, // isOverview
          true, // isOnline
          setContent,
          abortController.signal
        );
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoadingCount((prevCount) => Math.max(0, prevCount - 1));
        updateScheduled.current = false; // Reset after async operation
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
      updateScheduled.current = false; // Ensure reset if unmount occurs before fetch completes
    };
  }, [topic, tabIndex]); // Dependencies array

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarComponent
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          displayedTopic={displayedTopic}
          setShowAbout={setShowAbout}
        />
        <DrawerComponent
          topicsDrawerOpen={topicsDrawerOpen}
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
          topic={topic}
          openClusters={openClusters}
          setOpenClusters={setOpenClusters}
          handleTopicChange={handleDynamicTopicChange}
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
            <TabBar
              tabs={tabs}
              tabIndex={tabIndex}
              handleTabChange={handleTabChange}
              setIsTabBarSticky={setIsTabBarSticky}
            />
            <ContentComponent
              topic={topic}
              tabIndex={tabIndex}
              loadingCount={loadingCount}
              isTabBarSticky={isTabBarSticky}
              content={content}
              handleSwitchTab={handleSwitchTab}
              handleTabChange={handleTabChange}
            />
            <TopicButton handleTopicsDrawerToggle={handleTopicsDrawerToggle} />
            {showAbout && <About showAbout={showAbout} setShowAbout={setShowAbout} />}
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
