import PocRepository from '../repositories/poc'
import * as AWS from 'aws-sdk';
import { IWork } from '../interfaces/IWork';
import {IPoc} from '../interfaces/IPoc'
import JsonRepository from '../repositories/json'
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

    const body = {
      message_id: message.MessageId,
      receipt_handle: message.ReceiptHandle,
      timestamp: new Date().toISOString(),
      body: message.Body
    }

    await this.repository.put(body)

    await this.validate(message.Body);


    return true;
  }

  async checkDuplicate(): Promise<void> {
    const json = new JsonRepository();
    const items = await this.repository.scan();

    await json.writeDatabase(items);

    const messageCounter: IPoc.MessageCounterTable = {};
    
    const duplicates: IPoc.MessageCounterTable = {};

    for (const item of items) {
      const {message_id} = item;
      if (messageCounter[message_id]) {
        messageCounter[message_id]++;
        duplicates[message_id] = messageCounter[message_id];
      } else {
        messageCounter[message_id] = 1;
      }
    }
    await json.writeMessageCounter(messageCounter);
    await json.writeDuplicates(duplicates);
  }

}