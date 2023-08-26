export const addOrderPath = {
	post: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Order'],
		summary: 'Rota para criar uma pedido',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/addOrder'
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
  