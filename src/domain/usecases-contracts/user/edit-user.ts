import { UserModel } from '../../models/user';

export interface EditUserParams {
  id: string
  pixKey: string
}
export type EditUserReturn = UserModel

export interface EditUserContract {
  edit: (editUserParams: EditUserParams) => Promise<EditUserReturn | null>
}
