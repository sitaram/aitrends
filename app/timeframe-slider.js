'use client'

import React from 'react';
import { ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Styling for ToggleButtonGroup
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

// Custom Styling for ToggleButton
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.common.white,
  '&.Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:not(.Mui-selected):hover': {
    background: `linear-gradient(45deg, ${theme.palette.grey[50]} 10%, ${theme.palette.grey[300]} 90%)`,
  },
  // Adding a gradient background when not selected
  '&:not(.Mui-selected)': {
    background: `linear-gradient(45deg, ${theme.palette.common.white} 10%, ${theme.palette.grey[200]} 90%)`,
  },
}));

const TimeframeSlider = ({ value, onChange }) => {
  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      onChange(newTimeframe);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '8px', margin: '-16px 0 16px' }}>
      <StyledToggleButtonGroup
        value={value}
        exclusive
        onChange={handleTimeframeChange}
        aria-label="timeframe"
      >
        <StyledToggleButton value="last two weeks" aria-label="last two weeks">
          Last Two Weeks
        </StyledToggleButton>
        <StyledToggleButton value="last 3 months" aria-label="last 3 months">
          Last 3 Months
        </StyledToggleButton>
        <StyledToggleButton value="last year" aria-label="last year">
          Last Year
        </StyledToggleButton>
        <StyledToggleButton value="last decade" aria-label="last decade">
          Last Decade
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default TimeframeSlider;

