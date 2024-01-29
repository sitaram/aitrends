// AppBarComponent.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarComponent = ({ handleDrawerToggle }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'block' } }}
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
  );
};

export default AppBarComponent;

