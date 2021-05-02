import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import Utils from 'src/app/shared/services/common/utils';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit {
  subCategories = [];
  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alertController: AlertController,
    private toasterService: ToasterService,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getAllSubCategories();
  }


  public async openActions(subCategory) {
    const actionSheet = await this.actionSheetController.create({
      header: `${subCategory.name}`,
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            // navigate to edit page
            this.router.navigate(['admin', 'sub-categories', subCategory.subCategoryKey]);
          }
        }, {
          text: `Mark as ${subCategory.status === 'ACTIVE' ? 'Inactive' : 'Active'}`,
          icon: 'ellipse',
          cssClass: `${subCategory.status === 'ACTIVE' ? 'red-color' : 'green-color'}`,
          handler: () => {
            this.activeOrInActiveConfirmationPopup(subCategory);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  public navigateToAddCategories() {
    this.router.navigate(['admin', 'sub-categories', 'add']);
  }

  private async activeOrInActiveConfirmationPopup(subCategory) {
    const alert = await this.alertController.create({
      header: 'Confimation !',
      message: `Are you sure, You want to mark <strong>${subCategory.name}</strong> Sub-Category as <strong>${subCategory.status === 'Active' ? 'Inactive' : 'Active'} </strong> ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: `${subCategory.status === 'Active' ? 'Inactive' : 'Active'}`,
          handler: () => {
            this.activeInactiveAPI(subCategory);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  private async activeInactiveAPI(subCategory) {
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_SUB_CATEGORY_STATUS.values = [
      subCategory.subCategoryKey,
      subCategory.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    ]
    this.commonRequestService.request(RequestEnums.UPDATE_SUB_CATEGORY_STATUS).subscribe(async res => {
      await this.loaderService.dissmissLoading();
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: TOAST_COLOR_ENUMS.DANGER
        });
      } else {
        this.toasterService.presentToast({
          message: 'Status Updated Successfully',
          color: TOAST_COLOR_ENUMS.SUCCESS
        });
        this.getAllSubCategories();
      }
    }, async e => {
      await this.loaderService.dissmissLoading();
      this.toasterService.presentToast({
        message: 'Something went wrong. Please try again',
        color: TOAST_COLOR_ENUMS.DANGER
      });
    })
  }

  private async getAllSubCategories() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.GET_ALL_SUB_CATEGORY)
      .subscribe(async res => {
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: TOAST_COLOR_ENUMS.DANGER
          });
        } else {
          this.subCategories = res.data;
        }
      },
      async e => {
        await this.loaderService.dissmissLoading();
        this.toasterService.presentToast({
          message: 'Something Went wrong.. Please try again',
          color: TOAST_COLOR_ENUMS.DANGER
        });
      }
      )
  }
}
