import { addProductPath } from './product/add-product-path';
import { editProductPath } from './product/edit-product-path';
import { getProductPath } from './product/get-product-path';
import { loginPath } from './user/login-path';
import { signUpPath } from './user/register-path';


export const swaggerPaths = {
	'/sign-up': signUpPath,
	'/login': loginPath,
	'/add-product': addProductPath,
	'/edit-product': editProductPath,
	'/get-product': getProductPath
};
