import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseClass implements OnInit {
  ForgetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private toasterService: ToasterService,
    private loaderService: LoaderService) {
    super();
  }

  validationMessages = {
    username: [
      { type: "required", message: "Please enter your  Email Address" },
      { type: "pattern", message: "Please enter your valid Email Address" },
    ],
  };

  ngOnInit() {
    this.initForgetPasswordForm();
  }

  initForgetPasswordForm() {
    this.ForgetPasswordForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
    });
  }

  async onSubmit() {
    await this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.FORGOT_PASSWORD, this.ForgetPasswordForm.value).subscribe(
      (res: any) => {
        this.loaderService.dissmissLoading();
        if (res.statusCode === 200) {
          this.toasterService.presentToast({
            message: 'Password has been sent to your mail',
            color: TOAST_COLOR_ENUMS.SUCCESS
          })
        }
        else {
          this.toasterService.presentToast({
            message: 'Error',
            color: TOAST_COLOR_ENUMS.DANGER
          })
        }
      });
  }
}
