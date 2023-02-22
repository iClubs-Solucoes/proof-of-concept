const AWS = require("aws-sdk");
const credentials = require('../credentials')
const parameters = require('../parameters')
const cuid = require("cuid")

AWS.config.update(
  {
    region: parameters.region,
    credentials: credentials
  }
);

const sqs = new AWS.SQS();
const QUEUE_URL = parameters.queueUrl;

async function main() {
  start = performance.now()

  for (var i = 0; i < 500; i++) {
    const sqsParams = {
      QueueUrl: QUEUE_URL,
      MessageBody: 'force_throttle',
      MessageGroupId: 'force_throttle',
      MessageDeduplicationId: cuid(),
    };
    
    try {
      sqs.sendMessage(sqsParams).promise();
    } catch (error) {
      console.log(error)
    }
  }

  const messageSendingTime = performance.now() - start
  
  console.log('TEMPO TOTAL DE ENVIO DAS MENSAGENS:', messageSendingTime + 'ms')
}

main();