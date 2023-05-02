import { Router } from 'express';
import error_middleware from '../middlewares/error';
import { oauth2Token, oauth2Authorizer } from '../controller/OAuth2';

const router = Router();

function routes(app: typeof router) {
  app.use('/oauth2', router);

  router.get('/token', oauth2Token, error_middleware);

  router.get('/authorize', oauth2Authorizer, error_middleware);
}

export default routes;
