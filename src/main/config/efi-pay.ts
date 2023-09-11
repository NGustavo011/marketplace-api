import env from './env';

export const efiPayOptions = {
	client_id: env.gnClientId,
	client_secret: env.gnSecretKey,
	sandbox: true,
	pix_cert: env.certificationPath
};