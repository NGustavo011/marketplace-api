import { AddOrderRepository } from '../../../../data/repositories-contracts/order/add-order-repository';
import { EditOrderStatusRepository } from '../../../../data/repositories-contracts/order/edit-order-status-repository';
import { GetOrderRepository } from '../../../../data/repositories-contracts/order/get-order-repository';
import { OrderItemModel } from '../../../../domain/models/order-item';
import { AddOrderParams, AddOrderReturn } from '../../../../domain/usecases-contracts/order/add-order';
import { EditOrderStatusParams, EditOrderStatusReturn } from '../../../../domain/usecases-contracts/order/edit-order-status';
import { GetOrderParams, GetOrderReturn } from '../../../../domain/usecases-contracts/order/get-order';
import { prisma } from '../../../../main/config/prisma';

export class OrderPrismaRepository implements AddOrderRepository, EditOrderStatusRepository, GetOrderRepository {
	async add (addOrderParams: AddOrderParams): Promise<AddOrderReturn | null> {
		const { buyerId, sellerId, paymentMethod, status, products } = addOrderParams;
		const order = await prisma.order.create({
			data: {
				buyerId,
				sellerId,
				paymentMethod,
				status,
			}
		});
		for(const product of products) {
			const productInBd = await prisma.product.findUnique({ where: { id: product.id } });
			if (productInBd) {
				await prisma.orderItem.create({
					data: {
						name: productInBd.name,
						description: productInBd.description,
						listPrice: productInBd.listPrice,
						salePrice: productInBd.salePrice,
						urlImage: productInBd.urlImage,
						categoryId: productInBd.categoryId,
						sellerId: productInBd.sellerId,
						quantity: product.quantity,
						orderId: order.id
					}
				});
			}
		}
		const orderInBd = await prisma.order.findUniqueOrThrow({ 
			where: { id: order.id },
			include: { orderItems: {include: { category: true, seller: true } } }
		});
		const orderItemsFormated: OrderItemModel[] = orderInBd.orderItems.map((orderItem)=>({
			id: orderItem.id,
			name: orderItem.name,
			description: orderItem.description,
			listPrice: Number(orderItem.listPrice),
			salePrice: Number(orderItem.salePrice),
			urlImage: orderItem.urlImage,
			quantity: orderItem.quantity,
			categoryId: orderItem.categoryId,
			category: {
				id: orderItem.category.id,
				name: orderItem.category.name,
				description: orderItem.category.description
			},
			sellerId: orderItem.sellerId,
			seller: {
				id: orderItem.seller.id,
				name: orderItem.seller.name,
				email: orderItem.seller.email,
				password: orderItem.seller.password,
				role: orderItem.seller.role
			}
		}));
		return {
			id: orderInBd.id,
			buyerId: orderInBd.buyerId,
			sellerId: orderInBd.sellerId,
			paymentMethod: orderInBd.paymentMethod,
			status: orderInBd.status,
			orderItems: orderItemsFormated
		};
	}
	async edit (editOrderStatusParams: EditOrderStatusParams): Promise<EditOrderStatusReturn | null>{
		const { id, userId, type } = editOrderStatusParams;
		const orderEdited = await prisma.order.update({
			data: {
				status: type
			},
			where: {
				id,
				sellerId: userId
			},
			include: {
				orderItems: { include: { category: true, seller: true } }
			}
		});
		const orderItemsFormated: OrderItemModel[] = orderEdited.orderItems.map((orderItem)=>({
			id: orderItem.id,
			name: orderItem.name,
			description: orderItem.description,
			listPrice: Number(orderItem.listPrice),
			salePrice: Number(orderItem.salePrice),
			urlImage: orderItem.urlImage,
			quantity: orderItem.quantity,
			categoryId: orderItem.categoryId,
			category: {
				id: orderItem.category.id,
				name: orderItem.category.name,
				description: orderItem.category.description
			},
			sellerId: orderItem.sellerId,
			seller: {
				id: orderItem.seller.id,
				name: orderItem.seller.name,
				email: orderItem.seller.email,
				password: orderItem.seller.password,
				role: orderItem.seller.role
			}
		}));
		return {
			id: orderEdited.id,
			buyerId: orderEdited.buyerId,
			sellerId: orderEdited.sellerId,
			paymentMethod: orderEdited.paymentMethod,
			status: orderEdited.status,
			orderItems: orderItemsFormated
		};
	}
	async get (getOrderParams: GetOrderParams): Promise<GetOrderReturn | null>{
		const { userId, id, buyerId, sellerId, paymentMethod, status } = getOrderParams; 
		const orders = await prisma.order.findMany({ 
			where: {
				OR: [
					{ buyerId: userId },
					{ sellerId: userId }
				],
				id,
				buyerId,
				sellerId,
				paymentMethod,
				status
			},
			include: {
				orderItems: {
					include: {
						category: true,
						seller: true
					}
				}
			}
		});
		const ordersFormated: GetOrderReturn = orders.map((order)=>{
			const orderItemsFormated: OrderItemModel[] = order.orderItems.map((orderItem)=>({
				id: orderItem.id,
				name: orderItem.name,
				description: orderItem.description,
				listPrice: Number(orderItem.listPrice),
				salePrice: Number(orderItem.salePrice),
				urlImage: orderItem.urlImage,
				quantity: orderItem.quantity,
				categoryId: orderItem.categoryId,
				category: {
					id: orderItem.category.id,
					name: orderItem.category.name,
					description: orderItem.category.description
				},
				sellerId: orderItem.sellerId,
				seller: {
					id: orderItem.seller.id,
					name: orderItem.seller.name,
					email: orderItem.seller.email,
					password: orderItem.seller.password,
					role: orderItem.seller.role
				}
			}));
			return {
				id: order.id,
				buyerId: order.buyerId,
				sellerId: order.sellerId,
				paymentMethod: order.paymentMethod,
				status: order.status,
				orderItems: orderItemsFormated
			};
		});
		return ordersFormated;
	}
}