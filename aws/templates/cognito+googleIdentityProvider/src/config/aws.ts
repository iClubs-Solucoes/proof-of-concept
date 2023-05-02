import * as dotenv from 'dotenv';

dotenv.config();

export default {
  REGION: process.env.REGION,
  USER_POOL_ID: process.env.USER_POOL_ID,
  CLIENT_ID: process.env.CLIENT_ID,
  SCOPE: process.env.SCOPE,
  PROVIDER: process.env.PROVIDER,
  AUTH_DOMAIN: `${process.env.AUTH_DOMAIN}.auth.${process.env.REGION}.amazoncognito.com`,
  REDIRECT_URL: encodeURI(process.env.REDIRECT_URL)
} as const;
