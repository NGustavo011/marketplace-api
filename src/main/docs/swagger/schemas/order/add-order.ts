export const addOrderSchema = {
	type: 'object',
	properties: {
		paymentMethod: {
			type: 'string'
		},
		products: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						type: 'string'
					},
				}
			}
		},
	}
	
};
  