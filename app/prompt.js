// prompt.js

const generateQueryPrompt = (timeframe, topic) => {
  return `What are recent advances in the ${timeframe} in ${topic}? Research as necessary to get this list. In your reply, be explicit about the time window you're talking about.`;
};

export default generateQueryPrompt;
