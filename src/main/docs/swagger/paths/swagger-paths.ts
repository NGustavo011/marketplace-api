import { addCategoryPath } from './category/add-category-path';
import { deleteCategoryPath } from './category/delete-category-path';
import { editCategoryPath } from './category/edit-category-path';
import { getCategoryPath } from './category/get-category-path';
import { addOrderPath } from './order/add-order-path';
import { editOrderStatusPath } from './order/edit-order-status-path';
import { getOrderPath } from './order/get-order-path';
import { addProductPath } from './product/add-product-path';
import { deleteProductPath } from './product/delete-product-path';
import { editProductPath } from './product/edit-product-path';
import { getProductPath } from './product/get-product-path';
import { loginPath } from './user/login-path';
import { signUpPath } from './user/register-path';


export const swaggerPaths = {
	'/sign-up': signUpPath,
	'/login': loginPath,
	'/get-product': getProductPath,
	'/add-product': addProductPath,
	'/edit-product': editProductPath,
	'/delete-product': deleteProductPath,
	'/get-category': getCategoryPath,
	'/add-category': addCategoryPath,
	'/edit-category': editCategoryPath,
	'/delete-category': deleteCategoryPath,
	'/get-order': getOrderPath,
	'/add-order': addOrderPath,
	'/edit-order-status': editOrderStatusPath 
};
