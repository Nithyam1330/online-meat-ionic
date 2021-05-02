import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
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
    private commonRequestService: CommonRequestService
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
          text: `${subCategory.status}`,
          icon: 'ellipse',
          cssClass: `${subCategory.status === 'ACTIVE' ? 'green-color' : 'red-color'}`,
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
    this.router.navigate(['admin', 'sub-categories', 'add'])
  }

  private async activeOrInActiveConfirmationPopup(subCategory) {
    const alert = await this.alertController.create({
      header: 'Confimation !',
      message: `Are you sure, You want to ${subCategory.status} ${subCategory.name} Sub-Category ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: `${subCategory.status === 'ACTIVE' ? 'Inactive' : 'Active'}`,
          handler: () => {
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  getAllSubCategories() {
    this.commonRequestService
      .request(RequestEnums.GET_ALL_SUB_CATEGORY)
      .subscribe(res => {
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.subCategories = res.data;
          console.log(this.subCategories);
        }
      },
      )
  }
}
