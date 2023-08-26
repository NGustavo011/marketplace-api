export const orderSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		orderItems: {
			type: 'array',
			items: {
				$ref: '#/schemas/orderItem'
			}
		},
		status: {
			type: 'string'
		}
	}
};
  