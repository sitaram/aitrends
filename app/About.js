import React from 'react';
import { useTheme, useMediaQuery, Box, Typography, Button, Divider, Modal } from '@mui/material';

const About = ({ showAbout, setShowAbout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => setShowAbout(false);

  return (
    <Modal
      open={showAbout}
      onClose={handleClose}
      aria-labelledby="about-aitrends-title"
      aria-describedby="about-aitrends-description"
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
        <Typography id="about-aitrends-title" variant="h5" component="h2" gutterBottom>
          AITrends.live: Your AI Exploration Hub
        </Typography>
        <Typography id="about-aitrends-description" variant="body1" sx={{ mb: 2 }}>
          Keeping pace with AI can be daunting. AITrends.live was created to simplify this challenge, offering a
          comprehensive view across 200 AI topics and 25 facets each. From foundational concepts to future predictions,
          technical deep-dives to innovative applications, ethical debates to the funding scene, AI Trends maps out the
          entire AI landscape into a matrix of ideas.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          This is a co-creation by Sitaram Iyer (sitaram at gmail) and ChatGPT. Through 2,500 chat messages in 3 weeks
          spanning ideas, product, design, code, and data, we meticulously curated a resource that informs and hopefully
          inspires. Whether you&apos;re exploring innovative use cases in your field, navigating career paths, or
          looking for upskilling resources, AITrends.live is your go-to.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          Built for both enthusiasts and professionals, AITrends.live is a testament to how AI can transform our
          understanding and engagement with technology for the common good. Dive into the AI revolution with us, your
          journey into AI starts here.
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Got it
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default About;
