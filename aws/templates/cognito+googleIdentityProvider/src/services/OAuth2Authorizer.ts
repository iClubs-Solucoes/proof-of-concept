import querystring from 'querystring';
import aws from '../config/aws';
import { IAuthorizerOutput } from '../interfaces/IOAuth2';
// import Logger from '../libs/Logger';

class OAuth2Authorizer {
  public async getRedirectURL(): Promise<IAuthorizerOutput> {
    const query = {
      identity_provider: aws.PROVIDER,
      redirect_uri: aws.REDIRECT_URL,
      response_type: 'code',
      client_id: aws.CLIENT_ID,
      scope: aws.SCOPE
    };

    const query_string = querystring.stringify(query);

    const url = `https://${aws.AUTH_DOMAIN}/oauth2/authorize?${query_string}`;

    return { url };
  }
}

export default OAuth2Authorizer;
