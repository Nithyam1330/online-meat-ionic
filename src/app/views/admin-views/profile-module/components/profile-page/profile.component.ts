import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  extends BaseClass implements OnInit{

  profileForm: FormGroup;

  validationMessages = {
    firstName:[
      { type: "required", message: "Please enter your  FirstName" },
      { type: "pattern", message: "Allowed Only Alphabets" },
    ],
    lastName:[
      { type: "required", message: "Please enter your  LasttName" },
      { type: "pattern", message: "Allowed Only Alphabets" },
    ],
    phoneNumber: [
      { type: "required", message: "Please enter your Phone number" }
    ],
    gender: [
      { type: "required", message: "Please select Gender" }
    ],
  };

  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService) {
      super();
    }

  ngOnInit() {
    this.initializeProfile();
  }

  initializeProfile() {
    this.profileForm = this.formBuilder.group({
      firstName: ['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.NAME),
      ])],
      lastName: ['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.NAME),
      ])],
      phoneNumber: ['',Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.PHONE),
      ])],
      gender_id: ['',Validators.compose([
        Validators.required
      ])],
      profilePicture: [''],
    });
  }

  onSubmit(){
    console.log(this.profileForm.value)

  }


}
