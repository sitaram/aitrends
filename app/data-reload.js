'use client';

import axios from 'axios';
import { timeframes } from './timeframes'; // Import timeframes array
import { topics } from './topics'; // Import topics object
import { calculateTTL } from './utils';
import { fetchContent } from './api'; // Import the fetchContent function
import generateQueryPrompt from './prompt'; // Import the generateQueryPrompt function
import * as Constants from './constants';

const DataReload = async (onSuccess, onError) => {
  try {
    const fetch = async (topic, timeframe) => {
      try {
        const queryPrompt = generateQueryPrompt(timeframe, topic);
        await fetchContent(
          queryPrompt,
          calculateTTL(timeframe), // Make sure calculateTTL is defined
          (content) => {
            // Handle the fetched content here
            document.write(`"${timeframe}" in "${topic}":`, content);
            document.write(`<br><br>`);
          },
          (isLoading) => {
            // Handle loading state if needed
          },
          new AbortController().signal // You can pass a signal if required
        );
      } catch (error) {
        if (axios.isCancel(error)) {
          document.write('Request was cancelled');
        } else {
          document.write('An error occurred:', error);
        }
      }
    };

    for (const timeframeUC of timeframes) {
      fetch(Constants.ALLTOPICS, timeframeUC.toLowerCase());
    }
    for (const cluster of topics.clusters) {
      for (const topic of cluster.topics) {
        for (const timeframeUC of timeframes) {
          fetch(topic, timeframeUC.toLowerCase());
        }
      }
    }
    // Your fetch logic here
    onSuccess(); // Call this when fetching is successfully completed
  } catch (error) {
    onError(error.message); // Pass error message to the onError callback
  }
};

export default DataReload;

// Call the function to start fetching data
if (typeof window !== 'undefined') {
  window.DataReload = DataReload;
}
