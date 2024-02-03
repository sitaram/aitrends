export const tabs = [
  {
    name: 'News',
    prompt:
      'Compile the latest news articles and reports related to ${topic} in the last two weeks. Provide insights on' +
      ' emerging trends, breakthroughs, and notable events.',
    ttl: 2 * 86400,
  },
  {
    name: 'Recap',
    prompt:
      'Provide an overview of significant developments and trends in ${topic} over the last year. Include key' +
      ' achievements, research findings, and evolving applications.',
  },
  {
    name: 'Evolution',
    prompt:
      'Provide a detailed overview of the evolutionary journey of ${topic} over the last decade. Explore historical' +
      ' insights, key milestones, advancements, and significant changes that have shaped its development.',
  },
  {
    name: 'Impact',
    prompt: 'Analyze the impact of recent advancements in ${topic} in the last year.',
  },
  {
    name: 'Comparisons',
    prompt:
      'Compare ${topic} against closely related topics within the last year, highlighting key differences and potential' +
      ' synergies.',
  },
  {
    name: 'Case Studies',
    prompt:
      'Provide a list of notable case studies related to ${topic} in the last year. Include details on the challenges,' +
      ' solutions, and outcomes for each case study.',
  },
  {
    name: 'Future roadmap',
    prompt:
      'Create a roadmap for the future of ${topic}. Highlight key milestones, developments, and expected impacts over' +
      ' the next few years.',
  },
  {
    name: 'Expert opinions',
    prompt:
      'Summarize expert opinions on the recent advancements in ${topic}, including any debates or controversies, from' +
      ' the last year, boosting recent opinions.',
  },
  {
    name: 'Ecosystem',
    prompt:
      'Generate an overview of the AI ecosystem around ${topic}. Identify the key players, startups, research' +
      ' institutions, and influential figures shaping the AI landscape.',
  },
  {
    name: 'Expert Q&A',
    prompt:
      'Host a Q&A session with an AI expert in ${topic}. Allow users to submit questions in advance, and provide' +
      ' detailed responses with insights and recommendations.',
  },
  {
    name: 'Ethics',
    prompt:
      'Evaluate the ethical considerations of AI implementations of ${topic}. Provide a scorecard with ratings and' +
      ' explanations, addressing transparency, fairness, and privacy.',
  },
  {
    name: 'Use Cases',
    prompt:
      'Generate AI use case scenarios tailored to ${topic} based on specific challenges. Include potential benefits,' +
      ' considerations, and implementation tips.',
  },
];

export const tabmap = {
  Topic: [
    'Core Machine Learning',
    'Emerging AI Technologies',
    'AI in Industries',
    'Ethical AI',
    'AI User Interaction',
    'Data Science',
    'AI Content Creation',
    'Environmental Impact of AI',
    'AI Research',
    'AI Infrastructure',
  ],
  'Impact Analysis': ['Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes'],
  'Future Predictions': ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
  'Comparative Insights': ['Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes'],
  'Historical Context': ['Yes', 'No', 'Yes', 'Yes', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes'],
  'Expert Opinions': ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
  'Case Studies': ['Yes', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes'],
  'Ethical Considerations': ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
  'Technical Breakdowns': ['Yes', 'Yes', 'No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes'],
};
