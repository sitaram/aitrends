import React, { useState, useEffect } from 'react';
import { theme } from './theme';

const SwipeTooltip = ({ topicsDrawerOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!topicsDrawerOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false); // Optionally hide after 2 seconds
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [topicsDrawerOpen]);

  if (!visible) return null;

  const tooltipStyle = {
    position: 'fixed',
    bottom: '20%', // Adjust as needed
    width: '320px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.main,
    padding: '16px 16px',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'opacity 0.5s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000, // Ensure it appears above other content
    animation: 'fadeIn 1s',
    // For animation, ensure you define keyframes in a global CSS if needed
  };

  return (
    <div style={tooltipStyle}>
      There is a large grid of topics and tabs. Swipe left/right to switch tabs, or use arrows in the header to switch
      topics while keeping tab constant.
    </div>
  );
};

export default SwipeTooltip;
