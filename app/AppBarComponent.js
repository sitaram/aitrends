// AppBarComponent.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoComponent from './LogoComponent';

const AppBarComponent = ({ handleTopicsDrawerToggle, displayedTopic }) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ paddingRight: '8px' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleTopicsDrawerToggle}
          sx={{ mr: 2, display: { sm: 'block' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" overflow="hidden">
          <Typography variant="h6" noWrap style={{ flexGrow: 1, maxWidth: 'calc(100% - 100px)' }}>
            {displayedTopic}
          </Typography>
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Typography variant="h6" noWrap>
              <a
                href="https://aitrends.live/"
                target="_blank"
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
