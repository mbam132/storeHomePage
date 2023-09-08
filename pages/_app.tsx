import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';

import '../styles.css';

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
    <>
      <Head>
        <title>Prueba Front End</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <BottomBar />
    </>
  );
}

export default MyApp;
