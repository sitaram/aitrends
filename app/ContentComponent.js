// ContentComponent.js
import React from 'react';
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
          <div key={index} className="message">
            <CustomMarkdown text={part} />
          </div>
        ))
      )}
    </div>
  );
};

export default ContentComponent;

