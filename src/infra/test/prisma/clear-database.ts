import { prisma } from '../../../main/config/prisma';

export const clearDatabase = async (): Promise<void> => {
	await prisma.order.deleteMany({});
	await prisma.orderItem.deleteMany({});
	await prisma.product.deleteMany({});
	await prisma.category.deleteMany({});
	await prisma.user.deleteMany({});
};
