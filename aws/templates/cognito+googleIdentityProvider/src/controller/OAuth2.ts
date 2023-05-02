import { Request, Response, NextFunction } from 'express';
import Logger from '../libs/Logger';
import { schemaValidator } from '../libs/CommonsValidator';
import { IOAuth2Input } from '../interfaces/IOAuth2';
import { oauth2_token } from '../schemas/OAuth2';
import Oauth2Token from '../services/Oauth2Token';
import OAuth2Authorizer from '../services/OAuth2Authorizer';

export async function oauth2Token(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = schemaValidator<IOAuth2Input>(
      req.query as unknown as IOAuth2Input,
      oauth2_token
    );
    const user_service = new Oauth2Token();
    const response = await user_service.getToken(body.code);

    res.status(200).json(response);
  } catch (error) {
    Logger.debug(JSON.stringify(error));
    Logger.error(`[OAuth2Token]: ${error.message}`);
    next(error);
  }
}

export async function oauth2Authorizer(
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user_service = new OAuth2Authorizer();
    const { url } = await user_service.getRedirectURL();
    res.redirect(url);
  } catch (error) {
    Logger.info(JSON.stringify(error));
    Logger.error(`[OAuth2Authorizer]: ${error.message}`);
    next(error);
  }
}
