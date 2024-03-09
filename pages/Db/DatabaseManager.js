import * as SQLite from 'expo-sqlite';

class DatabaseManager {
  constructor() {
    this.db = null;
  }

  openDatabase() {
    this.db = SQLite.openDatabase('myDatabase.db');
  }

  executeSql(sqlStatement, params = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            sqlStatement,
            params,
            (_, { rows }) => resolve(rows),
            (_, error) => reject(error)
          );
        },
        (error) => console.error('Transaction error:', error),
        () => console.log('Transaction completed.')
      );
    });
  }

  createTable(tableName, columns) {
    const columnsString = columns.join(', ');
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString})`;
    return this.executeSql(createTableQuery);
  }

  printTableContent(){
    const select_stmt = "select id, nom_defi, date_debut, nb_prevu, nb_effectue From challenges;";
this.executeSql(select_stmt)
  .then((result) => {
    // Transaction succeeded, result contains data from the SQL statement
    console.log('Transaction succeeded:', result);
  })
  .catch((error) => {
    // Transaction failed, error contains details about the error
    console.error('Transaction failed:', error);
  });
  }

  fetchData(tableName, condition) {
    const query = `SELECT * FROM ${tableName} WHERE ${condition}`;
    return this.executeSql(query);
  }

  fetchDataNoCond(tableName) {//Without condition
    const query = `SELECT * FROM ${tableName} ;`;
    return this.executeSql(query);
  }


  closeDatabase() {
    if (this.db) {
      this.db._db.close();
    }
  }

  dropTable(tableName) {
    const dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
    return this.executeSql(dropTableQuery);
  }


}

const dbManager = new DatabaseManager();
export default dbManager;
