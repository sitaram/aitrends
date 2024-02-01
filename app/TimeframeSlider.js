'use client'

import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Paper, Button, useMediaQuery } from '@mui/material';
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

const TimeframeSlider = ({ theme, value, onChange, handleTopicsDrawerToggle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
	   zIndex: 999, // Ensure the slider is above other content
	   left: !isMobile ? '240px' : 0,
	   width: !isMobile ? 'calc(100% - 240px)' : '100%',
	   paddingLeft: !isMobile ? '240px' : 0,
	   display: 'flex',
	   justifyContent: 'space-between',
	   alignItems: 'center',
	   backgroundColor: '#bed3e7',
	 }}
       >
	<StyledToggleButtonGroup
	  value={value}
	  exclusive
	  onChange={handleTimeframeChange}
	  aria-label="timeframe"
	  sx={{
	    bottom: 0,
	    display: 'flex',
	    justifyContent: 'space-between',
	    alignItems: 'center',
	  }}
	>
	  {timeframes.map((timeframeItem) => (
            <StyledToggleButton
              key={timeframeItem.toLowerCase()}
              value={timeframeItem.toLowerCase()}
              aria-label={timeframeItem.toLowerCase()}
              sx={{ flexGrow: 1 }}
            >
              {timeframeItem}
            </StyledToggleButton>
          ))}
	</StyledToggleButtonGroup>

        <Button
          variant="contained"
          color="primary"
          onClick={handleTopicsDrawerToggle}
          sx={{
            borderRadius: '32px 32px',
            minWidth: 'auto',
            padding: '15px 10px',
	    margin: '6px',
	    marginRight: !isMobile ? '60px' : 0,
            fontSize: '0.875rem',
            textTransform: 'none',
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
      </Box>
    </Paper>
  );
};

export default TimeframeSlider;

