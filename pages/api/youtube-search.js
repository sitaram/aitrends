// pages/api/youtube-search.js

import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const cacheKey = `youtube-search:${query}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log('Serving from cache');
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
      return res.status(500).json({ error: 'Failed to fetch YouTube data' });
    }

    // Cache the successful response for 3 months
    await redis.setex(cacheKey, 86400 * 90, JSON.stringify(youtubeData));
    console.log('Serving fresh data and caching');
    res.status(200).json(youtubeData);
  } catch (error) {
    console.error('Request failed:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}
