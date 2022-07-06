import { AuthError } from './AuthError';

export class DisabledUserError extends AuthError {
  constructor(options?: ErrorOptions) {
    super({
      status: 403,
      message: 'Usuario bloqueado',
      options,
    });
  }
}

export default DisabledUserError;
