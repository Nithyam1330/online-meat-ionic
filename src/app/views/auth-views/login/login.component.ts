import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseClass implements OnInit {
  loginForm: FormGroup;
  addressList = [1, 2, 3];
  validationMessages = {
    username: [
      { type: 'required', message: 'Please enter Email' },
      { type: 'pattern', message: 'Please enter your valid Email Address' },
    ],
    password: [{ type: 'required', message: 'Please enter Password' }],
  };
  typeValue = "password";

  constructor(
    private formBuilder: FormBuilder,
    private StorageService: StorageService,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
      password: ["", Validators.compose([Validators.required])]
    });
  }
  onSubmit() {
    this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.LOGIN, this.loginForm.value)
      .subscribe((res: any) => {
        this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: TOAST_COLOR_ENUMS.DANGER
          });
        }
        else {
          this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ROLE, res.data.role);
          this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ACCESS_TOKEN, res.data.access_token);
          this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.UID, res.data.uid);
          this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ID, res.data._id);
          this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.PROVIDER, res.data.provider);
          this.router.navigate(['tabs', 'tab3']);
        }
      },
      async error => {
          this.loaderService.dissmissLoading();
          this.toasterService.presentToast({
            message: error.message,
            color: TOAST_COLOR_ENUMS.DANGER
          });
        })
  }

  /**
   * This is invoked when user clicks and changes the Checkbox
   * @param event Checkbox prebuilt event
   */
  public checkboxChange(event) {
    this.typeValue = event.target.checked ? 'text' : 'password';
  }
}
