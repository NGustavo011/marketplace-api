import express from 'express';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { swaggerConfig } from '../docs/swagger/swagger-config';

export const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', serve, setup(swaggerConfig));
