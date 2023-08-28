import { UserModel } from '../../../domain/models/user';

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<UserModel | null>
}
