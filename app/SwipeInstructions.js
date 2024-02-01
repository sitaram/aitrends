import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeInstructions = () => {
  const [hasSwiped, setHasSwiped] = useState(false);

  // Example useSwipeable hook usage
  const handlers = useSwipeable({
    onSwiped: () => {
      setHasSwiped(true); // Hide instructions after the first swipe
    },
  });

  useEffect(() => {
    // Optionally hide instructions after a delay or based on user interaction
    const timer = setTimeout(() => setHasSwiped(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (hasSwiped) return null;
  
  const tooltipStyle = {
    position: 'fixed',
    bottom: '20%', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(97, 97, 97, 0.9)', // Tooltip-like background color
    color: '#fff', // Text color
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000, // Ensure it appears above other content
    animation: 'fadeIn 1s',
    // For animation, ensure you define keyframes in a global CSS if needed
  };

  return (
    <div {...handlers} style={tooltipStyle}>
      Swipe left/right for previous/next topic
    </div>
  );
};

export default SwipeInstructions;
