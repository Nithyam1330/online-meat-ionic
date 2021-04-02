import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private StorageService: StorageService,
    private loader: LoaderService,
    private toaster: ToasterService
  ) {
    super();
  }

  ngOnInit() {
    this.getAllGenders();
    this.initializeProfile();
  }

  getAllGenders() {
    this.commonRequestService
      .request(RequestEnums.GET_GENDER_TYPES)
      .subscribe((response) => {
        if (Utils.isValidInput(response.data)) {
          this.genderListData = response.data;
          console.log(this.genderListData);
        }
      });
  }

  initializeProfile() {
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
    console.log(this.profileForm.value);
    this.loader.showLoader();
    RequestEnums.SAVE_PROFILE.values = [
      this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
    ];
    this.commonRequestService
      .request(RequestEnums.SAVE_PROFILE, this.profileForm.value)
      .subscribe(
        (response) => {
          if (Utils.isValidInput(response)) {
            this.loader.dissmissLoading();
          }
        },
        (error) => {
          if (error) {
            this.loader.dissmissLoading();
            this.toaster.presentToast(error.error.message, 'danger');
          }
        }
      );
  }
}
