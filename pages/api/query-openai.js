import OpenAI from 'openai';
import dotenv from 'dotenv';
import Redis from 'ioredis';
// Import node-cron if you plan to use it directly in this file, otherwise, the setup could be external
// import cron from 'node-cron';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redis = new Redis(process.env.REDIS_URL); // Redis connection URL

const BASE_TTL = 60 * 60 * 24 * 365 * 10; // 10 years in seconds, as a large TTL value

// Helper function to fetch data from OpenAI and update cache
async function fetchAndUpdate(prompt, cacheKey, ttl) {
  console.log('GPT REQUEST DISABLED:', prompt.substr(0, 50));
  return 'DISABLED';
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-4-turbo-preview',
  });

  const responseData = completion.choices[0]?.message?.content || '';
  console.log('GPT RESPONSE:', responseData.substr(0, 50));
  await redis.setex(cacheKey, ttl + BASE_TTL, responseData); // Set with elevated TTL
  return responseData;
}

export default async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { prompt, payload, ttl, isOverview, isOnline } = req.body;
    console.log('REQUEST:', prompt);

    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const fullPrompt = payload ? `${prompt}: ${payload}` : prompt;
    const cacheKey = `prompt:${prompt}`;
    const cachedResponse = await redis.get(cacheKey);
    const ttlRemaining = await redis.ttl(cacheKey);
    // DEBUG console.log(ttlRemaining, BASE_TTL);

    if (cachedResponse && (isOnline || ttlRemaining > BASE_TTL)) {
      // Schedule a non-blocking refresh if TTL expired
      if (!isOverview && ttlRemaining < BASE_TTL) {
        setImmediate(() => fetchAndUpdate(prompt, cacheKey, ttl));
      }
      return res.status(200).json({ data: cachedResponse });
    }

    // DEBUG console.log('fetchAndUpdate', prompt.substr(0, 30), ttl, ttlRemaining, cachedResponse ? cachedResponse.substr(0, 30) : 0);
    const data =
      isOnline && isOverview ? 'visit /reload to construct overview' : await fetchAndUpdate(fullPrompt, cacheKey, ttl);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
