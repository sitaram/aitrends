import OpenAI from 'openai';
import dotenv from 'dotenv';
import Redis from 'ioredis';
// Import node-cron if you plan to use it directly in this file, otherwise, the setup could be external
// import cron from 'node-cron';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redis = new Redis(process.env.REDIS_URL); // Redis connection URL

// Helper function to fetch data from OpenAI and update cache
async function fetchAndUpdate(prompt, cacheKey, ttl) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-4-turbo-preview',
  });

  const responseData = completion.choices[0]?.message?.content || '';
  await redis.setex(cacheKey, ttl, responseData); // Save to Redis with TTL
}

const refreshThresholdInSeconds = 60 * 60 * 24; // refresh if about to expire in one day

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, ttl } = req.body;
    // console.log('PROMPT:', prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const cacheKey = `prompt:${prompt}`;
    const cachedResponse = await redis.get(cacheKey);

    // Check TTL of the cached response
    const ttlRemaining = await redis.ttl(cacheKey);

    if (cachedResponse) {
      // Schedule a non-blocking refresh if TTL is within the defined threshold
      if (ttlRemaining <= refreshThresholdInSeconds) {
        setImmediate(() => fetchAndUpdate(prompt, cacheKey, ttl));
      }
      return res.status(200).json({ data: cachedResponse });
    } else {
      // If not cached, fetch, cache, and return the response
      await fetchAndUpdate(prompt, cacheKey, ttl);
      const newCachedResponse = await redis.get(cacheKey);
      return res.status(200).json({ data: newCachedResponse });
    }
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
