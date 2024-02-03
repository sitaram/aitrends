// AppBarComponent.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TrendLineSvg = () => {
  return (
    <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
      {/* Define the text style and arrowhead style */}
      <style>
        {`.trend-text {
          font: 22px sans-serif;
          fill: white;
        }
        .arrowhead {
          fill: #cf7910;
        }`}
      </style>

      {/* Arrowhead marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6" className="arrowhead" />
        </marker>
      </defs>

      {/* Zigzag trendline path with arrowhead */}
      <path
        d="M10,40 l30,-25 l10,20 l20,-25"
        stroke="#cf7910"
        fill="none"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* Text label for aitrends.live */}
      <text x="10" y="30" className="trend-text">
        aitrends.live
      </text>
    </svg>
  );
};

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
                <TrendLineSvg />
              </a>
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
