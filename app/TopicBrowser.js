'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const topics = [
'All AI Topics',
'Machine Learning',
'Deep Learning',
'Natural Language Processing',
'Computer Vision',
'Reinforcement Learning',
'Predictive Analytics',
'Neural Network Architectures',
'Generative Adversarial Networks',
'Robotics and Automation',
'Autonomous Vehicles',
'AI Ethics and Fairness',
'Explainable AI (XAI)',
'Edge AI',
'Quantum Machine Learning',
];

// produce a bullet list of AI subtopics, just the names and prefer short ones, focusing on terms and concepts that are
// prevalent and important in today's research and discourse, sorted descending order of prevalence and importance,
// while ensuring a diverse representation of the field.
//
// produce a bullet list a dozen or so of AI subtopics, just the names and prefer short ones, no acronyms, prioritizing
// terms that are prevalent and important in today's research and discourse, sorted descending order of prevalence and
// importance, while ensuring a diverse representation of the field. avoid topics that used to be hot but are now faded,
// in other words bias towards recency of importance and trendiness of the concept. cover a good mix of topics for the
// layman as well as the expert. research as needed.
//
// Machine Learning
// Deep Learning
// Natural Language Processing
// Computer Vision
// Reinforcement Learning
// Generative Adversarial Networks (GANs)
// Autonomous Vehicles
// AI Ethics and Fairness
// Explainable AI (XAI)
// AI in Healthcare
// AI in Finance
// AI in Robotics
// AI in Cybersecurity
// AI in Education
// AI in Retail

const StyledList = styled(List)(({ theme }) => ({
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: '90%', // Adjust the width as needed
  margin: 'auto', // Center the item
  marginTop: '0px',
  marginBottom: '0px',
  padding: '5px 10px',
  borderRadius: theme.shape.borderRadius, // Use theme's border radius
  color: theme.palette.grey[600],
  backgroundColor: '#fafafa',
  // Add more styling for selected item, hover, etc.
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& .MuiListItemText-primary': {
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
  ':hover': {
    background: `linear-gradient(45deg, ${theme.palette.grey[100]} 10%, ${theme.palette.grey[300]} 90%)`,
  },
  '&.Mui-selected:hover': {
    background: 'none',
    backgroundColor: theme.palette.primary.dark,
  },
}));


const TopicBrowser = ({ onSelect, selectedTopic }) => {
  return (
    <StyledList>
      {topics.map(topic => (
        <StyledListItem
          button
          key={topic}
          onClick={() => onSelect(topic)}
          selected={selectedTopic === topic}
        >
          <ListItemText primary={topic} />
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default TopicBrowser;

