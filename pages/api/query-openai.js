import OpenAI from 'openai';
import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redis = new Redis(process.env.REDIS_URL); // Redis connection URL

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, ttl } = req.body;
    console.log('PROMPT:', prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Attempt to retrieve the response from Redis cache
    const cacheKey = `prompt:${prompt}`;
    const cachedResponse = await redis.get(cacheKey);
    if (cachedResponse) {
      return res.status(200).json({ data: cachedResponse });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: 'gpt-4-turbo-preview',
    });

    const responseData = completion.choices[0]?.message?.content || '';
    
    // Save the new response to Redis cache with an expiration time
    await redis.setex(cacheKey, ttl, responseData); // Expires in the timeframe period

    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
