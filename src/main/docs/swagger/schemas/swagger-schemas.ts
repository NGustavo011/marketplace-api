
import { categorySchema } from './category/category';
import { addProductSchema } from './product/add-product';
import { productSchema } from './product/product';
import { errorSchema } from './shared/error-schema';
import { accountSchema } from './user/account';
import { loginSchema } from './user/login';
import { registerSchema } from './user/register';
import { userSchema } from './user/user';

export const swaggerSchemas = {
	account: accountSchema,
	addProduct: addProductSchema,
	category: categorySchema,
	login: loginSchema,
	product: productSchema,
	register: registerSchema,
	user: userSchema,
	error: errorSchema,
};
