import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3333,
	databaseUrl: process.env.DATABASE_URL ?? 'postgresql://pato:pato11@localhost:5432/marketplace?schema=public',
	jwtSecret: process.env.JWT_SECRET ?? 'jwt_pato'
};