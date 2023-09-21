import { CheckUserHasPixKeyRepository } from '../../../../data/repositories-contracts/user/check-user-has-pix-key-repository';
import { EditUserRepository } from '../../../../data/repositories-contracts/user/edit-user-repository';
import { LoadAccountByEmailRepository } from '../../../../data/repositories-contracts/user/load-account-by-email-repository';
import { RegisterRepository } from '../../../../data/repositories-contracts/user/register-repository';
import { UserModel } from '../../../../domain/models/user';
import { EditUserParams, EditUserReturn } from '../../../../domain/usecases-contracts/user/edit-user';
import { RegisterParams } from '../../../../domain/usecases-contracts/user/register';
import { prisma } from '../../../../main/config/prisma';

export class UserPrismaRepository implements RegisterRepository, LoadAccountByEmailRepository, CheckUserHasPixKeyRepository, EditUserRepository {
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
			role: user.role,
			pixKey: user.pixKey ?? undefined
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
			role: user.role,
			pixKey: user.pixKey ?? undefined
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

	async edit (editUserParams: EditUserParams): Promise<EditUserReturn | null>{
		const { id, pixKey } = editUserParams;
		const userExists = await prisma.user.findFirst({
			where: {
				id
			}
		});
		if(!userExists){
			return null;
		}
		const user = await prisma.user.update({
			data: {
				pixKey
			},
			where: {
				id
			}
		});
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
			cpf: user.cpf,
			role: user.role,
			pixKey: user.pixKey as string
		};
	}
}