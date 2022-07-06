import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';

import { AuthProvider } from '@/auth';
import { ThemeProvider } from '@/theme';
import { DialogsProvider } from '@/context';
import { ErrorBoundary, Loader } from '@/components';
import { axiosFetcher } from '@/utils';
import { EnhancedNextApp } from '@/types';

const App: EnhancedNextApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [boostraping, setBoostraping] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setBoostraping(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary fullscreen message="Error al cargar la aplicación">
      <SessionProvider session={pageProps.session}>
        <SWRConfig value={{ fetcher: axiosFetcher }}>
          <ThemeProvider>
            <SnackbarProvider>
              <DialogsProvider>
                <AuthProvider>
                  {boostraping ? (
                    <Loader fullscreen invisible />
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )}
                </AuthProvider>
              </DialogsProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default App;
