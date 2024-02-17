// api.js
import axios from 'axios';
import { splitChat } from './utils';

export const fetchContent = async (topic, tab, payload, isOverview, isOnline, setContent, signal) => {
  console.log('fetchContent:', topic, '/', tab);
  const request = { topic: topic, tab: tab, payload: payload, isOverview: isOverview, isOnline: isOnline };
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
  return data;
};
