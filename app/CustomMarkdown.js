import React from 'react';
import ReactMarkdown from 'react-markdown';

const CustomMarkdown = ({ text }) => {
  // Function to replace bold markdown with <b> tags
  const replaceBoldMarkdown = (markdownText) => {
    const boldRegex = /(\*\*?|__)(.*?)\1/g;
    const sectionRegex = /#+ (\d+\.)?(.*)/g;
    const bulletRegex = /^ *- (.*)/g;
    return (markdownText || '')
      .replace(
        boldRegex,
        (match, p1, p2) =>
          `<b><a href="https://www.google.com/search?q=${encodeURIComponent(p2)}" target="_blank">${p2}</a></b>`
      )
      .replace(
        sectionRegex,
        (match, p1, p2) =>
          `<u><b><a href="https://www.google.com/search?q=${encodeURIComponent(p2)}" target="_blank">${p2}</a></b></u>`
      )
      .replace(bulletRegex, '&emsp;- $1');
  };

  // Replace markdown in the text with HTML
  const htmlContent = replaceBoldMarkdown(text);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default CustomMarkdown;
