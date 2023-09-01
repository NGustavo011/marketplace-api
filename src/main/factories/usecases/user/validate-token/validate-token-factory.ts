import { ValidateToken } from '../../../../../data/usecases/user/validate-token/validate-token';
import { ValidateTokenContract } from '../../../../../domain/usecases-contracts/user/validate-token';
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter';
import env from '../../../../config/env';

export const makeValidateToken = (): ValidateTokenContract => {
	const secret = env.jwtSecret;
	const jwtAdapter = new JwtAdapter(secret); 
	return new ValidateToken(jwtAdapter);
};
