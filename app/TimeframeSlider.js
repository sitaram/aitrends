'use client';

import React from 'react';
import { IconButton, Box, ToggleButtonGroup, ToggleButton, Paper, Button, useMediaQuery } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material/styles';

import { timeframes } from './timeframes';

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
    backgroundColor: theme.palette.primary.main,
  },
  '&:not(.Mui-selected):hover': {
    background: `linear-gradient(45deg, ${theme.palette.grey[50]} 10%, ${theme.palette.grey[300]} 90%)`,
  },
  // Adding a gradient background when not selected
  '&:not(.Mui-selected)': {
    background: `linear-gradient(45deg, ${theme.palette.common.white} 10%, ${theme.palette.grey[200]} 90%)`,
  },
}));

const TimeframeSlider = ({ theme, value, onChange, handleTopicsDrawerToggle, handleSwitchTopic }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to handle timeframe change
  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      onChange(newTimeframe);
    }
  };

  return (
    <Paper elevation={3} sx={{ margin: '-8px' }}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          zIndex: 999,
          left: isMobile ? 0 : '240px',
          width: isMobile ? '100%' : 'calc(100% - 240px)',
          padding: isMobile ? 0 : '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#bed3e7',
        }}
      >
        {!isMobile && (
          <IconButton onClick={() => handleSwitchTopic('Previous')}>
            <NavigateBeforeIcon />
          </IconButton>
        )}

        <StyledToggleButtonGroup value={value} exclusive onChange={handleTimeframeChange} aria-label="timeframe">
          {timeframes.map((timeframeItem) => (
            <StyledToggleButton
              key={timeframeItem.toLowerCase()}
              value={timeframeItem.toLowerCase()}
              aria-label={`Select timeframe: ${timeframeItem}`}
            >
              {timeframeItem}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>

        {isMobile ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleTopicsDrawerToggle}
            sx={{
              borderRadius: '32px 32px',
              minWidth: 'auto',
              padding: '10px 10px',
              margin: '4px',
              marginRight: '6px',
              fontSize: '0.875rem',
              textTransform: 'none',
              zIndex: 1201,
              backgroundColor: '#3a506b !important',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            Topics
          </Button>
        ) : (
          <IconButton onClick={() => handleSwitchTopic('Next')}>
            <NavigateNextIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default TimeframeSlider;
