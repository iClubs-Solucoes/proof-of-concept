import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import env from '../constants/env';
import { IDynamoDb } from '../interfaces/IDynamoDb';

export default class DynamoDb {
  private doc_client: AWS.DynamoDB.DocumentClient
  private table_name: string;

  constructor(table_name: string) {
    AWS.config.update({ region: env.REGION });
    this.doc_client = new AWS.DynamoDB.DocumentClient();
    this.table_name = table_name;
  }

  async put(params: IDynamoDb.PutItemInput): Promise<PromiseResult<AWS.DynamoDB.PutItemOutput,AWS.AWSError>> {
    const put_item_params = {
      ...params,
      TableName: this.table_name
    }
    return this.doc_client.put(put_item_params).promise()
  }

  async scan(params: IDynamoDb.ScanItemInput): Promise<PromiseResult<AWS.DynamoDB.ScanOutput,AWS.AWSError>> {
    const scan_item_params = {
      ...params,
      TableName: this.table_name
    }

    return this.doc_client.scan(scan_item_params).promise()
  }
}