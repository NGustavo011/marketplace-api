
import { addCategorySchema } from './category/add-category';
import { categorySchema } from './category/category';
import { getCategorySchema } from './category/get-category';
import { addProductSchema } from './product/add-product';
import { getProductSchema } from './product/get-product';
import { productSchema } from './product/product';
import { errorSchema } from './shared/error-schema';
import { accountSchema } from './user/account';
import { loginSchema } from './user/login';
import { registerSchema } from './user/register';
import { userSchema } from './user/user';

export const swaggerSchemas = {
	account: accountSchema,
	addCategory: addCategorySchema,
	addProduct: addProductSchema,
	category: categorySchema,
	getCategory: getCategorySchema,
	getProduct: getProductSchema,
	login: loginSchema,
	product: productSchema,
	register: registerSchema,
	user: userSchema,
	error: errorSchema,
};
