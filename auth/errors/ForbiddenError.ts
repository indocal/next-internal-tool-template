import { AuthError } from './AuthError';

export class ForbiddenError extends AuthError {
  constructor(options?: ErrorOptions) {
    super({
      status: 403,
      message: 'No posee permisos para realizar la operación solicitada',
      options,
    });
  }
}

export default ForbiddenError;
