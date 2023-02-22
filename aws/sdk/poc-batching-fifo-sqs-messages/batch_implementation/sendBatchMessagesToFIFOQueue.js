const AWS = require("aws-sdk");
const _ = require("lodash")
const cuid = require("cuid")
const credentials = require('../credentials')
const parameters = require('../parameters')

AWS.config.update(
  {
    region: parameters.region,
    credentials: credentials
  }
);

const sqs = new AWS.SQS();
const performance = require('perf_hooks').performance

async function run() {
  const fifoQueueUrl = parameters.queueUrl;

  let bodies = []

  for (let i = 0; i < 500; i++) {
    const body = 'body' + i

    bodies.push(
      {
        id: cuid(),
        body
      }
    );
  }

  const batches = _.chunk(bodies, 10);

  start = performance.now()

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    const groupId = Math.random();

    const entries = batch.map(message => (
      {
        Id: message.id,
        MessageBody: JSON.stringify(message.body),
        MessageGroupId: groupId.toString(),
        MessageDeduplicationId: message.id
      }
    ))

    console.log(
      "Sending batch", 
      {
        batch: i,
        groupId: groupId,
        batchSize: batch.length
      }
    );

    sqs.sendMessageBatch(
      {
        QueueUrl: fifoQueueUrl,
        Entries: entries,
      }
    ).promise();
  }

  const messageSendingTime = performance.now() - start

  console.log('Tempo de envio das mensagens: ', messageSendingTime)
}

async function main() {
  try {
    await run();
  } catch (error) {
    console.log("[ERROR]", error);
  }
}

main()