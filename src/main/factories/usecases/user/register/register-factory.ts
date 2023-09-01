import { Register } from '../../../../../data/usecases/user/register/register';
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/user/user-prisma-repository';


export const makeRegister = (): Register => {
	const salt = 12;
	const bcryptAdapter = new BcryptAdapter(salt);
	const userPrismaRepository = new UserPrismaRepository();
	return new Register(bcryptAdapter, userPrismaRepository, userPrismaRepository);
};
