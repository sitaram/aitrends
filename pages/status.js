// components/status.js or pages/status.js depending on your structure
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import { topics } from '../app/topics';
import { tabs as origTabs } from '../app/tabs';
import * as Constants from '../app/constants';

const Status = () => {
  const [status, setStatus] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState({ topic: '', tab: '' });
  const [loading, setLoading] = useState(false);

  // Filter out 'Divider' tabs for rendering purposes
  const tabs = origTabs.filter((tab) => tab !== 'Divider');

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      let topicsToCheck = [Constants.ALLTOPICS];
      let tabsToCheck = tabs; // Assuming 'tabs' is already defined in your component

      // Then, if you want to include specific topics from clusters
      topics.clusters.forEach((cluster) => {
        cluster.topics.forEach((topic) => {
          if (!topicsToCheck.includes(topic)) {
            topicsToCheck.push(topic);
          }
        });
      });

      const response = await axios.post('/api/status', {
        topics: topicsToCheck,
        tabs: tabsToCheck,
      });

      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const promptDelete = (topic, tab) => {
    setCurrentKey({ topic, tab });
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    const { topic, tab } = currentKey;
    try {
      await axios.delete(`/api/delete?topic=${encodeURIComponent(topic)}&tab=${encodeURIComponent(tab)}`);
      fetchStatus(); // Refresh status after deletion
    } catch (error) {
      console.error('Error deleting the key:', error);
    }
    setDialogOpen(false);
  };

  const renderStatusIcon = (topic, tab, status) => {
    const iconStyles = { cursor: 'pointer' };
    switch (status) {
      case 'fresh':
        return <span style={{ ...iconStyles, color: 'green' }}>✅</span>;
      case 'expired':
        return <span style={{ ...iconStyles, color: 'orange' }}>🔄</span>;
      case 'missing':
        return <span style={{ ...iconStyles, color: 'red' }}>❌</span>;
      default:
        return <span style={{ ...iconStyles, color: 'blue' }}>?</span>;
    }
  };

  return (
    <>
      {loading && <ThreeDots color="#3a506b" />}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic / Tab</TableCell>
            {/* Dynamically generate tab headers */}
            {Object.keys(status).length > 0 &&
              Object.keys(status[Object.keys(status)[0]]).map((tab, index) => (
                <TableCell key={index} align="center">
                  {tab}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(status).map(([topic, tabsStatus], topicIndex) => (
            <TableRow
              key={topic}
              style={{
                backgroundColor: topicIndex % 2 === 1 ? '#F7F7F7' : 'none', // Applying very light gray for even rows
              }}
            >
              <TableCell>{topic}</TableCell>
              {Object.entries(tabsStatus).map(([tab, value]) => (
                <TableCell key={tab} onClick={() => promptDelete(topic, tab)} style={{ cursor: 'pointer' }}>
                  {renderStatusIcon(topic, tab, value)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Confirm delete: {currentKey.topic} / {currentKey.tab}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Status;
