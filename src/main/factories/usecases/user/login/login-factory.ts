import { Login } from '../../../../../data/usecases/user/login/login';
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/user/user-prisma-repository';
import env from '../../../../config/env';

export const makeLogin = (): Login => {
	const salt = 12;
	const userPrismaRepository = new UserPrismaRepository();
	const bcryptAdapter = new BcryptAdapter(salt);
	const jwtAdapter = new JwtAdapter(env.jwtSecret);
	return new Login(userPrismaRepository, bcryptAdapter, jwtAdapter);
};
