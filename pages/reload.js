import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { fetchContent } from '../app/api';
import { topics } from '../app/topics';
import { tabs as origTabs } from '../app/tabs';
import axios from 'axios';

const Reload = () => {
  const [reloadState, setReloadState] = useState({});
  const [loading, setLoading] = useState(false);

  const requestQueue = useRef([]);
  const activeRequests = useRef(new Set());

  const processQueue = () => {
    // Check if there is capacity to send more requests
    while (activeRequests.current.size < 50 && requestQueue.current.length > 0) {
      const { topic, tab, key } = requestQueue.current.shift();
      const controller = new AbortController();

      // Add to active requests
      activeRequests.current.add(key);
      fetchData(topic, tab, controller.signal, key);
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <span style={{ color: 'green', fontWeight: 'bold' }}>✔️</span>;
      case 'error':
        return <span style={{ color: 'red', fontWeight: 'bold' }}>❌</span>;
      case 'loading':
        return <span style={{ color: 'orange' }}>•</span>;
      default:
        return <span style={{ color: 'gray' }}>•</span>;
    }
  };

  const fetchData = async (topic, tab, signal, key) => {
    const prompt = tab.prompt.replace('${topic}', topic);
    const ttl = tab.ttl || 90 * 86400;
    try {
      const content = await fetchContent(
        prompt,
        ttl,
        () => {},
        () => {},
        signal
      );
      setReloadState((prevState) => ({ ...prevState, [key]: 'success' }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was cancelled');
      } else {
        console.error('An error occurred:', error);
        setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
      }
    } finally {
      // Remove from active requests and process the next item in the queue
      activeRequests.current.delete(key);
      processQueue();
    }
  };

  const handleReloadClick = () => {
    if (!loading) {
      setLoading(true);

      topics.clusters.forEach((cluster) => {
        cluster.topics.forEach((topic) => {
          tabs.forEach((tab) => {
            const key = `${cluster.name}-${topic}-${tab.name}`;
            setReloadState((prevState) => ({ ...prevState, [key]: 'loading' }));

            // Queue the request
            requestQueue.current.push({ topic, tab, key });
          });
        });
      });

      processQueue(); // Start processing the queue
    } else {
      // Abort all ongoing requests
      abortControllers.current.forEach((controller) => controller.abort());
      abortControllers.current = []; // Clear the array of abort controllers

      // Reset state to indicate the requests have stopped
      const resetState = Object.keys(reloadState).reduce((acc, key) => {
        acc[key] = ''; // Reset to default state, rendering gray icon
        return acc;
      }, {});
      setReloadState(resetState);
      setLoading(false);
    }
  };

  // Ensure to clean up on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      requestQueue.current = [];
      activeRequests.current.forEach((key) => {
        // Implement abort logic here if needed
      });
      activeRequests.current.clear();
    };
  }, []);

  const tabs = origTabs.filter((tab) => tab.name !== 'Divider');

  return (
    <>
      <h1>Reload Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleReloadClick}>
        {loading ? 'Stop Reload' : 'Start Reload'}
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic / Tab</TableCell>
            {tabs.map((tab, index) => (
              <TableCell key={index} align="center">
                {tab.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
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
                <TableRow key={`${clusterIndex}-${topicIndex}`}>
                  <TableCell>{topic}</TableCell>
                  {tabs.map((tab, tabIndex) => (
                    <TableCell key={`${clusterIndex}-${topicIndex}-${tabIndex}`}>
                      {renderStatusIcon(reloadState[`${cluster.name}-${topic}-${tab.name}`])}
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

/*
const Reload = () => {
  const [reloadState, setReloadState] = useState({});
  const [loading, setLoading] = useState(false);

  const abortControllers = useRef([]);

  const fetchData = async (topic, tab, signal) => {
    const prompt = tab.prompt.replace('${topic}', topic);
    const ttl = tab.ttl || 90 * 86400;
    try {
      const content = await fetchContent(
        prompt,
        ttl,
        () => {},
        () => {},
        signal
      );
      return { success: true, content };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was cancelled');
      } else {
        console.error('An error occurred:', error);
      }
      return { success: false, error };
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <span style={{ color: 'green', fontWeight: 'bold' }}>✔️</span>;
      case 'error':
        return <span style={{ color: 'red', fontWeight: 'bold' }}>❌</span>;
      case 'loading':
        return <span style={{ color: 'orange' }}>•</span>;
      default:
        return <span style={{ color: 'gray' }}>•</span>;
    }
  };

  const handleReloadClick = () => {
    if (!loading) {
      setLoading(true);

      topics.clusters.forEach((cluster) => {
        cluster.topics.forEach((topic) => {
          tabs.forEach((tab) => {
            const key = `${cluster.name}-${topic}-${tab.name}`;
            setReloadState((prevState) => ({ ...prevState, [key]: 'loading' }));
            const controller = new AbortController();
            abortControllers.current.push(controller);

            fetchData(topic, tab, controller.signal)
              .then(({ success }) => {
                setReloadState((prevState) => ({ ...prevState, [key]: success ? 'success' : 'error' }));
              })
              .catch(() => {
                setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
              });
          });
        });
      });
    } else {
      // Abort all ongoing requests
      abortControllers.current.forEach((controller) => controller.abort());
      abortControllers.current = []; // Clear the array of abort controllers

      // Reset state to indicate the requests have stopped
      const resetState = Object.keys(reloadState).reduce((acc, key) => {
        acc[key] = ''; // Reset to default state, rendering gray icon
        return acc;
      }, {});
      setReloadState(resetState);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Reload Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleReloadClick}>
        {loading ? 'Stop Reload' : 'Start Reload'}
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic / Tab</TableCell>
            {tabs.map((tab, index) => (
              <TableCell key={index} align="center">
                {tab.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.clusters.map((cluster, clusterIndex) => (
            <React.Fragment key={`cluster-${clusterIndex}`}>
              <TableRow>
                <TableCell colSpan={tabs.length + 1} style={{ fontWeight: 'bold', borderTop: '2px solid black' }}>
                  {cluster.name}
                </TableCell>
              </TableRow>
              {cluster.topics.map((topic, topicIndex) => (
                <TableRow key={`${clusterIndex}-${topicIndex}`}>
                  <TableCell>{topic}</TableCell>
                  {tabs.map((tab, tabIndex) => (
                    <TableCell key={`${clusterIndex}-${topicIndex}-${tabIndex}`}>
                      {renderStatusIcon(reloadState[`${cluster.name}-${topic}-${tab.name}`])}
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
*/

export default Reload;
