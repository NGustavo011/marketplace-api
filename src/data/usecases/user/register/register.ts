import { RegisterContract, RegisterParams, RegisterReturn } from '../../../../domain/usecases-contracts/user/register';
import { HasherRepository } from '../../../repositories-contracts/cryptography/hasher-repository';
import { LoadAccountByEmailRepository } from '../../../repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../../../repositories-contracts/user/register-repository';


export class Register implements RegisterContract {
	constructor (
    private readonly hasherRepository: HasherRepository,
    private readonly registerRepository: RegisterRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
	) {
	}
	async add (user: RegisterParams): Promise<RegisterReturn | null> {
		const { name, email, password } = user;
		const userFounded = await this.loadAccountByEmailRepository.loadByEmail(email);
		if (userFounded) return null;
		const hashedPassword = await this.hasherRepository.hash(password);
		const userCreated = await this.registerRepository.add({
			email,
			name,
			password: hashedPassword
		});
		return userCreated;
	}
}
