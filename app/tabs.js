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
    name: 'Future roadmap',
    prompt:
      'Create a roadmap for the future of ${topic}. Highlight key milestones, developments, and expected impacts over' +
      ' the next few years.',
  },

  { name: 'Divider' }, // --------------------------------------------------------------------------------------------

  {
    name: 'Ecosystem',
    prompt:
      'Generate an overview of the AI ecosystem around ${topic}. Identify the key players, startups, research' +
      ' institutions, and influential figures shaping the AI landscape.',
  },
  {
    name: 'Funding and Investment',
    prompt:
      'Track the funding and investment landscape for AI in ${topic}. Highlight recent funding rounds, notable investors, and trends in venture capital and government funding.',
  },
  {
    name: 'Career Paths',
    prompt:
      'Outline potential career paths and job opportunities in the field of ${topic}. Include the skills required, typical roles, and advice on how to start or advance a career in this area.',
  },
  {
    name: 'Skill Development',
    prompt:
      'Provide resources and guidance for skill development in ${topic}. Include courses, workshops, books, and online resources for beginners to experts.',
  },
  {
    name: 'Community and Events',
    prompt:
      'List upcoming events, conferences, and meetups related to ${topic}. Feature interviews with community leaders and summaries of past events.',
  },

  { name: 'Divider' }, // --------------------------------------------------------------------------------------------

  {
    name: 'Tech Stack',
    prompt:
      'Prompt: Detail the technology stack and tools commonly used in ${topic}, including software, libraries, frameworks, and platforms. Offer insights into choosing the right stack for various projects.',
  },
  {
    name: 'Tech Deep Dive',
    prompt:
      'Delve into the technical aspects of ${topic}, breaking down the algorithms, architectures, and data structures that underpin AI technologies. Provide code snippets, implementation challenges, and optimization strategies.',
  },
  {
    name: 'AI Tools and Platforms',
    prompt:
      'Review AI tools and platforms that support development in ${topic}. Compare features, usability, and performance across different solutions.',
  },

  { name: 'Divider' }, // --------------------------------------------------------------------------------------------

  {
    name: 'Expert opinions',
    prompt:
      'Summarize expert opinions on the recent advancements in ${topic}, including any debates or controversies, from' +
      ' the last year, boosting recent opinions.',
  },
  {
    name: 'Expert Q&A',
    prompt:
      'Host a Q&A session with an AI expert in ${topic}. Allow users to submit questions in advance, and provide' +
      ' detailed responses with insights and recommendations.',
  },
  {
    name: 'Policy and Regulation',
    prompt:
      'Explore how policy and regulation impact the development and deployment of AI in ${topic}. Analyze current legislation, potential regulatory changes, and the implications for privacy, security, and innovation.',
  },
  {
    name: 'Ethics',
    prompt:
      'Evaluate the ethical considerations of AI implementations of ${topic}. Provide a scorecard with ratings and' +
      ' explanations, addressing transparency, fairness, and privacy.',
  },
  {
    name: 'Challenges and Solutions',
    prompt:
      'Discuss common and emerging challenges in ${topic} and present solutions. Include technical hurdles, ethical dilemmas, and real-world case solutions.',
  },
  {
    name: 'Global Perspectives',
    prompt:
      'Provide insights into how different regions of the world are approaching AI in ${topic}. Compare and contrast the strategies, investments, and innovations globally.',
  },

  { name: 'Divider' }, // --------------------------------------------------------------------------------------------

  {
    name: 'Comparisons',
    prompt:
      'Compare ${topic} against closely related topics within the last year, highlighting key differences and potential' +
      ' synergies.',
  },
  {
    name: 'Applications',
    prompt:
      'Generate AI use case scenarios tailored to ${topic} based on specific challenges. Include potential benefits,' +
      ' considerations, and implementation tips.',
  },
  {
    name: 'Case Studies',
    prompt:
      'Provide a list of notable case studies related to ${topic} in the last year. Include details on the challenges,' +
      ' solutions, and outcomes for each case study.',
  },
  {
    name: 'Innovative Use Cases',
    prompt:
      'Showcase innovative and unconventional use cases of AI in ${topic}. Highlight novel applications, experimental projects, and creative integrations.',
  },
  {
    name: 'Impact',
    prompt: 'Analyze the impact of recent advancements in ${topic} in the last year.',
  },
];
