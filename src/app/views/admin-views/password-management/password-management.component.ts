import { Component, OnInit } from '@angular/core';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss'],
})
export class PasswordManagementComponent implements OnInit {

  constructor(public commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.commonRequestService.request(RequestEnums.GET_ALL_PASSWORD_MANAGEMENTS).subscribe(data => {
      console.log(data)
    })
  }

}
