// pages/api/youtube-search.js

import Redis from 'ioredis';
import * as Constants from '../../app/constants';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  let { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  if (query === Constants.ALLTOPICS) query = Constants.ALLTOPICS_TITLE;

  const cacheKey = `youtube-search:${query}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log('Serving from cache:', query);
    return res.status(200).json(JSON.parse(cachedData));
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=10`;

  try {
    const youtubeResponse = await fetch(url);
    const youtubeData = await youtubeResponse.json();

    if (youtubeData.error) {
      console.error('YouTube API Error:', youtubeData.error);
      return res.status(500).json({ error: 'Failed to fetch YouTube data: ' + query });
    }

    // Cache the successful response for random 2 to 4 months
    const cacheDays = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
    await redis.setex(cacheKey, 86400 * cacheDays, JSON.stringify(youtubeData));
    console.log('Serving fresh data and caching:', query);
    res.status(200).json(youtubeData);
  } catch (error) {
    console.error('Request failed:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube data : ' + query });
  }
}
