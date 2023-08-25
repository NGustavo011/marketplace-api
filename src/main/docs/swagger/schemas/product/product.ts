export const productSchema = {
	type: 'object',
	properties: {
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
		seller_id: {
			type: 'string'
		},
		seller: {
			$ref: '#/schemas/user'
		},
		buyer_id: {
			type: 'string'
		},
		buyer: {
			$ref: '#/schemas/user'
		},
		category_id: {
			type: 'string'
		},
		category: {
			$ref: '#/schemas/category'
		},
		url_image: {
			type: 'string'
		}
	}
};
  