import { EditOrderStatusContract, EditOrderStatusParams, EditOrderStatusReturn } from '../../../../domain/usecases-contracts/order/edit-order-status';
import { EditOrderStatusRepository } from '../../../repositories-contracts/order/edit-order-status-repository';

export class EditOrderStatus implements EditOrderStatusContract {
	constructor(private readonly editOrderStatusRepository: EditOrderStatusRepository){
	}

	async edit(editOrderStatusParams: EditOrderStatusParams): Promise<EditOrderStatusReturn | null>{
		const order = this.editOrderStatusRepository.edit(editOrderStatusParams);
		return order;
	}
}