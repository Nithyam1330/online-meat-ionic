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

@Component({
  selector: 'app-modify-categories',
  templateUrl: './modify-categories.component.html',
  styleUrls: ['./modify-categories.component.scss'],
})
export class ModifyCategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  STATUS = STATUS;
  categoryKey: any;
  categories: [];
  
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router
  ) { 
    this.categoryKey = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params.id);
    console.log(this.categoryKey);
  }

  ngOnInit() {
    this.initializeForm();
    this.getAllCategories();
  }

  private initializeForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],    
    });
  }
  
  private async getAllCategories() {
    await this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.GET_ALL_CATEGORY).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        this.categories = res.data;
        console.log(this.categoryKey)
        if (Utils.isValidInput(this.categoryKey)) {
          this.getCategoryDetailsByKey();
        }
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
   public createCategory() {
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

  }
}
