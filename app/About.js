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
          ethical debates to the funding scene, technical deep-dives to innovative applications, our platform lays out a
          detailed map of AI&apos;s landscape.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          Through over 100 chat sessions with ChatGPT, we meticulously curated a resource that not only informs but
          inspires. Whether you&apos;re navigating career paths, looking for upskilling resources, or exploring
          innovative use cases in your field, AITrends.live is your go-to destination.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          Built for enthusiasts and professionals alike, AITrends.live is a testament to how AI can transform our
          understanding and engagement with technology. Dive into the AI revolution with us. Your journey into AI starts
          here.
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default About;
