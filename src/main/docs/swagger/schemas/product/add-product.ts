export const addProductSchema = {
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
		seller_user_id: {
			type: 'string'
		},
		buyer_user_id: {
			type: 'string'
		},
		category_id: {
			type: 'string'
		},
		url_image: {
			type: 'string'
		}
	},
	required: ['name', 'description', 'listPrice', 'salePrice', 'seller_user_id', 'buyer_user_id', 'category_id']
};
  