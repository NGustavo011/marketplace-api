import { UserModel } from '../../models/user';

export interface RegisterParams {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export type RegisterReturn = UserModel

export interface RegisterContract {
  add: (user: RegisterParams) => Promise< | null>
}
