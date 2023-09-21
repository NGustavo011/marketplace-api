/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeRegisterController } from '../../factories/controllers/user/register/register-controller-factory';
import { makeLoginController } from '../../factories/controllers/user/login/login-controller-factory';
import { makeEditUserController } from '../../factories/controllers/user/edit-user/edit-user-controller-factory';

export const userRoutes = Router();

userRoutes.post('/register', adaptRoute(makeRegisterController()));
userRoutes.post('/login', adaptRoute(makeLoginController()));
userRoutes.patch('/edit-user', adaptRoute(makeEditUserController()));
