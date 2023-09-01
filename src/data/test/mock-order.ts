import { OrderModel } from '../../domain/models/order';
import { OrderItemModel } from '../../domain/models/order-item';
import { AddOrderParams, AddOrderReturn } from '../../domain/usecases-contracts/order/add-order';
import { EditOrderStatusParams, EditOrderStatusReturn } from '../../domain/usecases-contracts/order/edit-order-status';
import { GetOrderParams, GetOrderReturn } from '../../domain/usecases-contracts/order/get-order';
import { ValidateOrderSellerParams } from '../../domain/usecases-contracts/order/validate-order-seller';
import { AddOrderRepository } from '../repositories-contracts/order/add-order-repository';
import { EditOrderStatusRepository } from '../repositories-contracts/order/edit-order-status-repository';
import { GetOrderRepository } from '../repositories-contracts/order/get-order-repository';
import { ValidateOrderSellerRepository } from '../repositories-contracts/order/validate-order-seller-repository';

export const mockOrderItemModel = (): OrderItemModel =>({
	id: 'any_id',
	name: 'any_name',
	description: 'any_description',
	categoryId: 'any_category_id',
	category: {
		id: 'any_category_id',
		name: 'any_category_name',
		description: 'any_category_description'
	},
	sellerId: 'seller_id',
	seller: {
		id: 'any_seller_id',
		email: 'any_seller_email',
		name: 'any_seller_name',
		password: 'any_seller_password',
		role: 'user'
	},
	listPrice: 0,
	salePrice: 0,
	urlImage: 'any_url_image',
	quantity: 1
});

export const mockOrderModel = (): OrderModel => ({
	id: 'any_id',
	buyerId: 'any_buyer_id',
	sellerId: 'any_seller_id',
	orderItems: [ mockOrderItemModel() ],
	paymentMethod: 'any_payment_method',
	status: 'pending'
});

export const mockAddOrderParams = (): AddOrderParams => ({
	buyerId: 'any_buyer_id',
	sellerId: 'any_seller_id',
	paymentMethod: 'any_payment_method',
	status: 'pending',
	products: [ { id: 'any_product_id', quantity: 1 } ],
});

export const mockEditOrderStatusParams = (): EditOrderStatusParams => ({
	id: 'any_order_id',
	userId: 'any_user_id',
	type: 'finished'
});

export const mockGetOrderParams = (): GetOrderParams => ({
	userId: 'any_user_id',
	id: 'any_id'
});

export const mockValidateOrderSellerParams = (): ValidateOrderSellerParams => ({
	sellerId: 'any_seller_id',
	products: [
		{
			id: 'product_id_1',
			quantity: 1
		},
		{
			id: 'product_id_2',
			quantity: 1
		}
	]
});

export const mockAddOrderRepository = (): AddOrderRepository => {
	class AddOrderRepositoryStub implements AddOrderRepository {
		async add(): Promise<AddOrderReturn | null>{
			return await Promise.resolve(mockOrderModel());
		}
	}
	return new AddOrderRepositoryStub();
};

export const mockEditOrderStatusRepository = (): EditOrderStatusRepository => {
	class EditOrderStatusRepositoryStub implements EditOrderStatusRepository {
		async edit(): Promise<EditOrderStatusReturn | null>{
			return await Promise.resolve(mockOrderModel());
		}
	}
	return new EditOrderStatusRepositoryStub();
};

export const mockGetOrderRepository = (): GetOrderRepository => {
	class GetOrderRepositoryStub implements GetOrderRepository {
		async get(): Promise<GetOrderReturn | null>{
			return await Promise.resolve([mockOrderModel()]);
		}
	}
	return new GetOrderRepositoryStub();
};

export const mockValidateOrderSellerRepository = (): ValidateOrderSellerRepository => {
	class ValidateOrderSellerRepositoryStub implements ValidateOrderSellerRepository {
		async validateSeller (): Promise<boolean | null>{
			return await Promise.resolve(true);
		}
	}
	return new ValidateOrderSellerRepositoryStub();
};