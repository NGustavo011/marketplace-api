import { badRequest } from './responses/bad-request';
import { forbidden } from './responses/forbidden';
import { notFound } from './responses/not-found';
import { serverError } from './responses/server-error';
import { unauthorized } from './responses/unauthorized';

export const swaggerComponents = {
	badRequest,
	unauthorized,
	serverError,
	notFound,
	forbidden
};
