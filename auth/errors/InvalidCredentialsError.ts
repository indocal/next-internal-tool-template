import { AuthError } from './AuthError';

export class InvalidCredentialsError extends AuthError {
  constructor(options?: ErrorOptions) {
    super({
      status: 401,
      message: 'El usuario no existe o las credenciales son incorrectas',
      options,
    });
  }
}

export default InvalidCredentialsError;
