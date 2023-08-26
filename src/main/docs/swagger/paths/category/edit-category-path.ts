export const editCategoryPath = {
	put: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['Category'],
		summary: 'Rota para editar uma categoria',
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
  