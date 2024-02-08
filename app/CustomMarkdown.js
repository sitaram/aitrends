import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const CustomMarkdown = ({ text, topic }) => {
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
      {preprocessMarkdown(text)}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
