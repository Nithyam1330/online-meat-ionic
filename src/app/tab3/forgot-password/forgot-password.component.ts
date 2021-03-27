import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseClass implements OnInit {
  ForgetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) {
      super();
    }


    validationMessages = {
      username:[
        { type: "required", message: "Please enter your  Email Address" },
        { type: "pattern", message: "Please enter your valid Email Address" },
      ],
    };

  ngOnInit() {
    this.initForgetPasswordForm();
  }

  initForgetPasswordForm() {
    this.ForgetPasswordForm = this.formBuilder.group({
      username:['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
    });
  }

  onSubmit() {
    const username = this.ForgetPasswordForm.get('username').value;

    console.log(" form:" + JSON.stringify(this.ForgetPasswordForm.value));
    this.commonRequestService.request(RequestEnums.FORGOT_PASSWORD, this.ForgetPasswordForm.value).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          alert('Password has been sent to your mail');
      }
      else {
        alert("Invalid email");
      }
    });
  }
}
