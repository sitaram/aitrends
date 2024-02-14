// _app.js
import { useEffect } from 'react';
import ReactGA from 'react-ga';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('G-TX2GLY9R4W');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
