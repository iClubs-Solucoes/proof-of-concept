export interface IOAuth2Output {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface IOAuth2Input {
  code: string;
}

export interface IAuthorizerOutput {
  url: string;
}