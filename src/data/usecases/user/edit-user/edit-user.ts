import { EditUserContract, EditUserParams, EditUserReturn } from '../../../../domain/usecases-contracts/user/edit-user';
import { EditUserRepository } from '../../../repositories-contracts/user/edit-user-repository';

export class EditUser implements EditUserContract {
	constructor (
    private readonly editUserRepository: EditUserRepository
	) {
	}
	async edit(editUserParams: EditUserParams): Promise<EditUserReturn | null>{
		const user = await this.editUserRepository.edit(editUserParams);
		return user;
	}
	
}
