import { SignIn } from '@/auth';
import { Page } from '@/components';
import { EnhancedNextPage } from '@/types';

const SignInPage: EnhancedNextPage = () => (
  <Page title="Iniciar sesión">
    <SignIn />
  </Page>
);

export default SignInPage;
