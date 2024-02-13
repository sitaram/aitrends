import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-TX2GLY9R4W" />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TX2GLY9R4W');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
