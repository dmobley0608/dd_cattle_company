const { createTheme } = require("@mui/material");


exports.whiteBlack = createTheme({
    palette: {
      primary: {
        main: '#eeeeee',
      },
      secondary: {        
        main:'#212121',      
      },
    },
    transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          // most basic recommended timing
          standard: 300,
          // this is to be used in complex animations
          complex: 375,
          // recommended when something is entering screen
          enteringScreen: 225,
          // recommended when something is leaving screen
          leavingScreen: 195,
        },
      },
  });

  exports.checkbox = createTheme({
    palette: {
      primary: {
        main: '#0086f0',
      },
      secondary: {        
        main:'#0045ac',      
      },
    },
  })