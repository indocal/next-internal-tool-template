import { AppProps } from 'next/app';

import { EnhancedNextPage } from '@/types';

export type EnhancedNextAppProps = AppProps & {
  Component: EnhancedNextPage;
};

export type EnhancedNextApp = (
  props: EnhancedNextAppProps
) => React.ReactElement;

export default EnhancedNextApp;
