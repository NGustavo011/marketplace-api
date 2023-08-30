import { EditOrderStatusParams, EditOrderStatusReturn } from '../../../domain/usecases-contracts/order/edit-order-status';

export interface EditOrderStatusRepository {
  edit: (editOrderStatusParams: EditOrderStatusParams) => Promise<EditOrderStatusReturn | null>
}
