export const addOrderSchema = {
	type: 'object',
	properties: {
		sellerId: {
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
					quantity: {
						type: 'number'
					}
				}
			}
		},
	}
	
};
  