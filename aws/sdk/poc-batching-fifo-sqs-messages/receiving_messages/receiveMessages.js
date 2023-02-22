const AWS = require("aws-sdk");
const _ = require("lodash")
const credentials = require('../credentials')
const parameters = require('../parameters')

AWS.config.update(
  {
    region: parameters.region,
    credentials: credentials
  }
);

const sqs = new AWS.SQS();

var params = {
  QueueUrl: parameters.queueUrl,
  MaxNumberOfMessages: '10',
};

sqs.receiveMessage(
  params, 
  function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data.Messages);
  }
);