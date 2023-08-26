export const addOrderSchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			productId: {
				type: 'string'
			},
		}
	}
};
  