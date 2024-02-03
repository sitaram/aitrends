// utils.js

export const splitChat = (str) => {
  return str.split('\n').filter((line) => line.trim() !== '');
};

// This could be placed in a utility file or directly in your component file
export const flattenTopics = (clusters) => {
  let flatTopics = [];
  clusters.forEach((cluster) => {
    flatTopics = [...flatTopics, ...cluster.topics];
  });
  return flatTopics;
};
