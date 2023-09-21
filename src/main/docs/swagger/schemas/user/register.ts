export const registerSchema = {
	type: 'object',
	properties: {
		email: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
		confirmPassword: {
			type: 'string'
		},
		cpf: {
			type: 'string'
		},
		pixKey: {
			type: 'string'
		}
	},
	required: ['email', 'name', 'password', 'confirmPassword', 'cpf']
};
  