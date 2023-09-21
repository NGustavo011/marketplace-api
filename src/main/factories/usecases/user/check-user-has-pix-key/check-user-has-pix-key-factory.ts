import { CheckUserHasPixKey } from '../../../../../data/usecases/user/check-user-has-pix-key/check-user-has-pix-key';
import { CheckUserHasPixKeyContract } from '../../../../../domain/usecases-contracts/user/check-user-has-pix-key';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/user/user-prisma-repository';

export const makeCheckUserHasPixKey = (): CheckUserHasPixKeyContract => {
	const userPrismaRepository = new UserPrismaRepository();
	return new CheckUserHasPixKey(userPrismaRepository);
};
