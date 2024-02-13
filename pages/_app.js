// _app.js
import { useEffect } from 'react';
import { initGA, logPageView } from './analytics'; // Import the utility you created

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA(); // Initialize Google Analytics
    logPageView(); // Log the initial page view

    // Add additional tracking logic as needed
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
