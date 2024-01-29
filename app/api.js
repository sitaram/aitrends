// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (queryPrompt, cache_salt, setContent, setIsLoading, signal) => {
  const cacheKey = `openai:${cache_salt}:${queryPrompt}`;
  const cache = JSON.parse(localStorage.getItem(cacheKey));
  if (cache) {
    setContent(splitChat(cache));
    setIsLoading(false);
    return; // Assuming setIsLoading(false) is handled outside if cached data is used.
  }

  try {
    setContent([]);
    const response = await axios({
      method: 'post',
      url: '/api/query-openai',
      data: { prompt: queryPrompt },
      signal: signal // Correctly using just the signal here.
    });
    const data = response.data.data;
    localStorage.setItem(cacheKey, JSON.stringify(data));
    setContent(splitChat(data));
    setIsLoading(false);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching content:', error);
    }
    setIsLoading(false);
  }
};

