export const deleteProductPath = {
	delete: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Product'],
		summary: 'Rota para deletar um produto',
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
				$ref: '#components/noContent'
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
  