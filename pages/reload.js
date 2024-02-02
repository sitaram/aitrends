// pages/reload.js
import React, { useState, useEffect } from 'react';
import DataReload from '../app/data-reload';
import { Snackbar } from '@mui/material';

const Reload = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    DataReload(
      () => handleSnackbarOpen('Data successfully reloaded!'),
      (errorMessage) => handleSnackbarOpen(`Error: ${errorMessage}`)
    );
    // Add dependencies if any, or leave it as [] for on-mount only execution
  }, []);

  return (
    <>
      <div>
        <p>Reloading content, please wait...</p>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </>
  );
};

export default Reload;
