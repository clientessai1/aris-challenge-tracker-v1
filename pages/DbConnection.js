import { openDatabase } from "expo-sqlite";

const db = openDatabase("db");

const addDataToDb = () => {

  db.transaction(tx => {

    tx.executeSql(
      "create table if not exists DataTable (id integer primary key not null, column_1 int, column_2 int, column_3 text);",
      []
    );

    tx.executeSql(
      "insert into DataTable (column_1, column_2, column_3) values (?, ?, ?)",
      [argument_1, argument_2, argument_3]
    );

    tx.executeSql(
      "select * from scoreData",
      [],
      (_, { rows: { _array } }) => setScores(_array),
      () => console.log("error fetching")
    );

  });
};