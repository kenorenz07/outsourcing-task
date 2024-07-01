import AuthChecker from '@/components/auth/AuthChecker';
import MainLayout from '@/components/layouts/MainLayout';
import theme from '@/plugins/mui';
import store from '@/redux/store';
import '@/styles/globals.scss';
import { AppPropsType } from '@/types/app-components';
import { ThemeProvider } from '@emotion/react';

import { Provider as ReduxProvider } from 'react-redux';

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <MainLayout {...pageProps}>
          <AuthChecker parent={Component}>
            <Component {...pageProps} />
          </AuthChecker>
        </MainLayout>
      </ThemeProvider>
    </ReduxProvider>
  );
}
