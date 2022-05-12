import {promises as fs} from 'fs';
import {IPoc} from '../interfaces/IPoc'

class JsonRepository {
  private database: string;
  private duplicates: string;
  private counter: string;

  constructor() {
    this.database = '../../data/database.json';
    this.duplicates = '../../data/duplicates.json';
    this.counter = '../../data/counter.json';
  }
  
  public async writeMessageCounter(object: IPoc.MessageCounterTable): Promise<void> {
    await this.writeDb(this.counter,object);
  }
  public async writeDuplicates(object: IPoc.MessageCounterTable): Promise<void> {
    await this.writeDb(this.duplicates,object);
  }

  public async writeDatabase(object: IPoc.Table[]): Promise<void> {
    await this.writeDb(this.database,object);
  }
  private async writeDb(db: string, object: unknown): Promise<void> {
    await fs.writeFile(db,JSON.stringify(object), { encoding: 'utf-8'})
  }

}

export default JsonRepository;