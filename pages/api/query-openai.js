import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;
    console.log('PROMPT:', prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      // model: 'gpt-3.5-turbo',
      model: 'gpt-4-turbo-preview',
    });

      // max_tokens: 100, // Adjust as needed

    res.status(200).json({ data: completion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

