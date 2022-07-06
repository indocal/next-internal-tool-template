import { ApiError, ApiErrorConstructor } from '@/utils';

export class AuthError extends ApiError {
  constructor(constructor: ApiErrorConstructor) {
    super(constructor);

    this.name = 'AuthError';
  }
}

export default AuthError;
