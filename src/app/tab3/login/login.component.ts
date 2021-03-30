import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { LOCAL_STORAGE_ENUMS } from '../app-properties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  extends BaseClass implements OnInit {
  loginForm: FormGroup;

  validationMessages = {
    username: [
      { type: 'required', message: 'Please enter your  Email Address' },
      { type: 'pattern', message: 'Please enter your valid Email Address' },
    ],
    password: [{ type: 'required', message: 'Please enter password' }],
  };
  
  constructor(private formBuilder: FormBuilder, private StorageService:StorageService,
    private commonRequestService: CommonRequestService) {
      super();
    }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
      password: ["", Validators.compose([Validators.required])]
    });
  }
  onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.commonRequestService
      .request(RequestEnums.LOGIN, this.loginForm.value)
      .subscribe((res: any) => {
      this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ROLE, res.data.role);
      this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ACCESS_TOKEN, res.data.access_token);
      this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.UID, res.data.uid);
      this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.ID, res.data._id);
      this.StorageService.setLocalStorageItem(LOCAL_STORAGE_ENUMS.PROVIDER, res.data.provider);

        if (res.statusCode === 200) {
          alert('logged in Successfully');
        }
        else {
          alert("Invalid credentials");
        }
      },
    )
  }
}
