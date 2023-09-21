export const editUserPath = {
	patch: {
		security: [{
			apiKeyAuth: []
		}],
		tags: ['User'],
		summary: 'Rota para editar dados de um usuário',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/editUser'
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
							$ref: '#/schemas/account'
						}
					}
				}
			},
			400: {
				$ref: '#components/badRequest'
			},
			403: {
				$ref: '#components/forbidden'
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
  