import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { topics } from './topics'; // Import the topics data from your topics.js file

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
  '&.Mui-selected:hover': {
    background: 'none',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SubListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Add left padding to indent sub-items
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main, // Change background color to blue when selected
    color: theme.palette.common.white,
  },
}));

const CollapseWrapper = styled(Collapse)(({ theme }) => ({
  overflowX: 'hidden', // Hide horizontal overflow for collapsing section
}));

const TopicBrowser = ({ onSelect, selectedTopic }) => {
  const [open, setOpen] = React.useState({});

  const handleClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  return (
    <StyledList>
      <StyledListItem button onClick={() => onSelect("All AI Topics")} selected={selectedTopic === "All AI Topics"}>
        <ListItemText primary="All AI Topics" />
      </StyledListItem>
      {topics.clusters.map((cluster, clusterIndex) => (
        <div key={cluster.name}>
          <StyledListItem button onClick={() => handleClick(clusterIndex)}>
            <ListItemText primary={cluster.name} />
            {open[clusterIndex] ? <ExpandLess /> : <ExpandMore />}
          </StyledListItem>
          <CollapseWrapper in={open[clusterIndex]} timeout="auto" unmountOnExit>
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

