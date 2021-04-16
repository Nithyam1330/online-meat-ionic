import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import {
  ToasterService,
  TOAST_COLOR_ENUMS,
} from 'src/app/shared/services/common/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseClass implements OnInit {
  profileForm: FormGroup;
  genderListData = [];

  validationMessages = {
    firstName: [
      { type: 'required', message: 'Please enter your  FirstName' },
      { type: 'pattern', message: 'Allowed Only Alphabets' },
    ],
    lastName: [
      { type: 'required', message: 'Please enter your  LasttName' },
      { type: 'pattern', message: 'Allowed Only Alphabets' },
    ],
    phoneNumber: [
      { type: 'required', message: 'Please enter your Phone number' },
    ],
    gender_id: [{ type: 'required', message: 'Please select Gender' }],
  };
  isUpdate: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private StorageService: StorageService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getAllGenders();
    this.getProfileData();
    this.initializeProfile();
  }

  /** fetch Gender List */
  private async getAllGenders() {
    // await this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.GET_GENDER_TYPES).subscribe(
      async (response) => {
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(response.data)) {
          this.genderListData = response.data;
        }
      },
      async (error) => {
        if (error) {
          await this.loaderService.dissmissLoading();
        }
      }
    );
  }

  private initializeProfile() {
    this.profileForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(VALIDATION_PATTERNS.NAME),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(VALIDATION_PATTERNS.NAME),
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(VALIDATION_PATTERNS.PHONE),
        ]),
      ],
      gender_id: ['', Validators.compose([Validators.required])],
      profilePicture: [''],
    });
  }

  onSubmit() {
    if (this.isUpdate) {
      this.updateProfile();
    } else {
      this.createProfile();
    }
  }

  /* Fetch Existing Profile Data*/
  private async getProfileData() {
    await this.loaderService.showLoader();
    RequestEnums.GET_USER_PROFILE_DATA.values = [
      this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
    ];
    this.commonRequestService
      .request(RequestEnums.GET_USER_PROFILE_DATA)
      .subscribe(
        async (Response) => {
          await this.loaderService.dissmissLoading();
          if (Utils.isValidInput(Response.data)) {
            this.profileForm.patchValue(Response.data[0]);
            if (Response.data[0].updatedAt !== '' || null) {
              this.isUpdate = true;
            }
          }
        },
        async (error) => {
          if (error) {
            await this.loaderService.dissmissLoading();
          }
        }
      );
  }

  /*for Creating a new Profile */
  private async createProfile() {
    await this.loaderService.showLoader();
    RequestEnums.SAVE_PROFILE.values = [
      this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
    ];
    this.commonRequestService
      .request(RequestEnums.SAVE_PROFILE, this.profileForm.value)
      .subscribe(
        async (response) => {
          if (Utils.isValidInput(response)) {
            await this.loaderService.dissmissLoading();
            this.toasterService.presentToast({
              message: response.message,
              color: TOAST_COLOR_ENUMS.SUCCESS,
            });
          }
        },
        async (error) => {
          if (error) {
            await this.loaderService.dissmissLoading();
            this.toasterService.presentToast({
              message: error.error.message,
              color: TOAST_COLOR_ENUMS.DANGER,
            });
          }
        }
      );
  }

  /*for Updating Existing Profile */
  private async updateProfile() {
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_USER_PROFILE_DATA.values = [
      this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
    ];
    this.commonRequestService
      .request(RequestEnums.UPDATE_USER_PROFILE_DATA, this.profileForm.value)
      .subscribe(
        async (response) => {
          if (Utils.isValidInput(response)) {
            await this.loaderService.dissmissLoading();
            this.toasterService.presentToast({
              message: response.message,
              color: TOAST_COLOR_ENUMS.SUCCESS,
            });
          }
        },
        async (error) => {
          if (error) {
            await this.loaderService.dissmissLoading();
            this.toasterService.presentToast({
              message: error.error.message,
              color: TOAST_COLOR_ENUMS.DANGER,
            });
          }
        }
      );
  }
}
