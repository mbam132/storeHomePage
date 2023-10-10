import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { UserProvider } from '../hooks/useUser';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import '../styles.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });

    Router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Head>
          <title>Prueba Front End</title>
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
