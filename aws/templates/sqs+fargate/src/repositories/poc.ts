import DynamoDb from '../aws/dynamodb'
import env from '../constants/env';
import {IPoc} from '../interfaces/IPoc'

export default  class PocRepository {
  private database: DynamoDb

  constructor() {
    this.database = new DynamoDb(env.POC_TABLE)
  }

  async put(body: IPoc.Table): Promise<void> {
    await this.database.put({Item: body});
  }
}