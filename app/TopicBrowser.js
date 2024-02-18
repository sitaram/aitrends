import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Collapse, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { topics } from './topics';
import { tabs } from './tabs';
import ReloadTopic from './reload_topics';
import * as Constants from './constants';

const FilterTextField = styled(TextField)(({ theme }) => ({
  width: 'calc(100% - 20px)', // Adjust based on padding/margins
  margin: '10px auto',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.tertiary.main,
    borderWidth: '2px',
  },

  // Target the notched outline for the border color on hover
  '&:hover .MuiOutlinedInput-notchedOutline, &:active .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 5px ${theme.palette.primary.main}`, // Halo effect
  },

  '& .MuiInputBase-input': {
    padding: '10px 14px', // Adjust this value to decrease the padding
    margin: '0px',
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  width: 250, // Set a fixed width for the drawer
  overflowX: 'hidden', // Hide horizontal overflow
  overflowY: 'scroll', // Show horizontal overflow to avoid jerkiness
}));

const StyledListItem = styled(ListItem)(({ theme, ismobile }) => ({
  width: '100%', // Set the width to 100% to prevent horizontal expansion
  padding: ismobile === 'true' ? '10px' : '7px 10px',
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
}));

const SubListItem = styled(ListItem)(({ theme, ismobile }) => ({
  padding: ismobile === 'true' ? '10px' : '7px 10px',
  paddingLeft: theme.spacing(4), // Add left padding to indent sub-items
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const CollapseWrapper = styled(Collapse)(({ theme }) => ({
  overflowX: 'hidden', // Hide horizontal overflow for collapsing section
}));

const TopicBrowser = ({ topic, handleTopicChange, selectedTopic }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openClusters, setOpenClusters] = useState([]); // Constants.DEFAULT_OPEN_CLUSTER
  const [filter, setFilter] = useState('');
  const [filteredClusters, setFilteredClusters] = useState(topics.clusters);
  const [openTopicIndex, setOpenTopicIndex] = useState(null);
  const topicRefs = useRef([]);

  const hasMounted = useRef(false);

  // Adjusting to use names for open clusters based on filter
  useEffect(() => {
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      const newFilteredClusters = topics.clusters
        .map((cluster) => {
          const filteredTopics = cluster.topics.filter((topic) => topic.toLowerCase().includes(lowerFilter));
          return { ...cluster, topics: filteredTopics };
        })
        .filter((cluster) => cluster.topics.length > 0);

      setFilteredClusters(newFilteredClusters);
      setOpenClusters(newFilteredClusters.map((cluster) => cluster.name));
    } else {
      setFilteredClusters(topics.clusters);

      const newOpenCluster = topics.clusters.find((cluster) => cluster.topics.includes(topic));
      setOpenClusters(newOpenCluster ? [newOpenCluster.name] : []);
    }
  }, [filter, topic]);

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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {filter && (
                <IconButton aria-label="clear filter" onClick={() => setFilter('')} edge="end">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      <StyledList>
        <StyledListItem
          ismobile={isMobile ? 'true' : 'false'}
          button
          onClick={() => {
            setOpenClusters([Constants.ALLTOPICS]);
            handleTopicChange(Constants.ALLTOPICS);
          }}
          selected={selectedTopic === Constants.ALLTOPICS}
        >
          <ListItemText primary={Constants.ALLTOPICS} />
        </StyledListItem>

        {filteredClusters.length > 0 ? (
          filteredClusters.map((cluster) => (
            <div key={cluster.name}>
              <StyledListItem
                button
                onClick={() => {
                  const clusterName = cluster.name;
                  setOpenClusters((prevOpenClusters) => {
                    return prevOpenClusters.includes(clusterName)
                      ? prevOpenClusters.filter((cluster) => cluster !== clusterName)
                      : filter
                      ? [...prevOpenClusters, clusterName]
                      : [clusterName];
                  });
                }}
              >
                <ListItemText primary={cluster.name} />
                {openClusters.includes(cluster.name) ? <ExpandLess /> : <ExpandMore />}
              </StyledListItem>
              <Collapse in={openClusters.includes(cluster.name)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {cluster.topics.map((topic) => (
                    <SubListItem
                      ismobile={isMobile ? 'true' : 'false'}
                      button
                      key={topic}
                      onClick={() => {
                        handleTopicChange(topic);
                        const clusterName = cluster.name;
                        setOpenClusters((prevOpenClusters) => {
                          return prevOpenClusters.includes(clusterName)
                            ? prevOpenClusters
                            : filter
                            ? [...prevOpenClusters, clusterName]
                            : [clusterName];
                        });
                      }}
                      ref={(el) => (topicRefs.current[topic] = el)}
                      selected={selectedTopic === topic}
                    >
                      <ListItemText
                        primary={
                          filter
                            ? highlightMatch(topic.replace(/^AI (in|for) /, ''), filter)
                            : topic.replace(/^AI (in|for) /, '')
                        }
                      />
                    </SubListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))
        ) : (
          <ListItem style={{ display: 'block' }}>
            <ListItemText primary={`No topics found for "${filter}".`} />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%', backgroundColor: theme.palette.primary.main, textTransform: 'none' }}
              onClick={() => {
                console.log(`Researching ${filter}`);
                handleTopicChange(filter);
                setOpenClusters((prevOpenClusters) => []);
                const reloadTopic = new ReloadTopic(
                  filter, // topic
                  tabs,
                  () => {}, // updateStateCallback
                  new Set(), // activeRequests
                  () => {} // processNextTopic
                );
                reloadTopic.enqueueRequests();
              }}
            >
              Research `{filter}`<br />
              (takes a minute)
            </Button>
          </ListItem>
        )}
      </StyledList>
    </>
  );
};

export default TopicBrowser;
