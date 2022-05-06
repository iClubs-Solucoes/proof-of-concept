import PocRepository from '../repositories/poc'
import * as AWS from 'aws-sdk';
import { IWork } from '../interfaces/IWork';

export default class Work {
  repository: PocRepository;

  constructor() {
    this.repository = new PocRepository();
  }

  async validate(message: string): Promise<IWork.body> {
    const body = JSON.parse(message);

    if (!body.success) {
      throw new Error("Not valid body");
    }

    return body;
  }

  async processor(message: AWS.SQS.Message): Promise<boolean> {
    await this.validate(message.Body);

    const body = {
      message_id: message.MessageId,
      receipt_handle: message.ReceiptHandle,
      timestamp: new Date().toISOString(),
      body: message.Body
    }

    await this.repository.put(body)

    return true;
  }
}