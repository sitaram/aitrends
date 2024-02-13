import { useTheme } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { tabs } from './tabs';

const CustomMarkdown = ({ text, topic, handleTabChange }) => {
  const theme = useTheme();

  const createGoogleSearchLink = (keyword) =>
    `https://www.google.com/search?q=${encodeURIComponent(`${topic}: ${keyword}`)}`;

  // A helper function to remove leading numbers from a text
  const removeLeadingNumbers = (text) => {
    return text.replace(/^\d+\.\s+/, ''); // Remove digits followed by a dot and whitespace
  };

  // Preprocess the markdown to adjust indented list items
  const preprocessMarkdown = (markdown) => {
    return markdown
      .split('\n')
      .map((line) => {
        // Check if line is indented in a way that causes it to be formatted as a code block
        if (/^\s{4}\-/.test(line)) {
          // Adjust indentation or transform the line as needed
          return line.slice(4); // Removes 4 spaces from the start of the line
        }
        return line;
      })
      .join('\n');
  };

  // Enhanced helper function for component creation with preprocessing and displayName
  const createComponent = (Tag, style = {}) => {
    const Component = ({ node, ...props }) => {
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

    // Assign a displayName to enhance debugging and identification in dev tools
    Component.displayName = `Custom${Tag.charAt(0).toUpperCase() + Tag.slice(1)}`;

    return Component;
  };

  // Custom renderer for list items to replace [[keyword]] with clickable spans
  const listItemComponent = ({ node, ...props }) => {
    // Assuming children is an array of text or inline elements
    const processedChildren = React.Children.map(props.children, (child) => {
      if (typeof child === 'string') {
        // Splitting the string on [[keyword]] patterns and processing each part
        const parts = child.split(/\[\[([^\]]+)\]\]/g);
        return parts.map((part, index) => {
          // Odd indices are keywords, even indices are regular text
          if (index % 2 === 1) {
            // This is a keyword part, return a clickable span
            return [
              <>
                {'['}
                <span
                  key={index}
                  style={{ color: theme.palette.primary.main, textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => {
                    const index = tabs.findIndex((t) => t.name === part);
                    if (index !== -1) handleTabChange(null, index);
                  }}
                >
                  {part}
                </span>
                {']'}
              </>,
            ];
          }
          // This is a regular text part, return it directly
          return part;
        });
      }
      // For non-string children, just return them directly
      return child;
    });

    // Return the processed list item with transformed children
    return <li>{processedChildren}</li>;
  };

  // Use the helper function to define custom components
  const markdownComponents = {
    strong: createComponent('strong', { color: '#0056a3', fontWeight: 'bold' }),
    h1: createComponent('h1', { color: 'red', textDecoration: 'underline' }),
    h2: createComponent('h2', { color: 'green', fontWeight: 'bold', textDecoration: 'underline' }),
    h3: createComponent('h3', { color: 'tomato', fontWeight: 'bold', borderTop: 1, borderColor: 'divider' }),
    h4: createComponent('h4', { color: 'darkred' }),
    li: listItemComponent,
  };

  return (
    <ReactMarkdown components={markdownComponents} rehypePlugins={[rehypeRaw]}>
      {preprocessMarkdown(text)}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
