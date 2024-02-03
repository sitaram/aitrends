// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (prompt, ttl, setContent, setIsLoading, signal) => {
  console.log(prompt);
  try {
    if (setContent) setContent([]);
    const response = await axios({
      method: 'post',
      url: '/api/query-openai',
      data: { prompt: prompt, ttl: ttl },
      signal: signal,
    });
    const data = response.data.data;
    if (setContent) setContent(splitChat(data));
    if (setIsLoading) setIsLoading(false);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching content:', error);
    }
    if (setIsLoading) setIsLoading(false);
  }
};
