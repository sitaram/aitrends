import axios from 'axios';
import { timeframes } from './timeframes'; // Import timeframes array
import { topics } from './topics'; // Import topics object
import { fetchContent } from './api'; // Import the fetchContent function
import generateQueryPrompt from './prompt'; // Import the generateQueryPrompt function

const fetchAll = async () => {
  try {
    for (const timeframe of timeframes) {
      for (const cluster of topics.clusters) {
        for (const topic of cluster.topics) {
          const queryPrompt = generateQueryPrompt(timeframe, topic);

          await fetchContent(
            queryPrompt,
            calculateTTL(timeframe), // Make sure calculateTTL is defined
            (content) => {
              // Handle the fetched content here
              console.log(`Data for "${timeframe}" in "${topic}":`, content);
            },
            (isLoading) => {
              // Handle loading state if needed
            },
            new AbortController().signal // You can pass a signal if required
          );
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to start fetching data
window.fetchAll = fetchAll;
