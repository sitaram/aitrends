import React, { useState, forwardRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

const FeedbackForm = forwardRef(({ toggleFeedbackModal }, ref) => {
  const theme = useTheme();
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleFeedbackSubmit = async () => {
    const feedbackData = { feedback, name, email };
    await handleFeedback(feedbackData);
    toggleFeedbackModal(); // Assuming this function toggles the visibility of the feedback form
  };

  const handleFeedback = async (feedbackData) => {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();
    alert(data.message); // Display success message
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: '20px',
        width: '80%',
        maxWidth: 500,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Provide Feedback to Sitaram
      </Typography>
      <TextField
        autoFocus
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Feedback"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFeedbackSubmit}
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
});

MyComponent.displayName = 'FeedbackForm';
export default FeedbackForm;
