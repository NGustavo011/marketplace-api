import { AuthenticationModel } from '../../models/authentication';

export interface LoginParams {
  email: string
  password: string
}

export interface LoginContract {
  auth: (loginParams: LoginParams) => Promise<AuthenticationModel | null>
}
