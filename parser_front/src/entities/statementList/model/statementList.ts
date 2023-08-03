import { action, makeObservable, observable } from 'mobx';
import { DB } from 'src/entities/dataBase';
import { Statement } from 'src/entities/statement';
import { StatementType } from 'src/shared/api/models';

export class StatementList extends DB {
  statements = [] as StatementType[];
  constructor() {
    super('statementList');
    this.init();
    makeObservable(this, { addStatement: action, getStatements: action, init: action, statements: observable });
  }

  addStatement(data: StatementType) {
    const statement = new Statement(data);
    this.statements.push(data);
    statement.saveStatement();
    this.updateDB();
  }

  deleteStatement(id: string) {
    this.statements = this.statements.filter((item) => item.id !== id);
    this.updateDB();
  }

  getStatements() {
    const data = this.read<StatementType[]>() || [];
    this.statements = data;
  }

  init() {
    try {
      this.read<StatementType[]>();
    } catch (error) {
      this.save([]);
    }
  }

  updateDB() {
    this.save(this.statements);
  }
}
