import Head from 'next/head';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from '../context/auth-context';

const queryConfig = {
  refetchAllOnWindowFocus: false,
  staleTime: 60 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
};

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Task List</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <ReactQueryConfigProvider config={queryConfig}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ReactQueryConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default MyApp;
