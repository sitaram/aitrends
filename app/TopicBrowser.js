import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { topics } from './topics'; // Import the topics data from your topics.js file
import * as Constants from './constants';

const StyledList = styled(List)(({ theme }) => ({
  width: 240, // Set a fixed width for the drawer
  overflowX: 'hidden', // Hide horizontal overflow
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: '100%', // Set the width to 100% to prevent horizontal expansion
  padding: '5px 10px',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.grey[600],
  backgroundColor: '#fafafa',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& .MuiListItemText-primary': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    background: 'none',
    backgroundColor: theme.palette.primary.main,
  },
}));

const SubListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Add left padding to indent sub-items
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const CollapseWrapper = styled(Collapse)(({ theme }) => ({
  overflowX: 'hidden', // Hide horizontal overflow for collapsing section
}));

const TopicBrowser = ({ onSelect, selectedTopic }) => {
  const [openTopicIndex, setOpenTopicIndex] = React.useState(null);

  const handleClick = (index) => {
    if (openTopicIndex === index) {
      setOpenTopicIndex(null); // Close the clicked topic if it's already open
    } else {
      setOpenTopicIndex(index); // Open the clicked topic
    }
  };

  return (
    <StyledList>
      <StyledListItem button onClick={() => onSelect(Constants.ALLTOPICS)} selected={selectedTopic === Constants.ALLTOPICS}>
        <ListItemText primary={Constants.ALLTOPICS} />
      </StyledListItem>
      {topics.clusters.map((cluster, clusterIndex) => (
        <div key={cluster.name}>
          <StyledListItem button onClick={() => handleClick(clusterIndex)}>
            <ListItemText primary={cluster.name} />
	    {openTopicIndex === clusterIndex ? <ExpandLess /> : <ExpandMore />}
          </StyledListItem>
          <CollapseWrapper in={openTopicIndex === clusterIndex} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {cluster.topics.map((topic, topicIndex) => (
                <SubListItem
                  button
                  key={topicIndex}
                  onClick={() => onSelect(topic)}
                  selected={selectedTopic === topic}
                >
                  <ListItemText primary={topic} />
                </SubListItem>
              ))}
            </List>
          </CollapseWrapper>
        </div>
      ))}
    </StyledList>
  );
};

export default TopicBrowser;

