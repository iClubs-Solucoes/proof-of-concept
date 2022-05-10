const { env } = process

export default {
  REGION: env.REGION,
  SQS_URL: env.SQS_URL,
  POC_TABLE: env.POC_TABLE ? env.POC_TABLE : 'fargate',
  SQS_MESSAGE_VISIBILITY_TIMEOUT: Number(env.SQS_MESSAGE_VISIBILITY_TIMEOUT),
  SCALE_UP_COOL_DOWN: Number(env.SCALE_UP_COOL_DOWN)
}