// ContentComponent.js
import React from 'react';
import { Paper } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import CustomMarkdown from './CustomMarkdown';

const ContentComponent = ({ isLoading, content }) => {
  const contentArray = Array.isArray(content) ? content : [];
  return (
    <div style={{ paddingBottom: '64px', }}>
      {isLoading ? (
        <div className="centered">
          <ThreeDots color="#3a506b" />
        </div>
      ) : (
        <div style={{ }}>
          {contentArray.map((part, index) => (
            <Paper key={index} elevation={1} sx={{ padding: '1rem', marginBottom: '.5rem' }}>
              <CustomMarkdown text={part} />
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentComponent;

