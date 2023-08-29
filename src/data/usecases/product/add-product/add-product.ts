import { AddProductContract, AddProductParams, AddProductReturn } from '../../../../domain/usecases-contracts/product/add-product';
import { AddProductRepository } from '../../../repositories-contracts/product/add-product-repository';


export class AddProduct implements AddProductContract {
	constructor(private readonly addProductRepository: AddProductRepository){
	}

	async add (addProductParams: AddProductParams): Promise<AddProductReturn | null>{
		const product = await this.addProductRepository.add(addProductParams);
		return product;
	}
}