import * as AWS from 'aws-sdk';
import { IWork } from '../interfaces/IWork';
export default class Work {

  async validate(message: string): Promise<IWork.body> {
    const body = JSON.parse(message);

    if (!body.success) {
      throw new Error("Not valid body");
    }

    return body;
  }

  async processor(message: AWS.SQS.Message): Promise<boolean> {

    await this.validate(message.Body);


    return true;
  }


}