import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService, TOAST_COLOR_ENUMS } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../shared/constants/request-enums';
import Utils from '../../shared/services/common/utils';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories = [];
  category: any;
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private loaderService: LoaderService
  ) { }
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getAllCategories();
  }
  public navigateToAddCategories() {
    this.router.navigate(['admin', 'categories', 'add']);
  }
  public async openActions(category) {
    const actionSheet = await this.actionSheetController.create({
      header: `${category.name}`,
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            // navigate to edit page
          this.router.navigate(['admin', 'categories', category.categoryKey]);
            }
        }, {
          text: `Mark as ${category.status === 'ACTIVE' ? 'Inactive' : 'Active'}`,
          icon: 'ellipse',
          cssClass: `${category.status === 'ACTIVE' ? 'red-color' : 'green-color'}`,
          handler: () => {
            this.activeOrInActiveConfirmationPopup(category);
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

  

  private async activeOrInActiveConfirmationPopup(category) {
    const alert = await this.alertController.create({
      header: 'Confimation !',
      message: `Are you sure, You want to mark <strong>${category.name}</strong> Category as <strong>${category.status === 'Active' ? 'Inactive' : 'Active'} </strong> ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: `${category.status === 'Active' ? 'Inactive' : 'Active'}`,
          handler: () => {
            this.activeInactiveAPI(category);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  private async activeInactiveAPI(Category) {
    console.log("category:"+Category);
    await this.loaderService.showLoader();
    RequestEnums.UPDATE_STATUS.values = [
      Category.categoryKey,
      Category.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    ]
    this.commonRequestService.request(RequestEnums.UPDATE_STATUS).subscribe(async res => {
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
        this.getAllCategories();
      }
    }, async e => {
      await this.loaderService.dissmissLoading();
      this.toasterService.presentToast({
        message: 'Something went wrong. Please try again',
        color: TOAST_COLOR_ENUMS.DANGER
      });
    })
  }


  private async getAllCategories() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.GET_ALL_CATEGORY)
      .subscribe(async res => {
        await this.loaderService.dissmissLoading();
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: TOAST_COLOR_ENUMS.DANGER
          });
        } else {
          this.categories = res.data;
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



    
