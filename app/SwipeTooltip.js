import React, { useState, useEffect } from 'react';

const SwipeTooltip = ({ topicsDrawerOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!topicsDrawerOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false); // Optionally hide after 2 seconds
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [topicsDrawerOpen]);

  if (!visible) return null;

  const tooltipStyle = {
    position: 'fixed',
    bottom: '20%', // Adjust as needed
    width: '270px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '16px 16px',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'opacity 0.5s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000, // Ensure it appears above other content
    animation: 'fadeIn 1s',
    // For animation, ensure you define keyframes in a global CSS if needed
  };

  return (
    <div style={tooltipStyle}>
      Swipe left/right to switch between tabs and then topics.
      <br />
      <br />
      Or use arrows on the header to just switch topics.
    </div>
  );
};

export default SwipeTooltip;
