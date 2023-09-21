import { CheckUserHasPixKeyContract, CheckUserHasPixKeyParams, CheckUserHasPixKeyReturn } from '../../../../domain/usecases-contracts/user/check-user-has-pix-key';
import { CheckUserHasPixKeyRepository } from '../../../repositories-contracts/user/check-user-has-pix-key-repository';

export class CheckUserHasPixKey implements CheckUserHasPixKeyContract {
	constructor (
    private readonly checkUserHasPixKeyRepository: CheckUserHasPixKeyRepository
	) {
	}
	async check(id: CheckUserHasPixKeyParams): Promise<CheckUserHasPixKeyReturn | null>{
		const userHasPixKey = await this.checkUserHasPixKeyRepository.checkUserHasPixKey(id);
		return userHasPixKey;
	}
	
}
