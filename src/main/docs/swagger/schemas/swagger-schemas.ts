
import { errorSchema } from './shared/error-schema';
import { accountSchema } from './user/account';
import { loginSchema } from './user/login';
import { registerSchema } from './user/register';


export const swaggerSchemas = {
	account: accountSchema,
	login: loginSchema,
	register: registerSchema,
	error: errorSchema,
};
