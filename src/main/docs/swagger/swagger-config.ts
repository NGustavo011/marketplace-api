import { swaggerComponents } from './components/swagger-components';
import { swaggerPaths } from './paths/swagger-paths';
import { swaggerSchemas } from './schemas/swagger-schemas';

export const swaggerConfig = {
	openapi: '3.0.0',
	info: {
		title: 'marketplace-api',
		description: 'The "marketplace-api" is a fundamental API for building and managing a basic online marketplace platform. It facilitates interactions between sellers, buyers, and products, forming the core of your marketplace infrastructure.',
		version: '1.0.0'
	},
	servers: [{
		url: '/api'
	}],
	tags: [
		{
			name: 'User'
		}, 
		{
			name: 'Product'
		},
		{
			name: 'Category'
		}
	],
	paths: swaggerPaths,
	schemas: swaggerSchemas,
	components: swaggerComponents
};
