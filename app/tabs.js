export const tabs = [
  {
    name: 'Overview',
    prompt:
      "Below, you will find content from many different tabs, each providing unique insights on the same topic: ${topic}. Your task: Create a compelling narrative that weaves together the most engaging, interesting, insightful, informative, unique compared to other AI topics, non-obvious (to the casual reader as well as the expert) content across these tabs. It should be a single, cohesive narrative that integrates such elements, offering a comprehensive and captivating overview of the topic. This narrative should draw on the diversity of content available, blending it to highlight the topic's multifaceted nature. Cover a mix of theoretical and practical aspects, past and future, promise and concerns, to be of interest to every audience, but prioritize a great narrative over making sure every area is individually covered. Transcend the boundaries of individual tabs to tell a concise narrative that is a thoughtful synthesis of the topic's most compelling aspects, and captures the essence of the entire topic, marked by clarity, coherence, and curiosity. Output in the following format: Two sentences introducing the topic. Then, three sections, to break the flow. Each section should have a clear and short section title, a single short phrase without colons or subphrases, avoiding 'phrase1: phrase2' form, output it in <h3> using ###, to make it easy to scan the ideas. Within each section, one sentence introducing that idea. Then, three bullet points in description list format, for easy scannability. Each bullet point should have a descrption list header, then a colon, then a single sentence summarizing the point, then an annotation back to the tab where the content came from, in the format [[tab name]] or multiple such [[tab name1]][[tab name2]]... annotation if the idea came from a combination of tabs, and try to synthesize several bullet points from a combination of 2 or 3 tabs, then the period to end the paragraph. The tab annotations will maintain a connection to the source material, allowing readers to understand where each piece of the story originates, and allowing them to switch to that tab to read more. Key requirements: (1) The language should be very simple and very readable. (2) It should be concise and economical in words without losing readability. (3) The tone should be factual and objective, matter of fact, not grandiose or fluffy or clickbaity. (4) It should be interesting and informative, with diverse angles. It should intrigue a general audience. (5) Importantly, it should be a great overview of the topic.",
    // prompt: "Below, you will find content from many different tabs, each providing unique insights on the same topic: ${topic}. Your task is to create a compelling narrative that weaves together the most engaging and informative and non-obvious content across these tabs. Follow these guidelines to achieve this: (1) Unified Narrative Construction: Instead of summarizing each tab individually, thoroughly examine the content across all tabs and identify themes, insights, or stories that stand out for their richness, uniqueness compared to other AI topics, non-obviousness to the lay reader as well as the expert, and engagement potential to both groups. Your objective is to construct a single, cohesive narrative that integrates these elements, offering a comprehensive and captivating overview of the topic. This narrative should draw on the diversity of content available, blending it to highlight the topic's multifaceted nature. Aim for about 3 short sections with clear <h3> section headers using ### to break the flow and avoid producing a wall of text. Within each section use bullet points with description list format for easy scannability. Do not use more than 3 bullet points per section. Be concise, factual, matter-of-fact, objective, and use simple and clear language. (2) Content Annotation and Integration: As you craft this unified narrative, ensure you tie back specific ideas, insights, or pieces of information to their original tabs. Annotate these elements within the narrative by prefacing them with the tab name in brackets, like this: [[Tab Name]]. Always have the tab annotation after the text being annotated, like at the end of a sentence or paragraph and not immediately after a description list header where it breaks the flow, and do not use the tab annotations as description list headers. This method will maintain a connection to the source material, allowing readers to understand where each piece of the story originates. The final output should not only inform but also intrigue a general audience, making complex information accessible and engaging, but without flowery or clickbaity language. Your challenge is to transcend the boundaries of individual tabs to tell a story that captures the essence of the entire topic, marked by clarity, coherence, and curiosity. This approach aims to present a narrative that guides the reader through the topic's most compelling aspects, as revealed by a thoughtful synthesis of content across selected tabs. Again, keep the language and tone matter of fact, non-grandiose, and non-clickbaity. Be concise.",
  },
  {
    name: 'News',
    prompt:
      'Compile the latest news articles and reports related to ${topic} in the last two weeks. Provide insights on' +
      ' emerging trends, breakthroughs, and notable events.',
    ttl: 10 * 86400,
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
      'Detail the technology stack and tools commonly used in ${topic}, including software, libraries, frameworks, and platforms. Offer insights into choosing the right stack for various projects.',
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
