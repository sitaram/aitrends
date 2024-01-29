// ContentComponent.js
import React from 'react';
import { Paper } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import CustomMarkdown from './CustomMarkdown'; // Assuming you have this component

const ContentComponent = ({ isLoading, content }) => {
  const contentArray = Array.isArray(content) ? content : [];
  return (
    <div>
      {isLoading ? (
        <div className="centered">
          <ThreeDots color="#3a506b" />
        </div>
      ) : (
        contentArray.map((part, index) => (
	  <Paper key={index} elevation={1} sx={{ padding: '1rem', marginBottom: '.5rem' }}>
            <CustomMarkdown text={part} />
          </Paper>
        ))
      )}
    </div>
  );
};

export default ContentComponent;

