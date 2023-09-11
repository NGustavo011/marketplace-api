import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3333,
	databaseUrl: process.env.DATABASE_URL ?? 'postgresql://pato:pato11@localhost:5432/marketplace?schema=public',
	jwtSecret: process.env.JWT_SECRET ?? 'jwt_pato',
	certificationPath: process.env.CERTIFICATION_PATH ?? __dirname + '../../../certification/homologacao-493643-marketplace-api-certificado.p12',
	gnClientId: process.env.GN_CLIENT_ID ?? '',
	gnSecretKey: process.env.GN_SECRET_KEY ?? '',
	gnPixKey: process.env.GN_PIX_KEY ?? 'b51951f8-3f0c-4876-8433-e0020e958b98'
};