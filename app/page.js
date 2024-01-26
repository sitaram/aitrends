'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner'; // Import a loading spinner library
import { AppBar, Toolbar, IconButton, Typography, Drawer, CssBaseline, Box, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import TimeframeSlider from './timeframe-slider';
import TopicBrowser from './topic-browser';

const drawerWidth = 240;
const cache_salt = '1';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a506b', // A deep, muted blue
      contrastText: '#fff', // White text for better readability on primary color
    },
    secondary: {
      main: '#f4a261', // A soft, complementary orange
      contrastText: '#000', // Dark text for better readability on secondary color
    },
    background: {
      default: '#f0f4f8', // Light gray background
      paper: '#ffffff', // White background for paper elements
    },
    text: {
      primary: '#333333', // Almost black for primary text
      secondary: '#555555', // Dark gray for secondary text
    },
  },
});

const clearCache = () => {
  for (i in localStorage)
    if (i.match(/^openai:/))
      localStorage.removeItem(i);
}

const splitChat = (str) => {
  return str.split('\n').filter(line => line.trim() !== '');
}

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // State to control drawer visibility
  const [timeframe, setTimeframe] = useState('last two weeks');
  const [topic, setTopic] = useState('All AI Topics'); // Set the first topic as default
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Toggles the state of the drawer
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTopicChange = newTopic => {
    setTopic(newTopic);
  };

  const fetchInProgress = useRef(false);

  const fetchContent = useCallback(async () => {
    if (fetchInProgress.current) {
      return; // Prevents fetching if a request is already in progress
    }

    const prompt = `What are recent advances in the ${timeframe} in ${topic}? Research as necessary to get this list.
    In your reply, be explicit about the time window you're talking about.`;

    var cache = localStorage.getItem("openai:" + cache_salt + ":" + prompt);
    if (cache) {
      setContent(splitChat(cache));
      return;
    }

    fetchInProgress.current = true;
    setIsLoading(true); // Set loading state before fetching

    try {
      const response = await axios.post('/api/query-openai', { prompt });
      const chatMessage = response.data.data;
      localStorage.setItem("openai:" + cache_salt + ":" + prompt, chatMessage);
      setContent(splitChat(chatMessage));
    } catch (error) {
      console.error('Error fetching content:', error);
    }

    setIsLoading(false); // Reset loading state after fetching
    fetchInProgress.current = false;
  }, [timeframe, topic]); // Only recreate the function when these dependencies change

  useEffect(() => {
    fetchContent();
  }, [fetchContent]); // `fetchContent` changes only if `timeframe` or `topic` changes

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
	<CssBaseline />
	<AppBar position="fixed">
	  <Toolbar>
	    <IconButton
	      color="inherit"
	      aria-label="open drawer"
	      edge="start"
	      onClick={handleDrawerToggle}
	      sx={{ mr: 2, display: { sm: 'block' } }} // Ensures the icon is visible on small devices
	    >
	      <MenuIcon />
	    </IconButton>
	    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
		<Typography variant="h6" noWrap>
		    AI Trends Live
		</Typography>
		<Typography variant="h6" noWrap>
		    <a href="https://aitrends.live/" target="_blank" rel="noopener noreferrer">aitrends.live</a>
		</Typography>
	    </Box>
	  </Toolbar>
	</AppBar>

	{isMobile ? (
	  <Drawer
	    variant="temporary"
	    open={mobileOpen}
	    onClose={handleDrawerToggle}
	    ModalProps={{ keepMounted: true }}
	    sx={{
	      '& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		marginTop: '64px', // Adjusting the top margin to AppBar's height
		height: `calc(100% - 64px)`,
		backgroundColor: '#fafafa', // A light background color for the drawer
		zIndex: '100000000',
	      }
	    }}
	  >
	    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} />
	  </Drawer>
	) : (
	  <Drawer
	    variant="permanent"
	    sx={{
	      width: drawerWidth,
	      flexShrink: 0,
	      '& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: '#fafafa', // A light background color for the drawer
		zIndex: '1',
	      }
	    }}
	  >
	    <Toolbar />
	    <TopicBrowser onSelect={handleTopicChange} selectedTopic={topic} />
	  </Drawer>
	)}

	<Box
	  component="main"
	  sx={{ flexGrow: 1, p: [3, 5], width: { sm: `calc(100% - ${drawerWidth}px)` } }}
	>

	  <Toolbar />
	  <TimeframeSlider value={timeframe} onChange={handleTimeframeChange} />
	  <div>
	    {/* Render the split chat message */}
	    {isLoading ? (
	      <div className="centered"><ThreeDots color="#3a506b" /></div>
	    ) : (
	      // Render the split chat message when not loading
	      content.map((part, index) => (
		<div key={index} className="message">
		  {part}
		</div>
	      ))
	    )}
	  </div>
	</Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
