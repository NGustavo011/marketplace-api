import { EditProductContract, EditProductParams, EditProductReturn } from '../../../../domain/usecases-contracts/product/edit-product';
import { EditProductRepository } from '../../../repositories-contracts/product/edit-product-repository';

export class EditProduct implements EditProductContract {
	constructor(private readonly editProductRepository: EditProductRepository){
	}

	async edit (editProductParams: EditProductParams): Promise<EditProductReturn | null>{
		const editedProduct = await this.editProductRepository.edit(editProductParams);
		return editedProduct;
	}
}