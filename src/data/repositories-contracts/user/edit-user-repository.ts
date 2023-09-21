import { EditUserParams, EditUserReturn } from '../../../domain/usecases-contracts/user/edit-user';

export interface EditUserRepository {
    edit: (editUserParams: EditUserParams) => Promise<EditUserReturn | null>
}
  