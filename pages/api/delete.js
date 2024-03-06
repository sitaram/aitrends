import dotenv from 'dotenv';
import Redis from 'ioredis';
import { prompts, shouldWebSearch, webSearchPrompt } from '../../server/prompts';

dotenv.config(); // Load environment variables from .env file

const redis = new Redis(process.env.REDIS_URL); // Redis connection URL

export default async (req, res) => {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { topic, tab } = req.query;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    if (!tab) return res.status(400).json({ error: 'Tab is required' });

    const prompt = prompts[tab].replace('${topic}', topic) + (shouldWebSearch[tab] ? webSearchPrompt : '');
    console.log('DELETE:', prompt);

    const cacheKey = `prompt:${prompt}`;
    await redis.del(cacheKey);

    return res.status(200).json({ message: 'Deleted from Redis: ' + cacheKey });
  } catch (error) {
    console.error('Error deleting key:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};
