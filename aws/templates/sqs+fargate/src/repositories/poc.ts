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

  async scan(): Promise<IPoc.Table[]> {
    let read_all = false;
    let params = {};
    const items: IPoc.Table[] = [];
    while(!read_all) {
    
       const response = await this.database.scan(params);
      
       console.log(response.LastEvaluatedKey)
      if (!response.LastEvaluatedKey) {
        read_all = true;
      }

      params = {
        ExclusiveStartKey: response.LastEvaluatedKey
      }

      items.push(...response.Items as unknown as IPoc.Table[])
    }
    
    return items;
  }
}