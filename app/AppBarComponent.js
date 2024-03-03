import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import SubscribeIcon from '@mui/icons-material/Subscriptions';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import LogoComponent from './LogoComponent';
import FeedbackForm from './FeedbackForm';

const AppBarComponent = ({ handleTopicsDrawerToggle, displayedTopic, setShowAbout }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleFeedbackModal = () => {
    setFeedbackModalOpen(!feedbackModalOpen);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AITrends.live',
          text: 'Keep up with the latest trends in AI with this dynamic and interactive newsletter. Explore now!',
          url: window.location.href,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.log('Error sharing the content', error);
      }
    } else {
      // Improved fallback: Copy URL to clipboard and notify the user
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard. Share it with your friends!');
      } catch (error) {
        console.error('Failed to copy URL', error);
        alert('Unable to copy URL automatically. Please copy the URL manually.');
      }
    }
  };

  const handleSubscribe = async (email) => {
    // POST request to /api/subscribe
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message); // Display success message
  };

  const handleAbout = () => {
    setShowAbout(true);
  };

  const handleLinkedInPost = () => {
    window.open(
      'https://www.linkedin.com/posts/activity-7142703288986050561-oRre?utm_source=share&utm_medium=member_desktop',
      '_blank'
    );
  };

  const handleCode = () => {
    window.open('https://github.com/sitaram/aitrends', '_blank');
  };

  return (
    <AppBar position="fixed">
      {/* App bar content */}
      <Modal open={feedbackModalOpen} onClose={toggleFeedbackModal}>
        <FeedbackForm toggleFeedbackModal={toggleFeedbackModal} />
      </Modal>

      <Toolbar sx={{ paddingRight: '8px', backgroundColor: theme.palette.primary.main }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2, display: { sm: 'block' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ top: '64px', height: 'auto', '& .MuiDrawer-paper': { top: '60px', height: 'auto' } }}
        >
          <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              <ListItem button onClick={handleAbout}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button onClick={handleShare}>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </ListItem>
              {/*
              <ListItem button onClick={handleSubscribe}>
                <ListItemIcon>
                  <SubscribeIcon />
                </ListItemIcon>
                <ListItemText primary="Subscribe" />
              </ListItem>
	      */}
              <ListItem button onClick={toggleFeedbackModal}>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItem>
              <ListItem button onClick={handleLinkedInPost}>
                <ListItemIcon>
                  <LinkedInIcon />
                </ListItemIcon>
                <ListItemText primary="LinkedIn Post" />
              </ListItem>
              <ListItem button onClick={handleCode}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary="GitHub Repo" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" overflow="hidden">
          <Typography variant="h6" noWrap style={{ flexGrow: 1, maxWidth: 'calc(100% - 100px)' }}>
            {displayedTopic}
          </Typography>
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Typography variant="h6" noWrap>
              <a
                href="https://aitrends.live/"
                rel="noopener noreferrer"
                aria-label="aitrends live"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
              >
                <LogoComponent />
              </a>
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
