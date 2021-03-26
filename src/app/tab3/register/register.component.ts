import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
 
  validationMessages = {
    username: [
      {type: 'required', message: 'Please enter Email'},
      {type: 'pattern', message: 'Please enter Valid Email'}
    ],
  };
 
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.initRegistration();
  }
  initRegistration() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      provider:['EMAIL'],
      role: ['USER'],
    });
  }
  onSubmit() {
    console.log("hello");
    const username = this.registerForm.get('username').value;
   // const provider="EMAIL";
   // const role="EMAIL";
    console.log("registration form:" + JSON.stringify(this.registerForm.value));
    this.commonRequestService.request(RequestEnums.REGISTER, this.registerForm.value).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          alert('user registered Successfully'); 
        } 
        else {
          alert("email already exists");
        }   
      },
    )
  }
}
      

