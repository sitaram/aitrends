import OpenAI from 'openai';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import { prompts, ttls, shouldWebSearch, webSearchPrompt } from '../../server/prompts';
import searchAPI from '../../server/search-api';
import * as Constants from '../../app/constants';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redis = new Redis(process.env.REDIS_URL); // Redis connection URL

const BASE_TTL = 60 * 60 * 24 * 365 * 10; // 10 years in seconds, as a large TTL value

// Helper function to fetch data from OpenAI and update cache
async function fetchAndUpdate(prompt, cacheKey, ttl) {
  console.log('------------------------------- GPT REQUEST:', prompt.substr(0, 50));
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-4-turbo-preview',
  });

  const responseData = completion.choices[0]?.message?.content || '';
  console.log('------------------------------- GPT RESPONSE:', responseData.substr(0, 50));
  await redis.setex(cacheKey, ttl + BASE_TTL, responseData); // Set with elevated TTL
  return responseData;
}

export default async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { topic, tab, payload, isOverview, isOnline } = req.body;

    const prompt = prompts[tab].replace('${topic}', topic) + (shouldWebSearch[tab] ? webSearchPrompt : '');
    const ttl = ttls[tab] || 90 * 86400;
    console.log('REQUEST:', prompt.substr(0, 100));

    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const cacheKey = `prompt:${prompt}`;
    const cachedResponse = await redis.get(cacheKey);
    const ttlRemaining = await redis.ttl(cacheKey);
    // DEBUG console.log(ttlRemaining, BASE_TTL);

    if (cachedResponse && (isOnline || ttlRemaining > BASE_TTL)) {
      // Schedule a non-blocking refresh if TTL expired
      if (!isOverview && ttlRemaining < BASE_TTL) {
        console.log('Issuing non-blocking refresh since TTL expired:', topic, tab);
        setImmediate(() => fetchAndUpdate(prompt, cacheKey, ttl));
      }
      console.log('Serving query response from cache:', topic, tab);
      return res.status(200).json({ data: cachedResponse });
    }

    console.log('Computing query response:', topic, tab, 'shouldWebSearch=', shouldWebSearch);

    let finalPayload = shouldWebSearch[tab]
      ? await searchAPI(topic == Constants.ALLTOPICS ? Constants.ALLTOPICS_TITLE : topic)
      : payload;

    console.log(
      'query-openai',
      prompt.substr(0, 30),
      ttl,
      ttlRemaining,
      'payload:',
      finalPayload ? finalPayload.length : 0
    );
    const fullPrompt = finalPayload ? `${prompt}: ${finalPayload}` : prompt;
    const data =
      isOnline && isOverview
        ? 'Recursive summarization not available online'
        : await fetchAndUpdate(fullPrompt, cacheKey, ttl);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};
