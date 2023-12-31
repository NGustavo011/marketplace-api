import jwt from 'jsonwebtoken';
import { type EncrypterRepository } from '../../../data/repositories-contracts/cryptography/encrypter-repository';
import { type DecrypterRepository } from '../../../data/repositories-contracts/cryptography/decrypter-repository';
import { DecrypterPayload } from '../../../domain/usecases-contracts/user/validate-token';

export class JwtAdapter implements EncrypterRepository, DecrypterRepository {
	constructor (private readonly secret: string) {}
	async encrypt (id: string): Promise<string> {
		const accessToken = jwt.sign({ id }, this.secret, { expiresIn: '2h' });
		return await new Promise(resolve => { resolve(accessToken); });
	}

	async validateToken (token: string): Promise<DecrypterPayload | null> {
		try {
			const decoded = jwt.verify(token, this.secret);
			return {
				userId: (await Promise.resolve(decoded) as JwtVerifyToken).id
			};
		} catch (error) {
			return null;
		}
	}
}

export interface JwtVerifyToken {
  id: string
  iat: number
  exp: number
}
