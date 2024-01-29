// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (queryPrompt, cache_salt, setIsLoading, setContent) => {
  const cacheKey = `openai:${cache_salt}:${queryPrompt}`;
  const cache = localStorage.getItem(cacheKey);
  if (cache) {
    setContent(splitChat(cache));
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post('/api/query-openai', { prompt: queryPrompt });
    const chatMessage = response.data.data;
    localStorage.setItem(cacheKey, chatMessage);
    setContent(splitChat(chatMessage));
  } catch (error) {
    console.error('Error fetching content:', error);
  } finally {
    setIsLoading(false);
  }
};

