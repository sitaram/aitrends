import React, { useState, useRef } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { fetchContent } from '../app/api';
import { topics } from '../app/topics';
import { tabs } from '../app/tabs';
import axios from 'axios';

const Reload = () => {
  const [reloadState, setReloadState] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);

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

  const renderStatusIcon = (status, inProgress) => {
    if (inProgress) {
      return <span style={{ color: 'orange' }}>•</span>;
    } else {
      switch (status) {
        case 'success':
          return <span style={{ color: 'green', fontWeight: 'bold' }}>✔️</span>; // Corrected color value
        case 'error':
          return <span style={{ color: 'red', fontWeight: 'bold' }}>❌</span>; // Corrected color value
        default:
          return <span style={{ color: 'gray' }}>•</span>;
      }
    }
  };

  const handleReloadClick = () => {
    if (!loading) {
      setLoading(true);
      setRequestInProgress(true); // Set request in progress

      topics.clusters.forEach((cluster) => {
        cluster.topics.forEach((topic) => {
          tabs.forEach((tab) => {
            const key = `${cluster.name}-${topic}-${tab.name}`;
            const controller = new AbortController();
            abortControllers.current.push(controller);

            fetchData(topic, tab, controller.signal)
              .then(({ success, content }) => {
                setReloadState((prevState) => ({ ...prevState, [key]: success ? 'success' : 'error' }));
              })
              .catch(() => {
                setReloadState((prevState) => ({ ...prevState, [key]: 'error' }));
              })
              .finally(() => {
                // This may not be correctly resetting the requestInProgress for individual requests
                setRequestInProgress(false); // Reset request in progress when all requests are complete
              });
          });
        });
      });
    } else {
      // Abort all ongoing requests
      abortControllers.current.forEach((controller) => {
        controller.abort();
      });
      abortControllers.current = []; // Clear the array of abort controllers

      // Reset reloadState for all keys to make icons go back to gray
      const resetState = Object.keys(reloadState).reduce((acc, key) => {
        acc[key] = ''; // Reset to default state, which will render gray icon
        return acc;
      }, {});

      setReloadState(resetState);
      setLoading(false);
      setRequestInProgress(false); // Ensure to reset this as well to reflect no ongoing requests
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
            <TableCell style={{ padding: '8px' }}>Topic / Tab</TableCell>
            {tabs.map((tab, index) => (
              <TableCell key={index} align="center" style={{ padding: '8px' }}>
                {tab.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {topics.clusters.map((cluster, clusterIndex) => (
            <React.Fragment key={`cluster-${clusterIndex}`}>
              {' '}
              {/* Added unique key here */}
              <TableRow>
                <TableCell
                  colSpan={tabs.length + 1}
                  style={{ fontWeight: 'bold', borderTop: '2px solid black', padding: '6px 10px' }}
                >
                  {cluster.name}
                </TableCell>
              </TableRow>
              {cluster.topics.map((topic, topicIndex) => (
                <TableRow key={`${clusterIndex}-${topicIndex}`}>
                  {' '}
                  {/* This key is already unique */}
                  <TableCell style={{ paddingLeft: '1em', padding: '6px 10px' }}>{topic}</TableCell>
                  {tabs.map((tab, tabIndex) => (
                    <TableCell key={`${clusterIndex}-${topicIndex}-${tabIndex}`} style={{ padding: '6px 10px' }}>
                      {' '}
                      {/* Ensure this key is also unique */}
                      {renderStatusIcon(reloadState[`${cluster.name}-${topic}-${tab.name}`], requestInProgress)}
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
