export const orderSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		buyerId: {
			type: 'string'
		},
		sellerId: {
			type: 'string'
		},
		orderItems: {
			type: 'array',
			items: {
				$ref: '#/schemas/orderItem'
			}
		},
		paymentMethod: {
			type: 'string'
		},
		status: {
			type: 'string'
		}
	}
};
  