import axios from 'axios';

const compromise = require('compromise');
const natural = require('natural');
const KeywordExtractor = require('keyword-extractor');
const sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

export default async function searchAPI(topic) {
  if (!topic) {
    throw new Error('Topic parameter is required.');
  }

  // Define your query templates
  const templates = [
    'News This Week',
    'Latest Updates',
    'Current Trends',
    'Solutions',
    'Recent Research',
    'Innovations',
    'Policy Updates',
    'Case Studies',
    'Upcoming Events',
    'Community News',
    'Conferences and Meetups',
    `in ${new Date().getFullYear()}`,
    'Challenges and Solutions',
  ];

  const queries = templates.map((template) => `${topic} ${template}`);
  console.log('----------------------------------');
  console.log('---- QUERIES -------------');
  console.log(queries);
  console.log('---- END QUERIES ---------');

  // Prepare to fetch data from Google and Bing
  const googleApiKey = process.env.GOOGLE_API_KEY;
  const googleCseId = process.env.GOOGLE_CSE_ID;
  const bingSubscriptionKey = process.env.BING_SUBSCRIPTION_KEY;

  try {
    // Fetch snippets from Google
    const googleSnippets = []; // await fetchSnippetsFromGoogle(queries, googleApiKey, googleCseId);
    // Fetch snippets from Bing
    const bingSnippets = await fetchSnippetsFromBing(queries, bingSubscriptionKey);

    // Combine and process snippets
    // Use NLP libraries as needed to augment data or extract secondary metadata
    let combinedSnippets = [...googleSnippets, ...bingSnippets];
    combinedSnippets = processSnippets(combinedSnippets);

    return combinedSnippets;
  } catch (error) {
    console.error('Error fetching search results:', topic, ':', error);
    throw new Error('Error during search operation: ' + topic + ':' + error);
  }
}

async function fetchSnippetsFromGoogle(queries, apiKey, searchEngineId) {
  const snippets = [];
  for (const query of queries) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
      query
    )}`;
    const response = await axios.get(url);
    const items = response.data.items || [];
    snippets.push(...items.map((item) => `${item.title}: ${item.snippet}`));
  }
  console.log('----------------------------------');
  console.log('---- GOOGLE SNIPPETS -------------');
  console.log(snippets);
  console.log('---- END GOOGLE SNIPPETS ---------');
  return snippets;
}

async function fetchSnippetsFromBing(queries, subscriptionKey) {
  const snippets = [];
  for (const query of queries) {
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url, {
      headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
    });
    const items = response.data.webPages.value || [];
    snippets.push(...items.map((item) => `${item.name}: ${item.snippet}`));
  }
  console.log('----------------------------------');
  console.log('---- BING SNIPPETS ---------------');
  console.log(snippets);
  console.log('---- END BING SNIPPETS -----------');
  return snippets;
}

function processSnippets(snippets) {
  // Deduplicate snippets
  let uniqueSnippets = [...new Set(snippets)];

  // Keyword Extraction and Ranking
  const keywordScores = {};
  uniqueSnippets.forEach((snippet) => {
    const extractionResult = KeywordExtractor.extract(snippet, {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    });
    extractionResult.forEach((keyword) => {
      keywordScores[keyword] = (keywordScores[keyword] || 0) + 1;
    });
  });

  // Sort keywords by frequency
  const sortedKeywords = Object.entries(keywordScores).sort((a, b) => b[1] - a[1]);
  const topKeywords = sortedKeywords.slice(0, 5).map((item) => item[0]); // Take top 5 keywords

  // Enhanced Sentiment Analysis
  uniqueSnippets = uniqueSnippets
    .map((snippet) => {
      const analysisResult = sentimentAnalyzer.getSentiment(snippet.split(' '));
      return { snippet, sentiment: analysisResult };
    })
    .sort((a, b) => b.sentiment - a.sentiment); // Sort snippets by sentiment

  // Named Entity Recognition with Compromise
  const enrichedSnippets = uniqueSnippets.map(({ snippet, sentiment }) => {
    console.log('SNIPPET:', snippet);
    const doc = compromise(snippet);
    console.log('SENTIMENT:', sentiment);
    const people = doc.people().out('array') || [];
    console.log('PEOPLE:', people);
    const places = doc.places().out('array') || [];
    console.log('PLACES:', places);

    return {
      snippet,
      sentiment,
      entities: { people, places },
    };
  });

  // Summarization Based on Entity Richness and Sentiment
  const summarySnippets = enrichedSnippets;
  // .filter(({ entities }) => entities.people.length > 0 || entities.places.length > 0);
  // .slice(0, 10); // Prioritize snippets with entities, then take top 10

  // Construct the final summary text
  const summary = summarySnippets
    .map(({ snippet, sentiment, entities }) => {
      const entityString = `People: ${entities.people.join(', ')}; Places: ${entities.places.join(', ')}`;
      return `${snippet} (Sentiment: ${sentiment.toFixed(2)}) [${entityString}]`;
    })
    .join('\n\n');

  // Add a section about top keywords for context
  const keywordContext = `Top Keywords: ${topKeywords.join(', ')}`;
  const finalSummary = `${keywordContext}\n\n${summary}`;

  return finalSummary;
}
