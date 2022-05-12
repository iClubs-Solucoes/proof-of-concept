import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import env from '../constants/env';
import { ISqs } from '../interfaces/ISqs';

class SQS {
  queue_url: string;

  sqs: AWS.SQS;

  constructor(queue_url: string) {
    AWS.config.update({ region: env.REGION });
    this.queue_url = queue_url;
    this.sqs = new AWS.SQS({ apiVersion: '2020-04-30' });
  }

  async receiveMessage(params: ISqs.ReceiveMessage): Promise<PromiseResult<AWS.SQS.ReceiveMessageResult, AWS.AWSError>> {
    const sqs_params = {
      ...params,
      QueueUrl: this.queue_url,
    };
    return this.sqs.receiveMessage(sqs_params).promise();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteMessage(params: ISqs.DeleteMessage): Promise<PromiseResult<{}, AWS.AWSError>> {
    const sqs_params = {
      ...params,
      QueueUrl: this.queue_url,
    };
    return this.sqs.deleteMessage(sqs_params).promise();
  }

  async changeMessageVisibility(params: ISqs.ChangeMessageVisibility): Promise<PromiseResult<{},AWS.AWSError>> {
    const sqs_params = {
      ...params,
      QueueUrl: this.queue_url,
    }
    return this.sqs.changeMessageVisibility(sqs_params).promise()
  }
}

export default SQS;