import { EditUser } from '../../../../../data/usecases/user/edit-user/edit-user';
import { EditUserContract } from '../../../../../domain/usecases-contracts/user/edit-user';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/user/user-prisma-repository';

export const makeEditUser = (): EditUserContract => {
	const userPrismaRepository = new UserPrismaRepository();
	return new EditUser(userPrismaRepository);
};
