import { UserModel } from '../../../domain/models/user';
import { RegisterParams } from '../../../domain/usecases-contracts/user/register';

export interface RegisterRepository {
  add: (registerParams: Omit<RegisterParams, 'confirmPassword'>) => Promise<UserModel>
}
