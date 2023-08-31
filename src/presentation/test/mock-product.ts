import { mockProductModel } from '../../data/test/mock-product';
import { AddProductContract, AddProductReturn } from '../../domain/usecases-contracts/product/add-product';
import { DeleteProductContract } from '../../domain/usecases-contracts/product/delete-product';
import { EditProductContract, EditProductReturn } from '../../domain/usecases-contracts/product/edit-product';
import { GetProductContract, GetProductReturn } from '../../domain/usecases-contracts/product/get-product';
import { ValidateProductPriceContract } from '../../domain/usecases-contracts/product/validate-product-price';

export const mockAddProduct = (): AddProductContract => {
	class AddProductStub implements AddProductContract {
		async add (): Promise<AddProductReturn | null> {
			return await Promise.resolve(mockProductModel());
		}
	}
	return new AddProductStub();
};

export const mockValidateProductPrice = (): ValidateProductPriceContract => {
	class ValidateProductPriceStub implements ValidateProductPriceContract {
		validate (): boolean | null{
			return true;
		}
	}
	return new ValidateProductPriceStub();
};

export const mockDeleteProduct = (): DeleteProductContract => {
	class DeleteProductStub implements DeleteProductContract {
		async delete (): Promise<boolean | null>{
			return await Promise.resolve(true);
		}
	}
	return new DeleteProductStub();
};

export const mockEditProduct = (): EditProductContract => {
	class EditProductStub implements EditProductContract {
		async edit (): Promise<EditProductReturn | null>{
			return await Promise.resolve(mockProductModel());
		}
	}
	return new EditProductStub();
};

export const mockGetProduct = (): GetProductContract => {
	class GetProductStub implements GetProductContract {
		async get (): Promise<GetProductReturn | null>{
			return await Promise.resolve([mockProductModel()]);
		}
	}
	return new GetProductStub();
};