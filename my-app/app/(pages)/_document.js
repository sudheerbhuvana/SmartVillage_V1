// app/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Html {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            src="/service-worker.js"
            strategy="afterInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;