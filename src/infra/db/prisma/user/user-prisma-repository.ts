import { LoadAccountByEmailRepository } from '../../../../data/repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../../../../data/repositories-contracts/user/register-repository';
import { UserModel } from '../../../../domain/models/user';
import { RegisterParams } from '../../../../domain/usecases-contracts/user/register';
import { prisma } from '../../../../main/config/prisma';

export class UserPrismaRepository implements RegisterRepository, LoadAccountByEmailRepository {
	async add (registerParams: Omit<RegisterParams, 'confirmPassword'>): Promise<UserModel> {
		const { email, name, password } = registerParams;
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
				role: 'user',
			}
		});
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
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
			role: user.role
		};
	}
}