export const addCategoryPath = {
	post: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Category'],
		summary: 'Rota para criar uma categoria',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/addCategory'
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
							$ref: '#/schemas/category'
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
  