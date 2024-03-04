// pages/api/youtube-search.js

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const API_KEY = process.env.YOUTUBE_API_KEY; // Ensure you have YOUTUBE_API_KEY in your .env.local
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=10`;

  try {
    const youtubeResponse = await fetch(url);
    const youtubeData = await youtubeResponse.json();
    res.status(200).json(youtubeData);
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}
