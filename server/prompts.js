export const ttls = {
  News: 10 * 86400,
  'Community and Events': 10 * 86400,
};

export const prompts = {
  Overview:
    "Below, you will find content from many different tabs, each providing unique insights on the same topic: ${topic}. Your task: Create a compelling narrative that weaves together the most engaging, interesting, insightful, informative, unique compared to other AI topics, non-obvious (to the casual reader as well as the expert) content across these tabs. It should be a single, cohesive narrative that integrates such elements, offering a comprehensive and captivating overview of the topic. This narrative should draw on the diversity of content available, blending it to highlight the topic's multifaceted nature. Try to cover many different tabs and try not to repeat a tab. Cover a mix of theoretical and practical aspects, past and future, promise and concerns, to be of interest to every audience, but prioritize a great narrative over making sure every area is individually covered. Transcend the boundaries of individual tabs to tell a concise narrative that is a thoughtful synthesis of the topic's most compelling aspects, and captures the essence of the entire topic, marked by clarity, coherence, and curiosity. Output in the following format: Two sentences introducing the topic. Then, three sections, to break the flow. Each section should have a clear and short section title, a single short phrase without colons or subphrases, avoiding 'phrase1: phrase2' form, output it in <h3> using ###, to make it easy to scan the ideas. Within each section, one sentence introducing that idea. Then, three bullet points in description list format, for easy scannability. Each bullet point should have a descrption list header, then a colon, then a single sentence summarizing the point, then an annotation back to the tab where the content came from, in the format [[tab name]] or multiple such [[tab name1]] [[tab name2]] ... annotation if the idea came from a combination of tabs, and try to synthesize several bullet points from a combination of 2 or 3 tabs, then the period to end the paragraph. Absolutely guarantee that the tab names in the annotations are the exact tab names from the input, i.e. never make up a tab name. The tab annotations will maintain a connection to the source material, allowing readers to understand where each piece of the story originates, and allowing them to switch to that tab to read more. Avoid repeating a tab name in the output, so that maximum number of tabs are covered in the output. Key requirements: (1) The language should be very simple and very readable. (2) It should be concise and economical in words without losing readability. (3) The tone should be factual and objective, matter of fact, not grandiose or fluffy or clickbaity. (4) It should be interesting and informative, with diverse angles. It should intrigue a general audience. (5) Importantly, it should be a great overview of the topic.",
  News:
    'Compile the latest news articles and reports related to ${topic} in the last two weeks. Provide insights on' +
    ' emerging trends, breakthroughs, and notable events.',
  Recap:
    'Provide an overview of significant developments and trends in ${topic} over the last year. Include key' +
    ' achievements, research findings, and evolving applications.',
  Evolution:
    'Provide a detailed overview of the evolutionary journey of ${topic} over the last decade. Explore historical' +
    ' insights, key milestones, advancements, and significant changes that have shaped its development.',
  'Future roadmap':
    'Create a roadmap for the future of ${topic}. Highlight key milestones, developments, and expected impacts over' +
    ' the next few years.',
  Ecosystem:
    'Generate an overview of the AI ecosystem around ${topic}. Identify the key players, startups, research' +
    ' institutions, and influential figures shaping the AI landscape.',
  'Funding and Investment':
    'Track the funding and investment landscape for AI in ${topic}. Highlight recent funding rounds, notable investors, and trends in venture capital and government funding.',
  'Career Paths':
    'Outline potential career paths and job opportunities in the field of ${topic}. Include the skills required, typical roles, and advice on how to start or advance a career in this area.',
  'Skill Development':
    'Provide resources and guidance for skill development in ${topic}. Include courses, workshops, books, and online resources for beginners to experts.',
  'Community and Events':
    'List upcoming events, conferences, and meetups related to ${topic}. Feature interviews with community leaders and summaries of past events.',
  'Tech Stack':
    'Detail the technology stack and tools commonly used in ${topic}, including software, libraries, frameworks, and platforms. Offer insights into choosing the right stack for various projects.',
  'Tech Deep Dive':
    'Delve into the technical aspects of ${topic}, breaking down the algorithms, architectures, and data structures that underpin AI technologies. Provide code snippets, implementation challenges, and optimization strategies.',
  'AI Tools and Platforms':
    'Review AI tools and platforms that support development in ${topic}. Compare features, usability, and performance across different solutions.',
  'Expert opinions':
    'Summarize expert opinions on the recent advancements in ${topic}, including any debates or controversies, from' +
    ' the last year, boosting recent opinions.',
  'Expert Q&A':
    'Host a Q&A session with an AI expert in ${topic}. Allow users to submit questions in advance, and provide' +
    ' detailed responses with insights and recommendations.',
  'Policy and Regulation':
    'Explore how policy and regulation impact the development and deployment of AI in ${topic}. Analyze current legislation, potential regulatory changes, and the implications for privacy, security, and innovation.',
  Ethics:
    'Evaluate the ethical considerations of AI implementations of ${topic}. Provide a scorecard with ratings and' +
    ' explanations, addressing transparency, fairness, and privacy.',
  'Challenges and Solutions':
    'Discuss common and emerging challenges in ${topic} and present solutions. Include technical hurdles, ethical dilemmas, and real-world case solutions.',
  'Global Perspectives':
    'Provide insights into how different regions of the world are approaching AI in ${topic}. Compare and contrast the strategies, investments, and innovations globally.',
  Comparisons:
    'Compare ${topic} against closely related topics within the last year, highlighting key differences and potential' +
    ' synergies.',
  Applications:
    'Generate AI use case scenarios tailored to ${topic} based on specific challenges. Include potential benefits,' +
    ' considerations, and implementation tips.',
  'Case Studies':
    'Provide a list of notable case studies related to ${topic} in the last year. Include details on the challenges,' +
    ' solutions, and outcomes for each case study.',
  'Innovative Use Cases':
    'Showcase innovative and unconventional use cases of AI in ${topic}. Highlight novel applications, experimental projects, and creative integrations.',
  Impact: 'Analyze the impact of recent advancements in ${topic} in the last year.',
  Research:
    'Provide a comprehensive overview of recent and pivotal research papers related to ${topic}. Focus on identifying studies that have significantly advanced the understanding or application of the topic. Ensure that all information is accurate and refrain from including or generating links to non-existent sources. Highlight the methodology, findings, and implications of each paper, grouping them into thematic categories to facilitate easy navigation and comprehension. Include direct references to accessible databases or repositories like arXiv, Google Scholar, or specific academic journals where these papers can be found. For each paper, offer a brief summary that encapsulates its core contribution to the field and its relevance to ongoing research or practical applications. Aim to cater to both newcomers and seasoned experts in the field by providing insights that are both educational and deeply informative. Keep it tight, just one bullet point per paper, and one section per a group or category of papers, about 3 to 5 sections total.',
};
