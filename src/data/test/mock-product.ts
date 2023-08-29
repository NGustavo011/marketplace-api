import { ProductModel } from '../../domain/models/product';
import { AddProductParams, AddProductReturn } from '../../domain/usecases-contracts/product/add-product';
import { EditProductParams, EditProductReturn } from '../../domain/usecases-contracts/product/edit-product';
import { GetProductParams, GetProductReturn } from '../../domain/usecases-contracts/product/get-product';
import { ValidateProductPriceParams } from '../../domain/usecases-contracts/product/validate-product-price';
import { AddProductRepository } from '../repositories-contracts/product/add-product-repository';
import { EditProductRepository } from '../repositories-contracts/product/edit-product-repository';
import { GetProductRepository } from '../repositories-contracts/product/get-product-repository';

export const mockProductModel = (): ProductModel => ({
	id: 'any_id',
	categoryId: 'any_category_id',
	category: {
		id: 'any_category_id',
		name: 'any_category_name',
		description: 'any_category_description'
	},
	sellerId: 'any_seller_id',
	seller: {
		id: 'any_seller_id',
		email: 'any_seller_email',
		name: 'any_seller_name',
		password: 'any_seller_password',
		role: 'user'
	},
	description: 'any_description',
	name: 'any_name',
	urlImage: 'any_url_image',
	listPrice: 0,
	salePrice: 0
});

export const mockGetProductParams = (): GetProductParams => ({
	id: 'any_id'
});

export const mockProductPriceParams = (): ValidateProductPriceParams => ({
	salePrice: 200,
	listPrice: 200
});

export const mockAddProductParams = (): AddProductParams => ({
	categoryId: 'any_category_id',
	userId: 'any_user_id',
	description: 'any_description',
	name: 'any_name',
	urlImage: 'any_url_image',
	listPrice: 0,
	salePrice: 0
});

export const mockEditProductParams = (): EditProductParams => ({
	id: 'any_id',
	userId: 'any_user_id',
	product: {
		categoryId: 'any_category_id',
		description: 'any_description',
		name: 'any_name',
		urlImage: 'any_url_image',
		listPrice: 0,
		salePrice: 0
	}
});

export const mockGetProductRepository = (): GetProductRepository => {
	class GetProductRepositoryStub implements GetProductRepository {
		async get(): Promise<GetProductReturn | null>{
			return await Promise.resolve([mockProductModel()]);
		}
	}
	return new GetProductRepositoryStub();
};

export const mockAddProductRepository = (): AddProductRepository => {
	class AddProductRepositoryStub implements AddProductRepository {
		async add(): Promise<AddProductReturn | null>{
			return await Promise.resolve(mockProductModel());
		}
	}
	return new AddProductRepositoryStub();
};

export const mockEditProductRepository = (): EditProductRepository => {
	class EditProductRepositoryStub implements EditProductRepository {
		async edit(): Promise<EditProductReturn | null>{
			return await Promise.resolve(mockProductModel());
		}
	}
	return new EditProductRepositoryStub();
};