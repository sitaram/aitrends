import React, { useState } from 'react';
import { Paper, Box, useMediaQuery } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import CustomMarkdown from './CustomMarkdown';
import { useSwipeable } from 'react-swipeable';
import SwipeTooltip from './SwipeTooltip'; // Assuming SwipeTooltip is correctly imported

const ContentComponent = ({ theme, isLoading, content, handleSwitchTopic }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [feedback, setFeedback] = useState(''); // 'Next', 'Previous', or ''

  const handleSwipe = (eventData) => {
    const deltaX = eventData.deltaX;
    const deltaY = eventData.deltaY;
    if (deltaY < 50 && deltaY > -50) {
      if (deltaX > 100) {
        setFeedback('Previous');
        handleSwitchTopic('Previous');
      } else if (deltaX < -100) {
        setFeedback('Next');
        handleSwitchTopic('Next');
      }
    }
    setTimeout(() => setFeedback(''), 500); // Reset feedback after 500ms
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...(isMobile ? handlers : {})} style={{ paddingBottom: '64px' }}>
      {isMobile && <SwipeTooltip />}
      {feedback && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: feedback === 'Previous' ? '0' : 'auto',
            right: feedback === 'Next' ? '0' : 'auto',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '1rem',
            transition: 'opacity 0.5s ease',
            opacity: feedback ? 1 : 0,
          }}
        >
          {feedback} topic
        </Box>
      )}
      {isLoading ? (
        <div className="centered">
          <ThreeDots color="#3a506b" />
        </div>
      ) : (
        content.map((part, index) => (
          <Paper key={index} elevation={2} sx={{ padding: '1rem', marginBottom: '.5rem' }}>
            <CustomMarkdown text={part} />
          </Paper>
        ))
      )}
    </div>
  );
};

export default ContentComponent;
