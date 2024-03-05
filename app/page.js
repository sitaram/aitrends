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
import { flattenTopics } from './utils';
import { topics } from './topics';
import { tabs } from './tabs';
import { getTheme } from './theme';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import axios from 'axios';
import * as Constants from './constants';

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = getTheme(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [topicsDrawerOpen, setTopicsDrawerOpen] = useState(true);

  const allTopics = [Constants.ALLTOPICS, ...flattenTopics(topics.clusters)];
  const [topic, setTopic] = useState(Constants.ALLTOPICS);
  const [displayedTopic, setDisplayedTopic] = useState(Constants.APPNAME);

  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [isTabBarSticky, setIsTabBarSticky] = useState(false);
  const updateScheduled = useRef(false);
  const title = topic === Constants.ALLTOPICS ? Constants.ALLTOPICS_TITLE : topic;

  function updateUrlParams(topic, tab) {
    router.push(`/?topic=${topic}&tab=${tab}`, undefined, { shallow: true });
  }

  // Toggles the visibility of the drawer
  const handleTopicsDrawerToggle = () => {
    setTopicsDrawerOpen(!topicsDrawerOpen);
  };

  // Adjusting topic change handling to work with cluster names
  const handleTopicChange = (newTopic) => {
    setTopicsDrawerOpen(false);
    setTopic(newTopic);
    updateUrlParams(newTopic, tabs[tabIndex]);
  };

  // Handles switching between topics
  const handleSwitchTopic = (direction) => {
    const oldIndex = allTopics.findIndex((t) => t === topic);
    if (oldIndex === -1) return;
    let newIndex =
      direction === 'Previous'
        ? (oldIndex - 1 + allTopics.length) % allTopics.length
        : (oldIndex + 1) % allTopics.length;
    const newTopic = allTopics[newIndex];
    setTopic(newTopic);
    updateUrlParams(newTopic, tabs[tabIndex]);
  };

  // Handle tab change
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    updateUrlParams(topic, tabs[newTabIndex]);
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
    updateUrlParams(topic, tabs[newIndex]);
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
    updateUrlParams(newTopic, tabs[tabIndex]);
  };

  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const tabParam = searchParams.get('tab');
    if (topicParam) setTopic(topicParam);
    const newTabIndex = tabs.findIndex((t) => t === tabParam);
    if (newTabIndex !== -1) setTabIndex(newTabIndex);
  }, [searchParams]);

  // Updates the displayed topic based on the scroll position
  useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.querySelector('.title');
      const titleRect = titleElement.getBoundingClientRect();
      setDisplayedTopic(titleRect.bottom < 64 ? title : Constants.APPNAME);
    };

    // Update the title with the current topic, or use a default title if the topic isn't set
    document.title = topic !== Constants.ALLTOPICS ? `${Constants.APPNAME}: ${topic}` : Constants.APPNAME;

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
          topic={topic}
          topicsDrawerOpen={topicsDrawerOpen}
          handleTopicsDrawerToggle={handleTopicsDrawerToggle}
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
            <Paper elevation={1} sx={{ padding: '1rem 0', backgroundColor: theme.palette.tertiary.main }}>
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
                <span>{title}</span>
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
