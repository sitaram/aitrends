import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { fetchContent } from '../app/api';
import { topics } from '../app/topics';
import { tabs as origTabs } from '../app/tabs';
import axios from 'axios';
import * as Constants from '../app/constants';

const Reload = () => {
  const [reloadState, setReloadState] = useState({});
  const [loading, setLoading] = useState(false);
  const contentResults = useRef({});
  const topicTabCount = useRef({});
  const requestQueue = useRef([]);
  const activeRequests = useRef(new Set());
  const maxConcurrentRequests = 30;

  // Filter out 'Divider' tabs for rendering purposes
  const tabs = origTabs.filter((tab) => tab !== 'Divider');

  const processQueue = () => {
    while (activeRequests.current.size < maxConcurrentRequests && requestQueue.current.length > 0) {
      const { topic, tab } = requestQueue.current.shift();
      const controller = new AbortController();
      fetchData(topic, tab, controller.signal);
    }
    if (activeRequests.current.size == 0 && requestQueue.current.length == 0) {
      setLoading(false);
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <span style={{ color: 'green', fontWeight: 'bold' }}>✔️</span>;
      case 'error':
        return <span style={{ color: 'red', backgroundColor: 'lightred', fontWeight: 'bold' }}>❌</span>;
      case 'loading':
        return <span style={{ color: 'orange' }}>•</span>;
      default:
        return <span style={{ color: 'gray' }}>•</span>;
    }
  };

  const enqueueRequest = (topic, tab) => {
    requestQueue.current.push({ topic, tab });
    processQueue();
  };

  const fetchData = async (topic, tab, signal) => {
    const key = `${topic}-${tab}`;
    console.log('fetchData', topic, tab);
    try {
      activeRequests.current.add(key);
      const content = await fetchContent(
        topic,
        tab,
        null, // payload
        false, // isOverview
        false, // isOnline
        () => {},
        signal
      );

      console.log('fetchData done', topic, tab, 'content:', content.length, 'bytes');
      // Store the fetched content by topic and tab
      if (!contentResults.current[topic]) {
        contentResults.current[topic] = {};
      }
      contentResults.current[topic][tab] = content.substr(0, 1000);
      setReloadState((prevState) => ({ ...prevState, [key]: 'success' }));

      if (topicTabCount.current[topic] !== undefined) {
        topicTabCount.current[topic]--;
        if (topicTabCount.current[topic] === 0) {
          // All tabs for this topic have finished, process the summary
          await processSummary(topic, signal);
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was cancelled');
      } else {
        console.error('An error occurred:', error);
        setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
      }
    } finally {
      activeRequests.current.delete(key);
      processQueue();
    }
  };

  const processSummary = async (topic, signal) => {
    console.log('processSummary', topic, contentResults);
    const allTabsContent = Object.entries(contentResults.current[topic])
      .map(([tab, content]) => `\n\n----------------------\n\nTAB NAME: [[${tab}]]\nCONTENT: ${content}`)
      .join(', ');
    const summaryKey = `${topic}-Overview`;

    // Assume fetchContent for summary is an async operation
    try {
      setReloadState((prevState) => ({ ...prevState, [summaryKey]: 'loading' }));
      await fetchContent(
        topic,
        tabs[0],
        allTabsContent,
        true, // isOverview
        false, // isOnline
        () => {},
        signal
      );
      setReloadState((prevState) => ({ ...prevState, [summaryKey]: 'success' }));
    } catch (error) {
      console.error('An error occurred:', error);
      setReloadState((prevState) => ({ ...prevState, [summaryKey]: 'error' }));
    }
  };

  const handleReloadClick = () => {
    const notabs = tabs.filter((tab) => tab !== 'Overview');
    if (!loading) {
      setLoading(true);
      setReloadState({});

      const topic = Constants.ALLTOPICS;
      topicTabCount.current[topic] = notabs.length;
      notabs.forEach((tab) => {
        const key = `${topic}-${tab}`;
        setReloadState((prevState) => ({ ...prevState, [key]: 'loading' }));
        enqueueRequest(topic, tab);
      });

      if (1)
        topics.clusters.forEach((cluster) => {
          cluster.topics.forEach((topic) => {
            if (1 || topic === 'AI in Retail' || topic === 'Computer Vision') {
              // Initialize the tab count for this topic
              topicTabCount.current[topic] = notabs.length;
              notabs.forEach((tab) => {
                const key = `${topic}-${tab}`;
                setReloadState((prevState) => ({ ...prevState, [key]: 'loading' }));
                enqueueRequest(topic, tab);
              });
            }
          });
        });
    } else {
      // Abort logic if needed or reset state to stop
      setLoading(false);

      // Reset dashboard.
      const topic = Constants.ALLTOPICS;
      tabs.forEach((tab) => {
        tabs.forEach((tab) => {
          const key = `${topic}-${tab}`;
          if (reloadState[key] === 'loading') {
            setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
          }
        });
      });
      topics.clusters.forEach((cluster) => {
        cluster.topics.forEach((topic) => {
          tabs.forEach((tab) => {
            const key = `${topic}-${tab}`;
            if (reloadState[key] === 'loading') {
              setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
            }
          });
        });
      });

      contentResults.current = {};
      topicTabCount.current = {};
      requestQueue.current = [];
      activeRequests.current.clear();
    }
  };

  useEffect(() => {
    document.title = 'AI Trends: Reload Dashboard';

    // Cleanup logic here, if necessary
    return () => {
      // Reset everything on component unmount
      requestQueue.current = [];
      activeRequests.current.clear();
    };
  }, []);

  return (
    <>
      <h1>${Constants.APPNAME}: Reload Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleReloadClick}>
        {loading ? 'Stop Reload' : 'Start Reload'}
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic / Tab</TableCell>
            {tabs.map((tab, index) => (
              <TableCell key={index} align="center">
                {tab}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Standalone topic rendering */}
          <TableRow>
            <TableCell
              colSpan={tabs.length + 1}
              style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0', borderTop: '2px solid black' }}
            >
              All AI Topics
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>All AI Topics</TableCell>
            {tabs.map((tab, tabIndex) => (
              <TableCell key={`alltopics-${tabIndex}`}>
                {renderStatusIcon(reloadState[`${Constants.ALLTOPICS}-${tab}`])}
              </TableCell>
            ))}
          </TableRow>

          {/* Clusters and topics rendering */}
          {topics.clusters.map((cluster, clusterIndex) => (
            <React.Fragment key={`cluster-${clusterIndex}`}>
              <TableRow>
                <TableCell
                  colSpan={tabs.length + 1}
                  style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0', borderTop: '2px solid black' }}
                >
                  {cluster.name}
                </TableCell>
              </TableRow>
              {cluster.topics.map((topic, topicIndex) => (
                <TableRow
                  key={`${clusterIndex}-${topicIndex}`}
                  style={{
                    backgroundColor: topicIndex % 2 === 1 ? '#F7F7F7' : 'none', // Applying very light gray for even rows
                  }}
                >
                  <TableCell>{topic}</TableCell>
                  {tabs.map((tab, tabIndex) => (
                    <TableCell key={`${clusterIndex}-${topicIndex}-${tabIndex}`}>
                      {renderStatusIcon(reloadState[`${topic}-${tab}`])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Reload;
