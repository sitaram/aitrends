import React, { useState, useEffect } from 'react';
import { Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import CustomMarkdown from './CustomMarkdown';
import { useSwipeable } from 'react-swipeable';

const ContentComponent = ({ topic, isLoading, content, handleSwitchTab }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [feedback, setFeedback] = useState(''); // 'Next', 'Previous', or ''

  const handleSwipe = (eventData) => {
    const deltaX = eventData.deltaX;
    const deltaY = eventData.deltaY;
    if (deltaY < 50 && deltaY > -50) {
      if (deltaX > 100) {
        setFeedback('Previous');
        handleSwitchTab('Previous');
      } else if (deltaX < -100) {
        setFeedback('Next');
        handleSwitchTab('Next');
      }
    }
    const timeoutId = setTimeout(() => setFeedback(''), 500);
    return () => clearTimeout(timeoutId); // Cleanup timeout
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...(isMobile ? handlers : {})} style={{ paddingBottom: '64px' }}>
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
          {feedback} Tab
        </Box>
      )}
      {isLoading ? (
        <div className="centered">
          <ThreeDots color="#3a506b" />
        </div>
      ) : (
        content.map((part, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{ padding: '10px 16px', marginBottom: '0', borderBottom: 0, borderColor: 'divider', borderRadius: 0 }}
          >
            <CustomMarkdown text={part} topic={topic} />
          </Paper>
        ))
      )}
    </div>
  );
};

export default ContentComponent;
