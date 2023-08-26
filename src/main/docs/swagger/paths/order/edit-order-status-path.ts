export const editOrderStatusPath = {
	put: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Order'],
		summary: 'Rota para editar o status de um pedido',
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
						$ref: '#/schemas/editOrderStatus'
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
							$ref: '#/schemas/order'
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
  