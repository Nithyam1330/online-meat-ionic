import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import Utils from '../../../shared/services/common/utils';

@Component({
  selector: 'app-modify-categories',
  templateUrl: './modify-categories.component.html',
  styleUrls: ['./modify-categories.component.scss'],
})
export class ModifyCategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.createAddress();
  }

  private initializeForm() {
    this.categoryForm = this.formBuilder.group({
      name: [''],
      status: [''],       
    });
  }
 
   createAddress() {
    this.commonRequestService
      .request(RequestEnums.CREATE_CATEGORY, this.categoryForm.value)
      .subscribe(res => {
        if (Utils.isValidInput(res.errorType) || !Utils.isValidInput(res.data) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.toasterService.presentToast({
            message: 'Category Added Successfully',
            color: TOAST_COLOR_ENUMS.SUCCESS,
          });
        }
      }, );
  }
}
