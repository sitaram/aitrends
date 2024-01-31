'use client'

import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Paper, Button } from '@mui/material';
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

const TimeframeSlider = ({ value, onChange, handleTopicsDrawerToggle }) => {
  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      onChange(newTimeframe);
    }
  };

  return (
    <Box
       sx={{
	 position: 'fixed',
	 bottom: 0,
	 left: 0,
	 width: '100%',
	 zIndex: 999, // Ensure the slider is above other content
	 backgroundColor: 'white',
       }}
     >
      <Paper elevation={3} sx={{ margin: '-8px' }}>
	<StyledToggleButtonGroup
	  value={value}
	  exclusive
	  onChange={handleTimeframeChange}
	  aria-label="timeframe"
	  sx={{
	    width: '80%',
	  }}
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleTopicsDrawerToggle}
          sx={{
            borderRadius: '32px 32px',
            minWidth: 'auto',
            padding: '16px',
            fontSize: '0.875rem',
            textTransform: 'none',
            position: 'absolute',
            bottom: '8px',
            right: 0, // Position it on the right
            zIndex: 1201,
            backgroundColor: '#3a506b !important',
            color: '#fff',
            opacity: 1,
            '&:hover': {
              backgroundColor: '#1976d2',
              opacity: 1,
            },
          }}
        >
          Topics
        </Button>
      </Paper>
    </Box>
  );
};

export default TimeframeSlider;

