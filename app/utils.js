// utils.js

// This could be placed in a utility file or directly in your component file
export const flattenTopics = (clusters) => {
  let flatTopics = [];
  clusters.forEach((cluster) => {
    flatTopics = [...flatTopics, ...cluster.topics];
  });
  return flatTopics;
};

// Utility function to parse hash parameters
export const parseHashParams = (hash) => {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  return {
    topic: params.get('topic'),
    tab: params.get('tab'),
  };
};

export const splitChat = (str) => {
  const codeBlockRegex = /(```[\s\S]*?```)/g; // Matches fenced code blocks
  const placeholders = [];
  let index = 0;

  // Temporarily replace code blocks with placeholders
  const stringWithPlaceholders = str.replace(codeBlockRegex, (match) => {
    const placeholder = `PLACEHOLDER_${index++}`;
    placeholders.push(match); // Store the actual code block
    return `\n${placeholder}\n`; // Ensure placeholders are on their own lines
  });

  // Split the string by new lines, filtering out empty lines
  const parts = stringWithPlaceholders.split('\n').filter((line) => line.trim() !== '');

  // Restore code blocks in place of placeholders
  const restoredParts = parts.map((part) => {
    if (part.startsWith('PLACEHOLDER_')) {
      const placeholderIndex = parseInt(part.split('_')[1], 10);
      return placeholders[placeholderIndex];
    }
    return part;
  });

  return restoredParts;
};
