import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');
/*
select id, nom_defi, date_debut, nb_prevu, nb_effectue From challenges;
'SELECT * FROM challenges',
select id, nom_defi, date_debut, nb_prevu, nb_effectue, jours_action From challenges;
`SELECT *, (nb_prevu - nb_effectue) AS difference
FROM activites
ORDER BY difference DESC;`
*/
export const fetchDataFromDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT *, (nb_prevu - nb_effectue) AS difference
FROM challenges
ORDER BY difference DESC;`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log('Data from SQLite:', data);
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching data:', error);
          reject(error);
        }
      );
    });
  });
};

export const fetchDataFromDbUnfinished = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT *, (nb_prevu - nb_effectue) AS difference
FROM challenges
WHERE difference > 0 
AND date(date_debut) <= date('now')
ORDER BY difference ASC;`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log('Data from SQLite:', data);
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching data:', error);
          reject(error);
        }
      );
    });
  });
};


export const fetchDataFromDbOther = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM challenges;`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log('Data from SQLite:', data);
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching data:', error);
          reject(error);
        }
      );
    });
  });
};



export const fetchDataFromDbUpToDownId = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM challenges ORDER BY id DESC ;',
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log('Data from SQLite:', data);
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching data:', error);
          reject(error);
        }
      );
    });
  });
};

export const updateChallenges = (new_nb_effectue, new_jours_action, condition) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `UPDATE challenges SET nb_effectue = ?, jours_action = ? WHERE id=${condition}`,
        [new_nb_effectue, new_jours_action],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Data updated successfully');
          } else {
            console.log('No rows were updated');
          }
        },
        (_, error) => {
          console.log('Error updating data:', error);
        }
      );
    },
    error => {
      console.log('Transaction error:', error);
    }
  );
};

