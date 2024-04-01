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
          AITrends.live: Get Ahead on AI!
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography id="about-aitrends-description" variant="body1" sx={{ mb: 2 }}>
          I find it hard to keep up with AI. So I created AITrends, offering a comprehensive view across 200 AI topics
          and 25 aspects of each topic. From foundational concepts to future predictions, technical deep-dives to
          innovative applications, ethical debates to recently funding startups, AI Trends maps out the entire AI
          landscape into a matrix of 5,000 ideas.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          This is a co-creation by Sitaram Iyer (sitaram at gmail) and ChatGPT. Through 3,000 chat messages in 3 weeks,
          spanning ideas, product, design, code, and data, even the domain name and color scheme, the two of us curated
          a resource that informs and hopefully inspires. Whether you&apos;re exploring innovative use cases in your
          field, researching career paths, or looking for upskilling resources, AITrends could be your starting point.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          Under the hood, this uses the OpenAI API with meta-prompting (ChatGPT generated tabs and prompts), recursive
          summarization (overview tab is a summary of the other tabs), Bing API to freshen up the News, Events, and
          Research tabs, YouTube API for a splash of fun, and is written in Next.js and hosted on Vercel.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          Hope you enjoy learning AI (using AI)!
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default About;
