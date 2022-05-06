const {env} = process

export default {
  REGION: env.REGION,
  SQSUrl: env.SQSUrl,
  POC_TABLE: env.POC_TABLE,
  SQS_MESSAGE_VISIBILITY_TIMEOUT: env.SQS_MESSAGE_VISIBILITY_TIMEOUT 
}