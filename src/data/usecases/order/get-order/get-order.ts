import { GetOrderContract, GetOrderParams, GetOrderReturn } from '../../../../domain/usecases-contracts/order/get-order';
import { GetOrderRepository } from '../../../repositories-contracts/order/get-order-repository';

export class GetOrder implements GetOrderContract {
	constructor(private readonly getOrderRepository: GetOrderRepository){
	}

	async get(getOrderParams: GetOrderParams): Promise<GetOrderReturn | null> {
		const orders = await this.getOrderRepository.get(getOrderParams);
		return orders;
	}
}