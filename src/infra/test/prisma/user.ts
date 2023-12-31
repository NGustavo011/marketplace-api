import { mockUserModel } from '../../../data/test/mock-user';
import { prisma } from '../../../main/config/prisma';


export const mockPrismaUser = async (): Promise<void> => {
	const userModel = mockUserModel();
	await prisma.user.create({
		data: {
			id: 'user_id',
			name: userModel.name,
			email: userModel.email,
			password: userModel.password,
			role: userModel.role,
			cpf: userModel.cpf
		}
	});
};

export const mockPrismaUserWithPixKey = async (): Promise<void> => {
	const userModel = mockUserModel();
	await prisma.user.create({
		data: {
			id: 'user_id_with_pix_key',
			name: userModel.name,
			email: userModel.email,
			password: userModel.password,
			role: userModel.role,
			cpf: userModel.cpf,
			pixKey: userModel.pixKey
		}
	});
};