// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (queryPrompt, ttl, setContent, setIsLoading, signal) => {
  try {
    setContent([]);
    const response = await axios({
      method: 'post',
      url: '/api/query-openai',
      data: { prompt: queryPrompt, ttl: ttl },
      signal: signal // Correctly using just the signal here.
    });
    const data = response.data.data;
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

