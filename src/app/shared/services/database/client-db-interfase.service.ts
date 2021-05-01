import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import Utils from '../common/utils';
import { PasswordManagementSqlService } from './password-management-sql.service';

@Injectable({
  providedIn: 'root'
})
export class ClientDbInterfaseService {

  constructor(private passwordManagementSqlService: PasswordManagementSqlService) { }

  public getDataBasedOnRequestObject(requestObject, postBody): Observable<any> {  
    if (Utils.isValidInput(requestObject.otherOptions.sqlRunnerMethod) && Utils.isValidInput(this[requestObject.otherOptions.sqlRunnerMethod])) {
      return this[requestObject.otherOptions.sqlRunnerMethod](requestObject, postBody);
    } else {
      return from([]);
    }
  }

  public getAllPasswordManagments(requestObject, postBody){    
    return from(this.passwordManagementSqlService.getAllPasswordManagmentssql(requestObject, postBody));
  }
}
