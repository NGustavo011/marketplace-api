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
		categoryId: {
			type: 'string'
		},
		urlImage: {
			type: 'string'
		}
	},
	required: ['name', 'description', 'listPrice', 'salePrice', 'seller_user_id', 'buyer_user_id', 'category_id']
};
  