import { addCategoryPath } from './category/add-category-path';
import { deleteCategoryPath } from './category/delete-category-path';
import { editCategoryPath } from './category/edit-category-path';
import { addProductPath } from './product/add-product-path';
import { deleteProductPath } from './product/delete-product-path';
import { editProductPath } from './product/edit-product-path';
import { getProductPath } from './product/get-product-path';
import { loginPath } from './user/login-path';
import { signUpPath } from './user/register-path';


export const swaggerPaths = {
	'/sign-up': signUpPath,
	'/login': loginPath,
	'/add-product': addProductPath,
	'/edit-product': editProductPath,
	'/delete-product': deleteProductPath,
	'/get-product': getProductPath,
	'/add-category': addCategoryPath,
	'/edit-category': editCategoryPath,
	'/delete-category': deleteCategoryPath
};
