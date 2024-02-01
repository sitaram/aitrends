// ContentComponent.js
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import CustomMarkdown from './CustomMarkdown';
import { Tooltip } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import SwipeTooltip from './SwipeTooltip'; // Ensure you import SwipeTooltip

const ContentComponent = ({ isLoading, content, onSwipeLeft, onSwipeRight }) => {
  const [hasSwiped, setHasSwiped] = useState(false);
  const contentArray = Array.isArray(content) ? content : [];

  // useSwipeable hook to handle swipe actions
  const handlers = useSwipeable({
    onSwiped: () => setHasSwiped(true), // Update to indicate a swipe has occurred
    onSwipedLeft: () => onSwipeLeft(),
    onSwipedRight: () => onSwipeRight(),
    preventDefaultTouchmoveEvent: true, // Optional: to prevent scrolling while swiping
    trackMouse: true // Optional: allows swipe with mouse on desktop
  });

  return (
    <div {...handlers} style={{ paddingBottom: '64px', }}>
      <SwipeTooltip /> {/* Place the SwipeTooltip component */}
      {isLoading ? (
        <div className="centered">
          <ThreeDots color="#3a506b" />
        </div>
      ) : (
        <div>
          {contentArray.map((part, index) => (
            <Paper key={index} elevation={2} sx={{ padding: '1rem', marginBottom: '.5rem' }}>
              <CustomMarkdown text={part} />
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentComponent;
