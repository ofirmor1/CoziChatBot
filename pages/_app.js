// pages/_app.js
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import SideMenu from '../components/SideMenu';
import '../styles/globals.css';

function AppContent({ Component, pageProps }) {
  const { isSideMenuOpen, toggleSideMenu } = useChat();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (isSideMenuOpen) toggleSideMenu();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, isSideMenuOpen, toggleSideMenu]);

  return (
    <>
      <SideMenu />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </ChatProvider>
    </AuthProvider>
  );
}

export default MyApp;