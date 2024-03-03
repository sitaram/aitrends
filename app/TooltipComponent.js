import React, { useState, useEffect } from 'react';
import { Tooltip, tooltipClasses, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function TooltipComponent({ open, onClose, onClick }) {
  const theme = useTheme();
  const CustomWidthTooltip = styled(({ theme, className, ...props }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] } }}
    />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '95%',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.tabbar,
      padding: '10px',
      margin: 'auto',
      backgroundColor: '#f5faf5',
      border: '1px solid #dadde9',
    },
    [`@media (min-width: ${600 / 0.95}px)`]: {
      [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: '600px',
      },
    },
  });

  const categories = {
    Introduction: ['Overview', 'Expert Q&A', 'Innovative Use Cases', 'Ecosystem'],
    'Updates & Insights': ['News', 'Recap', 'Evolution', 'Future Roadmap'],
    'Development & Job Opportunities': [
      'Funding and Investment',
      'Career Paths',
      'Skill Development',
      'Community and Events',
    ],
    'Technology Focus': ['Tech Stack', 'Tech Deep Dive', 'AI Tools and Platforms'],
    'Policy & Ethics': [
      'Research',
      'Expert Opinions',
      'Policy and Regulation',
      'Ethics',
      'Challenges and Solutions',
      'Global Perspectives',
    ],
    'Applications & Impact': ['Comparisons', 'Applications', 'Case Studies', 'Impact'],
  };

  return (
    <CustomWidthTooltip
      title={
        <>
          <Typography variant="h5">Lots of tabs</Typography>
          {Object.entries(categories).map(([category, tabs]) => (
            <span key={category} sx={{ margin: 2 }}>
              <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
                {category}
              </Typography>
              <span>
                {tabs.map((tab) => (
                  <Chip
                    key={tab}
                    label={tab}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5, borderColor: '#dadde9' }}
                  />
                ))}
              </span>
            </span>
          ))}
        </>
      }
      open={open}
      onClose={onClose}
      arrow
    >
      <IconButton color="primary" style={{ padding: 0, verticalAlign: '-2px' }} onClick={onClick}>
        <InfoIcon />
      </IconButton>
    </CustomWidthTooltip>
  );
}
