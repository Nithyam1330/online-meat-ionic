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
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends BaseClass implements OnInit {
  ResetForm: FormGroup;
  typeValue = 'password';
  validationMessages = {
    oldPassword: [
      { type: 'required', message: 'Please enter your old password' },
    ],
    newPassword: [
      { type: 'required', message: 'Please enter your new password' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Please confirm your password' },
      { type: 'notSame', message: 'New password and confirm password mismatch' },
    ],
  };

  constructor(private formBuilder: FormBuilder,
    private StorageService: StorageService,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toastService: ToasterService,
    private router: Router) {
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
  async onSubmit() {
    await this.loaderService.showLoader();
    RequestEnums.RESET_PASSWORD.values = [this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID)]
    this.commonRequestService.request(RequestEnums.RESET_PASSWORD, this.ResetForm.value).subscribe(
      async (res: any) => {
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || !Utils.isValidInput(res.data) || res.statusCode !== 200 ) {
          this.toastService.presentToast({
            message: res.message,
            color: TOAST_COLOR_ENUMS.DANGER
          })
        }
        else {
          this.toastService.presentToast({
            message: 'Password has been changed Successfully',
            color: TOAST_COLOR_ENUMS.SUCCESS
          });
          this.router.navigate(['profile-dashboard']);
        }
      }, error => {
        this.toastService.presentToast({
          message: error.message,
          color: TOAST_COLOR_ENUMS.DANGER
        })
      });
  }

  /**
   * This is invoked when user clicks and changes the Checkbox
   * @param event Checkbox prebuilt event
   */
  public checkboxChange(event) {
    console.log(event);
    this.typeValue = event.target.checked ? 'text' : 'password';
  }
}
