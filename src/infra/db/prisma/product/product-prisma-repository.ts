import { AddProductRepository } from '../../../../data/repositories-contracts/product/add-product-repository';
import { DeleteProductRepository } from '../../../../data/repositories-contracts/product/delete-product-repository';
import { EditProductRepository } from '../../../../data/repositories-contracts/product/edit-product-repository';
import { GetProductRepository } from '../../../../data/repositories-contracts/product/get-product-repository';
import { AddProductParams, AddProductReturn } from '../../../../domain/usecases-contracts/product/add-product';
import { DeleteProductParams } from '../../../../domain/usecases-contracts/product/delete-product';
import { EditProductParams, EditProductReturn } from '../../../../domain/usecases-contracts/product/edit-product';
import { GetProductParams, GetProductReturn } from '../../../../domain/usecases-contracts/product/get-product';
import { prisma } from '../../../../main/config/prisma';

export class ProductPrismaRepository implements AddProductRepository, DeleteProductRepository, EditProductRepository, GetProductRepository {
	async add (addProductParams: AddProductParams): Promise<AddProductReturn | null>{
		const { name, description, listPrice, salePrice, urlImage, categoryId, userId} = addProductParams;
		const product = await prisma.product.create({
			data: {
				name,
				description,
				listPrice,
				salePrice,
				urlImage,
				categoryId,
				sellerId: userId
			},
			include: {
				category: true,
				seller: true
			}
		});
		return {
			id: product.id,
			name: product.name,
			description: product.description,
			listPrice: Number(product.listPrice),
			salePrice: Number(product.salePrice),
			urlImage: product.urlImage,
			categoryId: product.categoryId,
			category: product.category,
			sellerId: product.sellerId,
			seller: product.seller
		};
	}

	async delete (deleteProductParams: DeleteProductParams): Promise<boolean | null>{
		const { id, userId } = deleteProductParams;
		const productExists = await prisma.product.findUnique({
			where: {
				id,
				sellerId: userId
			}
		});
		if(!productExists) { return false; }
		await prisma.product.delete({ where: {id} });
		return true;
	}

	async edit (editProductParams: EditProductParams): Promise<EditProductReturn | null>{
		const { id, userId, product } = editProductParams;
		const productEdited = await prisma.product.update({
			data: product,
			where: {
				id,
				sellerId: userId
			},
			include: {
				category: true,
				seller: true
			}
		});
		return {
			id: productEdited.id,
			name: productEdited.name,
			description: productEdited.description,
			listPrice: Number(productEdited.listPrice),
			salePrice: Number(productEdited.salePrice),
			urlImage: productEdited.urlImage,
			categoryId: productEdited.categoryId,
			category: productEdited.category,
			sellerId: productEdited.sellerId,
			seller: productEdited.seller
		};
	}

	async get (getProductParams: GetProductParams): Promise<GetProductReturn | null>{
		const { id, sellerId, categoryId } = getProductParams;
		const products = await prisma.product.findMany({
			where: { id, sellerId, categoryId },
			include: { category: true, seller: true }
		});
		const productsFormated: GetProductReturn = products.map((product)=>({
			id: product.id,
			name: product.name,
			description: product.description,
			listPrice: Number(product.listPrice),
			salePrice: Number(product.salePrice),
			urlImage: product.urlImage,
			categoryId: product.categoryId,
			category: product.category,
			sellerId: product.sellerId,
			seller: product.seller
		}));
		return productsFormated;
	}
}