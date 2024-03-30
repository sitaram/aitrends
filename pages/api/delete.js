// pages/api/delete.js
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { prompts, shouldWebSearch, webSearchPrompt } from '../../server/prompts';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, tab } = req.query;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    if (!tab) return res.status(400).json({ error: 'Tab is required' });

    const prompt = prompts[tab].replace('${topic}', topic) + (shouldWebSearch[tab] ? webSearchPrompt : '');
    console.log('DELETE:', prompt);

    const cacheKey = `prompt:${prompt}`;
    await redis.del(cacheKey);

    res.status(200).json({ message: `Deleted from Redis: ${cacheKey}` });
  } catch (error) {
    console.error('Error deleting key:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
