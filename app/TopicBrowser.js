import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Collapse, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { topics } from './topics'; // Import the topics data from your topics.js file
import * as Constants from './constants';

const StyledList = styled(List)(({ theme }) => ({
  width: 250, // Set a fixed width for the drawer
  overflowX: 'hidden', // Hide horizontal overflow
  overflowY: 'scroll', // Show horizontal overflow to avoid jerkiness
}));

const FilterTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: 'calc(100% - 20px)', // Adjust based on padding/margins
  margin: '10px auto 4px',
  '& .MuiInputBase-input': {
    padding: '10px 14px', // Adjust this value to decrease the padding
    margin: '0px',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    width: '100%', // Set the width to 100% to prevent horizontal expansion
    padding: isMobile ? '10px' : '7px 10px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
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
  };
});

const SubListItem = styled(ListItem)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    padding: isMobile ? '10px' : '7px 10px',
    paddingLeft: theme.spacing(4), // Add left padding to indent sub-items
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  };
});

const CollapseWrapper = styled(Collapse)(({ theme }) => ({
  overflowX: 'hidden', // Hide horizontal overflow for collapsing section
}));

const TopicBrowser = ({ onSelect, selectedTopic, openClusterIndex }) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('');
  const [filteredClusters, setFilteredClusters] = useState(topics.clusters);
  const [openClusters, setOpenClusters] = useState([]);
  const [openTopicIndex, setOpenTopicIndex] = useState(null);
  const topicRefs = useRef([]);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      const newFilteredClusters = topics.clusters
        .map((cluster) => ({
          ...cluster,
          topics: cluster.topics.filter((topic) => topic.toLowerCase().includes(lowerFilter)),
        }))
        .filter((cluster) => cluster.topics.length > 0);
      setFilteredClusters(newFilteredClusters);
      // Open all clusters that have matching topics
      setOpenClusters(newFilteredClusters.map((_, index) => index));
    } else {
      setFilteredClusters(topics.clusters);
      setOpenClusters([]);
    }
  }, [filter]);

  useEffect(() => {
    setOpenClusters([openClusterIndex]);
  }, [openClusterIndex]);

  useEffect(() => {
    // Skip the first effect run to avoid scrolling on initial mount.
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    // Function to scroll to the selected topic within the opened cluster.
    const scrollToTopic = () => {
      const selectedRef = topicRefs.current[selectedTopic];
      if (selectedRef && selectedRef.scrollIntoView) {
        selectedRef.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    // Check if the topic is visible/rendered before attempting to scroll.
    // This could be a simple timeout or a more complex visibility check.
    setTimeout(scrollToTopic, 600); // Adjust delay as needed based on your UI's behavior.
  }, [selectedTopic]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const highlightMatch = (text, part) => {
    const start = text.toLowerCase().indexOf(part.toLowerCase());
    const end = start + part.length;
    return (
      <span>
        {text.substring(0, start)}
        <span style={{ backgroundColor: 'yellow', color: 'black' }}>{text.substring(start, end)}</span>
        {text.substring(end)}
      </span>
    );
  };

  return (
    <>
      <FilterTextField
        autoComplete="off"
        placeholder="Filter or research topics..."
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        margin="normal"
      />
      <StyledList>
        <StyledListItem
          button
          onClick={() => {
            setOpenClusters([Constants.ALLTOPICS]);
            onSelect(Constants.ALLTOPICS);
          }}
          selected={selectedTopic === Constants.ALLTOPICS}
        >
          <ListItemText primary={Constants.ALLTOPICS} />
        </StyledListItem>

        {filteredClusters.length > 0 ? (
          filteredClusters.map((cluster, clusterIndex) => (
            <div key={cluster.name}>
              <StyledListItem
                button
                onClick={() =>
                  setOpenClusters(
                    openClusters.includes(clusterIndex)
                      ? openClusters.filter((index) => index !== clusterIndex)
                      : [clusterIndex]
                  )
                }
              >
                <ListItemText primary={cluster.name} />
                {openClusters.includes(clusterIndex) ? <ExpandLess /> : <ExpandMore />}
              </StyledListItem>
              <Collapse in={openClusters.includes(clusterIndex)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {cluster.topics.map((topic, topicIndex) => (
                    <SubListItem button key={topic} onClick={() => onSelect(topic)} selected={selectedTopic === topic}>
                      <ListItemText primary={filter ? highlightMatch(topic, filter) : topic} />
                    </SubListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText primary={`No topics found for "${filter}".`} />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: theme.palette.primary.main }}
              onClick={() => {
                console.log(`Researching ${filter}`);
                // Placeholder for research functionality
              }}
            >
              Research "{filter}" (takes 2 min)
            </Button>
          </ListItem>
        )}
      </StyledList>
    </>
  );
};

export default TopicBrowser;
