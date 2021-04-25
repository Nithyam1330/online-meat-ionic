import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private toastService: ToasterService,
    private loaderService: LoaderService,
    private alertController: AlertController,
    private router: Router) {
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
      async (res: any) => {
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
            this.toastService.presentToast({
              message: res.message,
              color: TOAST_COLOR_ENUMS.DANGER
            })
        } else {
          this.toastService.presentToast({
            message: 'Password Sent To your email',
            color: TOAST_COLOR_ENUMS.SUCCESS
          });
          const ref = await this.alertController.create({
            message: res.data.password,
            header: 'Password',
            buttons: [
              {
                text: 'ok',
                handler: () => {
                  this.router.navigate(['login']);
                }
              }
            ]
          })
          await ref.present();
        }
      });
  }
}
