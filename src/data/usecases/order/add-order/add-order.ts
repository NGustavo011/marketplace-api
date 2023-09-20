import { AddOrderContract, AddOrderParams, AddOrderReturn } from '../../../../domain/usecases-contracts/order/add-order';
import env from '../../../../main/config/env';
import { AddOrderRepository } from '../../../repositories-contracts/order/add-order-repository';
import { GeneratePixRepository } from '../../../repositories-contracts/order/generate-pix-repository';
import { CalculateTotalValueRepository } from '../../../repositories-contracts/product/calculate-total-value-repository';

export class AddOrder implements AddOrderContract {
	constructor(
		private readonly calculateTotalValueRepository: CalculateTotalValueRepository,
		private readonly gnApiAdapter: GeneratePixRepository,
		private readonly addOrderRepository: AddOrderRepository
	){
	}

	async add(addOrderParams: AddOrderParams): Promise<AddOrderReturn | null>{
		const { buyerId, paymentMethod, products, sellerId, status } = addOrderParams;
		const duration = Number(env.pixDuration);
		const value = await this.calculateTotalValueRepository.calculate({ products });
		const locId = await this.gnApiAdapter.createChargePix({
			duration,
			value
		});
		const qrCodeExpiration = new Date(new Date().getTime() + duration);
		
		const { txId, qrCode, qrCodeImage } = await this.gnApiAdapter.generateQrCode(locId);
		const order = this.addOrderRepository.add({
			buyerId,
			sellerId,
			paymentMethod,
			products,
			status,
			txId,
			qrCode,
			qrCodeImage,
			qrCodeExpiration
		});
		return order;
	}
}