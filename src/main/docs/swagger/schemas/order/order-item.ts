export const orderItemSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		listPrice: {
			type: 'number'
		},
		salePrice: {
			type: 'number'
		},
		sellerId: {
			type: 'string'
		},
		seller: {
			$ref: '#/schemas/user'
		},
		categoryId: {
			type: 'string'
		},
		category: {
			$ref: '#/schemas/category'
		},
		urlImage: {
			type: 'string'
		}
	}
};
  