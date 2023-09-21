import { CheckUserHasPixKeyRepository } from '../../../../data/repositories-contracts/user/check-user-has-pix-key-repository';
import { LoadAccountByEmailRepository } from '../../../../data/repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../../../../data/repositories-contracts/user/register-repository';
import { UserModel } from '../../../../domain/models/user';
import { RegisterParams } from '../../../../domain/usecases-contracts/user/register';
import { prisma } from '../../../../main/config/prisma';

export class UserPrismaRepository implements RegisterRepository, LoadAccountByEmailRepository, CheckUserHasPixKeyRepository {
	async add (registerParams: Omit<RegisterParams, 'confirmPassword'>): Promise<UserModel> {
		const { email, name, password, cpf } = registerParams;
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
				cpf,
				role: 'user',
			}
		});
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
			cpf: user.cpf,
			role: user.role
		};
	}

	async loadByEmail(email: string): Promise<UserModel | null>{
		const user = await prisma.user.findFirst({
			where: { email }
		});
		if(!user){
			return null;
		}
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
			cpf: user.cpf,
			role: user.role
		};
	}

	async checkUserHasPixKey (id: string): Promise<boolean | null>{
		const user = await prisma.user.findFirst({
			where: {
				id
			}
		});
		if(!user){
			return null;
		}
		return user.pixKey ? true : false;
	}
}