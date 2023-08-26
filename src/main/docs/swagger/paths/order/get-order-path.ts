export const getOrderPath = {
	get: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Order'],
		summary: 'Rota para listar pedido',
		parameters: [
			{
				in: 'query',
				name: 'id',
				required: false,
				schema: {
					type: 'string'
				}
			},
			{
				in: 'query',
				name: 'buyerId',
				required: false,
				schema: {
					type: 'string'
				}
			},
			{
				in: 'query',
				name: 'sellerId',
				required: false,
				schema: {
					type: 'string'
				}
			},
			{
				in: 'query',
				name: 'status',
				required: false,
				schema: {
					type: 'string'
				}
			}
		],
		responses: {
			200: {
				description: 'Sucesso',
				content: {
					'application/json': {
						schema: {
							$ref: '#/schemas/getOrder'
						}
					}
				}
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
  