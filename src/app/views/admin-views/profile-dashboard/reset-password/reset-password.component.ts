import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { CustomValidators } from 'src/app/shared/services/common/validators';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends BaseClass implements OnInit {
  ResetForm: FormGroup;
  validationMessages = {
    oldPassword: [
      { type: 'required', message: 'Please enter your Old Password' },
    ],
    newPassword: [
      { type: 'required', message: 'Please enter your New Password' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Please enter your Confirm Password' },
      { type: 'notSame', message: 'New P7assword and Confirm Password Mismatch' },
    ],
  };

  constructor(private formBuilder: FormBuilder,
    private StorageService: StorageService,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toastService: ToasterService) {
    super();

  }
  ngOnInit() {
    this.initResetForm();
  }
  initResetForm() {
    this.ResetForm = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },
      {
        validators: CustomValidators.checkPasswords
      }
    );
  }
  onSubmit() {
    this.loaderService.showLoader();
    RequestEnums.RESET_PASSWORD.values = [this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID)]
    this.commonRequestService.request(RequestEnums.RESET_PASSWORD, this.ResetForm.value).subscribe(
      (res: any) => {
        this.loaderService.dissmissLoading();
        if (res.statusCode === 200) {
          this.toastService.presentToast({
            message: 'Password has been changed Successfully',
            color: TOAST_COLOR_ENUMS.SUCCESS
          })
        }
        else {
          this.toastService.presentToast({
            message: 'Error',
            color: TOAST_COLOR_ENUMS.DANGER
          })
        }
      });
  }
}
