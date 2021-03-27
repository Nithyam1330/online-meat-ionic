import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService
  ) {
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
    console.log(' form:' + JSON.stringify(this.loginForm.value));
    this.commonRequestService
      .request(RequestEnums.LOGIN, this.loginForm.value)
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          alert('logged in Successfully');
        } else {
          alert('Invalid credentials');
        }
      });
  }
}
