import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { theme } from './theme';

const CustomMarkdown = ({ text, topic }) => {
  const createGoogleSearchLink = (keyword) =>
    `https://www.google.com/search?q=${encodeURIComponent(`${topic}: ${keyword}`)}`;

  // A helper function to remove leading numbers from a text
  const removeLeadingNumbers = (text) => {
    return text.replace(/^\d+\.\s+/, ''); // Remove digits followed by a dot and whitespace
  };

  // A helper function to create component definitions with preprocessing
  const createComponent = (Tag, style = {}) => {
    return ({ node, ...props }) => {
      // Process children within the component function scope
      const processedChildren = React.Children.map(props.children, (child) =>
        typeof child === 'string' ? removeLeadingNumbers(child) : child
      );

      return (
        <Tag {...props} style={{ ...style, fontWeight: style.fontWeight || 'normal' }}>
          <a
            href={createGoogleSearchLink(props.children.toString())}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: style.color || 'inherit' }}
          >
            {processedChildren}
          </a>
        </Tag>
      );
    };
  };

  // Use the helper function to define custom components
  const markdownComponents = {
    strong: createComponent('strong', { color: '#0056a3', fontWeight: 'bold' }),
    h1: createComponent('h1', { color: 'red', textDecoration: 'underline' }),
    h2: createComponent('h2', { color: 'green', textDecoration: 'underline' }),
    h3: createComponent('h3', { color: 'tomato', fontWeight: 'bold', borderTop: 1, borderColor: 'divider' }),
    h4: createComponent('h4', { color: 'darkred', fontWeight: 'bold' }),
  };

  return (
    <ReactMarkdown components={markdownComponents} rehypePlugins={[rehypeRaw]}>
      {text}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
CustomMarkdown.displayName = 'CustomMarkdown';
