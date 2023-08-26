
import { addCategorySchema } from './category/add-category';
import { categorySchema } from './category/category';
import { getCategorySchema } from './category/get-category';
import { addOrderSchema } from './order/add-order';
import { orderSchema } from './order/order';
import { orderItemSchema } from './order/order-item';
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
	addOrder: addOrderSchema,
	addProduct: addProductSchema,
	category: categorySchema,
	getCategory: getCategorySchema,
	getProduct: getProductSchema,
	login: loginSchema,
	order: orderSchema,
	orderItem: orderItemSchema,
	product: productSchema,
	register: registerSchema,
	user: userSchema,
	error: errorSchema,
};
