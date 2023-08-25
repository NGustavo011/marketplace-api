export const getProductPath = {
	post: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Product'],
		summary: 'Rota para listar produto',
		parameters: [
			{
				in: 'query',
				name: 'id',
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
							$ref: '#/schemas/getProduct'
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
  