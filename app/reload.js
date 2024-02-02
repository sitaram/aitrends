'use client';

import axios from 'axios';
import { timeframes } from './timeframes'; // Import timeframes array
import { topics } from './topics'; // Import topics object
import { calculateTTL } from './utils';
import { fetchContent } from './api'; // Import the fetchContent function
import generateQueryPrompt from './prompt'; // Import the generateQueryPrompt function
import * as Constants from './constants';

// Update the call in the global window object if necessary
if (typeof window !== 'undefined') {
  window.Reload = Reload;
}

const Reload = async () => {
  const fetch = async (topic, timeframe) => {
    try {
      const queryPrompt = generateQueryPrompt(timeframe, topic);
      await fetchContent(
        queryPrompt,
        calculateTTL(timeframe), // Make sure calculateTTL is defined
        (content) => {
          // Handle the fetched content here
          console.log(`"${timeframe}" in "${topic}":`, content);
        },
        (isLoading) => {
          // Handle loading state if needed
        },
        new AbortController().signal // You can pass a signal if required
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was cancelled');
      } else {
        console.error('An error occurred:', error);
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
};

export default Reload;

// Call the function to start fetching data
if (typeof window !== 'undefined') {
  window.Reload = Reload;
}