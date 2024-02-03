import React from 'react';
import ReactMarkdown from 'react-markdown';

const CustomMarkdown = ({ text, topic }) => {
  // Function to replace bold markdown with <b> tags and link with hover effect
  const replaceBoldMarkdown = (markdownText) => {
    const boldRegex = /(\*\*?|__)(.*?)\1/g;
    const sectionRegex = /#+ (\d+\.)?(.*)/g;
    const bulletRegex = /^ *- (.*)/g;
    return (markdownText || '')
      .replace(
        boldRegex,
        (match, p1, p2) =>
          `<b><a class="custom-link" href="https://www.google.com/search?q=${encodeURIComponent(
            topic + ': ' + p2
          )}" target="_blank">${p2}</a></b>`
      )
      .replace(
        sectionRegex,
        (match, p1, p2) =>
          `<b><a class="custom-link" href="https://www.google.com/search?q=${encodeURIComponent(
            topic + ': ' + p2
          )}" target="_blank">${p2}</a></b>`
      )
      .replace(bulletRegex, '&emsp;- $1');
  };

  const htmlContent = replaceBoldMarkdown(text);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default CustomMarkdown;
