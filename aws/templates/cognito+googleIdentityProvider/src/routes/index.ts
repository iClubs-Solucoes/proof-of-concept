import { Router } from 'express';
import OAuth2 from './OAuth2';

const router = Router();

OAuth2(router);

export default router;
