export const deleteCategoryPath = {
	delete: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Category'],
		summary: 'Rota para deletar uma categoria',
		parameters: [
			{
				in: 'query',
				name: 'id',
				required: true,
				schema: {
					type: 'string'
				}
			}
		],
		responses: {
			204: {
				description: 'No content',
			},
			401: {
				$ref: '#components/unauthorized'
			},
			404: {
				$ref: '#components/notFound'
			},
			500: {
				$ref: '#components/serverError'
			}
		}
	}
};
  