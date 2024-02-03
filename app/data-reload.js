'use client';

import axios from 'axios';
import { topics } from './topics';
import { tabs } from './tabs';
import { fetchContent } from './api';
import * as Constants from './constants';

const DataReload = async (onSuccess, onError) => {
  try {
    const fetch = async (topic, tab) => {
      try {
        const prompt = tab.prompt.replace('${topic}', topic);
        const ttl = tab.ttl || 90 * 86400;
        console.log(topic, prompt);
        await fetchContent(
          prompt,
          ttl,
          (content) => {
            document.write(`"${topic}" > "${tab.name}": `, content[0], ` ...<br>`);
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

    tabs.forEach((tab) => {
      fetch(Constants.ALLTOPICS, tab);
    });

    // Iterating through clusters to fetch data for each topic within each tab
    for (const cluster of topics.clusters) {
      for (const topic of cluster.topics) {
        for (const tab of tabs) {
          fetch(topic, tab);
        }
      }
    }

    onSuccess(); // Call this when fetching is successfully completed
  } catch (error) {
    onError(error.message); // Pass error message to the onError callback
  }
};

export default DataReload;
