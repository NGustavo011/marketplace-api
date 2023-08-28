import { AuthenticationModel } from '../../models/authentication';

export interface LoginParams {
  email: string
  password: string
}
export type LoginReturn = AuthenticationModel

export interface LoginContract {
  auth: (loginParams: LoginParams) => Promise<LoginReturn | null>
}
