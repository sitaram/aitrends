import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

// Global variable to track if the tooltip has been shown
let hasBeenShown = false;

const Tooltip = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show tooltip only once per page load
    if (!hasBeenShown) {
      setVisible(true);
      hasBeenShown = true; // Set the flag to true after showing
    }
  });

  if (!visible) return null;

  const tooltipStyle = {
    position: 'fixed',
    bottom: '20%', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
    width: isMobile ? '85%' : 'initial',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.main,
    padding: '16px 16px',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'opacity 0.5s ease',
    boxShadow: '4px 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000, // Ensure it appears above other content
    animation: 'fadeIn 1s',
    // For animation, ensure you define keyframes in a global CSS if needed
  };

  // Function to handle OK click
  const handleOkClick = () => {
    setVisible(false);
  };

  return (
    <a href="#" onClick={handleOkClick}>
      <div style={tooltipStyle}>
        <span style={{ fontWeight: 'bold', color: 'green' }}>AI Trends</span> is a dynamic and interactive newsletter
        that helps you learn about many aspects of many AI topics and keep up with latest trends.
        <br />
        <br />
        Picture a large grid of AI topics and tabs:
        <br />
        <br />
        {isMobile ? (
          <>
            - Swipe the content left/right to navigate between tabs, or swipe the tab bar to see them.
            <br />
            <br />- Tap on arrows in the header to switch topics keeping the tab constant, or see all topics with the
            floating button below.
          </>
        ) : (
          <>
            - Use the tab bar to explore all the tabs.
            <br />
            <br />- Use arrows in the header to switch topics while keeping tab constant, or see all topics on the left.
          </>
        )}
        <br />
        <div style={{ float: 'right', fontWeight: 'bold', textDecoration: 'underline', color: 'darkgreen' }}>OK</div>
      </div>
    </a>
  );

  return (
    <div style={tooltipStyle}>
      This is a large grid of topics and tabs.
      <br />
      <br />
      Swipe left/right to switch tabs.
      <br />
      <br />
      or use arrows in the header to switch topics while keeping tab constant.
    </div>
  );
};

export default Tooltip;
