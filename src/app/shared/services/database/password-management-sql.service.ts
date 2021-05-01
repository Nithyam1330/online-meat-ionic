import { Injectable } from '@angular/core';
import { SqlService, TABLE_NAMES } from './sql.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagementSqlService {

  constructor(private sqlService: SqlService) { }
  // rvltfpbf
  public getAllPasswordManagmentssql(requestObject, postBody): Promise<any> {

    let qry = `SELECT * FROM  ${TABLE_NAMES.PASSWORD_MANAGEMENT}`;
    return this.sqlService.database.executeSql(qry).then(res => {
      console.log(res)
      let data = this.sqlService.getFormattedArrayDataSql(res);  
      console.log(data);
      return data;
    
    }, (error) => {
      console.log(error);
      return error;
    });
  }
}
