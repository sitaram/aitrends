import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const About = ({ setShowAbout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tooltipStyle = {
    position: 'fixed',
    bottom: '3%',
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
    zIndex: 2000, // Ensure it appears above other content
    animation: 'fadeIn 1s',
    // For animation, ensure you define keyframes in a global CSS if needed
  };

  // Function to handle OK click
  const handleOkClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowAbout(false);
  };

  return (
    <a href="#" onClick={handleOkClick}>
      <div style={tooltipStyle}>
        <span style={{ fontWeight: 'bold', color: 'green' }}>AI Trends</span> is a dynamic and interactive newsletter
        that helps you learn about many aspects of a wide range of AI topics, and keep up with the firehose of AI
        advances.
        <br />
        <br />
        Picture a large grid of AI topics and tabs:
        <br />
        {isMobile ? (
          <>
            &emsp;- Swipe the content left/right to switch tabs, or swipe the tab bar to see them.
            <br />
            &emsp;- Tap on arrows in the header to switch topics keeping the tab constant, or see all topics with the
            floating button below.
          </>
        ) : (
          <>
            &emsp;- Use the tab bar to explore all the tabs.
            <br />
            &emsp;- Use arrows in the header to switch topics while keeping tab constant, or see all topics on the left.
          </>
        )}
        <br />
        <br />
        Written by Sitaram Iyer, sitaram dot gmail. Techniques used:
        <br />
        &emsp;- GPT-4 with Redis cache
        <br />
        &emsp;- Bing API for freshness
        <br />
        &emsp;- Recursive summarization
        <br />
        &emsp;- Meta-prompting
        <br />
        &emsp;- AI-generated trending AI topics
        <br />
        &emsp;- AI-generated tabs concept and ideas
        <br />
        &emsp;- AI-generated high-quality prompts
        <br />
        &emsp;- AI-designed UI and concept mocks
        <br />
        &emsp;- AI-written code
        <br />
        <br />
        <img src="concept1.webp" style={{ height: '100px', display: 'inline-block' }} />
        <img src="concept2.webp" style={{ height: '100px', display: 'inline-block' }} />
        <br />
        <div style={{ float: 'right', fontWeight: 'bold', textDecoration: 'underline', color: 'darkgreen' }}>OK</div>
      </div>
    </a>
  );
};

export default About;
