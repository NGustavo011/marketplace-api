export const signUpPath = {
	post: {
		tags: ['User'],
		summary: 'Rota para criar um usuário',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/register'
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
  