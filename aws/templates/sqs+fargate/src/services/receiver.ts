import lodash from 'lodash';
import SQS from '../aws/sqs';
import { ISqs } from '../interfaces/ISqs';
import * as AWS from 'aws-sdk';
import env from '../constants/env';
const logger = console

export default class SqsReceiverAndProcessor<response_type> {
  public sqs: SQS;

  public processor: ISqs.ReceiverCallback<response_type>;


  constructor(queue_url: string, processor: ISqs.ReceiverCallback<response_type>) {
    this.sqs = new SQS(queue_url);
    this.processor = processor;
  }

  async sleep(milliseconds: number): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(
        () => { resolve(''); },
        milliseconds
      )
    })
  }

  async continuosReceiveAndProcessing(body: ISqs.ContinuosReceiveAndProcessingParams): Promise<void> {
    try {
      const { params, sleep_time } = body;
      let counter = 1;
      const loop_condition = true;
      while (loop_condition) {
        const response = await this.receiveAndProcess(params);
        logger.info(`(ContinuosReceiveAndProcessing) ${counter}: `, response, `\ntime: ${new Date().toISOString().split('T')[1]}`);
        if (response === null) {
          await this.sleep(sleep_time);
        }
        counter++;
      }
    } catch (error) {
      logger.error('(ContinuosReceiveAndProcessing)', error?.message);
    }
  }

  async receiveAndProcess(params: ISqs.ReceiveMessage = {}): Promise<unknown> {
    try {
      const body = await this.sqs.receiveMessage(params);

      if (lodash.isEmpty(body.Messages)) {
        logger.error('(SQS-RECEIVER)', 'Não possui mensagens para receber');
        return null;
      }

      const promises: Promise<unknown>[] = []
      for (const message of body.Messages) {
        promises.push(this.process(message))
      }

      const responses = await Promise.allSettled(promises);

      return responses;
    } catch (error) {
      logger.error('(SQS-RECEIVER)', error?.message);
    }
  }

  async process(message: AWS.SQS.Message): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      const { ReceiptHandle } = message;
      try {

        const response = await this.processor(message)

        await this.sqs.deleteMessage({ ReceiptHandle });

        return resolve(response)
      } catch (error) {

        await this.sqs.changeMessageVisibility({
          ReceiptHandle: message.ReceiptHandle,
          VisibilityTimeout: Number(env.SQS_MESSAGE_VISIBILITY_TIMEOUT)
        })
        console.log(Number(env.SQS_MESSAGE_VISIBILITY_TIMEOUT), message.Body)
        reject(error?.message);
      }


    })

  }
}