import React, { useState, useEffect } from 'react';

import { Button, Tooltip, tooltipClasses, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import { Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tabs as allTabs } from './tabs';
import Grow from '@mui/material/Grow';

export default function TooltipComponent({ open, onClose, onClick, handleTabChange }) {
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
      backgroundColor: '#f8ffd8',
      borderRadius: '10px',
      boxShadow: '0 0 10px 0 ' + theme.palette.primary.main,
    },
    [`@media (min-width: ${600 / 0.95}px)`]: {
      [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: '600px',
      },
    },
  });

  const categories = {
    Introduction: ['Overview', 'Expert Q&A', 'News', 'Innovative Use Cases', 'Ecosystem'],
    'Updates & Insights': ['Recap', 'Evolution', 'Future Roadmap'],
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
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Lots of tabs (choose one?)
          </Typography>
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
                    sx={{
                      mr: 0.5,
                      mb: 0.5,
                      borderColor: theme.palette.tertiary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main + ' !important',
                        color: '#ffffff',
                        borderColor: theme.palette.primary.main, // Optionally, you can ensure the border color matches during hover
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      const index = allTabs.findIndex((t) => t === tab);
                      if (index !== -1) handleTabChange(null, index);
                      onClose();
                    }}
                  />
                ))}
              </span>
            </span>
          ))}
          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              Got it!
            </Button>
          </Box>
        </>
      }
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 500 }}
      open={open}
      onClose={onClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      arrow
    >
      <IconButton color="primary" style={{ padding: 0, verticalAlign: '-2px' }} onClick={onClick}>
        {!open ? <ArrowDropDownCircleTwoToneIcon /> : <ArrowDropDownCircleIcon />}
      </IconButton>
    </CustomWidthTooltip>
  );
}
