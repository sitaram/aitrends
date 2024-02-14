// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (prompt, payload, ttl, isOverview, isOnline, setContent, setIsLoading, signal) => {
  console.log(prompt);
  const request = { prompt: prompt, payload: payload, ttl: ttl, isOverview: isOverview, isOnline: isOnline };
  try {
    if (setContent) setContent([]);
    const response = await axios({
      method: 'post',
      url: '/api/query-openai',
      data: request,
      signal: signal,
    });
    const data = response.data.data;
    const content = splitChat(data);
    if (setContent) setContent(content);
    if (setIsLoading) setIsLoading(false);
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching content:', error);
    }
    if (setIsLoading) setIsLoading(false);
  }
};
