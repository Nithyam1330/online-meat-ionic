import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderTypes, Roles } from 'src/app/shared/constants/registration-constants';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseClass implements OnInit {
  registerForm: FormGroup;

  validationMessages = {
    username: [
      { type: "required", message: "Please enter your  Email Address" },
      { type: "pattern", message: "Please enter your valid Email Address" },
    ],
  };

  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private toastService: ToasterService,
    private loaderService: LoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.initRegistration();
  }

  initRegistration() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
      provider: [ProviderTypes.EMAIL],
      role: [Roles.USER],
    });
  }

  onSubmit() {
    this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.REGISTER, this.registerForm.value).subscribe(
      (res: any) => {
        this.loaderService.dissmissLoading();
        if (res.statusCode === 200) {
          this.toastService.presentToast({
            message: 'Registered Succesfully',
            color: TOAST_COLOR_ENUMS.SUCCESS
          })
          this.router.navigate(['tabs', 'tab3']);
        }
        else {
          this.toastService.presentToast({
            message: 'email already exists',
            color: TOAST_COLOR_ENUMS.SUCCESS
          })
        }
      },
    )
  }
}


