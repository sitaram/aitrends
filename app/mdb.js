import React from 'react';
import ReactMarkdown from 'react-markdown';

const BoldMarkdown = ({ text }) => {
  // Function to replace bold markdown with <b> tags
  const replaceBoldMarkdown = (markdownText) => {
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    const sectionRegex = /### \d+\.(.*)/g;
    const bulletRegex = /^ *- (.*)/g;
    return markdownText.replace(boldRegex, '<b>$2</b>').replace(sectionRegex, '<u>$1</u>').replace(bulletRegex, '&emsp;- $1');
  };

  // Replace markdown in the text with HTML
  const htmlContent = replaceBoldMarkdown(text);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default BoldMarkdown;
