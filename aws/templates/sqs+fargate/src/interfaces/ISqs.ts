import * as AWS from 'aws-sdk';


export declare namespace ISqs {

  export interface ReceiveMessage {
      AttributeNames?: AWS.SQS.AttributeNameList;
      MessageAttributeNames?: AWS.SQS.MessageAttributeNameList;
      MaxNumberOfMessages?: AWS.SQS.Integer;
      VisibilityTimeout?: AWS.SQS.Integer;
      WaitTimeSeconds?: AWS.SQS.Integer;
      ReceiveRequestAttemptId?: string;
  }
  
  export interface DeleteMessage {
    ReceiptHandle: string;
  
  }

  export interface ReceiverResponse<response_type> {
    status: 'fulfilled' | 'rejected';
    reason?: string;
    value?: response_type;
  }

  export interface ContinuosReceiveAndProcessingParams {
    params: ReceiveMessage;
    sleep_time: number;
  }  
  
  export interface ReceiverCallback<response_type> {
    (message: AWS.SQS.Message): response_type;
  }

  export interface ChangeMessageVisibility {
    ReceiptHandle: string;
    VisibilityTimeout: number;
  }
  
}
