import { AddOrderContract, AddOrderParams, AddOrderReturn } from '../../../../domain/usecases-contracts/order/add-order';
import { AddOrderRepository } from '../../../repositories-contracts/order/add-order-repository';

export class AddOrder implements AddOrderContract {
	constructor(private readonly addOrderRepository: AddOrderRepository){
	}

	async add(addOrderParams: AddOrderParams): Promise<AddOrderReturn | null>{
		const order = this.addOrderRepository.add(addOrderParams);
		return order;
	}
}