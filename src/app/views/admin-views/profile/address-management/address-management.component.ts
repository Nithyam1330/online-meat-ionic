import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { utils } from 'protractor';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../../shared/constants/request-enums';
import Utils from '../../../../shared/services/common/utils';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.scss'],
})
export class AddressManagementComponent implements OnInit {
  addressList;
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.getAllAddress();
  }

  /** Add||Modify Address */
  public addAddress() {
    this.router.navigate(['profile', 'address', 'add-address']);
  }

  /**Fetch User Addresses from DB */
  private async getAllAddress() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.GET_ALL_ADDRESS)
      .subscribe(async (Response) => {
        await this.loaderService.dissmissLoading();

        if (Utils.isValidInput(Response.data)) {
          this.addressList = Response.data;
          console.log(this.addressList);
        }
      });
  }
}
