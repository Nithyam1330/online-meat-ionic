import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUS } from 'src/app/shared/constants/app-properties';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import Utils from '../../../shared/services/common/utils';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from 'src/app/shared/services/common/baseClass';

@Component({
  selector: 'app-modify-categories',
  templateUrl: './modify-categories.component.html',
  styleUrls: ['./modify-categories.component.scss'],
})
export class ModifyCategoriesComponent extends BaseClass implements OnInit {
  categoryForm: FormGroup;
  STATUS = STATUS;
  categoryKey: any;
  categories: any;
  validationMessages = {
    name: [
      { type: 'required', message: 'Please enter Category name' },
    ],
    status: [{ type: 'required', message: 'Please select status' }],
  };
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router
  ) { 
    super();
    this.categoryKey = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.initializeForm();
    this.getCategoryDetailsByKey();
  }

  private initializeForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],    
    });
  }

  private async getCategoryDetailsByKey() {
    await this.loaderService.showLoader();
    RequestEnums.GET_CATEGORY_BY_KEY.values = [
      this.categoryKey
    ];
    this.commonRequestService.request(RequestEnums.GET_CATEGORY_BY_KEY).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        this.categoryForm.patchValue(res.data);
      }
    
    },
    async e => {
      await this.loaderService.dissmissLoading();
      this.toasterService.presentToast({
        message: 'Something Went wrong.. Please try again',
        color: TOAST_COLOR_ENUMS.DANGER
      });
    })
  }
  
  public onSubmit() {
    if (this.categoryForm.valid) {
      if (Utils.isValidInput(this.categoryKey)) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    }
  }
  private async createCategory() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.CREATE_CATEGORY, this.categoryForm.value)
      .subscribe(async res => {
        await this.loaderService.dissmissLoading();
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
          this.router.navigate(['admin', 'categories']);
        }
      }, );
  }
  private async updateCategory() {
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_CATEGORY_DETAILS.values = [
      this.categoryKey
    ]
    this.commonRequestService.request(RequestEnums.UPDATE_CATEGORY_DETAILS,this.categoryForm.value).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        await this.toasterService.presentToast({
          message: 'Category Updated successfully',
          color: TOAST_COLOR_ENUMS.SUCCESS
        });
        this.router.navigate(['admin', 'categories']);
      }
    },
    async e => {
      await this.loaderService.dissmissLoading();
      this.toasterService.presentToast({
        message: 'Something Went wrong.. Please try again',
        color: TOAST_COLOR_ENUMS.DANGER
      });
    })
  }

  public cancel() {
    this.router.navigate(['admin', 'categories']);
  }
}
