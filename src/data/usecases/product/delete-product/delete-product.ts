import { DeleteProductContract, DeleteProductParams } from '../../../../domain/usecases-contracts/product/delete-product';
import { DeleteProductRepository } from '../../../repositories-contracts/product/delete-product-repository';


export class DeleteProduct implements DeleteProductContract {
	constructor(private readonly deleteProductRepository: DeleteProductRepository){
	}

	async delete (deleteProductParams: DeleteProductParams): Promise<boolean | null>{
		const deleteProduct = await this.deleteProductRepository.delete(deleteProductParams);
		return deleteProduct;
	}
}