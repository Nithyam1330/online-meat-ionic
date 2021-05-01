import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SqlService {
    public database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(private sqlitePorter: SQLitePorter,
      private http: HttpClient,
        private sqlite: SQLite
        ) {

    }

   createDB() {
    this.sqlite.create({
      name: 'meat_online_dev.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.database = db;
        // this.commonSqlDbService.database = db;
        this.seedDatabase();
      });
  }

  seedDatabase() {
    this.http.get('assets/db/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        console.log(sql,'sitaram')
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.dbReady.next(true);
            // this.createMasterData();
            this.getTablesList();
          })
          .catch(e => console.error(e));
      });

  }

  getTablesList() {
    return this.database.executeSql("SELECT * FROM sqlite_master WHERE type='table'", []).then(data => {
      // return data.rows.item;

      const tables = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          tables.push(data.rows.item(i));
        }
      }
      console.log(tables);
      return tables;
    });
  }

  public getFormattedArrayDataSql(data) {
    let list = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        list.push(data.rows.item(i));
      }
    }
    return list;
  }
}


export const TABLE_NAMES = {
  PASSWORD_MANAGEMENT: 'password_management'
};
