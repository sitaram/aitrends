import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ReloadTopic from '../app/reload_topic';
import { topics } from '../app/topics';
import { tabs as origTabs } from '../app/tabs';
import * as Constants from '../app/constants';

const Reload = () => {
  const [reloadState, setReloadState] = useState({});
  const [loading, setLoading] = useState(false);
  const reloadTopics = {};
  const activeRequests = new Set();

  // Filter out 'Divider' tabs for rendering purposes
  const tabs = origTabs.filter((tab) => tab !== 'Divider');

  const updateReloadState = (key, status) => {
    setReloadState((prevState) => ({ ...prevState, [key]: status }));
  };

  const processNextTopic = () => {
    let queue = 0;
    Object.values(reloadTopics).forEach((reloadTopic) => {
      queue += reloadTopic.processQueue();
    });
    if (queue == 0) setLoading(false);
  };

  const initiateReloadForTopic = (topic, tabs) => {
    const updateStateCallback = (key, status) => updateReloadState(key, status);
    const reloadTopic = new ReloadTopic(topic, tabs, updateStateCallback, activeRequests, processNextTopic);
    reloadTopics[topic] = reloadTopic;
    reloadTopic.enqueueRequests();
  };

  const handleReloadClick = async () => {
    if (!loading) {
      setLoading(true);
      setReloadState({});
      initiateReloadForTopic(Constants.ALLTOPICS, tabs);
      if (0)
        topics.clusters.forEach((cluster) => {
          cluster.topics.forEach((topic) => {
            initiateReloadForTopic(topic, tabs);
          });
        });
    } else {
      // Cancel all ongoing requests
      Object.values(reloadTopics).forEach((reloadTopic) => reloadTopic.cancelAllRequests());
      setLoading(false);
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

  return (
    <>
      <h1>{Constants.APPNAME}: Reload Dashboard</h1>
      <Button variant="contained" onClick={handleReloadClick} style={{ backgroundColor: loading ? 'red' : '#1976d2' }}>
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
          {/* Render Constants.ALLTOPICS separately */}
          <TableRow>
            <TableCell
              colSpan={tabs.length + 1}
              style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0', borderTop: '2px solid black' }}
            >
              {Constants.ALLTOPICS}
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

          {/* Render clusters and their topics */}
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
                <React.Fragment key={`topic-${topicIndex}`}>
                  <TableRow
                    style={{
                      backgroundColor: topicIndex % 2 === 1 ? '#F7F7F7' : 'none', // Applying very light gray for even rows
                    }}
                  >
                    <TableCell>{topic}</TableCell>
                    {tabs.map((tab, tabIndex) => (
                      <TableCell key={`${topic}-${tab}`}>{renderStatusIcon(reloadState[`${topic}-${tab}`])}</TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Reload;
