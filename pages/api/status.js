// pages/api/status.js
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { prompts, shouldWebSearch, webSearchPrompt } from '../../server/prompts';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL);

const BASE_TTL = 60 * 60 * 24 * 365 * 10; // 10 years in seconds, as a large TTL value

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topics, tabs } = req.body;

  try {
    const status = {};

    for (const topic of topics) {
      if (!status[topic]) {
        status[topic] = {}; // Ensure each topic object is initialized before setting its tabs
      }

      // Generate all promises for the tabs of the current topic
      const tabPromises = tabs.map(async (tab) => {
        const prompt = prompts[tab].replace('${topic}', topic) + (shouldWebSearch[tab] ? webSearchPrompt : '');
        const cacheKey = `prompt:${prompt}`;

        // Fetching both the value and TTL in parallel for each tab
        const valuePromise = redis.get(cacheKey);
        const ttlPromise = redis.ttl(cacheKey);

        // Use Promise.all to wait for both the value and the TTL
        const [value, ttlRemaining] = await Promise.all([valuePromise, ttlPromise]);

        if (value !== null) {
          // Redis returns null for keys that do not exist
          let statusValue = 'missing'; // Default status
          if (ttlRemaining === -2) {
            // Key does not exist (should not happen since value is not null, included for completeness)
            statusValue = 'missing';
          } else if (ttlRemaining === -1 || ttlRemaining > BASE_TTL) {
            // TTL of -1 indicates that the key has no expiration, or remaining TTL is greater than BASE_TTL
            statusValue = 'fresh';
          } else {
            // TTL is less than BASE_TTL, indicating the data is near expiration or considered stale
            statusValue = 'expired';
          }
          return { tab, status: statusValue };
        } else {
          // Value is null, indicating the key does not exist
          return { tab, status: 'missing' };
        }
      });

      // Wait for all tab status promises to resolve
      const resolvedTabs = await Promise.all(tabPromises);

      // Update the status object with the results
      resolvedTabs.forEach(({ tab, status: tabStatus }) => {
        status[topic][tab] = tabStatus;
      });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error('Error fetching status from Redis:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
