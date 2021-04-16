import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../../../shared/constants/request-enums';
import Utils from '../../../../../shared/services/common/utils';

@Component({
  selector: 'app-modify-address',
  templateUrl: './modify-address.component.html',
  styleUrls: ['./modify-address.component.scss'],
})
export class ModifyAddressComponent extends BaseClass implements OnInit {
  addressForm: FormGroup;

  addressTypeList = [
    {
      id: 1,
      name: 'HOME',
    },
    {
      id: 2,
      name: 'OFFICE',
    },
  ];
  countryList = [
    {
      id: 1,
      name: 'IND',
    },
    {
      id: 2,
      name: 'AUS',
    },
  ];
  stateList = [
    {
      id: 1,
      name: 'TS',
    },
    {
      id: 2,
      name: 'AP',
    },
  ];
  cityList = [
    {
      id: 1,
      name: 'HYD',
    },
    {
      id: 2,
      name: 'TPT',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.addressForm = this.formBuilder.group({
      type: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      street: ['', Validators.compose([Validators.required])],
      landmark: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required])],
    });
  }

  public onSubmit() {
    if (this.addressForm.valid) {
      this.createAddress();
    }
  }

  private async createAddress() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.ADD_NEW_ADDRESS, this.addressForm.value)
      .subscribe(async (Response) => {
        this.addressForm.reset();
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(Response.data)) {
          this.toasterService.presentToast({
            message: Response['message'],
            color: TOAST_COLOR_ENUMS.SUCCESS,
          })
        }
      }, async (error) =>{
        await this.loaderService.dissmissLoading();
        this.toasterService.presentToast({
          message: Response['message'],
          color: TOAST_COLOR_ENUMS.DANGER,
        })
      });
  }

  public cancel() {
    this.router.navigate(['profile', 'address']);
  }
}
