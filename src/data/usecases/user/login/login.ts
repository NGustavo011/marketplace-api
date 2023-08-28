import { LoginContract, LoginParams, LoginReturn } from '../../../../domain/usecases-contracts/user/login';
import { EncrypterRepository } from '../../../repositories-contracts/cryptography/encrypter-repository';
import { HashComparerRepository } from '../../../repositories-contracts/cryptography/hash-comparer-repository';
import { LoadAccountByEmailRepository } from '../../../repositories-contracts/user/load-account-by-email-repository';

export class Login implements LoginContract {
	constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparerRepository: HashComparerRepository,
    private readonly encrypterRepository: EncrypterRepository
	) {
	}

	async auth (loginParams: LoginParams): Promise<LoginReturn | null> {
		const { email, password } = loginParams;
		const userFounded = await this.loadAccountByEmailRepository.loadByEmail(email);
		if (!userFounded) return null;
		const passwordIsValid = await this.hashComparerRepository.compare(password, userFounded.password);
		if (!passwordIsValid) return null;
		const accessToken = await this.encrypterRepository.encrypt(userFounded.id);
		return {
			accessToken,
			name: userFounded.name
		};
	}
}
