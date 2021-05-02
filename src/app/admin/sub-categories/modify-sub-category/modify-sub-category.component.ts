import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STATUS } from 'src/app/shared/constants/app-properties';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-modify-sub-category',
  templateUrl: './modify-sub-category.component.html',
  styleUrls: ['./modify-sub-category.component.scss'],
})
export class ModifySubCategoryComponent implements OnInit {

  subCategoryKey: any;
  subCategoryForm: FormGroup;
  STATUS = STATUS;
  categories = [];
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private commonRequestService: CommonRequestService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.subCategoryKey = this.activatedRoute.snapshot.params.subCategoryKey;
  }

  ngOnInit() {
    this.initializeForm();
    this.getAllCategories();
  }
  ionViewDidEnter() {
   
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
        if (Utils.isValidInput(this.subCategoryKey)) {
          this.getSubCategoryDetails();
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

  /**
   * Get the sub categories details by sub category Key
   */
  private async getSubCategoryDetails() {
    await this.loaderService.showLoader();
    RequestEnums.GET_SUB_CATEGORY_DETAILS.values = [
      this.subCategoryKey
    ];
    this.commonRequestService.request(RequestEnums.GET_SUB_CATEGORY_DETAILS).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        this.subCategoryForm.patchValue(res.data);
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

  private initializeForm() {
    this.subCategoryForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      categoryKey: ['', Validators.compose([Validators.required])]      
    });
  }

  public async createOrUpdateSubCategory() {
    if (Utils.isValidInput(this.subCategoryKey)) {
      this.updateSubCategory();

    } else {
      this.createSubCategory();

    }
  }

  private async createSubCategory() {
    await this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.CREATE_SUB_CATEGORY,this.subCategoryForm.value).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        await this.toasterService.presentToast({
          message: 'Sub category Created successfully',
          color: TOAST_COLOR_ENUMS.SUCCESS
        });
        this.router.navigate(['admin', 'sub-categories']);
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

  private async updateSubCategory() {
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_SUB_CATEGORY.values = [
      this.subCategoryKey
    ]
    this.commonRequestService.request(RequestEnums.UPDATE_SUB_CATEGORY,this.subCategoryForm.value).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        await this.toasterService.presentToast({
          message: 'Sub category Updated successfully',
          color: TOAST_COLOR_ENUMS.SUCCESS
        });
        this.router.navigate(['admin', 'sub-categories']);
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
