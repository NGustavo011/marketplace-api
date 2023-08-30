import { CategoryModel } from './category';
import { UserModel } from './user';

export interface OrderItemModel {
    id: string
    name: string
    description: string
    listPrice: number
    salePrice: number
    sellerId: string
    seller: UserModel
    categoryId: string
    category: CategoryModel
    urlImage: string
    quantity: number
}