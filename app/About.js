import React from 'react';
import { useTheme, useMediaQuery, Box, Typography, Button, Paper, Divider, Grid, Chip, Modal } from '@mui/material';

const About = ({ showAbout, setShowAbout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setShowAbout(false);
  };

  return (
    <Modal
      open={showAbout}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: isMobile ? '95%' : '70%',
          backgroundColor: theme.palette.background.paper,
          boxShadow: 24,
          p: 3,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2" gutterBottom>
          AI Trends: Your Interactive Newsletter
        </Typography>
        <Typography id="modal-modal-description" variant="body1" sx={{ mb: 2 }}>
          Dive into the dynamic world of AI with <strong>AI Trends</strong>—a newsletter crafted to bring you closer to
          the forefront of artificial intelligence. From GPT-powered insights to the latest in AI research and
          applications, stay informed and inspired.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Interactive Features:
            </Typography>
            <Typography variant="body2">- Swipe through content or use tabs to navigate topics.</Typography>
            <Typography variant="body2">
              - Discover AI topics, from foundational concepts to cutting-edge research.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Techniques & Tools:
            </Typography>
            <Typography variant="body2">- Leveraging GPT-4 for deep insights.</Typography>
            <Typography variant="body2">- Utilizing Bing API for up-to-date information.</Typography>
            <Typography variant="body2">
              - Implementing recursive summarization and meta-prompting for nuanced content generation.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          Created by Sitaram Iyer, sitaram at gmail.com
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label="GPT-4" variant="outlined" color="primary" />
          <Chip label="Redis Cache" variant="outlined" color="primary" />
          <Chip label="Bing API" variant="outlined" color="primary" />
          <Chip label="Recursive Summarization" variant="outlined" color="primary" />
          <Chip label="Meta-prompting" variant="outlined" color="primary" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <img
            src="concept1.webp"
            alt="Concept 1"
            style={{ width: '100%', maxWidth: isMobile ? '90px' : '140px', height: 'auto' }}
          />
          <img
            src="concept2.webp"
            alt="Concept 2"
            style={{ width: '100%', maxWidth: isMobile ? '90px' : '140px', height: 'auto' }}
          />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Got it!
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default About;
