import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  ForgetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) { }


  ngOnInit() {
    this.initForgetPasswordForm();
  }

  initForgetPasswordForm() {
    this.ForgetPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]]
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
