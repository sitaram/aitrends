import React from 'react';
import { useTheme, useMediaQuery, Box, Typography, Button, Paper, Divider, Grid, Chip, Container } from '@mui/material';

const About = ({ setShowAbout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOkClick = (e) => {
    e.preventDefault();
    setShowAbout(false);
  };

  return (
    <Container
      component="a"
      href="#"
      onClick={handleOkClick}
      disableGutters
      maxWidth={false}
      sx={{
        position: 'fixed',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '90%' : '70%',
        textDecoration: 'none',
        zIndex: 2000,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: `8px 8px 16px 0 ${theme.palette.grey[500]}`,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          AI Trends: Your Interactive Newsletter
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
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
          <img src="concept1.webp" alt="Concept 1" style={{ width: '100%', maxWidth: '140px', height: 'auto' }} />
          <img src="concept2.webp" alt="Concept 2" style={{ width: '100%', maxWidth: '140px', height: 'auto' }} />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOkClick}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Got it!
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
