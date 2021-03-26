import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    console.log(" form:" + JSON.stringify(this.loginForm.value));
    this.commonRequestService.request(RequestEnums.LOGIN, this.loginForm.value).subscribe(
      (res: any) => {
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
