export const addProductPath = {
	post: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Product'],
		summary: 'Rota para criar uma produto',
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
  