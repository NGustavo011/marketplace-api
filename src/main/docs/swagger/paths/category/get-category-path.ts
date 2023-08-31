export const getCategoryPath = {
	get: {
		tags: ['Category'],
		summary: 'Rota para listar categoria',
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
							$ref: '#/schemas/getCategory'
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
  