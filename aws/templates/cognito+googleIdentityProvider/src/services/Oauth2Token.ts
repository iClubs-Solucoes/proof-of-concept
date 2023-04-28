import axios from 'axios';
import aws from '../config/aws';
import {
  IOAuth2Output
} from '../interfaces/IOAuth2';

class Oauth2Token {
  public async getToken(code: string): Promise<IOAuth2Output> {
    const headers = {} as Record<string, string>;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers.Accept = '*/*';

    const url = `https://${aws.AUTH_DOMAIN}/oauth2/token`;

    const data = new URLSearchParams(
      Object.entries({
        client_id: aws.CLIENT_ID,
        redirect_uri: aws.REDIRECT_URL,
        code,
        grant_type: 'authorization_code'
      })
    ).toString();

    const response = await axios.post<IOAuth2Output>(url, data);

    return response.data;
  }
}

export default Oauth2Token;
