import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
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
  validationMessages = {
    type: [ { type: 'required', message: 'Please select your Address type' } ],
    country: [{ type: 'required', message: 'Please select Country' }],
    state: [ { type: 'required', message: 'Please select your State' }],
    city: [ { type: 'required', message: 'Please select your City' }],
    street: [{ type: 'required', message: 'Please enter your Street' } ],
    landmark: [ { type: 'required', message: 'Please enter your Landmark' } ],
    pincode: [{ type: 'required', message: 'Please enter your Pincode' } ],
  };
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
  addressId: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private location: Location
  ) {
    super();
    this.addressId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.initializeForm();
    if (Utils.isValidInput(this.addressId)) {
      this.getAddressDetailsByAddressId();
    }
  }

  private async getAddressDetailsByAddressId() {
    await this.loaderService.showLoader();
    RequestEnums.GET_ADDRESS_BY_ADDRESS_ID.values = [
      this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
      this.addressId
    ]
    this.commonRequestService.request(RequestEnums.GET_ADDRESS_BY_ADDRESS_ID).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200 || !Utils.isValidInput(res.data)) {
        this.toasterService.presentToast({
          message: res.message,
          color: 'danger'
        });
      } else {
        this.addressForm.patchValue(res.data);
      }
    }, async (error) => {
      await this.loaderService.dissmissLoading();
      this.toasterService.presentToast({
        message: error.message,
        color: 'danger'
      });
    })
  }
  public navigateToBack(){
    this.location.back();
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
      if (Utils.isValidInput(this.addressId)) {
        this.updateAddress();
      } else {
        this.createAddress();
      }
    }
  }

  private async updateAddress() {
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_ADDRESS.values = [
      this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
      this.addressId
    ]
    this.commonRequestService
      .request(RequestEnums.UPDATE_ADDRESS, this.addressForm.value)
      .subscribe(async (res) => {
        this.addressForm.reset();
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || !Utils.isValidInput(res.data) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.toasterService.presentToast({
            message: 'Address Updated Successfully',
            color: TOAST_COLOR_ENUMS.SUCCESS,
          });
          this.router.navigate(['profile-dashboard', 'address-management']);

        }
      }, async (error) => {
        await this.loaderService.dissmissLoading();
        this.toasterService.presentToast({
          message: error['message'],
          color: TOAST_COLOR_ENUMS.DANGER,
        })
      });
  }

  private async createAddress() {
    await this.loaderService.showLoader();
    RequestEnums.ADD_NEW_ADDRESS.values = [
      this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID)
    ]
    this.commonRequestService
      .request(RequestEnums.ADD_NEW_ADDRESS, this.addressForm.value)
      .subscribe(async (res) => {
        this.addressForm.reset();
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || !Utils.isValidInput(res.data) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.toasterService.presentToast({
            message: 'Address Added Successfully',
            color: TOAST_COLOR_ENUMS.SUCCESS,
          });
          this.router.navigate(['profile-dashboard', 'address-management']);
        }
      }, async (error) => {
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
