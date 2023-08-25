export const editProductPath = {
	put: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Product'],
		summary: 'Rota para editar um produto',
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
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/addProduct'
					}
				}
			}
		},
		responses: {
			200: {
				description: 'Sucesso',
				content: {
					'application/json': {
						schema: {
							$ref: '#/schemas/product'
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
  