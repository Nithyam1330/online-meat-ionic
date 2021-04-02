import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderTypes } from 'src/app/shared/constants/registration-constants';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { Roles } from '../../shared/constants/registration-constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  extends BaseClass implements OnInit {
  registerForm: FormGroup;

  validationMessages = {
    username:[
      { type: "required", message: "Please enter your  Email Address" },
      { type: "pattern", message: "Please enter your valid Email Address" },
    ],
  };

  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) {
      super();
    }

  ngOnInit() {
    this.initRegistration();
  }

  initRegistration() {
    this.registerForm = this.formBuilder.group({
      username: ['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL),
      ])],
      provider:[ProviderTypes.EMAIL],
      role: [Roles.USER],
    });
  }

  onSubmit() {
    const username = this.registerForm.get('username').value;
    this.commonRequestService.request(RequestEnums.REGISTER, this.registerForm.value).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          alert('user registered Successfully');
          alert(res.data.password);
        }
        else {
          alert("email already exists");
        }
      },
    )
  }
}


